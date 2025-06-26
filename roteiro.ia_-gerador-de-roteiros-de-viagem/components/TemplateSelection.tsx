
import React from 'react';
import { ItineraryHistoryItem } from '../types';
import { IconRocketLaunch } from './icons'; // Supondo um novo ícone

interface TemplateSelectionProps {
  templates: ItineraryHistoryItem[];
  onLoadTemplate: (templateId: string) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ templates, onLoadTemplate }) => {
  if (!templates || templates.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center">
        <IconRocketLaunch className="h-7 w-7 mr-2 text-purple-500" /> {/* Ícone para templates */}
        Comece com um Modelo Rápido!
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Selecione um dos nossos modelos pré-definidos para agilizar o planejamento da sua viagem.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <div 
            key={template.id} 
            className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-md font-semibold text-blue-600 dark:text-blue-400 mb-1">
                {template.templateTitle || template.inputs.destination || "Modelo Sem Título"}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">
                {template.inputs.duration} dias - Foco: {template.inputs.focus}
              </p>
              {template.inputs.isMultiDestination && template.inputs.destinations.length > 0 && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cidades: {template.inputs.destinations.map(d => d.name).slice(0,2).join(', ')}{template.inputs.destinations.length > 2 ? '...' : ''}
                </p>
              )}
            </div>
            <button
              onClick={() => onLoadTemplate(template.id)}
              className="mt-3 w-full bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium py-2 px-3 rounded-md shadow-sm transition-colors duration-150"
              aria-label={`Carregar modelo: ${template.templateTitle || template.inputs.destination}`}
            >
              Usar este Modelo
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TemplateSelection;
