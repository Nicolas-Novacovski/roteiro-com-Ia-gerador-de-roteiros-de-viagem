import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10 space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="text-xl text-slate-600 dark:text-slate-300">Gerando sua aventura...</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">Isso pode levar alguns segundos.</p>
    </div>
  );
};

export default LoadingSpinner;