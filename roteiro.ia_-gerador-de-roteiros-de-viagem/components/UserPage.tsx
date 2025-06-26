
import React, { useState, useCallback } from 'react';
import { ItineraryFormData, ItineraryHistoryItem, QuickTripFormData } from '../types';
import { DEFAULT_FORM_DATA, DEFAULT_QUICK_TRIP_FORM_DATA } from '../constants';
import ItineraryForm from './ItineraryForm';
import ItineraryDisplay from './ItineraryDisplay';
import LoadingSpinner from './LoadingSpinner';
import HistoryPanel from './HistoryPanel';
import TemplateSelection from './TemplateSelection';
import QuickTripForm from './QuickTripForm';
import QuickTripDisplay from './QuickTripDisplay';
import { IconWandSparkles, IconBolt } from './icons'; 

type UserPageActiveTab = 'fullItinerary' | 'quickTrip';

interface UserPageProps {
  formData: ItineraryFormData;
  itinerary: string;
  destinationImage: string | null;
  isLoading: boolean;
  isExportingPdf: boolean;
  isPreparingPdfExport: boolean;
  isExportingHtml: boolean;
  error: string | null;
  history: ItineraryHistoryItem[];
  activeHistoryId: string | null;
  isRefinementPanelOpen: boolean;
  refinementText: string;
  isRefining: boolean;
  setRefinementText: (text: string) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index?: number, field?: keyof ItineraryFormData['destinations'][0]) => void;
  onAddDestination: () => void;
  onRemoveDestination: (index: number) => void;
  onIsMultiDestinationChange: (isMulti: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSelectHistoryItem: (id: string) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  handleOpenRefinementPanel: () => void;
  handleSubmitRefinement: (e: React.FormEvent<HTMLFormElement>) => void;
  handleExportPdf: () => void;
  handleExportHtml: () => void;
  handleLogout: () => void;
  currentUsername: string;
  officialTemplates: ItineraryHistoryItem[];
  onLoadTemplate: (templateId: string) => void;
  onToggleFavorite: (templateId: string) => void;

  // Props for Quick Trip
  quickTripFormData: QuickTripFormData;
  quickTripSuggestions: string;
  isLoadingQuickTrip: boolean;
  quickTripError: string | null;
  handleQuickTripFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleQuickTripSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  clearQuickTripSuggestions: () => void;
}

