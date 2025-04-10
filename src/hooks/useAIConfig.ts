import { AIConfigContext } from '@/components/AI/Provider';
import { useContext } from 'react';

export interface AIConfig {
  baseURL: string;
  model: string;
  apiKey: string;
}

const useAIConfig = () => {
  const context = useContext(AIConfigContext);

  if (!context) {
    throw new Error('useAIConfig must be used within an AIProvider');
  }
  return context;
};

export default useAIConfig;
