
import { GoogleGenAI, GenerateContentResponse, Content, GenerateImagesResponse } from "@google/genai";
import { ItineraryFormData, SeasonOption, BudgetOption, DestinationDetail, QuickTripFormData, QuickTripFocusOption } from '../types';
import { GEMINI_MODEL_TEXT, GEMINI_MODEL_IMAGE } from '../constants';

let genAIInstance: GoogleGenAI | null = null;

const getGenAIInstance = (): GoogleGenAI => {
  if (!genAIInstance) {
    if (!process.env.API_KEY) {
      console.error("API_KEY não configurada. Defina process.env.API_KEY.");
      throw new Error("API_KEY não configurada. Verifique as variáveis de ambiente em seu setup.");
    }
    genAIInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAIInstance;
};

const COMMON_PROMPT_INSTRUCTIONS = `
**Instruções Críticas para o Roteiro (Aplicáveis a Geração Inicial e Refinamento):**
1.  **Título/Destino Principal da Viagem:** {MAIN_DESTINATION_TITLE}
2.  **Duração Total da Viagem:** {DURATION} dias
3.  **Foco Principal da Viagem:** {FOCUS}
4.  **Tom Geral do Roteiro:** {TONE} (Note que o Perfil de Orçamento, se especificado, tem precedência para questões de custo)
5.  **Nacionalidade do Viajante (para dicas de documentos):** {NATIONALITY}
{MULTI_DESTINATION_INSTRUCTION}
{TRAVEL_REQUIREMENTS_INSTRUCTION}

**Instruções para Ícones (IMPORTANTE PARA O FRONTEND):**
Para melhorar a visualização no frontend, PREFIXE cada item de lista (bullet points \`*\` ou \`-\`) relevante com um dos seguintes marcadores de texto. O frontend substituirá esses marcadores por ícones.
Use APENAS estes marcadores, EXATAMENTE como especificados, no INÍCIO do texto do item da lista.
NÃO use emojis diretamente para esta finalidade, use os marcadores textuais.

*   \`[ICON:RESTAURANT]\` - Para restaurantes, cafés, locais de alimentação.
*   \`[ICON:ACCOMMODATION]\` - Para hotéis, hostels, locais de hospedagem.
*   \`[ICON:MUSEUM]\` - Para museus.
*   \`[ICON:CULTURE]\` - Para outros locais culturais, teatros, galerias, monumentos históricos.
*   \`[ICON:NATURE]\` - Para locais de natureza como montanhas, praias, lagos.
*   \`[ICON:PARK]\` - Para parques urbanos, jardins.
*   \`[ICON:SHOPPING]\` - Para lojas, mercados, shoppings.
*   \`[ICON:FLIGHT]\` - Para informações sobre voos.
*   \`[ICON:TRAIN]\` - Para informações sobre trens.
*   \`[ICON:BUS]\` - Para informações sobre ônibus.
*   \`[ICON:CAR]\` - Para informações sobre transporte de carro, táxi, aluguel.
*   \`[ICON:TRANSPORT]\` - Para informações gerais sobre transporte ou transferências entre locais/cidades.
*   \`[ICON:WALKING]\` - Para passeios a pé, caminhadas.
*   \`[ICON:INFO]\` - Para informações gerais importantes.
*   \`[ICON:TIP]\` - Para dicas práticas.
*   \`[ICON:COST]\` - Para informações específicas de custo de uma atividade/item.
*   \`[ICON:TIME]\` - Para horários, durações de atividades.
*   \`[ICON:ACTIVITY]\` - Para atividades gerais ou pontos de interesse não cobertos acima.
*   \`[ICON:PHOTO]\` - Para locais bons para fotos.
*   \`[ICON:MAP_PIN]\` - Para um local específico ou endereço.
*   \`[ICON:LANGUAGE]\` - Para dicas de idioma.
*   \`[ICON:LUGGAGE]\` - Para itens da lista de bagagem.
*   \`[ICON:PASSPORT]\` - Para informações sobre documentos, vistos, passaportes.

Se um item não se encaixar claramente em uma categoria, use \`[ICON:ACTIVITY]\` ou omita o marcador de ícone.
Certifique-se de que os rótulos como \`**Endereço:**\`, \`**Avaliação Google:**\`, etc., venham DEPOIS do marcador de ícone e do nome principal da atividade/local.
Exemplo CORRETO: \`* [ICON:RESTAURANT] Jantar no **[Nome do Restaurante](URL_OFICIAL_RESTAURANTE)**\n    * [ICON:MAP_PIN] **Endereço:** 123 Rue de la Paix, Paris\n    * [ICON:COST] **Custo Estimado:** $$$\`
Exemplo INCORRETO: \`* **Endereço:** [ICON:MAP_PIN] 123 Rue de la Paix, Paris\` (marcador não está no início do item)

**Formato OBRIGATÓRIO da Resposta (Markdown):**
*   **A resposta DEVE ser exclusivamente em formato Markdown.** Não adicione introduções ou conclusões fora do roteiro.
*   **NÃO CRIE SEÇÕES COM TÍTULOS GENÉRICOS COMO "## Detalhes".** Todos os títulos de seção devem ser descritivos (ex: "## Informações Gerais...", "## Dia 1: ...", "## Chegada em [Cidade]...", "## Dicas de Idioma Local", "## Lista de Bagagem Sugerida", "## Documentos Necessários...").
*   **Seção Inicial OBRIGATÓRIA:** Comece o roteiro com a seção de Informações Gerais, Clima e Custos Estimados, conforme detalhado abaixo.
    {INITIAL_INFORMATION_SECTION}
{DOCUMENTS_SECTION}
{LANGUAGE_TIPS_SECTION}
{PACKING_LIST_SECTION}
*   **Organização por Dia:**
    *   Após as seções iniciais (e após cada seção de transição para um novo destino, se aplicável), comece CADA dia com um título de nível 2 (Markdown: \`##\`) e MUITO CLARO: \`## Dia X: Título Descritivo Curto do Dia\` (ex: \`## Dia 1: Chegada em Paris e Charme de Montmartre\`).
    *   Se for uma viagem multi-destinos, o título do dia deve indicar claramente a cidade atual se ela mudou, ou o título da seção de transição deve fazer isso.
    *   **NÃO use uma linha horizontal (\`---\`) em Markdown ou qualquer outra forma de separador visual explícito entre os dias.** O frontend cuidará da separação visual.
*   **Detalhes EXTREMAMENTE RICOS para Cada Dia:**
    *   **Subtítulos para Períodos do Dia:** Para cada dia, use títulos de nível 3 (Markdown: \`###\`) com um emoji relevante (sugestão: ☀️ Manhã, ☕ Brunch/Café, 🍽️ Almoço, 🖼️ Tarde, 🌇 Pôr do Sol, 🌙 Jantar/Noite) e texto em negrito para separar claramente os períodos. Insira UMA linha em branco antes de cada subtítulo de período para espaçamento. Exemplo: \`### ☀️ **Manhã**\`
    *   **Atividades Específicas (como Bullet Points com Ícones):** Dentro de cada período, liste as atividades, sugestões e informações como itens de lista (bullet points \`*\` ou \`-\`), APLICANDO OS MARCADORES DE ÍCONE. Use sub-itens para agrupar informações relacionadas.
        *   **Nomes Específicos e em Negrito:** Use **negrito** para nomes de lugares, atrações, restaurantes.
        *   **Rótulos Importantes em Negrito:** Coloque os seguintes rótulos SEMPRE em negrito: \`**Endereço:**\`, \`**Avaliação Google:**\`, \`**Horário de Funcionamento:**\`, \`**Transporte:**\`, \`**Dica:**\`, \`**Custo Estimado da Atividade/Refeição:**\`, \`**Duração Estimada:**\`, \`**Como Chegar:**\`, \`**Ingressos (Onde Comprar):**\`, \`**Coordenadas (Lat,Lon):**\`.
        *   **Conteúdo Detalhado:** Para cada atividade principal, forneça:
            *   Breve descrição e por que é interessante.
            *   Sugestões de horários (ex: "idealmente entre 10h-12h para evitar multidões").
            *   Opções alternativas ou complementares nas proximidades.
            *   Informações culturais ou históricas relevantes e concisas.
            *   Dicas práticas específicas (ex: "use o portão lateral menos movimentado", "compre água antes de entrar", "melhor ângulo para fotos é da ponte X").
            *   Sugestões de transporte ENTRE as atividades do dia (ex: "daqui, pegue o metrô Linha Y por 3 paradas até Z" ou "uma caminhada agradável de 15 minutos pela Rua A").
            *   **Coordenadas (Lat,Lon):** (Se encontradas, fornecer Latitude,Longitude. Ex: 48.8584,2.2945)
        *   **Links Inline e Contextuais para SITES OFICIAIS/RESERVAS (CRUCIAL!):** Integre os links DIRETAMENTE no texto da atividade/local, tornando o nome do local (em negrito) o texto clicável do link. **FORNEÇA APENAS URLs COMPLETAS, VÁLIDAS, DIRETAS e FUNCIONAIS para SITES OFICIAIS ou PÁGINAS DE RESERVA/INFORMAÇÃO DIRETA. NÃO forneça links de resultados de busca do Google, links de blogs genéricos (a menos que seja o blog oficial da atração), ou links para páginas principais de agregadores sem especificar a atração. Se, após a pesquisa, não encontrar uma URL oficial/de reserva direta e funcional, OMITA o link para esse item específico.** NÃO invente URLs ou use placeholders como \`URL_DO_LUGAR\`.
        *   **Exemplo de Item com Ícone e Detalhes:**
            \`\`\`
            * [ICON:RESTAURANT] Almoço no **[Le Bouillon Chartier](https://www.bouillon-chartier.com/fr/grands-boulevards)**
                * [ICON:MAP_PIN] **Endereço:** 7 Rue du Faubourg Montmartre, 75009 Paris, França
                * **Avaliação Google:** 4.1/5 (25k reviews) - Pesquisar avaliação real.
                * [ICON:COST] **Custo Estimado da Atividade/Refeição:** €15-€25 por pessoa
                * [ICON:TIME] **Horário de Funcionamento:** 11:30 - 22:00
                * [ICON:TRAIN] **Como Chegar:** Metrô Linha 8 ou 9, Estação Grands Boulevards.
                * [ICON:TIP] **Dica:** Chegue cedo (antes das 12h ou após as 14h para almoço) ou esteja preparado para uma pequena fila, pois não aceitam reservas. Ambiente tradicional parisiense.
                * **Coordenadas (Lat,Lon):** 48.8722,2.3444 
            \`\`\`
    *   **Link do Google Maps para a Rota do Dia:** Ao FINAL da seção de cada dia (após todas as atividades e dicas gerais do dia), adicione um link para o Google Maps que mostre a rota entre os principais pontos mencionados NAQUELE DIA. Use o formato de direções (\`https://www.google.com/maps/dir/Local1/Local2/Local3\`). Use os nomes dos locais ou endereços que você já listou. O texto do link DEVE SER **EM NEGRITO E EM MAIÚSCULAS**.
        *   Exemplo: \`[**VER ROTA DO DIA NO GOOGLE MAPS**](https://www.google.com/maps/dir/Torre+Eiffel,Paris/Museu+do+Louvre,Paris/Catedral+de+Notre+Dame,Paris)\`
*   **Linguagem:** Use uma linguagem envolvente e inspiradora, adaptada ao tom e perfil de orçamento solicitados.
*   **NÃO inclua nenhum texto introdutório ou conclusivo fora do roteiro em Markdown. Apenas o roteiro, começando com a seção inicial de informações gerais/custos/clima, e depois diretamente com "## Dia 1: ...".**
*   **NÃO inclua uma seção "Fontes de Informação" ou "Links de Pesquisa Adicionais" no final. Os únicos links devem ser os inline e o link da rota do dia no Google Maps, conforme especificado.**
`;


const buildPromptSections = (formData: ItineraryFormData, forRefinement: boolean = false) => {
  const { 
    destination, duration, focus, tone, season, budget, currency, 
    isMultiDestination, destinations, includeLanguageTips, nationality,
    travelRequirements 
  } = formData;

  let multiDestinationInstruction = "";
  let mainDestinationTitle = destination;

  if (isMultiDestination && destinations && destinations.length > 0) {
    mainDestinationTitle = destination || "Viagem Personalizada"; 
    const destinationSegments = destinations.map(d => `*   **${d.name}**: ${d.days} dia(s)`).join("\n");
    multiDestinationInstruction = `
*   **Múltiplos Destinos Solicitados:** Esta é uma viagem com múltiplos destinos. Planeje o roteiro sequencialmente, cobrindo cada destino listado abaixo pelo número de dias especificado.
    ${destinationSegments}
*   **Numeração dos Dias:** A contagem dos dias (\`## Dia 1\`, \`## Dia 2\`, etc.) deve ser contínua ao longo de TODA a viagem, mesmo ao mudar de cidade.
*   **Transição entre Destinos:** Para cada transição entre um destino e o próximo:
    *   Indique claramente o final das atividades no destino atual.
    *   Sugira meios de transporte (ex: trem, voo de baixo custo, ônibus, carro alugado), incluindo estimativas de tempo e custo se possível, e onde reservar (com links oficiais, se aplicável). Use [ICON:TRANSPORT] para estas sugestões.
    *   Inicie o próximo segmento do roteiro com um título claro, como por exemplo: \`## Seguindo para [Nome do Próximo Destino] ([X] dias)\` ou \`## Chegada em [Nome do Próximo Destino] e Início da Exploração\`.
*   A "Duração da Viagem" total de ${duration} dias deve ser respeitada, distribuindo os dias conforme especificado para cada sub-destino. Se a soma dos dias dos sub-destinos não bater com a duração total, priorize a duração total e ajuste os dias nos sub-destinos proporcionalmente ou conforme fizer mais sentido logístico.
`;
  } else {
    multiDestinationInstruction = `*   **Destino Único:** Concentre-se estritamente na cidade/região especificada como '${mainDestinationTitle}' e suas áreas imediatas.`;
  }

  let seasonInstruction = "";
  if (season && season !== SeasonOption.QUALQUER) {
    seasonInstruction = `
*   **Estação da Viagem Solicitada:** ${season}.
*   Pesquise e inclua um breve resumo das condições climáticas médias para ${mainDestinationTitle} (ou para cada destino, se relevante e diferente) durante esta estação:
    *   **Temperatura Média:** (ex: Mínima X°C, Máxima Y°C ou Média Z°C).
    *   **Precipitação Média:** (ex: X mm de chuva por mês, ou X dias de chuva em média no período).
    *   **Dica de Vestuário:** Com base no clima, sugira brevemente que tipo de roupa levar.
`;
  }

  let budgetInstructionSegment = "";
  if (budget && budget !== BudgetOption.QUALQUER) {
    budgetInstructionSegment = `
*   **Perfil de Orçamento da Viagem:** ${budget}.
    *   Ao sugerir atividades, restaurantes, e (se possível) tipos de acomodação, leve em consideração este perfil de orçamento.
        *   Para **${BudgetOption.ECONOMICO}**: Foque em opções gratuitas ou de baixo custo, hostels/albergues, comida de rua/mercados locais, uso intensivo de transporte público.
        *   Para **${BudgetOption.MODERADO}**: Equilibre custo e conforto, hotéis de categoria média/Airbnb, restaurantes com bom custo-benefício, algumas atrações pagas importantes.
        *   Para **${BudgetOption.LUXO}**: Sugira experiências premium, hotéis de luxo/boutique, restaurantes renomados, passeios privados ou exclusivos.
    *   A estimativa de custos DEVE refletir este perfil.
`;
  }

  let costEstimationInstruction = `
*   **Estimativa de Custos Detalhada:** (Considerar para cada destino principal se for uma viagem multi-destinos com moedas locais diferentes)
    *   Pesquise e forneça uma estimativa de custo diário para a viagem (ou para cada destino principal, se aplicável), na **moeda local** do(s) destino(s). Especifique CLARAMENTE qual é a moeda local (ex: "EUR para Euro", "JPY para Iene Japonês").
    *   Apresente esta estimativa como uma faixa (ex: "Custo Diário Estimado (Moeda Local): 100-150 XXX").
    ${currency && currency.trim().length === 3 ? `
    *   Converta esta estimativa diária para **${currency.toUpperCase()}** (Moeda do Usuário), usando taxas de câmbio aproximadas atuais (pesquisadas via Google Search). Apresente como uma faixa (ex: "aproximadamente 50-75 ${currency.toUpperCase()}"). Indique que é uma conversão aproximada e a taxa de câmbio pode variar.
    ` : `
    *   Não foi solicitada conversão para outra moeda. Apresente os custos apenas na moeda local.
    `}
    *   Calcule uma **Estimativa de Custo Total da Viagem** (excluindo passagens aéreas internacionais/intercontinentais, a menos que explicitamente parte do escopo regional) multiplicando a média do custo diário pela duração da viagem. Apresente este total na moeda local e, se aplicável, na moeda do usuário.
    *   Adicione uma breve nota: "Estas são estimativas para ${budget !== BudgetOption.QUALQUER ? budget : 'um perfil geral'} e os custos reais podem variar significativamente com base nas escolhas pessoais, época do ano, e promoções."
`;

  const initialInformationSection = `
## Informações Gerais, Clima e Custos Estimados para ${mainDestinationTitle}
${budgetInstructionSegment}
${costEstimationInstruction}
${seasonInstruction ? `\n### Condições Climáticas para ${season}\n${seasonInstruction}` : ''}
`;

  let languageTipsSection = "";
  if (includeLanguageTips) {
    languageTipsSection = `
## [ICON:LANGUAGE] Dicas de Idioma Local para ${mainDestinationTitle}
*   Pesquise o(s) idioma(s) principal(is) falado(s) em ${mainDestinationTitle} (e outros destinos, se aplicável e diferente).
*   Forneça uma lista de 5-10 frases básicas e úteis nesse idioma, como:
    *   Olá / Bom dia / Boa tarde / Boa noite
    *   Por favor
    *   Obrigado(a)
    *   De nada
    *   Sim / Não
    *   Com licença / Desculpe
    *   Quanto custa?
    *   Onde fica o banheiro?
    *   Eu não entendo
    *   Você fala inglês (ou português)?
*   Para cada frase, inclua:
    *   A frase no idioma local.
    *   Uma pronúncia simplificada e fonética (ex: para "Merci" em francês, "mer-SSI").
    *   A tradução em português.
*   Formate como uma lista ou tabela clara. Ex: \`* [ICON:LANGUAGE] **Olá:** Bonjour (bon-JUR)\`
`;
  }

  const packingListSection = `
## [ICON:LUGGAGE] Lista de Bagagem Sugerida para ${mainDestinationTitle}
Com base no destino (${mainDestinationTitle}), duração (${duration} dias), estação (${season || 'qualquer'}), foco (${focus}) e perfil de orçamento (${budget || 'qualquer'}), sugira uma lista de itens essenciais e recomendados para levar na mala.
*   Categorize os itens (Ex: Roupas, Documentos, Eletrônicos, Higiene, Saúde, Outros).
*   Seja específico (ex: em vez de "casaco", diga "casaco impermeável leve" se o clima pedir).
*   Lembre-se de adaptadores de tomada, se necessário para o destino.
*   Formate como uma lista de itens simples em Markdown (Ex: \`* Camisetas (3-4)\`).
    *   \`[ICON:LUGGAGE] Camisetas (3-4)\`
    *   \`[ICON:LUGGAGE] Protetor solar\`
    *   \`[ICON:LUGGAGE] Passaporte\`
`;

  let documentsSection = "";
  if (nationality && nationality.trim() !== "") {
    documentsSection = `
## [ICON:PASSPORT] Documentos Necessários e Vistos para Cidadãos de ${nationality}
Com base na nacionalidade informada (${nationality}), pesquise (usando Google Search) e detalhe os requisitos de entrada para ${mainDestinationTitle} (e para cada destino adicional, se a viagem for multi-destinos e os requisitos variarem).
*   **Visto:** É necessário visto para cidadãos de ${nationality}? Se sim, qual tipo, como solicitar (link para site oficial da embaixada/consulado, se possível), custo estimado e tempo de processamento.
*   **Passaporte:** Requisitos de validade do passaporte (ex: mínimo 6 meses após a data de saída).
*   **Outros Documentos:** Certificado internacional de vacinação (ex: febre amarela), seguro viagem obrigatório, comprovante de recursos financeiros, passagem de volta, etc.
*   Para cada destino na viagem, se os requisitos forem diferentes, crie subseções claras.
*   Forneça links para fontes oficiais SEMPRE QUE POSSÍVEL.
*   Exemplo de item: \`* [ICON:PASSPORT] **Visto para [Destino X]:** Não necessário para turismo até 90 dias para cidadãos de ${nationality}.\`
                \`* [ICON:PASSPORT] **Passaporte:** Deve ser válido por pelo menos 6 meses após a data de saída de [Destino X].\`
`;
  }
  
  let travelRequirementsInstruction = "";
  // For refinement, this section will be handled differently in the main prompt construction
  if (!forRefinement && travelRequirements && travelRequirements.trim() !== "") {
    travelRequirementsInstruction = `
## Requisitos Especiais do Viajante (ALTA PRIORIDADE):
O viajante especificou os seguintes requisitos, preferências ou locais obrigatórios. Tente ao máximo incorporá-los de forma natural e lógica no roteiro, respeitando o foco, tom e orçamento da viagem:
"${travelRequirements.replace(/\n/g, '\n  * ')}" 
Se algum requisito for inviável, muito difícil de encaixar, ou contraditório com outros aspectos da viagem (ex: um local muito distante para a duração, um restaurante que não se encaixa no orçamento, uma atividade que destoa do foco), mencione isso brevemente na seção de informações gerais ou no dia relevante, explique o porquê, e sugira uma alternativa se possível. Caso contrário, priorize a inclusão dos demais requisitos e do plano geral.
`;
  }

  return {
    mainDestinationTitle,
    duration,
    focus,
    tone,
    nationality: nationality || "Não informada",
    multiDestinationInstruction,
    travelRequirementsInstruction,
    initialInformationSection,
    documentsSection,
    languageTipsSection,
    packingListSection,
  };
};

