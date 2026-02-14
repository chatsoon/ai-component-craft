import { AIGenerator } from '../src/core/generator';
import { ComponentConfig } from '../src/types';

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

  beforeEach(() => {
    generator = new AIGenerator('test-api-key');
  });

  describe('generateComponent', () => {
    it('should generate a React component successfully', async () => {
      const config: ComponentConfig = {
        description: 'Create a button component',
        framework: 'react',
        typescript: true,
        styling: 'tailwind'
      };

      const result = await generator.generateComponent(config);

      expect(result).toBeDefined();
      expect(result.code).toContain('React');
      expect(result.framework).toBe('react');
      expect(result.typescript).toBe(true);
      expect(result.styling).toBe('tailwind');
      expect(result.timestamp).toBeDefined();
    });

    it('should handle Vue components', async () => {
      const config: ComponentConfig = {
        description: 'Create a card component',
        framework: 'vue',
        typescript: false,
        styling: 'css'
      };

      const result = await generator.generateComponent(config);

      expect(result.framework).toBe('vue');
      expect(result.typescript).toBe(false);
    });

    it('should throw error when API fails', async () => {
      const config: ComponentConfig = {
        description: 'Test',
        framework: 'react'
      };

      // Mock API failure
      const mockCreate = jest.fn().mockRejectedValue(new Error('API Error'));
      (generator as any).openai.chat.completions.create = mockCreate;

      await expect(generator.generateComponent(config)).rejects.toThrow('Failed to generate component');
    });
  });
});

describe('ComponentConfig', () => {
  it('should accept valid config', () => {
    const config: ComponentConfig = {
      description: 'A button component',
      framework: 'react',
      typescript: true,
      styling: 'tailwind',
      outputPath: './components'
    };

    expect(config.description).toBe('A button component');
    expect(config.framework).toBe('react');
    expect(config.typescript).toBe(true);
  });
});