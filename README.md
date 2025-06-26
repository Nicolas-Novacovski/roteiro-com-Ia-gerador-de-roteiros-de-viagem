<div align="center">

# 🌍 Roteiro.IA

### Gerador de Roteiros de Viagem com Inteligência Artificial

[![React](https://img.shields.io/badge/React-19-blue?logo=react)]() [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-Utility--First-38BDF8?logo=tailwind-css)]() [![Google Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20AI-ffcc00?logo=google)]()

</div>

---

## ✨ Sobre o Projeto

**Roteiro.IA** é uma aplicação web inovadora que usa **IA Generativa (Google Gemini)** para **criar roteiros de viagem personalizados**, com detalhes como sugestões diárias, lista de bagagem, frases úteis em outros idiomas, exportação em PDF/HTML e muito mais.

---

## 🧭 Funcionalidades

### 🔹 Roteiro Completo

* Criação de roteiros com:

  * Destinos únicos ou múltiplos
  * Estilo e tom personalizados (cultural, gastronômico, relaxamento etc.)
  * Duração da viagem e perfil de orçamento
  * Dicas de idioma, vistos/documentos, lista de bagagem
* **IA Gera um Itinerário Completo**, com:

  * Atividades por período do dia
  * Sugestões com links, horários, custos e mapas
  * Ícones visuais no conteúdo gerado em Markdown
  * Imagem do destino via IA
  * Opção de refinar roteiros com novas instruções
* Histórico e favoritos
* Templates prontos para reutilização
* Exportação para **PDF** e **HTML**

### ⚡ Passeio Express

* Sugestões rápidas para janelas de tempo livres
* Entrada simples: tempo disponível, localização e foco
* 1 a 3 sugestões com endereço, duração, links no Google Maps
* Respostas em Markdown organizadas e visuais

### 🔐 Autenticação e Perfis

* Perfis `usuário` e `admin` com login simplificado
* Usuários acessam seus roteiros e favoritos
* Admins gerenciam todos os roteiros e criam templates oficiais

---

## 🧰 Tecnologias Utilizadas

### 🔸 Frontend

* **React 19** + **TypeScript**
* **Tailwind CSS** via CDN
* **React Markdown** + `remark-gfm` (suporte a ícones, listas etc.)

### 🔸 IA (Google Gemini)

* `gemini-2.5-flash-preview-04-17` (texto)
* `imagen-3.0-generate-002` (imagem do destino)
* Uso de `googleSearch` para grounding em informações atualizadas

### 🔸 Exportação

* `jsPDF` + `html2canvas` para gerar PDFs com conteúdo e imagens

### 🔸 Armazenamento

* `localStorage` para histórico de roteiros e login

### 🔸 Build

* ES6 Modules direto no navegador (sem Webpack/Vite)
* Utilização de `importmap` e `type="module"` no HTML

---

## 📁 Estrutura do Projeto

```
/
├── public/
├── src/
│   ├── components/         # Componentes principais da UI
│   ├── services/           # Comunicação com a API Gemini
│   ├── App.tsx             # Componente raiz
│   ├── constants.ts        # Dados fixos
│   ├── types.ts            # Tipagens TypeScript
│   └── index.tsx           # Ponto de entrada
├── index.html              # Carrega Tailwind + módulos
├── tsconfig.json           # Configurações TypeScript
└── README.md               # Este documento
```

---

## ⚙️ Como Rodar

1. **Configure sua chave de API Gemini**:

   * Crie uma variável de ambiente `process.env.API_KEY`
   * **Nunca coloque a chave diretamente no código**

2. **Execute localmente**:

   * Basta abrir o `index.html` em um navegador moderno com suporte a `importmap` e ES6 Modules

---

## 🔑 Componentes de Destaque

| Componente             | Função                                            |
| ---------------------- | ------------------------------------------------- |
| `App.tsx`              | Orquestra a aplicação e estados globais           |
| `UserPage.tsx`         | Página com abas de Roteiro e Passeio Express      |
| `ItineraryForm.tsx`    | Formulário para gerar o roteiro completo          |
| `QuickTripForm.tsx`    | Formulário para o passeio rápido                  |
| `ItineraryDisplay.tsx` | Exibe o conteúdo do roteiro em Markdown           |
| `DaySection.tsx`       | Renderiza cada dia do roteiro e seções auxiliares |
| `PackingChecklist.tsx` | Lista de bagagem interativa                       |
| `geminiService.ts`     | Funções para comunicação com a API Gemini         |

---

## 🌐 Integração com a IA

* **Roteiros**: IA constrói itinerário completo com ícones, dicas, e links
* **Passeios Express**: Sugestões rápidas com base na localização e tempo livre
* **Imagem**: Geração de imagem do destino com IA (Imagen 3)
* **Erros**: Tratamento de erros da API (chave inválida, limite excedido etc.)

---

## 🚧 Melhorias Futuras

* Persistência com banco de dados real (Firebase, Supabase)
* Login real com sistema de contas
* Compartilhamento de roteiros e colaboração
* Sugestões de voos/hospedagens com APIs externas
* Suporte a temas e internacionalização (i18n)

---

## 🤝 Contribuições

Sinta-se à vontade para abrir issues, sugerir melhorias ou contribuir com o código!
Bora transformar o planejamento de viagens em algo simples, prático e incrível! 🌟