const fillCommonInstructions = (
  commonTemplate: string,
  placeholders: ReturnType<typeof buildPromptSections>
) => {
  return commonTemplate
    .replace('{MAIN_DESTINATION_TITLE}', placeholders.mainDestinationTitle)
    .replace('{DURATION}', placeholders.duration.toString())
    .replace('{FOCUS}', placeholders.focus)
    .replace('{TONE}', placeholders.tone)
    .replace('{NATIONALITY}', placeholders.nationality)
    .replace('{MULTI_DESTINATION_INSTRUCTION}', placeholders.multiDestinationInstruction)
    .replace('{TRAVEL_REQUIREMENTS_INSTRUCTION}', placeholders.travelRequirementsInstruction)
    .replace('{INITIAL_INFORMATION_SECTION}', placeholders.initialInformationSection)
    .replace('{DOCUMENTS_SECTION}', placeholders.documentsSection)
    .replace('{LANGUAGE_TIPS_SECTION}', placeholders.languageTipsSection)
    .replace('{PACKING_LIST_SECTION}', placeholders.packingListSection);
};


export const generateItinerary = async (
  formData: ItineraryFormData
): Promise<GenerateContentResponse> => {
  const ai = getGenAIInstance();
  const placeholders = buildPromptSections(formData);
  
  const filledInstructions = fillCommonInstructions(COMMON_PROMPT_INSTRUCTIONS, placeholders);

  const prompt = `
Você é um planejador de viagens expert e criativo. Sua missão é gerar um roteiro de viagem EXTREMAMENTE DETALHADO, PRÁTICO, VISUALMENTE ORGANIZADO e ÚTIL para ${placeholders.mainDestinationTitle}. Utilize o Google Search (ferramenta interna) para encontrar informações atualizadas, incluindo endereços, avaliações, horários de funcionamento, **especialmente para encontrar os URLs corretos para sites oficiais ou páginas de reserva/informação direta, e para pesquisar custos, taxas de câmbio e requisitos de visto/documentos.**

${filledInstructions}

Comece o roteiro DIRETAMENTE com a seção de Informações Gerais, Clima e Custos Estimados, seguida pelas seções opcionais (Documentos, Dicas de Idioma, Lista de Bagagem), e então "## Dia 1: ...".
`;

  const contents: Content[] = [{ role: "user", parts: [{text: prompt}] }];

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: contents,
      config: { tools: [{googleSearch: {}}] }
    });
    return response;
  } catch (error) {
    console.error("Erro ao chamar a API Gemini para gerar roteiro:", error);
    if (error instanceof Error) {
        if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key not valid')) {
             throw new Error("Chave de API inválida. Verifique sua configuração.");
        }
         if (error.message.includes('Quota') || error.message.includes('quota')) {
            throw new Error("Cota da API excedida. Tente novamente mais tarde.");
        }
         if (error.message.toLowerCase().includes('billing') || error.message.toLowerCase().includes('conta de faturamento')) {
            throw new Error("Problema com a conta de faturamento do Google Cloud. Verifique suas configurações de faturamento.");
        }
        if (error.message.toLowerCase().includes('permission denied') || error.message.toLowerCase().includes('access denied')) {
            throw new Error("Permissão negada para acessar a API Gemini. Verifique as permissões da sua chave de API no Google Cloud.");
        }
         if (error.message.toLowerCase().includes('model_not_supported') || error.message.toLowerCase().includes('model not found')) {
            throw new Error(`O modelo ${GEMINI_MODEL_TEXT} não é suportado ou não foi encontrado. Verifique o nome do modelo.`);
        }
    }
    throw new Error("Falha ao gerar roteiro. A IA pode estar sobrecarregada, houve um problema na comunicação, na configuração da API ou o modelo não suporta as ferramentas solicitadas. Tente novamente ou verifique o console para mais detalhes.");
  }
};


