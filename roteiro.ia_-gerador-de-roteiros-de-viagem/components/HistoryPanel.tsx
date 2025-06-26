
import React, { useState } from 'react';
import { ItineraryHistoryItem } from '../types';
import HistoryItem from './HistoryItem';
import { IconStar, IconStarOutline } from './icons';

interface HistoryPanelProps {
  history: ItineraryHistoryItem[];
  onSelectHistoryItem: (id: string) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void; 
  activeHistoryId?: string | null;
  isAdminView?: boolean; 
  onToggleOfficialTemplate?: (id: string) => void; 
  onToggleFavorite?: (id: string) => void; // Para favoritar itens pelo usuário
  currentUsername?: string; // Necessário para filtrar favoritos do usuário
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  onSelectHistoryItem, 
  onDeleteHistoryItem, 
  onClearHistory, 
  activeHistoryId,
  isAdminView = false,
  onToggleOfficialTemplate,
  onToggleFavorite,
  currentUsername
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  if (!history || history.length === 0) {
    return (
      <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
          {isAdminView ? "Todos os Roteiros Gerados" : "Histórico de Roteiros"}
        </h3>
        <p className="text-slate-500 dark:text-slate-400">
          {isAdminView ? "Nenhum roteiro gerado no sistema ainda." : "Nenhum roteiro salvo ainda."}
        </p>
      </div>
    );
  }

  let displayedHistory = history;
  if (!isAdminView && showOnlyFavorites && currentUsername) {
    displayedHistory = history.filter(item => item.isFavorite && item.userIdentifier === currentUsername);
  }


  return (
    <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
          {isAdminView ? "Todos os Roteiros Gerados" : "Seu Histórico de Roteiros"} ({displayedHistory.length})
        </h3>
        <div className="flex items-center space-x-2">
          {!isAdminView && history.some(item => item.isFavorite && item.userIdentifier === currentUsername) && (
             <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`text-sm font-medium py-1 px-3 rounded-md flex items-center transition-colors
                          ${showOnlyFavorites 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900' 
                            : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'}`}
              title={showOnlyFavorites ? "Mostrar Todos" : "Mostrar Apenas Favoritos"}
            >
              {showOnlyFavorites ? <IconStarOutline className="h-4 w-4 mr-1.5" /> : <IconStar className="h-4 w-4 mr-1.5" />}
              {showOnlyFavorites ? "Todos" : "Favoritos"}
            </button>
          )}
          <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1"
              aria-label={isOpen ? "Fechar painel" : "Abrir painel"}
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
              )}
            </button>
            {history.length > 0 && isOpen && (
              <button
                onClick={onClearHistory}
                className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium py-1 px-2 rounded hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
              >
                {isAdminView ? "Limpar TODO o Histórico" : "Limpar Meu Histórico"}
              </button>
            )}
        </div>
      </div>
      {isOpen && (
         <>
          {displayedHistory.length === 0 && showOnlyFavorites && !isAdminView && (
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Você ainda não marcou nenhum roteiro como favorito.</p>
          )}
          <ul className="max-h-96 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {displayedHistory.slice().reverse().map(item => ( 
              <HistoryItem
                key={item.id}
                item={item}
                onSelect={onSelectHistoryItem}
                onDelete={onDeleteHistoryItem}
                isActive={item.id === activeHistoryId}
                showUserIdentifier={isAdminView} 
                isAdminView={isAdminView}
                onToggleOfficialTemplate={isAdminView ? onToggleOfficialTemplate : undefined}
                onToggleFavorite={!isAdminView && currentUsername === item.userIdentifier ? onToggleFavorite : undefined}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default HistoryPanel;