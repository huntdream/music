import useAIConfig, { AIConfig } from '@/hooks/useAIConfig';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Config() {
  const { config, setConfig, saveConfig } = useAIConfig();

  const handleChange = (key: keyof AIConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>AI Provider Configuration</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Endpoint:</label>
          <Input
            type='text'
            value={config.baseURL}
            onChange={(e) => handleChange('baseURL', e.target.value)}
            placeholder='Enter API endpoint'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Model:</label>
          <Input
            type='text'
            value={config.model}
            onChange={(e) => handleChange('model', e.target.value)}
            placeholder='Enter model name'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>API Key:</label>
          <Input
            type='password'
            value={config.apiKey}
            onChange={(e) => handleChange('apiKey', e.target.value)}
            placeholder='Enter API key'
          />
        </div>
        <Button onClick={saveConfig} className='w-full'>
          Save
        </Button>
      </CardContent>
    </Card>
  );
}