export const refineItinerary = async (
  originalItineraryMarkdown: string,
  refinementInstructions: string,
  originalFormData: ItineraryFormData
): Promise<GenerateContentResponse> => {
  const ai = getGenAIInstance();
  
  const placeholders = buildPromptSections(originalFormData, true); 

  const refinementSpecificTravelRequirements = `
## INSTRUÇÕES DE REFINAMENTO (Aplicar ao roteiro existente abaixo):
O viajante forneceu as seguintes instruções para modificar o roteiro. Aplique-as de forma coesa e lógica, atualizando todas as seções relevantes (incluindo informações gerais, custos, clima, dicas de idioma, lista de bagagem, documentos e os dias do roteiro) se as instruções impactarem esses elementos.
"${refinementInstructions.replace(/\n/g, '\n  * ')}"

Se as instruções de refinamento conflitarem fortemente com o foco, tom ou orçamento original (informados abaixo para sua referência), tente encontrar um equilíbrio ou, se não for possível, priorize as novas instruções de refinamento, mas mencione o ajuste e o motivo.
Mantenha o máximo possível do conteúdo e estrutura original do roteiro que não for afetado pelas novas instruções.
`;
  
  const filledInstructions = fillCommonInstructions(
    COMMON_PROMPT_INSTRUCTIONS.replace('{TRAVEL_REQUIREMENTS_INSTRUCTION}', refinementSpecificTravelRequirements), 
    placeholders
  );

  const prompt = `
Você é um planejador de viagens expert e criativo. Sua tarefa é MODIFICAR um ROTEIRO EXISTENTE com base em INSTRUÇÕES DE REFINAMENTO.
Utilize o Google Search (ferramenta interna) para encontrar informações atualizadas, se necessário para as modificações.

**Contexto Original da Viagem (para referência ao aplicar refinamentos):**
*   **Título/Destino Principal:** ${originalFormData.destination}
*   **Duração Total:** ${originalFormData.duration} dias
*   **Foco Principal:** ${originalFormData.focus}
*   **Tom Geral:** ${originalFormData.tone}
*   **Estação:** ${originalFormData.season || "Não especificada"}
*   **Perfil de Orçamento:** ${originalFormData.budget || "Não especificado"}
*   **Nacionalidade do Viajante:** ${originalFormData.nationality || "Não informada"}
*   **Requisitos Originais (já considerados no roteiro existente):** ${originalFormData.travelRequirements || "Nenhum"}

---
**ROTEIRO EXISTENTE (EM MARKDOWN):**
---
${originalItineraryMarkdown}
---
FIM DO ROTEIRO EXISTENTE.
---

Agora, com base nas INSTRUÇÕES DE REFINAMENTO e no CONTEXTO ORIGINAL fornecidos acima, modifique o ROTEIRO EXISTENTE.
${filledInstructions}

Produza o roteiro MODIFICADO E COMPLETO em Markdown, seguindo TODAS as diretrizes de formatação e estrutura detalhadas.
Comece o roteiro DIRETAMENTE com a seção de Informações Gerais, Clima e Custos Estimados (atualizada se necessário), seguida pelas seções opcionais (Documentos, Dicas de Idioma, Lista de Bagagem - atualizadas se necessário), e então "## Dia 1: ..." (com dias e atividades atualizados conforme o refinamento).
`;

  const contents: Content[] = [{ role: "user", parts: [{text: prompt}] }];

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: contents,
      config: { tools: [{googleSearch: {}}] }
    });
    return response;
  } catch (error) {
    console.error("Erro ao chamar a API Gemini para refinar roteiro:", error);
     if (error instanceof Error) {
        if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key not valid')) {
             throw new Error("Chave de API inválida. Verifique sua configuração.");
        }
         if (error.message.includes('Quota') || error.message.includes('quota')) {
            throw new Error("Cota da API excedida. Tente novamente mais tarde.");
        }
         if (error.message.toLowerCase().includes('billing') || error.message.toLowerCase().includes('conta de faturamento')) {
            throw new Error("Problema com a conta de faturamento do Google Cloud. Verifique suas configurações de faturamento.");
        }
        if (error.message.toLowerCase().includes('permission denied') || error.message.toLowerCase().includes('access denied')) {
            throw new Error("Permissão negada para acessar a API Gemini. Verifique as permissões da sua chave de API no Google Cloud.");
        }
    }
    throw new Error("Falha ao refinar roteiro. A IA pode estar sobrecarregada ou houve um problema na comunicação. Tente novamente ou verifique o console para mais detalhes.");
  }
};