const UserPage: React.FC<UserPageProps> = (props) => {
  const {
    formData, itinerary, destinationImage, isLoading, isExportingPdf, isPreparingPdfExport, isExportingHtml, error,
    history, activeHistoryId, isRefinementPanelOpen, refinementText, isRefining, setRefinementText,
    handleFormChange, onAddDestination, onRemoveDestination, onIsMultiDestinationChange, handleSubmit,
    handleSelectHistoryItem, onDeleteHistoryItem, onClearHistory,
    handleOpenRefinementPanel, handleSubmitRefinement, handleExportPdf, handleExportHtml, handleLogout,
    currentUsername, officialTemplates, onLoadTemplate, onToggleFavorite,
    quickTripFormData, quickTripSuggestions, isLoadingQuickTrip, quickTripError,
    handleQuickTripFormChange, handleQuickTripSubmit, clearQuickTripSuggestions
  } = props;

  const [activeTab, setActiveTab] = useState<UserPageActiveTab>('fullItinerary');

  const TabButton: React.FC<{
    tabId: UserPageActiveTab;
    currentTab: UserPageActiveTab;
    onClick: (tabId: UserPageActiveTab) => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
  }> = ({ tabId, currentTab, onClick, children, icon }) => (
    <button
      role="tab"
      aria-selected={currentTab === tabId}
      aria-controls={`tab-panel-${tabId}`}
      id={`tab-${tabId}`}
      onClick={() => onClick(tabId)}
      className={`flex items-center justify-center px-4 sm:px-6 py-3 text-sm sm:text-base font-medium rounded-t-lg transition-all duration-200 ease-in-out border-b-2
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
                  ${currentTab === tabId
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 shadow-sm'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
    >
      {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
      {children}
    </button>
  );


  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
              Roteiro.IA <span role="img" aria-label="airplane">✈️</span>
            </h1>
            <div className="flex items-center">
                <span className="text-sm text-slate-600 dark:text-slate-300 mr-4">Olá, {currentUsername}!</span>
                <button
                    onClick={handleLogout}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                    Sair
                </button>
            </div>
          </div>
           <p className="mt-2 text-lg text-slate-600 dark:text-slate-300 text-center">
            Seu assistente de viagens pessoal para criar roteiros incríveis e detalhados!
          </p>
        </header>

        <div role="tablist" aria-label="Funcionalidades do Roteiro.IA" className="mb-6 flex space-x-1 sm:space-x-2 border-b border-slate-200 dark:border-slate-700">
          <TabButton tabId="fullItinerary" currentTab={activeTab} onClick={setActiveTab} icon={<IconWandSparkles />}>
            Roteiro Completo
          </TabButton>
          <TabButton tabId="quickTrip" currentTab={activeTab} onClick={setActiveTab} icon={<IconBolt />}>
            Passeio Express
          </TabButton>
        </div>

        <main className="space-y-8">
          {activeTab === 'fullItinerary' && (
            <div role="tabpanel" id="tab-panel-fullItinerary" aria-labelledby="tab-fullItinerary">
              {officialTemplates.length > 0 && (
                <TemplateSelection
                  templates={officialTemplates}
                  onLoadTemplate={onLoadTemplate}
                />
              )}
              <ItineraryForm
                formData={formData}
                onFormChange={handleFormChange}
                onAddDestination={onAddDestination}
                onRemoveDestination={onRemoveDestination}
                onIsMultiDestinationChange={onIsMultiDestinationChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
              {error && (
                <div className="mt-6 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-200 p-4 rounded-md shadow" role="alert">
                  <p className="font-bold">Erro na Aplicação!</p>
                  <p>{error}</p>
                </div>
              )}
              {isLoading && <LoadingSpinner />}
              {!isLoading && destinationImage && (
                <div className="my-6 rounded-xl shadow-lg overflow-hidden" id="destination-image-wrapper">
                  <img src={destinationImage} alt={`Imagem de ${formData.destination || 'viagem'}`} className="w-full h-auto object-cover max-h-96" />
                </div>
              )}
              {!isLoading && itinerary && (
                <div className="my-6">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                     <button
                        onClick={handleExportPdf}
                        disabled={isExportingPdf || isExportingHtml || isPreparingPdfExport}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center justify-center"
                        >
                        {isExportingPdf || isPreparingPdfExport ? (
                            <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Exportando PDF...</>
                        ) : (
                            <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3.382a1 1 0 01-.943-.668L10 14.62l-1.675 2.712a1 1 0 01-.943.668H4a1 1 0 110-2V4zm10-1.5a.5.5 0 00-.5-.5H6.5a.5.5 0 00-.5.5v.5h8v-.5z" clipRule="evenodd" /></svg>Exportar PDF</>
                        )}
                        </button>
                        <button
                        onClick={handleExportHtml}
                        disabled={isExportingHtml || isExportingPdf || isPreparingPdfExport}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center justify-center"
                        >
                        {isExportingHtml ? (
                            <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Exportando HTML...</>
                        ) : (
                            <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.707 4.293a1 1 0 010 1.414L5.414 7H11a1 1 0 110 2H5.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm6.586 11.414a1 1 0 010-1.414L14.586 13H9a1 1 0 110-2h5.586l-1.293-1.293a1 1 0 011.414-1.414l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>Exportar HTML</>
                        )}
                        </button>
                        <button
                        onClick={handleOpenRefinementPanel}
                        disabled={isLoading || isRefining || !itinerary}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center justify-center"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Refinar Roteiro com IA
                        </button>
                  </div>
                   {isRefinementPanelOpen && (
                    <form onSubmit={handleSubmitRefinement} className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-4">
                      <div>
                        <label htmlFor="refinementText" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Instruções Adicionais para Refinamento:
                        </label>
                        <textarea
                          id="refinementText"
                          name="refinementText"
                          rows={4}
                          value={refinementText}
                          onChange={(e) => setRefinementText(e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-slate-700 dark:text-slate-50"
                          placeholder="Ex: Adicionar um dia extra em Roma para visitar o Vaticano. Remover o foco em vida noturna e adicionar mais atividades culturais. Quero opções de restaurantes vegetarianos."
                        />
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          A IA tentará modificar o roteiro acima com base nas suas instruções, mantendo o que for possível do original.
                        </p>
                      </div>
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setRefinementText('')} 
                          disabled={isRefining}
                          className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-md shadow-sm  disabled:opacity-50"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          disabled={isRefining || !refinementText.trim()}
                          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isRefining ? 'Refinando...' : 'Submeter Refinamento'}
                        </button>
                      </div>
                    </form>
                  )}
                  <ItineraryDisplay markdownContent={itinerary} isPreparingPdfExport={isPreparingPdfExport} />
                </div>
              )}
               {!isLoading && !itinerary && !error && (
                <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg text-center py-10 text-slate-500 dark:text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <p className="mt-2 text-lg">Seu roteiro mágico, organizado por dias e com imagem do destino, aparecerá aqui.</p>
                  <p className="text-sm">Preencha o formulário e deixe a IA criar sua aventura com avaliações do Google, endereços, sugestões de transporte e muito mais!</p>
                </div>
              )}
              <HistoryPanel
                history={history}
                onSelectHistoryItem={handleSelectHistoryItem}
                onDeleteHistoryItem={onDeleteHistoryItem}
                onClearHistory={onClearHistory} 
                activeHistoryId={activeHistoryId}
                isAdminView={false}
                onToggleFavorite={onToggleFavorite}
                currentUsername={currentUsername}
              />
            </div>
          )}

          {activeTab === 'quickTrip' && (
            <div role="tabpanel" id="tab-panel-quickTrip" aria-labelledby="tab-quickTrip">
              <QuickTripForm
                formData={quickTripFormData}
                onFormChange={handleQuickTripFormChange}
                onSubmit={handleQuickTripSubmit}
                isLoading={isLoadingQuickTrip}
              />
              {quickTripError && (
                 <div className="mt-6 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-200 p-4 rounded-md shadow" role="alert">
                  <p className="font-bold">Erro no Passeio Express!</p>
                  <p>{quickTripError}</p>
                </div>
              )}
              {isLoadingQuickTrip && <LoadingSpinner />}
              {!isLoadingQuickTrip && quickTripSuggestions && (
                <QuickTripDisplay
                  suggestionsMarkdown={quickTripSuggestions}
                  originalInputs={quickTripFormData}
                  onClear={clearQuickTripSuggestions}
                />
              )}
              {!isLoadingQuickTrip && !quickTripSuggestions && !quickTripError && (
                 <div className="mt-6 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg text-center py-10 text-slate-500 dark:text-slate-400">
                  <IconBolt className="mx-auto h-12 w-12 opacity-50 text-yellow-500" />
                  <p className="mt-2 text-lg">Pronto para uma aventura rápida?</p>
                  <p className="text-sm">Informe quanto tempo você tem e onde está, e a IA buscará as melhores sugestões instantaneamente!</p>
                </div>
              )}
            </div>
          )}
        </main>

        <footer className="text-center mt-12 py-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Criado com <span role="img" aria-label="heart">❤️</span> e Inteligência Artificial do Google.
          </p>
           <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Imagens geradas por IA (Imagen 3). Qualidade da imagem e informações do roteiro (incluindo coordenadas) podem variar. Verifique sempre informações críticas.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UserPage;
