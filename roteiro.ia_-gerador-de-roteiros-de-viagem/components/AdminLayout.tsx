
import React, { useState } from 'react';

type AdminPage = 'generate' | 'all-itineraries';

interface AdminLayoutProps {
  children: (activePage: AdminPage) => React.ReactNode;
  onLogout: () => void;
  currentUsername: string;
}

const AdminSidebar: React.FC<{ onNavigate: (page: AdminPage) => void; activePage: AdminPage }> = ({ onNavigate, activePage }) => {
  const commonLinkClasses = "block w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors duration-150";
  const activeLinkClasses = "bg-blue-600 text-white";
  const inactiveLinkClasses = "text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700";

  return (
    <nav className="space-y-2">
      <button
        onClick={() => onNavigate('generate')}
        className={`${commonLinkClasses} ${activePage === 'generate' ? activeLinkClasses : inactiveLinkClasses}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Gerar Novo Roteiro
      </button>
      <button
        onClick={() => onNavigate('all-itineraries')}
        className={`${commonLinkClasses} ${activePage === 'all-itineraries' ? activeLinkClasses : inactiveLinkClasses}`}
      >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
         </svg>
        Todos os Roteiros
      </button>
    </nav>
  );
};


const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout, currentUsername }) => {
  const [activePage, setActivePage] = useState<AdminPage>('generate'); // Default page for admin

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Painel Admin - Roteiro.IA
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-slate-600 dark:text-slate-300 mr-4">
                Logado como: {currentUsername} (Admin)
              </span>
              <button
                onClick={onLogout}
                className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex">
        <aside className="w-64 bg-white dark:bg-slate-800 p-4 shadow-lg space-y-6">
            <AdminSidebar onNavigate={setActivePage} activePage={activePage} />
        </aside>
        
        <main className="flex-grow p-2 sm:p-4 md:p-6 overflow-auto">
          {children(activePage)}
        </main>
      </div>
       <footer className="text-center py-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Painel Administrativo Roteiro.IA
          </p>
        </footer>
    </div>
  );
};

export default AdminLayout;