export const generateDestinationImage = async (
  destination: string
): Promise<string | null> => {
  if (!destination) return null;
  const ai = getGenAIInstance();

  const prompt = `Uma fotografia deslumbrante e icônica de ${destination}. Imagem vibrante, clara, qualidade profissional, representando a essência do local. Estilo cinematográfico, alta resolução. Sem texto ou marcas d'água.`;

  try {
    const response: GenerateImagesResponse = await ai.models.generateImages({
      model: GEMINI_MODEL_IMAGE,
      prompt: prompt,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    console.warn("Nenhuma imagem foi gerada pela API ou a resposta não continha dados da imagem.");
    return null;
  } catch (error) {
    console.error("Erro ao gerar imagem do destino:", error);
    return null;
  }
};

export const generateQuickTrip = async (
  formData: QuickTripFormData
): Promise<GenerateContentResponse> => {
  const ai = getGenAIInstance();
  const { availableTime, currentLocation, focus } = formData;

  const prompt = `
Você é um assistente de concierge local ultra-rápido e experiente. Um usuário tem ${availableTime} hora(s) livre(s), está atualmente em/próximo a: "${currentLocation}", e tem interesse em um passeio com foco em: "${focus || QuickTripFocusOption.MIX}".

Sua tarefa é criar um micro-roteiro com 1 a 3 sugestões de atividades, incluindo locais para visitar e, se relevante e o tempo permitir, uma sugestão rápida de onde comer algo. Considere o tempo de deslocamento entre os locais. **Adapte as sugestões ao foco informado.**

**Instruções Críticas:**
1.  **Localização Inicial:** ${currentLocation}
2.  **Tempo Total Disponível:** ${availableTime} hora(s). Planeje atividades que se encaixem realisticamente neste tempo, incluindo deslocamentos. Se o tempo for muito curto (ex: menos de 1 hora), sugira apenas uma atividade muito próxima.
3.  **Foco do Passeio:** ${focus || QuickTripFocusOption.MIX}. Priorize experiências que se alinhem com este foco. Por exemplo, se o foco for "Gastronomia & Cafés", sugira cafés charmosos, mercados gourmet rápidos, ou lojas de especialidades. Se for "Cultural & Histórico", sugira um monumento, uma galeria pequena, ou um ponto de interesse histórico de visita rápida.
4.  **Transporte:** Sugira o meio de transporte mais prático (ex: a pé, metrô, ônibus, táxi/app). Use os ícones de transporte apropriados.
5.  **Formato OBRIGATÓRIO da Resposta (Markdown):**
    *   **NÃO CRIE SEÇÕES COM TÍTULOS GENÉRICOS.**
    *   Comece com um título de nível 2 (Markdown: \`##\`) formatado como: \`## Sugestões para seu Passeio Express em ${currentLocation.replace(/"/g, '')} (${availableTime}h - Foco: ${focus || QuickTripFocusOption.MIX})\`
    *   Para cada sugestão, use um subtítulo de nível 3 (Markdown: \`###\`) com o nome da atividade/local, prefixado com um ícone relevante (Ex: \`### [ICON:MUSEUM] Nome do Local\`).
    *   **Detalhes para cada Sugestão (como Bullet Points com Ícones):**
        *   \`[ICON:INFO]\` Breve descrição (1-2 frases concisas), mencionando como se relaciona ao foco, se aplicável.
        *   \`[ICON:TIME]\` Duração Estimada na Atividade: (ex: 30 min, 1 hora).
        *   \`[ICON:MAP_PIN]\` Endereço ou Ponto de Referência Claro.
        *   \`[ICON:TRANSPORT]\` Como Chegar: (ex: "Caminhada de 10 min", "Metrô Linha Azul - 2 paradas", "Táxi ~5 min").
        *   **(Opcional) \`[ICON:RESTAURANT]\` Sugestão Alimentar Rápida:** Se aplicável e houver tempo (ex: "Café XPTO nas proximidades para um lanche rápido").
        *   Forneça links do Google Maps para o local principal da sugestão, se possível, usando a pesquisa. O nome do local deve ser o texto do link. Ex: \`**[Ver Nome do Local no Google Maps](URL_GOOGLE_MAPS_LOCAL)**\`
    *   Seja conciso e direto ao ponto. Use a mesma lista de ícones fornecida nas instruções de roteiro completo.
    *   Se não for possível encontrar sugestões viáveis para o tempo, local e foco fornecidos, informe educadamente em uma única frase.

**Exemplo de Formato para uma Sugestão (Foco: Cultural):**

### [ICON:MUSEUM] Visita Rápida à Galeria de Arte Local
*   [ICON:INFO] Uma pequena galeria com exposições de artistas locais. Ótimo para uma dose rápida de cultura.
*   [ICON:TIME] Duração Estimada na Atividade: 45 minutos.
*   [ICON:MAP_PIN] **Endereço:** Av. Principal, 456, Bairro das Artes.
*   [ICON:TRANSPORT] **Como Chegar:** Metrô Linha Verde - 1 parada da sua localização, depois 5 min de caminhada.
*   **[Ver Galeria de Arte Local no Google Maps](https://www.google.com/maps/search/?api=1&query=Galeria+de+Arte+Local+Av+Principal+456)**

**Use o Google Search para encontrar informações atualizadas sobre locais, endereços e possíveis links para o Google Maps.**
Produza apenas o roteiro em Markdown, começando com o título principal de nível 2.
`;

  const contents: Content[] = [{ role: "user", parts: [{text: prompt}] }];

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: contents,
      config: { tools: [{googleSearch: {}}] }
    });
    return response;
  } catch (error) {
    console.error("Erro ao chamar a API Gemini para gerar passeio rápido:", error);
    if (error instanceof Error) {
        if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key not valid')) {
             throw new Error("Chave de API inválida. Verifique sua configuração.");
        }
         if (error.message.includes('Quota') || error.message.includes('quota')) {
            throw new Error("Cota da API excedida. Tente novamente mais tarde.");
        }
        if (error.message.toLowerCase().includes('billing') || error.message.toLowerCase().includes('conta de faturamento')) {
            throw new Error("Problema com a conta de faturamento do Google Cloud. Verifique suas configurações de faturamento.");
        }
        if (error.message.toLowerCase().includes('permission denied') || error.message.toLowerCase().includes('access denied')) {
            throw new Error("Permissão negada para acessar a API Gemini. Verifique as permissões da sua chave de API no Google Cloud.");
        }
    }
    throw new Error("Falha ao gerar sugestões para passeio rápido. A IA pode estar sobrecarregada ou houve um problema na comunicação. Tente novamente.");
  }
};