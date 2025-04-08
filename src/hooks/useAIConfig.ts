import { useState, useEffect } from 'react';

export interface AIConfig {
  baseURL: string;
  model: string;
  apiKey: string;
}

const useAIConfig = () => {
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

  const saveConfig = () => {
    localStorage.setItem('aiConfig', JSON.stringify(config));
    setConfig({ ...config });
  };

  return { config, setConfig, saveConfig };
};

export default useAIConfig;
