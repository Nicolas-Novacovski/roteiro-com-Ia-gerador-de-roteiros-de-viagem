
import React from 'react';
import { QuickTripFormData, QuickTripFocusOption } from '../types';
import { IconClock, IconCurrentLocation, IconBolt, IconWandSparkles } from './icons'; // IconWandSparkles for Focus
import { QUICK_TRIP_FOCUS_OPTIONS } from '../constants';


interface QuickTripFormProps {
  formData: QuickTripFormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const QuickTripForm: React.FC<QuickTripFormProps> = ({
  formData,
  onFormChange,
  onSubmit,
  isLoading
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center">
        <IconBolt className="h-7 w-7 mr-2 text-yellow-500" />
        Passeio Express
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 -mt-4 mb-6">
        Tem um tempinho livre? Diga quanto, onde você está e qual seu interesse, e a IA monta um mini-roteiro!
      </p>
      
      <div>
        <label htmlFor="currentLocation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          <IconCurrentLocation className="h-5 w-5 inline-block mr-1.5 align-text-bottom" />
          Sua Localização Atual
        </label>
        <input
          type="text"
          name="currentLocation"
          id="currentLocation"
          value={formData.currentLocation}
          onChange={onFormChange}
          required
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 dark:bg-slate-700 dark:text-slate-50"
          placeholder="Ex: Em frente ao MASP, São Paulo"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="availableTime" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            <IconClock className="h-5 w-5 inline-block mr-1.5 align-text-bottom" />
            Horas Livres
          </label>
          <input
            type="number"
            name="availableTime"
            id="availableTime"
            value={formData.availableTime}
            onChange={onFormChange}
            required
            min="1"
            max="24"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 dark:bg-slate-700 dark:text-slate-50"
            placeholder="Ex: 3"
          />
        </div>
        <div>
          <label htmlFor="focus" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            <IconWandSparkles className="h-5 w-5 inline-block mr-1.5 align-text-bottom text-purple-500" />
            Foco do Passeio
          </label>
          <select
            name="focus"
            id="focus"
            value={formData.focus}
            onChange={onFormChange}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 dark:bg-slate-700 dark:text-slate-50"
          >
            {QUICK_TRIP_FOCUS_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>


      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold py-3 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Buscando Sugestões...
          </>
        ) : (
          <>
            <IconBolt className="h-5 w-5 mr-2" />
            Encontrar Sugestões Rápidas
          </>
        )}
      </button>
    </form>
  );
};

export default QuickTripForm;