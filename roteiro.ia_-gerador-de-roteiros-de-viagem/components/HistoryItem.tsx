
import React from 'react';
import { ItineraryHistoryItem, SeasonOption, BudgetOption, DestinationDetail } from '../types';
import { IconStar, IconStarOutline } from './icons'; // Assuming you'll add these

interface HistoryItemProps {
  item: ItineraryHistoryItem;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isActive: boolean;
  showUserIdentifier?: boolean;
  isAdminView?: boolean; // To show admin-specific controls
  onToggleOfficialTemplate?: (id: string) => void; // For admin to mark as template
  onToggleFavorite?: (id: string) => void; // For user to mark as favorite
}

const HistoryItem: React.FC<HistoryItemProps> = ({ 
    item, 
    onSelect, 
    onDelete, 
    isActive, 
    showUserIdentifier = false,
    isAdminView = false,
    onToggleOfficialTemplate,
    onToggleFavorite
}) => {
  const formattedDate = new Date(item.timestamp).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getSeasonDisplayName = (seasonValue?: SeasonOption): string | null => {
    if (!seasonValue || seasonValue === SeasonOption.QUALQUER) return null;
    const match = seasonValue.match(/^([a-zA-ZÀ-ú\s]+)/);
    return match ? match[1].trim() : seasonValue;
  };

  const getBudgetDisplayName = (budgetValue?: BudgetOption): string | null => {
    if (!budgetValue || budgetValue === BudgetOption.QUALQUER) return null;
    return budgetValue;
  }
  
  const seasonDisplay = getSeasonDisplayName(item.inputs.season);
  const budgetDisplay = getBudgetDisplayName(item.inputs.budget);
  const currencyDisplay = item.inputs.currency ? item.inputs.currency.toUpperCase() : null;
  const languageTipsDisplay = item.inputs.includeLanguageTips ? "Dicas Idioma" : null;
  const nationalityDisplay = item.inputs.nationality || null;
  const travelRequirementsDisplay = item.inputs.travelRequirements ? item.inputs.travelRequirements.substring(0, 50) + (item.inputs.travelRequirements.length > 50 ? "..." : "") : null;

  const displayTemplateTitle = item.templateTitle || item.inputs.destination || 'Viagem Sem Título';
  let titleDisplay = displayTemplateTitle;
  let subDestinationsDisplay = "";

  if (item.inputs.isMultiDestination && item.inputs.destinations && item.inputs.destinations.length > 0) {
    const destNames = item.inputs.destinations.map(d => d.name).slice(0, 3).join(', '); 
    subDestinationsDisplay = `Múltiplos: ${destNames}${item.inputs.destinations.length > 3 ? '...' : ''}`;
  }


  let detailsArray = [
    `${item.inputs.duration} dias`,
    `Foco: ${item.inputs.focus}`,
    `Tom: ${item.inputs.tone}`
  ];
  if (seasonDisplay) detailsArray.push(`Estação: ${seasonDisplay}`);
  if (budgetDisplay) detailsArray.push(`Orçamento: ${budgetDisplay}`);
  if (currencyDisplay) detailsArray.push(`Moeda: ${currencyDisplay}`);
  if (languageTipsDisplay) detailsArray.push(languageTipsDisplay);
  if (nationalityDisplay) detailsArray.push(`Nacionalidade: ${nationalityDisplay}`);
  
  const detailsString = detailsArray.join(' - ');


  return (
    <li className={`mb-3 p-4 rounded-lg shadow-md transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500' : 'bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600'}`}>
      <div onClick={() => onSelect(item.id)} className="flex-grow cursor-pointer">
        <div className="flex justify-between items-start">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-md break-all">
            {titleDisplay}
            </h4>
            <div className="flex items-center space-x-2">
              {item.isOfficialTemplate && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100 rounded-full">
                      Modelo Oficial
                  </span>
              )}
              {item.isFavorite && !isAdminView && ( // Show favorite badge only for user view
                <span className="px-2 py-0.5 text-xs font-semibold bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100 rounded-full flex items-center">
                  <IconStar className="h-3 w-3 mr-1" /> Favorito
                </span>
              )}
            </div>
        </div>
        {subDestinationsDisplay && (
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 break-all">
            {subDestinationsDisplay}
          </p>
        )}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {detailsString}
        </p>
        {travelRequirementsDisplay && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
            Reqs: {travelRequirementsDisplay}
          </p>
        )}
        <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-slate-400 dark:text-slate-500">{formattedDate}</p>
            {showUserIdentifier && item.userIdentifier && (
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                Gerado por: {item.userIdentifier}
            </p>
            )}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <button
          onClick={(e) => {
              e.stopPropagation(); 
              onDelete(item.id);
          }}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs font-medium py-1 px-2 rounded hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
          aria-label={`Excluir roteiro para ${titleDisplay}`}
        >
          Excluir
        </button>
        <div className="flex items-center space-x-3">
          {onToggleFavorite && !isAdminView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(item.id);
              }}
              className={`p-1 rounded-full transition-colors duration-150 ${item.isFavorite ? 'text-yellow-500 hover:text-yellow-400' : 'text-slate-400 hover:text-yellow-500 dark:text-slate-500 dark:hover:text-yellow-400'}`}
              aria-pressed={item.isFavorite}
              title={item.isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
            >
              {item.isFavorite ? 
                <IconStar className="h-5 w-5" /> : 
                <IconStarOutline className="h-5 w-5" />
              }
            </button>
          )}
          {isAdminView && onToggleOfficialTemplate && (
            <div className="flex items-center">
              <label htmlFor={`template-toggle-${item.id}`} className="mr-2 text-xs text-slate-600 dark:text-slate-300 select-none">
                Modelo Oficial:
              </label>
              <button
                id={`template-toggle-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleOfficialTemplate(item.id);
                }}
                className={`p-1 rounded-full transition-colors duration-150 ${item.isOfficialTemplate ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500'}`}
                aria-pressed={item.isOfficialTemplate}
                title={item.isOfficialTemplate ? "Desmarcar como modelo oficial" : "Marcar como modelo oficial"}
              >
                {item.isOfficialTemplate ? 
                  <IconStar className="h-5 w-5 text-white" /> : 
                  <IconStarOutline className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                }
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default HistoryItem;