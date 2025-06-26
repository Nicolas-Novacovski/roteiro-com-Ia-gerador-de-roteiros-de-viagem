import React, { useState, useEffect, useCallback } from 'react';
import { ChecklistItem } from '../types';
import { IconLuggage, IconTrash, IconPlus, IconCheckboxChecked, IconCheckboxUnchecked } from './icons';

interface PackingChecklistProps {
  initialMarkdown: string;
  title: string;
  isPreparingPdfExport?: boolean;
}

const parseMarkdownToList = (markdown: string): Omit<ChecklistItem, 'id' | 'packed'>[] => {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const items = [];
  for (const line of lines) {
    const trimmedLine = line.trim();
    // Procura por itens de lista Markdown, opcionalmente com marcador de ícone (case-insensitive para a chave do ícone)
    const match = trimmedLine.match(/^(?:\*|-)\s*(?:\[ICON:[A-Za-z_]+\]\s*)?(.*)/);
    if (match && match[1]) {
      items.push({ text: match[1].trim() });
    }
  }
  return items;
};

const PackingChecklist: React.FC<PackingChecklistProps> = ({ initialMarkdown, title, isPreparingPdfExport }) => {
  const [isOpen, setIsOpen] = useState(true); // Default to open, or use a prop if more control needed initially
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');

  useEffect(() => {
    const parsedItems = parseMarkdownToList(initialMarkdown);
    setItems(parsedItems.map((item, index) => ({
      ...item,
      id: `initial-${index}-${Date.now()}`,
      packed: false,
    })));
  }, [initialMarkdown]);

  const handleTogglePacked = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim() === '') return;
    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      text: newItemText.trim(),
      packed: false,
    };
    setItems(prevItems => [...prevItems, newItem]);
    setNewItemText('');
  };

  const handleRemoveItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const displayTitle = title.replace(/^##\s*/, '').replace(/\[ICON:LUGGAGE\]\s*/i, '').trim();
  const contentShouldBeVisible = isOpen || !!isPreparingPdfExport;

  return (
    <div className="mb-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg packing-checklist-wrapper">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-opacity-75"
        aria-expanded={contentShouldBeVisible}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center">
          <IconLuggage className="h-6 w-6 mr-2 flex-shrink-0" />
          {displayTitle}
        </h2>
        <span className={`text-yellow-500 dark:text-yellow-400 transform transition-transform duration-200 ${contentShouldBeVisible ? 'rotate-180' : ''}`}>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>

      {contentShouldBeVisible && (
        <div className="p-4 sm:p-6 border-t border-yellow-200 dark:border-yellow-700 packing-checklist-content">
          <ul className="space-y-3 mb-4">
            {items.map(item => (
              <li key={item.id} className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center flex-grow">
                  <button
                    onClick={() => handleTogglePacked(item.id)}
                    className="mr-3 p-1 focus:outline-none"
                    aria-label={item.packed ? "Marcar como não embalado" : "Marcar como embalado"}
                  >
                    {item.packed ? (
                      <IconCheckboxChecked className="h-6 w-6 text-green-500" />
                    ) : (
                      <IconCheckboxUnchecked className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                    )}
                  </button>
                  <span className={`flex-grow ${item.packed ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                    {item.text}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-700/50"
                  aria-label={`Remover ${item.text}`}
                >
                  <IconTrash className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddItem} className="flex gap-2 mt-4">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Adicionar novo item..."
              className="flex-grow px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-sm dark:bg-slate-700 dark:text-slate-50"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md shadow-sm flex items-center"
            >
              <IconPlus className="h-5 w-5 mr-1" /> Adicionar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PackingChecklist;