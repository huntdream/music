import useAIConfig, { AIConfig } from '@/hooks/useAIConfig';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FC, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  onSave: (config: AIConfig) => void;
}

const Config: FC<Props> = ({ onSave }) => {
  const { config, saveConfig } = useAIConfig();
  const [aiConfig, setAIConfig] = useState<AIConfig>(config);

  useEffect(() => {
    setAIConfig(config);
  }, []);

  const handleChange = (key: keyof AIConfig, value: string) => {
    setAIConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveConfig(aiConfig);
    toast.success('配置已保存');
    onSave(aiConfig);
  };

  return (
    <div className='max-w-md mx-auto space-y-4 p-4'>
      <div>
        <label className='block text-sm font-medium mb-1'>Endpoint:</label>
        <Input
          type='text'
          value={aiConfig.baseURL}
          onChange={(e) => handleChange('baseURL', e.target.value)}
          placeholder='Enter API endpoint'
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Model:</label>
        <Input
          type='text'
          value={aiConfig.model}
          onChange={(e) => handleChange('model', e.target.value)}
          placeholder='Enter model name'
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>API Key:</label>
        <Input
          value={aiConfig.apiKey}
          onChange={(e) => handleChange('apiKey', e.target.value)}
          placeholder='Enter API key'
        />
      </div>
      <Button onClick={handleSave} className='w-full'>
        Save
      </Button>
    </div>
  );
};

export default Config;
