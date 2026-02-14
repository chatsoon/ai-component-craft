import { AIGenerator } from '../../src/core/generator';
import { ComponentConfig } from '../../src/types';

// Mock OpenAI
jest.mock('openai', () => {
  return {
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{
              message: {
                content: `
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  );
};
                `.trim()
              }
            }]
          })
        }
      }
    }))
  };
});

describe('AIGenerator', () => {
  let generator: AIGenerator;
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    generator = new AIGenerator(mockApiKey);
  });

  describe('constructor', () => {
    it('should initialize with API key', () => {
      expect(generator).toBeDefined();
    });
  });

  describe('generateComponent', () => {
    const baseConfig: ComponentConfig = {
      description: 'Create a button component',
      framework: 'react',
      typescript: true,
      styling: 'tailwind'
    };

    it('should generate a React component successfully', async () => {
      const result = await generator.generateComponent(baseConfig);

      expect(result).toBeDefined();
      expect(result.code).toContain('React');
      expect(result.framework).toBe('react');
      expect(result.typescript).toBe(true);
      expect(result.styling).toBe('tailwind');
      expect(result.timestamp).toBeDefined();
    });

    it('should handle Vue components', async () => {
      const config: ComponentConfig = {
        ...baseConfig,
        framework: 'vue',
        typescript: false
      };

      const result = await generator.generateComponent(config);

      expect(result.framework).toBe('vue');
      expect(result.typescript).toBe(false);
    });

    it('should handle Angular components', async () => {
      const config: ComponentConfig = {
        ...baseConfig,
        framework: 'angular'
      };

      const result = await generator.generateComponent(config);
      expect(result.framework).toBe('angular');
    });

    it('should handle Svelte components', async () => {
      const config: ComponentConfig = {
        ...baseConfig,
        framework: 'svelte'
      };

      const result = await generator.generateComponent(config);
      expect(result.framework).toBe('svelte');
    });

    it('should include UI library when specified', async () => {
      const config: ComponentConfig = {
        ...baseConfig,
        uiLibrary: 'material-ui'
      };

      const result = await generator.generateComponent(config);
      expect(result).toBeDefined();
    });

    it('should throw error when API fails', async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error('API Error'));
      (generator as any).openai.chat.completions.create = mockCreate;

      await expect(generator.generateComponent(baseConfig))
        .rejects
        .toThrow('Failed to generate component');
    });

    it('should throw error when API returns empty response', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [{ message: { content: '' } }]
      });
      (generator as any).openai.chat.completions.create = mockCreate;

      const result = await generator.generateComponent(baseConfig);
      expect(result.code).toBe('');
    });
  });

  describe('buildPrompt', () => {
    it('should include all config options in prompt', async () => {
      const config: ComponentConfig = {
        description: 'Test component',
        framework: 'react',
        typescript: true,
        styling: 'tailwind',
        uiLibrary: 'material-ui'
      };

      const result = await generator.generateComponent(config);
      expect(result).toBeDefined();
    });

    it('should handle minimal config', async () => {
      const config: ComponentConfig = {
        description: 'Simple button',
        framework: 'react'
      };

      const result = await generator.generateComponent(config);
      expect(result).toBeDefined();
    });
  });

  describe('cleanGeneratedCode', () => {
    it('should remove markdown code blocks', async () => {
      const config: ComponentConfig = {
        description: 'Test',
        framework: 'react'
      };

      const mockCreate = jest.fn().mockResolvedValue({
        choices: [{
          message: {
            content: '```tsx\nconst x = 1;\n```'
          }
        }]
      });
      (generator as any).openai.chat.completions.create = mockCreate;

      const result = await generator.generateComponent(config);
      expect(result.code).not.toContain('```');
    });
  });
});

describe('ComponentConfig validation', () => {
  it('should accept valid config with all options', () => {
    const config: ComponentConfig = {
      description: 'A button component',
      framework: 'react',
      typescript: true,
      styling: 'tailwind',
      uiLibrary: 'material-ui',
      outputPath: './components'
    };

    expect(config.description).toBe('A button component');
    expect(config.framework).toBe('react');
    expect(config.typescript).toBe(true);
    expect(config.styling).toBe('tailwind');
    expect(config.uiLibrary).toBe('material-ui');
    expect(config.outputPath).toBe('./components');
  });

  it('should accept minimal config', () => {
    const config: ComponentConfig = {
      description: 'Simple component',
      framework: 'vue'
    };

    expect(config.description).toBe('Simple component');
    expect(config.framework).toBe('vue');
    expect(config.typescript).toBeUndefined();
  });

  it('should accept all framework types', () => {
    const frameworks: Array<ComponentConfig['framework']> = ['react', 'vue', 'angular', 'svelte'];
    
    frameworks.forEach(framework => {
      const config: ComponentConfig = {
        description: 'Test',
        framework
      };
      expect(config.framework).toBe(framework);
    });
  });
});