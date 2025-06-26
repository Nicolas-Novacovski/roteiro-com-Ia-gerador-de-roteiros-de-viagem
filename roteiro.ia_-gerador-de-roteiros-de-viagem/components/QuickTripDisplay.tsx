
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { QuickTripFormData } from '../types';
import DaySection from './DaySection'; // Re-using DaySection for consistent Markdown rendering and icon handling
import { IconClock, IconCurrentLocation, IconWandSparkles } from './icons';

interface QuickTripDisplayProps {
  suggestionsMarkdown: string;
  originalInputs: QuickTripFormData;
  onClear: () => void;
}

const QuickTripDisplay: React.FC<QuickTripDisplayProps> = ({ suggestionsMarkdown, originalInputs, onClear }) => {
  if (!suggestionsMarkdown) {
    return null;
  }
  
  // O prompt do QuickTrip agora instrui a IA a incluir o foco no título principal.
  // Ex: ## Sugestões para seu Passeio Express em Local (${availableTime}h - Foco: SeuFoco)
  // DaySection já lida com a extração de títulos "## Título".

  return (
    <div className="my-6 bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">Seus Parâmetros:</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center"><IconCurrentLocation className="h-3.5 w-3.5 mr-1 text-slate-400 dark:text-slate-500" /> {originalInputs.currentLocation}</span>
          <span className="flex items-center"><IconClock className="h-3.5 w-3.5 mr-1 text-slate-400 dark:text-slate-500" /> {originalInputs.availableTime} hora(s)</span>
          <span className="flex items-center"><IconWandSparkles className="h-3.5 w-3.5 mr-1 text-purple-400 dark:text-purple-500" /> Foco: {originalInputs.focus}</span>
        </div>
      </div>

       <DaySection
        // O título principal virá do Markdown gerado pela IA
        dayTitle="Sugestões para seu Passeio Express" // Fallback se o Markdown não tiver título ##
        dayContent={suggestionsMarkdown}
        initiallyOpen={true}
        isWeatherSection={false} // Mantém o estilo padrão de DaySection
      />
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClear}
          className="text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium py-2 px-4 rounded-md transition-colors"
        >
          Limpar Sugestões
        </button>
      </div>
    </div>
  );
};

export default QuickTripDisplay;