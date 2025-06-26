
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ItineraryFormData, ItineraryHistoryItem, SeasonOption, BudgetOption, DestinationDetail, UserRole, FocusOption, ToneOption, QuickTripFormData, QuickTripFocusOption } from './types';
import { DEFAULT_FORM_DATA, DEFAULT_QUICK_TRIP_FORM_DATA } from './constants';
import { generateItinerary, generateDestinationImage, refineItinerary, generateQuickTrip } from './services/geminiService';
import { iconSvgMap } from './components/icons'; 
import ItineraryForm from './components/ItineraryForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import HistoryPanel from './components/HistoryPanel';
import LoginPage from './components/LoginPage'; 
import AdminLayout from './components/AdminLayout';
import UserPage from './components/UserPage';
import TemplateSelection from './components/TemplateSelection'; 

const HISTORY_STORAGE_KEY = 'roteiroIA_history_v2'; 
const AUTH_STORAGE_KEY = 'roteiroIA_auth';

const App: React.FC = () => {
  const [formData, setFormData] = useState<ItineraryFormData>(DEFAULT_FORM_DATA);
  const [itinerary, setItinerary] = useState<string>('');
  const [destinationImage, setDestinationImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [isPreparingPdfExport, setIsPreparingPdfExport] = useState<boolean>(false);
  const [isExportingHtml, setIsExportingHtml] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [globalHistory, setGlobalHistory] = useState<ItineraryHistoryItem[]>([]); 
  const [userHistory, setUserHistory] = useState<ItineraryHistoryItem[]>([]); 
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
  
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(null);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null); 
  const [currentView, setCurrentView] = useState<string>('login'); 

  const [isRefinementPanelOpen, setIsRefinementPanelOpen] = useState<boolean>(false);
  const [refinementText, setRefinementText] = useState<string>('');
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [isGeneratingInitialTemplate, setIsGeneratingInitialTemplate] = useState<boolean>(false);

  // State for Quick Trip feature
  const [quickTripFormData, setQuickTripFormData] = useState<QuickTripFormData>(DEFAULT_QUICK_TRIP_FORM_DATA);
  const [quickTripSuggestions, setQuickTripSuggestions] = useState<string>('');
  const [isLoadingQuickTrip, setIsLoadingQuickTrip] = useState<boolean>(false);
  const [quickTripError, setQuickTripError] = useState<string | null>(null);


  const officialTemplates = globalHistory.filter(item => item.isOfficialTemplate);

  useEffect(() => {
    if (!process.env.API_KEY) {
      setError("Chave de API (API_KEY) não encontrada. Configure-a nas variáveis de ambiente para usar a aplicação.");
    }
  }, []);

  useEffect(() => {
    let loadedGlobalHistory: ItineraryHistoryItem[] = [];

    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const { role, username } = JSON.parse(storedAuth);
        if (role && username) {
          setCurrentUserRole(role);
          setCurrentUsername(username);
          setCurrentView(role === 'admin' ? 'admin' : 'user');
        }
      }

      const storedGlobalHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedGlobalHistory) {
        const parsedHistory: ItineraryHistoryItem[] = JSON.parse(storedGlobalHistory);
        loadedGlobalHistory = parsedHistory.map(item => ({
          ...item,
          inputs: {
            ...DEFAULT_FORM_DATA, 
            ...item.inputs,      
             isMultiDestination: typeof item.inputs.isMultiDestination === 'boolean' ? item.inputs.isMultiDestination : false,
             destinations: Array.isArray(item.inputs.destinations) ? item.inputs.destinations : [],
             season: item.inputs.season || SeasonOption.QUALQUER,
             budget: item.inputs.budget || BudgetOption.QUALQUER,
             currency: item.inputs.currency || '',
             includeLanguageTips: typeof item.inputs.includeLanguageTips === 'boolean' ? item.inputs.includeLanguageTips : false,
             nationality: item.inputs.nationality || '',
             travelRequirements: item.inputs.travelRequirements || '',
          },
          userIdentifier: item.userIdentifier || 'unknown_user',
          isOfficialTemplate: typeof item.isOfficialTemplate === 'boolean' ? item.isOfficialTemplate : false,
          templateTitle: typeof item.templateTitle === 'string' ? item.templateTitle : (item.inputs.destination || "Modelo"),
          isFavorite: typeof item.isFavorite === 'boolean' ? item.isFavorite : false, // Initialize isFavorite
        }));
      }
    } catch (e) {
      console.error("Failed to load data from localStorage:", e);
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    
    setGlobalHistory(loadedGlobalHistory);
    setFormData(DEFAULT_FORM_DATA); // Always start with a blank form

    // Function to generate the initial template if needed
    const createInitialTemplateIfNeeded = async (currentHistory: ItineraryHistoryItem[]) => {
      const currentOfficialTemplates = currentHistory.filter(item => item.isOfficialTemplate);
      if (currentOfficialTemplates.length === 0 && process.env.API_KEY) {
        console.log("No official templates found. Attempting to generate a random quick start template...");
        setIsGeneratingInitialTemplate(true);

        const RANDOM_DESTINATIONS = ["Tóquio, Japão", "Roma, Itália", "Cidade do Cabo, África do Sul", "Vancouver, Canadá", "Queenstown, Nova Zelândia", "Reykjavík, Islândia", "Patagônia, Argentina", "Bangkok, Tailândia", "Kyoto, Japão", "Paris, França"];
        const RANDOM_DURATIONS = [3, 5, 7]; 
        const RANDOM_FOCUSES: FocusOption[] = [FocusOption.CULTURA, FocusOption.AVENTURA, FocusOption.GASTRONOMIA, FocusOption.ECOTURISMO_NATUREZA, FocusOption.MIX];
        const RANDOM_TONES: ToneOption[] = [ToneOption.RELAXADO, ToneOption.INTENSO, ToneOption.FAMILIAR_COM_CRIANCAS];

        const randomDestination = RANDOM_DESTINATIONS[Math.floor(Math.random() * RANDOM_DESTINATIONS.length)];
        const randomDuration = RANDOM_DURATIONS[Math.floor(Math.random() * RANDOM_DURATIONS.length)];
        const randomFocus = RANDOM_FOCUSES[Math.floor(Math.random() * RANDOM_FOCUSES.length)];
        const randomTone = RANDOM_TONES[Math.floor(Math.random() * RANDOM_TONES.length)];

        const initialTemplateFormData: ItineraryFormData = {
          ...DEFAULT_FORM_DATA,
          destination: randomDestination,
          duration: randomDuration,
          focus: randomFocus,
          tone: randomTone,
          isMultiDestination: false,
          destinations: [],
          includeLanguageTips: Math.random() > 0.3, 
          nationality: '', 
          travelRequirements: "Modelo rápido gerado automaticamente: um roteiro balanceado com as principais atrações e dicas locais.",
        };
        
        try {
          const response = await generateItinerary(initialTemplateFormData);
          const generatedText = response.text;
          const newHistoryItem: ItineraryHistoryItem = {
            id: `history-initial-template-${Date.now()}`,
            timestamp: Date.now(),
            inputs: { ...initialTemplateFormData },
            roteiro: generatedText,
            userIdentifier: 'system_template_generator',
            isOfficialTemplate: true,
            templateTitle: `Modelo Rápido: ${initialTemplateFormData.destination}`,
            isFavorite: false,
          };
          setGlobalHistory(prevGlobalHistory => [newHistoryItem, ...prevGlobalHistory.filter(item => item.id !== newHistoryItem.id)]);
          console.log("Initial random template generated and added to history.");
        } catch (err) {
          console.error("Failed to generate initial random template:", err);
        } finally {
          setIsGeneratingInitialTemplate(false);
        }
      }
    };
    
    createInitialTemplateIfNeeded(loadedGlobalHistory);

  }, []);


  useEffect(() => {
    if (currentUsername && currentUserRole === 'user') {
      setUserHistory(globalHistory.filter(item => item.userIdentifier === currentUsername));
    } else {
      setUserHistory([]); 
    }
  }, [globalHistory, currentUsername, currentUserRole]);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(globalHistory));
    } catch (e) {
      console.error("Failed to save global history to localStorage:", e);
      if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.code === 22)) {
        setError("Não foi possível salvar o histórico. O armazenamento local está cheio.");
      }
    }
  }, [globalHistory]);


  const handleLogin = (username: string, role: UserRole) => {
    if (role) {
      setCurrentUserRole(role);
      setCurrentUsername(username);
      setCurrentView(role === 'admin' ? 'admin' : 'user');
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ role, username }));
      setError(null);
      setQuickTripError(null); // Clear quick trip error on login
    }
  };

  const handleLogout = () => {
    setCurrentUserRole(null);
    setCurrentUsername(null);
    setCurrentView('login');
    setFormData(DEFAULT_FORM_DATA);
    setItinerary('');
    setDestinationImage(null);
    setActiveHistoryId(null);
    setIsRefinementPanelOpen(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setError(null);
    // Reset Quick Trip state on logout
    setQuickTripFormData(DEFAULT_QUICK_TRIP_FORM_DATA);
    setQuickTripSuggestions('');
    setQuickTripError(null);
  };

  const updateTotalDuration = (destinations: DestinationDetail[]) => {
    const totalDays = destinations.reduce((sum, dest) => sum + (Number(dest.days) || 0), 0);
    setFormData(prev => ({ ...prev, duration: totalDays }));
  };

  const handleFormChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index?: number,
    field?: keyof DestinationDetail
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    if (typeof index === 'number' && field && formData.isMultiDestination) {
      const updatedDestinations = formData.destinations.map((dest, i) => {
        if (i === index) {
          return { ...dest, [field]: field === 'days' ? (parseInt(value, 10) || 0) : value };
        }
        return dest;
      });
      setFormData(prev => ({ ...prev, destinations: updatedDestinations }));
      updateTotalDuration(updatedDestinations);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : (name === 'duration' && !prev.isMultiDestination ? (parseInt(value, 10) || 0) : (name === 'currency' ? value.toUpperCase() : value)),
      }));
    }
  }, [formData.isMultiDestination, formData.destinations]);

  const handleIsMultiDestinationChange = useCallback((isMulti: boolean) => {
    setFormData(prev => {
      const newFormData = { ...prev, isMultiDestination: isMulti };
      if (isMulti) {
        if (prev.destinations.length === 0) {
          newFormData.destinations = [{ name: prev.destination || '', days: prev.duration || 1 }];
        }
        updateTotalDuration(newFormData.destinations); 
      } else {
         newFormData.duration = newFormData.destinations[0]?.days || prev.duration || DEFAULT_FORM_DATA.duration;
      }
      return newFormData;
    });
  }, []);

  const handleAddDestination = useCallback(() => {
    setFormData(prev => {
      const newDestinations = [...prev.destinations, { name: '', days: 1 }];
      if (prev.isMultiDestination) {
        updateTotalDuration(newDestinations);
      }
      return { ...prev, destinations: newDestinations };
    });
  }, []);

  const handleRemoveDestination = useCallback((indexToRemove: number) => {
    setFormData(prev => {
      if (prev.destinations.length <= 1 && prev.isMultiDestination) return prev; 
      const newDestinations = prev.destinations.filter((_, index) => index !== indexToRemove);
      if (prev.isMultiDestination) {
        updateTotalDuration(newDestinations);
      }
      return { ...prev, destinations: newDestinations };
    });
  }, []);

  const commonSubmitValidation = (currentFormData: ItineraryFormData): boolean => {
     if (!process.env.API_KEY) {
      setError("Chave de API (API_KEY) não configurada. Não é possível gerar roteiros.");
      return false;
    }
    if (!currentFormData.destination && !currentFormData.isMultiDestination) {
        setError("Por favor, informe o destino principal.");
        return false;
    }
    if (currentFormData.isMultiDestination) {
        if (!currentFormData.destination) { 
            setError("Por favor, informe um título para a sua viagem multi-destinos.");
            return false;
        }
        if (currentFormData.destinations.length === 0) {
            setError("Adicione pelo menos um destino para uma viagem multi-destinos.");
            return false;
        }
        for (const dest of currentFormData.destinations) {
            if (!dest.name.trim()) {
                setError("Todos os destinos na lista devem ter um nome.");
                return false;
            }
            if (dest.days <= 0) {
                setError(`A duração para "${dest.name}" deve ser de pelo menos 1 dia.`);
                return false;
            }
        }
        const totalSubDays = currentFormData.destinations.reduce((sum, d) => sum + d.days, 0);
        if (totalSubDays !== currentFormData.duration) {
            setError(`A soma dos dias dos destinos (${totalSubDays}) não corresponde à duração total da viagem (${currentFormData.duration}). Ajuste os dias ou a duração total.`);
            return false; 
        }
    } else { 
        if (currentFormData.duration <= 0) {
            setError("A duração da viagem deve ser de pelo menos 1 dia.");
            return false;
        }
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commonSubmitValidation(formData)) return;

    setIsLoading(true);
    setError(null);
    setItinerary('');
    setDestinationImage(null);
    setIsRefinementPanelOpen(false);

    try {
      const response = await generateItinerary(formData);
      const generatedText = response.text;
      setItinerary(generatedText);

      const newHistoryItem: ItineraryHistoryItem = {
        id: `history-${Date.now()}`,
        timestamp: Date.now(),
        inputs: { ...formData },
        roteiro: generatedText,
        userIdentifier: currentUsername || 'unknown_user',
        isOfficialTemplate: false, 
        templateTitle: formData.destination, 
        isFavorite: false,
      };
      setGlobalHistory(prev => [newHistoryItem, ...prev.filter(item => item.id !== newHistoryItem.id)]);
      setActiveHistoryId(newHistoryItem.id);

      setIsLoadingImage(true);
      const mainDestinationForImage = formData.isMultiDestination ? formData.destinations[0]?.name || formData.destination : formData.destination;
      const imageUrl = await generateDestinationImage(mainDestinationForImage);
      setDestinationImage(imageUrl);

    } catch (err: any) {
      console.error("Error generating itinerary:", err);
      setError(err.message || "Ocorreu um erro ao gerar o roteiro.");
      setItinerary('');
    } finally {
      setIsLoading(false);
      setIsLoadingImage(false);
    }
  };
  
  const handleOpenRefinementPanel = () => {
    if (!itinerary) {
      setError("Não há roteiro ativo para refinar. Gere um roteiro primeiro.");
      return;
    }
    setRefinementText(formData.travelRequirements || ''); 
    setIsRefinementPanelOpen(true);
  };

  const handleSubmitRefinement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!itinerary) {
      setError("Não há roteiro ativo para refinar.");
      return;
    }
    if (!refinementText.trim()) {
      setError("Por favor, forneça instruções para o refinamento.");
      return;
    }
    if (!commonSubmitValidation(formData)) return;

    setIsRefining(true);
    setError(null);

    try {
      const response = await refineItinerary(itinerary, refinementText, formData);
      const refinedText = response.text;
      setItinerary(refinedText);

      if (activeHistoryId) {
        setGlobalHistory(prev => prev.map(item =>
          item.id === activeHistoryId
            ? { ...item, roteiro: refinedText, inputs: { ...formData, travelRequirements: refinementText }, timestamp: Date.now() }
            : item
        ));
      } else { 
        const newHistoryItem: ItineraryHistoryItem = {
          id: `history-refined-${Date.now()}`,
          timestamp: Date.now(),
          inputs: { ...formData, travelRequirements: refinementText },
          roteiro: refinedText,
          userIdentifier: currentUsername || 'unknown_user',
          isOfficialTemplate: false,
          templateTitle: formData.destination,
          isFavorite: false,
        };
        setGlobalHistory(prev => [newHistoryItem, ...prev.filter(item => item.id !== newHistoryItem.id)]);
        setActiveHistoryId(newHistoryItem.id);
      }
      
    } catch (err: any) {
      console.error("Error refining itinerary:", err);
      setError(err.message || "Ocorreu um erro ao refinar o roteiro.");
    } finally {
      setIsRefining(false);
      setIsRefinementPanelOpen(false); 
    }
  };


  const handleSelectHistoryItem = (id: string) => {
    const selectedItem = globalHistory.find(item => item.id === id);
    if (selectedItem) {
      setFormData(selectedItem.inputs);
      setItinerary(selectedItem.roteiro);
      setActiveHistoryId(id);
      setIsRefinementPanelOpen(false);
      setError(null);
      setQuickTripError(null); // Clear quick trip error when loading history
      setQuickTripSuggestions(''); // Clear quick trip suggestions

      setIsLoadingImage(true);
      const mainDestinationForImage = selectedItem.inputs.isMultiDestination ? selectedItem.inputs.destinations[0]?.name || selectedItem.inputs.destination : selectedItem.inputs.destination;
      generateDestinationImage(mainDestinationForImage)
        .then(setDestinationImage)
        .catch(err => {
            console.error("Error regenerating image for history item:", err);
            setDestinationImage(null); 
        })
        .finally(() => setIsLoadingImage(false));
    }
  };
  
  const handleDeleteHistoryItem = (id: string) => {
    setGlobalHistory(prev => prev.filter(item => item.id !== id));
    if (activeHistoryId === id) {
      setFormData(DEFAULT_FORM_DATA);
      setItinerary('');
      setDestinationImage(null);
      setActiveHistoryId(null);
      setIsRefinementPanelOpen(false);
    }
  };

  const handleClearUserHistory = () => {
    if (currentUsername) {
        setGlobalHistory(prev => prev.filter(item => item.userIdentifier !== currentUsername));
    }
    if (userHistory.some(item => item.id === activeHistoryId)) {
      setFormData(DEFAULT_FORM_DATA);
      setItinerary('');
      setDestinationImage(null);
      setActiveHistoryId(null);
      setIsRefinementPanelOpen(false);
    }
  };

  const handleClearAllHistoryForAdmin = () => {
    setGlobalHistory([]);
    setFormData(DEFAULT_FORM_DATA);
    setItinerary('');
    setDestinationImage(null);
    setActiveHistoryId(null);
    setIsRefinementPanelOpen(false);
  };

  const handleToggleOfficialTemplate = (id: string) => {
    setGlobalHistory(prev => prev.map(item =>
      item.id === id
        ? { ...item, isOfficialTemplate: !item.isOfficialTemplate, templateTitle: item.isOfficialTemplate ? item.inputs.destination : (item.templateTitle || item.inputs.destination) } 
        : item
    ));
  };

  const handleToggleFavorite = (id: string) => {
    setGlobalHistory(prev => prev.map(item =>
      item.id === id && item.userIdentifier === currentUsername
        ? { ...item, isFavorite: !item.isFavorite }
        : item
    ));
  };


  const handleLoadTemplate = (templateId: string) => {
    const template = officialTemplates.find(t => t.id === templateId);
    if (template) {
      setFormData(template.inputs);
      setItinerary(''); 
      setDestinationImage(null); 
      setActiveHistoryId(null); 
      setIsRefinementPanelOpen(false);
      setError(null);
      setQuickTripError(null);
      setQuickTripSuggestions('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Quick Trip Handlers
  const handleQuickTripFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuickTripFormData(prev => ({
      ...prev,
      [name]: name === 'availableTime' ? (parseInt(value, 10) || 0) : value,
    }));
  }, []);

  const handleQuickTripSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!process.env.API_KEY) {
      setQuickTripError("Chave de API (API_KEY) não configurada.");
      return;
    }
    if (!quickTripFormData.currentLocation.trim()) {
      setQuickTripError("Por favor, informe sua localização atual.");
      return;
    }
    if (quickTripFormData.availableTime <= 0) {
      setQuickTripError("O tempo disponível deve ser de pelo menos 1 hora.");
      return;
    }

    setIsLoadingQuickTrip(true);
    setQuickTripError(null);
    setQuickTripSuggestions('');

    try {
      const response = await generateQuickTrip(quickTripFormData);
      setQuickTripSuggestions(response.text);
    } catch (err: any) {
      console.error("Error generating quick trip:", err);
      setQuickTripError(err.message || "Ocorreu um erro ao gerar as sugestões para o passeio rápido.");
    } finally {
      setIsLoadingQuickTrip(false);
    }
  };

  const clearQuickTripSuggestions = () => {
    setQuickTripSuggestions('');
    setQuickTripFormData(DEFAULT_QUICK_TRIP_FORM_DATA);
    setQuickTripError(null);
  };


  const preparePdfExport = async () => {
    setIsPreparingPdfExport(true);
    return new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleExportPdf = async () => {
    if (!itinerary) {
        setError("Não há roteiro para exportar.");
        return;
    }
    setIsExportingPdf(true); 
    await preparePdfExport(); 

    const itineraryRenderOutput = document.getElementById('itinerary-render-output');
    const destinationImageWrapper = document.getElementById('destination-image-wrapper');

    if (!itineraryRenderOutput) {
        setError("Erro ao encontrar o conteúdo do roteiro para exportação.");
        setIsExportingPdf(false);
        setIsPreparingPdfExport(false);
        return;
    }

    try {
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pageHeight = pdf.internal.pageSize.getHeight() - 80; 
        const pageWidth = pdf.internal.pageSize.getWidth() - 80; 
        let currentY = 40; 

        const title = formData.destination || "Roteiro de Viagem";
        pdf.setFontSize(22);
        pdf.setTextColor(40, 40, 40); 
        const titleLines = pdf.splitTextToSize(title, pageWidth);
        pdf.text(titleLines, 40, currentY);
        currentY += (titleLines.length * 22) + 20;

        if (destinationImageWrapper && destinationImageWrapper.querySelector('img')) {
            const imageCanvas = await html2canvas(destinationImageWrapper, { 
                scale: 2, 
                useCORS: true,
                backgroundColor: '#ffffff', 
                logging: false, 
            });
            const imgData = imageCanvas.toDataURL('image/jpeg', 0.9);
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pageWidth) / imgProps.width;
            
            if (currentY + imgHeight > pageHeight && currentY > 40) { 
                pdf.addPage();
                currentY = 40;
            }
            pdf.addImage(imgData, 'JPEG', 40, currentY, pageWidth, imgHeight);
            currentY += imgHeight + 20;
        }

        const sections = itineraryRenderOutput.querySelectorAll('.day-section-wrapper, .weather-section-wrapper, .language-section-wrapper, .documents-section-wrapper, .packing-checklist-wrapper, .requirements-section-wrapper');

        for (let i = 0; i < sections.length; i++) {
            const sectionElement = sections[i] as HTMLElement;
            
            const originalBg = sectionElement.style.backgroundColor;
            sectionElement.style.backgroundColor = getComputedStyle(sectionElement).backgroundColor === 'rgba(0, 0, 0, 0)' ? '#ffffff' : getComputedStyle(sectionElement).backgroundColor;

            const canvas = await html2canvas(sectionElement, {
                scale: 2, 
                useCORS: true,
                windowWidth: sectionElement.scrollWidth, 
                windowHeight: sectionElement.scrollHeight, 
                backgroundColor: null, 
                logging: false,
            });
            
            sectionElement.style.backgroundColor = originalBg; 

            const imgData = canvas.toDataURL('image/png', 0.95); 
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

            if (currentY + imgHeight > pageHeight && currentY > 40) {
                pdf.addPage();
                currentY = 40;
            }
            pdf.addImage(imgData, 'PNG', 40, currentY, pageWidth, imgHeight);
            currentY += imgHeight + 10; 
        }

        pdf.save(`Roteiro_${(formData.destination || "Viagem").replace(/\s+/g, '_')}.pdf`);

    } catch (exportError: any) {
        console.error("Erro ao exportar PDF:", exportError);
        setError(`Erro ao exportar PDF: ${exportError.message || 'Erro desconhecido.'}`);
    } finally {
        setIsExportingPdf(false);
        setIsPreparingPdfExport(false);
    }
  };

  const generateHtmlContent = () => {
    let html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Roteiro: ${formData.destination || 'Viagem'}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f7f9; color: #333; }
    .container { max-width: 800px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1, h2, h3 { color: #2c3e50; }
    h1 { text-align: center; margin-bottom: 20px; color: #007bff; }
    h2 { border-bottom: 2px solid #007bff; padding-bottom: 5px; margin-top: 30px; }
    h3 { margin-top: 20px; color: #16a085; }
    ul, ol { padding-left: 20px; }
    li { margin-bottom: 8px; }
    a { color: #007bff; text-decoration: none; }
    a:hover { text-decoration: underline; }
    strong { color: #34495e; }
    .destination-image { max-width: 100%; height: auto; border-radius: 6px; margin-bottom: 20px; box-shadow: 0 1px 5px rgba(0,0,0,0.1); }
    .icon { display: inline-block; width: 1.2em; height: 1.2em; margin-right: 0.3em; vertical-align: middle; }
    .html-export-icon { width: 1em; height: 1em; vertical-align: -0.125em; margin-right: 0.25em; display: inline-block; }
    .day-section-wrapper, .weather-section-wrapper, .language-section-wrapper, .documents-section-wrapper, .packing-checklist-wrapper, .requirements-section-wrapper {
      background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 20px; padding: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .weather-section-wrapper h2 { color: #8e44ad; border-color: #8e44ad; } 
    .language-section-wrapper h2 { color: #16a085; border-color: #16a085; } 
    .documents-section-wrapper h2 { color: #2980b9; border-color: #2980b9; } 
    .packing-checklist-wrapper h2 { color: #f39c12; border-color: #f39c12; } 
    .requirements-section-wrapper h2 { color: #c0392b; border-color: #c0392b; } 
    .packing-checklist-content ul { list-style-type: none; padding-left: 0; }
    .packing-checklist-content li { display: flex; align-items: center; padding: 8px; border-bottom: 1px solid #eee; }
    .packing-checklist-content li:last-child { border-bottom: none; }
    .packing-checklist-content .packed-item { text-decoration: line-through; color: #7f8c8d; }
    .packing-checklist-content .checkbox-icon { margin-right: 10px; width: 20px; height: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Roteiro para ${formData.destination || 'Viagem'}</h1>
`;

    if (destinationImage) {
        html += `<img src="${destinationImage}" alt="Imagem de ${formData.destination || 'Viagem'}" class="destination-image">\n`;
    }

    const tempDiv = document.createElement('div');
    const root = ReactDOM.createRoot(tempDiv);
    root.render(React.createElement(ItineraryDisplay, { markdownContent: itinerary, isPreparingPdfExport: true }));
    
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const renderedOutput = document.getElementById('itinerary-render-output');
        if (renderedOutput) {
            let sectionsHtml = "";
            const sectionWrappers = renderedOutput.children;
            for (let i = 0; i < sectionWrappers.length; i++) {
                const wrapper = sectionWrappers[i] as HTMLElement;
                const wrapperClasses = wrapper.className;
                sectionsHtml += `<div class="${wrapperClasses}">`;

                const titleButton = wrapper.querySelector('button > h2');
                if (titleButton) {
                    sectionsHtml += `<h2>${titleButton.innerHTML}</h2>`;
                }

                const articleElement = wrapper.querySelector('article.prose');
                if (articleElement) {
                    let articleHtml = articleElement.innerHTML;
                    Object.entries(iconSvgMap).forEach(([key, svgString]) => {
                        const regex = new RegExp(`\\[ICON:${key.toUpperCase()}\\]`, "g");
                        const safeSvgString = svgString.replace(/"/g, "'");
                        articleHtml = articleHtml.replace(regex, `<span class="html-export-icon">${safeSvgString}</span>`);
                    });
                    sectionsHtml += articleHtml;
                }
                 sectionsHtml += `</div>`;
            }
             html += sectionsHtml;

        } else {
            const tempReactMarkdownDiv = document.createElement('div');
            ReactDOM.createRoot(tempReactMarkdownDiv).render(
                React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, itinerary)
            );
             setTimeout(()=> { 
                html += tempReactMarkdownDiv.innerHTML;
             }, 100)
        }
        
        html += `
  </div>
</body>
</html>`;
        resolve(html);
      }, 500); 
    });
  };

  const handleExportHtml = async () => {
    if (!itinerary) {
      setError("Não há roteiro para exportar.");
      return;
    }
    setIsExportingHtml(true);
    setError(null);

    try {
      const htmlContent = await generateHtmlContent();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Roteiro_${(formData.destination || "Viagem").replace(/\s+/g, '_')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (exportError: any) {
      console.error("Erro ao exportar HTML:", exportError);
      setError(`Erro ao exportar HTML: ${exportError.message || 'Erro desconhecido.'}`);
    } finally {
      setIsExportingHtml(false);
    }
  };


  const commonPageProps = {
    formData,
    itinerary,
    destinationImage,
    isLoading: isLoading || isGeneratingInitialTemplate, 
    isRefining,
    isExportingPdf,
    isPreparingPdfExport,
    isExportingHtml,
    error,
    activeHistoryId,
    isRefinementPanelOpen,
    refinementText,
    setRefinementText,
    handleFormChange,
    onAddDestination: handleAddDestination, 
    onRemoveDestination: handleRemoveDestination, 
    onIsMultiDestinationChange: handleIsMultiDestinationChange, 
    handleSubmit,
    handleSelectHistoryItem,
    handleOpenRefinementPanel,
    handleSubmitRefinement,
    handleExportPdf,
    handleExportHtml,
    handleLogout,
    officialTemplates, 
    onLoadTemplate: handleLoadTemplate,
    onToggleFavorite: handleToggleFavorite,
  };

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} error={error || quickTripError} setError={(e) => {setError(e); setQuickTripError(e);}} />;
  }

  if (currentView === 'user' && currentUsername) {
    return (
      <UserPage
        {...commonPageProps}
        history={userHistory}
        onDeleteHistoryItem={handleDeleteHistoryItem} 
        onClearHistory={handleClearUserHistory} 
        currentUsername={currentUsername}
        // Quick Trip Props
        quickTripFormData={quickTripFormData}
        quickTripSuggestions={quickTripSuggestions}
        isLoadingQuickTrip={isLoadingQuickTrip}
        quickTripError={quickTripError}
        handleQuickTripFormChange={handleQuickTripFormChange}
        handleQuickTripSubmit={handleQuickTripSubmit}
        clearQuickTripSuggestions={clearQuickTripSuggestions}
      />
    );
  }

  if (currentView === 'admin' && currentUsername) {
    return (
      <AdminLayout onLogout={handleLogout} currentUsername={currentUsername}>
        {(activeAdminPage) => {
          if (activeAdminPage === 'generate') {
            return (
              <UserPage 
                {...commonPageProps}
                history={globalHistory.filter(item => item.userIdentifier === currentUsername)} 
                onDeleteHistoryItem={handleDeleteHistoryItem}
                onClearHistory={() => setGlobalHistory(prev => prev.filter(item => item.userIdentifier !== currentUsername))} 
                currentUsername={currentUsername}
                 // Quick Trip Props for Admin's own generation
                quickTripFormData={quickTripFormData}
                quickTripSuggestions={quickTripSuggestions}
                isLoadingQuickTrip={isLoadingQuickTrip}
                quickTripError={quickTripError}
                handleQuickTripFormChange={handleQuickTripFormChange}
                handleQuickTripSubmit={handleQuickTripSubmit}
                clearQuickTripSuggestions={clearQuickTripSuggestions}
              />
            );
          }
          if (activeAdminPage === 'all-itineraries') {
            return (
              <div className="p-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Todos os Roteiros Gerados no Sistema</h2>
                 {(isLoading || isGeneratingInitialTemplate) && <div className="mb-4"><LoadingSpinner /></div>}
                {globalHistory.length === 0 && !isLoading && !isGeneratingInitialTemplate ? (
                   <p className="text-slate-600 dark:text-slate-300">Nenhum roteiro foi gerado por usuários ainda.</p>
                ) : (
                  <HistoryPanel
                    history={globalHistory} 
                    onSelectHistoryItem={(id) => {
                        handleSelectHistoryItem(id);
                    }}
                    onDeleteHistoryItem={handleDeleteHistoryItem} 
                    onClearHistory={handleClearAllHistoryForAdmin} 
                    activeHistoryId={activeHistoryId}
                    isAdminView={true}
                    onToggleOfficialTemplate={handleToggleOfficialTemplate} 
                  />
                )}
                 {itinerary && activeHistoryId && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">
                            Visualizando Roteiro ID: {activeHistoryId} (Gerado por: {globalHistory.find(h => h.id === activeHistoryId)?.userIdentifier || 'N/A'})
                        </h3>
                         {destinationImage && (
                            <div className="my-4 rounded-lg shadow-md overflow-hidden max-w-xl mx-auto" id="destination-image-wrapper-admin-view">
                                <img src={destinationImage} alt={`Imagem para roteiro ${activeHistoryId}`} className="w-full h-auto object-cover"/>
                            </div>
                        )}
                        <ItineraryDisplay markdownContent={itinerary} isPreparingPdfExport={isPreparingPdfExport} />
                    </div>
                )}
              </div>
            );
          }
          return null;
        }}
      </AdminLayout>
    );
  }

  return <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900"><LoadingSpinner /></div>;
};

export default App;