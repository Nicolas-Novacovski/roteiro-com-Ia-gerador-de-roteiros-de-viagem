
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (username: string, role: UserRole) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, error, setError }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (usernameInput === 'usuario' && passwordInput === 'senha') {
      onLogin(usernameInput, 'user');
    } else if (usernameInput === 'admin' && passwordInput === 'admin') {
      onLogin(usernameInput, 'admin');
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            Roteiro.IA <span role="img" aria-label="airplane">✈️</span>
          </h1>
          <h2 className="mt-4 text-center text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Faça login na sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 dark:bg-red-800 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded-md relative" role="alert">
              <strong className="font-bold">Erro: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Usuário
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-slate-300 dark:border-slate-600 px-3 py-3 text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:bg-slate-700"
                placeholder="Usuário (admin ou usuario)"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-slate-300 dark:border-slate-600 px-3 py-3 text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:bg-slate-700"
                placeholder="Senha (admin ou senha)"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              Entrar
            </button>
          </div>
        </form>
         <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            Usuário: (usuario / senha) <br />
            Admin: (admin / admin)
          </p>
      </div>
    </div>
  );
};

export default LoginPage;
