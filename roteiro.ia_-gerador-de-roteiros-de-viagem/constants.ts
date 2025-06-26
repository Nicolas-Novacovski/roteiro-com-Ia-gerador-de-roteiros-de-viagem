
import { FocusOption, ToneOption, SeasonOption, BudgetOption, ItineraryFormData, QuickTripFormData, QuickTripFocusOption } from './types';

export const FOCUS_OPTIONS: FocusOption[] = [
  FocusOption.CULTURA,
  FocusOption.GASTRONOMIA,
  FocusOption.AVENTURA,
  FocusOption.RELAXAMENTO_BEM_ESTAR,
  FocusOption.HISTORICO_ARQUEOLOGICO,
  FocusOption.ECOTURISMO_NATUREZA,
  FocusOption.VIDA_NOTURNA_ENTRETENIMENTO,
  FocusOption.COMPRAS,
  FocusOption.ROMANTICO,
  FocusOption.MIX,
];

export const TONE_OPTIONS: ToneOption[] = [
  ToneOption.RELAXADO,
  ToneOption.INTENSO,
  ToneOption.ECONOMICO,
  ToneOption.LUXUOSO,
  ToneOption.AVENTURA_RADICAL,
  ToneOption.FAMILIAR_COM_CRIANCAS,
  ToneOption.EDUCACIONAL_IMERSIVO,
];

export const SEASON_OPTIONS: SeasonOption[] = [
  SeasonOption.QUALQUER,
  SeasonOption.PRIMAVERA,
  SeasonOption.VERAO,
  SeasonOption.OUTONO,
  SeasonOption.INVERNO,
];

export const BUDGET_OPTIONS: BudgetOption[] = [
  BudgetOption.QUALQUER,
  BudgetOption.ECONOMICO,
  BudgetOption.MODERADO,
  BudgetOption.LUXO,
];

export const DEFAULT_FORM_DATA: ItineraryFormData = {
  destination: '', // Serve como título geral ou primeiro destino
  duration: 3,     // Duração total
  isMultiDestination: false,
  destinations: [],
  focus: FocusOption.MIX,
  tone: ToneOption.RELAXADO,
  season: SeasonOption.QUALQUER,
  budget: BudgetOption.QUALQUER,
  currency: '',
  includeLanguageTips: false,
  nationality: '', 
  travelRequirements: '', // Novo campo inicializado
};

export const QUICK_TRIP_FOCUS_OPTIONS: QuickTripFocusOption[] = [
  QuickTripFocusOption.MIX,
  QuickTripFocusOption.CULTURA_HISTORIA,
  QuickTripFocusOption.GASTRONOMIA_CAFES,
  QuickTripFocusOption.NATUREZA_RELAX,
  QuickTripFocusOption.COMPRAS_ENTRETENIMENTO,
];

export const DEFAULT_QUICK_TRIP_FORM_DATA: QuickTripFormData = {
  availableTime: 1, // Default to 1 hour
  currentLocation: '',
  focus: QuickTripFocusOption.MIX,
};

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_MODEL_IMAGE = 'imagen-3.0-generate-002';