
import React from 'react';
import DaySection from './DaySection'; 
import PackingChecklist from './PackingChecklist';
import { IconLanguage, IconPassport } from './icons'; 

interface ItineraryDisplayProps {
  markdownContent: string;
  isPreparingPdfExport?: boolean;
}

type SectionType = 'weather' | 'day' | 'info' | 'language' | 'packing' | 'documents' | 'requirements';

interface Section {
  title: string;
  content: string;
  type: SectionType;
}

const splitMarkdownIntoSections = (markdown: string): Section[] => {
  if (!markdown) return [];
  // Regex atualizada para incluir os novos tipos de seção e marcadores de ícone nos títulos
  const sectionChunks = markdown.split(
    /(?=^## (?:\[ICON:[A-Z_]+\]\s*)?(?:Dia \d+:.*|Informações.*|Clima.*|Tempo.*|Custos.*|Orçamento.*|Chegada em.*|Seguindo para.*|Visão Geral.*|Dicas de Idioma.*|Frases Úteis.*|Lista de Bagagem.*|O Que Levar.*|Checklist.*|Documentos Necessários.*|Vistos.*|Requisitos Especiais.*)\n)/gim
  ).filter(chunk => chunk.trim() !== '');
  
  return sectionChunks.map(chunk => {
    const titleMatch = chunk.match(/^## (.*?)\n/i);
    const title = titleMatch ? `## ${titleMatch[1]}` : "Seção"; 
    let type: SectionType = 'info'; // Default
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("dia ")) {
      type = 'day';
    } else if (lowerTitle.includes("climáticas") || lowerTitle.includes("clima") || lowerTitle.includes("tempo")) {
      type = 'weather';
    } else if (lowerTitle.includes("idioma") || lowerTitle.includes("frases úteis")) {
      type = 'language';
    } else if (lowerTitle.includes("bagagem") || lowerTitle.includes("mala") || lowerTitle.includes("checklist") || lowerTitle.includes("o que levar")) {
      type = 'packing';
    } else if (lowerTitle.includes("documentos necessários") || lowerTitle.includes("vistos")) {
      type = 'documents';
    } else if (lowerTitle.includes("requisitos especiais")) {
      type = 'requirements';
    }
    // 'info' cobre outras seções gerais como "Estimativa de Custos", "Informações Gerais", etc.
    
    return { title, content: chunk, type };
  });
};


const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ markdownContent, isPreparingPdfExport }) => {
  if (!markdownContent) {
    return null;
  }

  const sections = splitMarkdownIntoSections(markdownContent);

  return (
    <div id="itinerary-render-output"> 
      {sections.map((section, index) => {
        const uniqueKey = `${section.type}-${index}-${section.title.substring(0,15).replace(/\s+/g, '-')}`;
        
        if (section.type === 'packing') {
          return (
            <PackingChecklist 
              key={uniqueKey} 
              initialMarkdown={section.content} 
              title={section.title}
              isPreparingPdfExport={isPreparingPdfExport} 
            />
          );
        } else if (section.type === 'language' || section.type === 'documents' || section.type === 'requirements') {
          return (
            <DaySection
              key={uniqueKey}
              dayTitle={section.title} 
              dayContent={section.content}
              initiallyOpen={true}
              isWeatherSection={true} // Reutiliza o estilo roxo para destaque (ou criar um novo estilo se necessário)
              isPreparingPdfExport={isPreparingPdfExport}
            />
          );
        }
        
        // Seções de Dia, Clima e Informações Gerais continuam usando DaySection
        return (
          <DaySection 
            key={uniqueKey} 
            dayTitle={section.title} 
            dayContent={section.content}
            initiallyOpen={index === 0 || section.type === 'weather' || (section.type === 'info' && index < 2) } 
            isWeatherSection={section.type === 'weather' || (section.type === 'info' && (section.title.toLowerCase().includes("clima") || section.title.toLowerCase().includes("custos") || section.title.toLowerCase().includes("orçamento")))}
            isPreparingPdfExport={isPreparingPdfExport}
          />
        );
      })}
    </div>
  );
};

export default ItineraryDisplay;