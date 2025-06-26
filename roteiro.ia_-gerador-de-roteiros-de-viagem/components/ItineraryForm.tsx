
import React from 'react';
import { ItineraryFormData, FocusOption, ToneOption, SeasonOption, BudgetOption, DestinationDetail } from '../types';
import { FOCUS_OPTIONS, TONE_OPTIONS, SEASON_OPTIONS, BUDGET_OPTIONS } from '../constants';

interface ItineraryFormProps {
  formData: ItineraryFormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index?: number, field?: keyof DestinationDetail) => void;
  onAddDestination: () => void;
  onRemoveDestination: (index: number) => void;
  onIsMultiDestinationChange: (isMulti: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const ItineraryForm: React.FC<ItineraryFormProps> = ({
  formData,
  onFormChange,
  onAddDestination,
  onRemoveDestination,
  onIsMultiDestinationChange,
  onSubmit,
  isLoading
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg">
      <div>
        <label htmlFor="destination" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {formData.isMultiDestination ? "Título da Viagem (Ex: Eurotrip 15 dias)" : "Destino Principal"}
        </label>
        <input
          type="text"
          name="destination"
          id="destination"
          value={formData.destination}
          onChange={(e) => onFormChange(e)}
          required
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-50"
          placeholder={formData.isMultiDestination ? "Ex: Aventura Europeia" : "Ex: Paris, França"}
        />
      </div>

      <fieldset className="mt-4">
        <legend className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tipo de Roteiro</legend>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              id="singleDestination"
              name="tripType"
              type="radio"
              checked={!formData.isMultiDestination}
              onChange={() => onIsMultiDestinationChange(false)}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:checked:bg-blue-500"
            />
            <label htmlFor="singleDestination" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
              Apenas um destino
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="multiDestination"
              name="tripType"
              type="radio"
              checked={formData.isMultiDestination}
              onChange={() => onIsMultiDestinationChange(true)}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:checked:bg-blue-500"
            />
            <label htmlFor="multiDestination" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
              Múltiplos destinos
            </label>
          </div>
        </div>
      </fieldset>

      {formData.isMultiDestination && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-md font-medium text-slate-700 dark:text-slate-300">Detalhes dos Destinos</h3>
          {formData.destinations.map((dest, index) => (
            <div key={index} className="p-3 border border-slate-300 dark:border-slate-600 rounded-md space-y-3 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`destName-${index}`} className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Destino {index + 1}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id={`destName-${index}`}
                    value={dest.name}
                    onChange={(e) => onFormChange(e, index, 'name')}
                    placeholder="Nome do Destino"
                    required
                    className="w-full mt-1 px-3 py-1.5 border border-slate-300 dark:border-slate-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm dark:bg-slate-700 dark:text-slate-50"
                  />
                </div>
                <div>
                  <label htmlFor={`destDays-${index}`} className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Dias neste destino
                  </label>
                  <input
                    type="number"
                    name="days"
                    id={`destDays-${index}`}
                    value={dest.days}
                    onChange={(e) => onFormChange(e, index, 'days')}
                    placeholder="Dias"
                    required
                    min="1"
                    className="w-full mt-1 px-3 py-1.5 border border-slate-300 dark:border-slate-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm dark:bg-slate-700 dark:text-slate-50"
                  />
                </div>
              </div>
              {formData.destinations.length > 1 && (
                 <button
                    type="button"
                    onClick={() => onRemoveDestination(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-700"
                    aria-label={`Remover Destino ${index + 1}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={onAddDestination}
            className="w-full text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium py-2 px-4 rounded-md border border-slate-300 dark:border-slate-500 transition-colors"
          >
            + Adicionar Destino
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Duração Total (dias)
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={(e) => onFormChange(e)}
            required
            min="1"
            max="90" // Increased max duration
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-50"
            readOnly={formData.isMultiDestination} // Read-only if multi-destination, sum of sub-durations
            title={formData.isMultiDestination ? "Calculado automaticamente pela soma dos dias nos destinos" : ""}
          />
        </div>
         <div>
          <label htmlFor="focus" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Foco da Viagem
          </label>
          <select
            name="focus"
            id="focus"
            value={formData.focus}
            onChange={(e) => onFormChange(e)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-50"
          >
            {FOCUS_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Tom do Roteiro
          </label>
          <select
            name="tone"
            id="tone"
            value={formData.tone}
            onChange={(e) => onFormChange(e)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-50"
          >
            {TONE_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="season" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Estação do Ano (Opcional)
          </label>
          <select
            name="season"
            id="season"
            value={formData.season || SeasonOption.QUALQUER}
            onChange={(e) => onFormChange(e)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-50"
          >
            {SEASON_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Perfil de Orçamento (Opcional)
          </label>
          <select
            name="budget"
            id="budget"
            value={formData.budget || BudgetOption.QUALQUER}
            onChange={(e) => onFormChange(e)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-50"
          >
            {BUDGET_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Moeda para Estimativa (Opcional)
          </label>
          <input
            type="text"
            name="currency"
            id="currency"
            value={formData.currency || ''}
            onChange={(e) => onFormChange(e)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-50"
            placeholder="Ex: BRL, USD, EUR (3 letras)"
            maxLength={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nationality" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Sua Nacionalidade (Opcional)
          </label>
          <input
            type="text"
            name="nationality"
            id="nationality"
            value={formData.nationality || ''}
            onChange={(e) => onFormChange(e)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-50"
            placeholder="Ex: Brasileira, Americana"
          />
        </div>
      </div>

      <div>
        <label htmlFor="travelRequirements" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Requisitos Especiais ou Locais Obrigatórios (Opcional)
        </label>
        <textarea
          name="travelRequirements"
          id="travelRequirements"
          value={formData.travelRequirements || ''}
          onChange={(e) => onFormChange(e)}
          rows={3}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-50"
          placeholder="Ex: Incluir visita ao estádio Santiago Bernabéu, jantar em restaurante com estrela Michelin, dia livre para compras na Rua X, evitar museus de arte moderna."
        />
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Liste aqui quaisquer pedidos específicos, como atrações imperdíveis, tipos de restaurantes, ou atividades que você gostaria de incluir (ou evitar).
        </p>
      </div>
      
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center">
          <input
            id="includeLanguageTips"
            name="includeLanguageTips"
            type="checkbox"
            checked={formData.includeLanguageTips || false}
            onChange={(e) => onFormChange(e)}
            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-300 dark:border-slate-500 rounded dark:bg-slate-700 dark:checked:bg-blue-500"
          />
          <label htmlFor="includeLanguageTips" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
            Incluir Dicas de Idioma Local? (Frases básicas)
          </label>
        </div>
      </div>


      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
      >
        {isLoading ? 'Gerando Roteiro...' : 'Gerar Roteiro Mágico ✨'}
      </button>
    </form>
  );
};

export default ItineraryForm;