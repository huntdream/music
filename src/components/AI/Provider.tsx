import React, { createContext, ReactNode, useState, useEffect } from 'react';

interface AIProviderProps {
  children: ReactNode;
}

export interface AIConfig {
  baseURL: string;
  model: string;
  apiKey: string;
}

export const AIConfigContext = createContext<{
  config: AIConfig;
  saveConfig: (newConfig: AIConfig) => void;
} | null>(null);

const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<AIConfig>({
    baseURL: '',
    model: '',
    apiKey: '',
  });

  useEffect(() => {
    const storedConfig = JSON.parse(localStorage.getItem('aiConfig') || '{}');
    setConfig({
      baseURL: storedConfig.baseURL || '',
      model: storedConfig.model || '',
      apiKey: storedConfig.apiKey || '',
    });
  }, []);

  const saveConfig = (newConfig: AIConfig) => {
    localStorage.setItem('aiConfig', JSON.stringify(newConfig));
    setConfig({ ...newConfig });
  };

  return (
    <AIConfigContext.Provider value={{ config, saveConfig }}>
      {children}
    </AIConfigContext.Provider>
  );
};

export default AIProvider;
