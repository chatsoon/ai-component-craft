import { AIGenerator } from '../src/core/generator';
import { ComponentConfig } from '../src/types';

// Mock OpenAI
jest.mock('openai', () => {
  return {
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn()
        }
      }
    }))
  };
});

describe('AIGenerator Integration Tests', () => {
  let generator: AIGenerator;
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    generator = new AIGenerator(mockApiKey);
  });

  describe('Real-world component generation scenarios', () => {
    it('should handle button component generation', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [{
          message: {
            content: `
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={\`px-4 py-2 rounded \${variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'}\`}
    >
      {children}
    </button>
  );
};
            `.trim()
          }
        }]
      });
      (generator as any).openai.chat.completions.create = mockCreate;

      const config: ComponentConfig = {
        description: '创建一个支持多种样式的按钮组件',
        framework: 'react',
        typescript: true,
        styling: 'tailwind'
      };

      const result = await generator.generateComponent(config);
      
      expect(result.code).toContain('Button');
      expect(result.code).toContain('interface');
      expect(result.framework).toBe('react');
    });

    it('should handle form component generation', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [{
          message: {
            content: `
import React, { useState } from 'react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};
            `.trim()
          }
        }]
      });
      (generator as any).openai.chat.completions.create = mockCreate;

      const config: ComponentConfig = {
        description: '创建一个登录表单组件，包含邮箱和密码输入',
        framework: 'react',
        typescript: true,
        styling: 'css'
      };

      const result = await generator.generateComponent(config);
      
      expect(result.code).toContain('LoginForm');
      expect(result.code).toContain('useState');
      expect(result.code).toContain('onSubmit');
    });

    it('should handle data table component', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [{
          message: {
            content: `
import React from 'react';

interface DataTableProps<T> {
  data: T[];
  columns: Array<{
    key: keyof T;
    title: string;
  }>;
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map(col => (
              <td key={String(col.key)}>{String(row[col.key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
            `.trim()
          }
        }]
      });
      (generator as any).openai.chat.completions.create = mockCreate;

      const config: ComponentConfig = {
        description: '创建一个通用的数据表格组件，支持动态列',
        framework: 'react',
        typescript: true,
        styling: 'css'
      };

      const result = await generator.generateComponent(config);
      
      expect(result.code).toContain('DataTable');
      expect(result.code).toContain('generic');
    });

    it('should handle Vue component generation', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [{
          message: {
            content: `
<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
    <button @click="handleClick">Click me</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  title: string;
  content: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}
</style>
            `.trim()
          }
        }]
      });
      (generator as any).openai.chat.completions.create = mockCreate;

      const config: ComponentConfig = {
        description: '创建一个卡片组件，支持标题、内容和点击事件',
        framework: 'vue',
        typescript: true,
        styling: 'css'
      };

      const result = await generator.generateComponent(config);
      
      expect(result.code).toContain('<template>');
      expect(result.code).toContain('defineProps');
      expect(result.framework).toBe('vue');
    });
  });

  describe('Error handling scenarios', () => {
    it('should handle network errors gracefully', async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error('Network Error'));
      (generator as any).openai.chat.completions.create = mockCreate;

      const config: ComponentConfig = {
        description: 'Test component',
        framework: 'react'
      };

      await expect(generator.generateComponent(config))
        .rejects
        .toThrow('Failed to generate component');
    });

    it('should handle API rate limiting', async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error('Rate limit exceeded'));
      (generator as any).openai.chat.completions.create = mockCreate;

      const config: ComponentConfig = {
        description: 'Test component',
        framework: 'react'
      };

      await expect(generator.generateComponent(config))
        .rejects
        .toThrow('Failed to generate component');
    });

    it('should handle invalid API key', async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error('Invalid API key'));
      (generator as any).openai.chat.completions.create = mockCreate;

      const config: ComponentConfig = {
        description: 'Test component',
        framework: 'react'
      };

      await expect(generator.generateComponent(config))
        .rejects
        .toThrow('Failed to generate component');
    });

    it('should handle timeout errors', async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error('Request timeout'));
      (generator as any).openai.chat.completions.create = mockCreate;

      const config: ComponentConfig = {
        description: 'Test component',
        framework: 'react'
      };

      await expect(generator.generateComponent(config))
        .rejects
        .toThrow('Failed to generate component');
    });
  });
});