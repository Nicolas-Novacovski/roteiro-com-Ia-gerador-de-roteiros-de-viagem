
export interface DestinationDetail {
  name: string;
  days: number;
}

export interface ItineraryFormData {
  destination: string; // Título geral da viagem ou primeiro destino
  duration: number; // Duração total da viagem
  isMultiDestination: boolean;
  destinations: DestinationDetail[];
  focus: FocusOption;
  tone: ToneOption;
  season?: SeasonOption;
  budget?: BudgetOption;
  currency?: string;
  includeLanguageTips?: boolean;
  nationality?: string; 
  travelRequirements?: string; 
}

export enum FocusOption {
  CULTURA = "Cultura",
  GASTRONOMIA = "Gastronomia",
  AVENTURA = "Aventura",
  RELAXAMENTO_BEM_ESTAR = "Relaxamento & Bem-Estar",
  HISTORICO_ARQUEOLOGICO = "Histórico & Arqueológico",
  ECOTURISMO_NATUREZA = "Ecoturismo & Natureza",
  VIDA_NOTURNA_ENTRETENIMENTO = "Vida Noturna & Entretenimento",
  COMPRAS = "Compras",
  ROMANTICO = "Romântico",
  MIX = "Mix de Tudo",
}

export enum ToneOption {
  RELAXADO = "Relaxado",
  INTENSO = "Intenso",
  ECONOMICO = "Mochilão & Econômico",
  LUXUOSO = "Luxuoso & Exclusivo",
  AVENTURA_RADICAL = "Aventura Radical",
  FAMILIAR_COM_CRIANCAS = "Familiar (com crianças)",
  EDUCACIONAL_IMERSIVO = "Educacional & Imersivo",
}

export enum SeasonOption {
  QUALQUER = "Qualquer / Não Especificada",
  PRIMAVERA = "Primavera (Mar-Mai no Hem. Norte / Set-Nov no Hem. Sul)",
  VERAO = "Verão (Jun-Ago no Hem. Norte / Dez-Fev no Hem. Sul)",
  OUTONO = "Outono (Set-Nov no Hem. Norte / Mar-Mai no Hem. Sul)",
  INVERNO = "Inverno (Dez-Fev no Hem. Norte / Jun-Ago no Hem. Sul)",
}

export enum BudgetOption {
  QUALQUER = "Qualquer / Não Especificado",
  ECONOMICO = "Mochileiro / Econômico",
  MODERADO = "Moderado",
  LUXO = "Luxo",
}

export interface ItineraryHistoryItem {
  id: string;
  timestamp: number;
  inputs: ItineraryFormData;
  roteiro: string;
  userIdentifier: string; // Para simular quem gerou o roteiro
  isOfficialTemplate?: boolean; // Novo: Indica se é um modelo oficial criado pelo admin
  templateTitle?: string; // Novo: Título customizado para o template, se necessário (usará inputs.destination por padrão)
  isFavorite?: boolean; // Novo: Indica se o roteiro é um favorito do usuário
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  retrievedContext?: {
    uri: string;
    title: string;
  };
}

export interface GroundingMetadata {
  searchQueries?: string[];
  groundingChunks?: GroundingChunk[];
}

// Para o estado do componente PackingChecklist
export interface ChecklistItem {
  id: string;
  text: string;
  packed: boolean;
}

// Tipos para autenticação
export type UserRole = 'user' | 'admin' | null;

// Tipos para o Passeio Express (Quick Trip)
export enum QuickTripFocusOption {
  MIX = "Mix de Tudo",
  CULTURA_HISTORIA = "Cultural & Histórico",
  GASTRONOMIA_CAFES = "Gastronomia & Cafés",
  NATUREZA_RELAX = "Natureza & Relaxamento",
  COMPRAS_ENTRETENIMENTO = "Compras & Entretenimento",
}

export interface QuickTripFormData {
  availableTime: number; // Em horas
  currentLocation: string;
  focus: QuickTripFocusOption;
}