import { ComponentConfig, GeneratedComponent, CLIOptions, AppConfig } from '../src/types';

describe('Type Definitions', () => {
  describe('ComponentConfig', () => {
    it('should define ComponentConfig interface correctly', () => {
      const config: ComponentConfig = {
        description: 'Test component',
        framework: 'react',
        typescript: true,
        styling: 'tailwind',
        uiLibrary: 'material-ui',
        outputPath: './output'
      };

      expect(config).toHaveProperty('description');
      expect(config).toHaveProperty('framework');
      expect(config.description).toBe('Test component');
      expect(config.framework).toBe('react');
    });

    it('should accept minimal config', () => {
      const config: ComponentConfig = {
        description: 'Simple',
        framework: 'vue'
      };

      expect(config.description).toBe('Simple');
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

    it('should accept all styling types', () => {
      const stylings: Array<ComponentConfig['styling']> = [
        'tailwind', 'css', 'scss', 'styled-components', 'css-modules'
      ];
      
      stylings.forEach(styling => {
        const config: ComponentConfig = {
          description: 'Test',
          framework: 'react',
          styling
        };
        expect(config.styling).toBe(styling);
      });
    });

    it('should accept all UI library types', () => {
      const libraries: Array<ComponentConfig['uiLibrary']> = [
        'material-ui', 'ant-design', 'chakra-ui', 'element-plus'
      ];
      
      libraries.forEach(library => {
        const config: ComponentConfig = {
          description: 'Test',
          framework: 'react',
          uiLibrary: library
        };
        expect(config.uiLibrary).toBe(library);
      });
    });
  });

  describe('GeneratedComponent', () => {
    it('should define GeneratedComponent interface correctly', () => {
      const component: GeneratedComponent = {
        code: 'const x = 1;',
        framework: 'react',
        typescript: true,
        styling: 'tailwind',
        timestamp: new Date().toISOString()
      };

      expect(component.code).toBe('const x = 1;');
      expect(component.framework).toBe('react');
      expect(component.typescript).toBe(true);
      expect(component.styling).toBe('tailwind');
      expect(component.timestamp).toBeDefined();
    });
  });

  describe('CLIOptions', () => {
    it('should define CLIOptions interface correctly', () => {
      const options: CLIOptions = {
        description: 'Test',
        framework: 'react',
        typescript: true,
        styling: 'tailwind',
        output: './components',
        config: './config.json'
      };

      expect(options.description).toBe('Test');
      expect(options.framework).toBe('react');
      expect(options.typescript).toBe(true);
      expect(options.styling).toBe('tailwind');
      expect(options.output).toBe('./components');
      expect(options.config).toBe('./config.json');
    });

    it('should accept empty options', () => {
      const options: CLIOptions = {};
      expect(Object.keys(options).length).toBe(0);
    });

    it('should accept partial options', () => {
      const options: CLIOptions = {
        description: 'Test',
        framework: 'vue'
      };

      expect(options.description).toBe('Test');
      expect(options.framework).toBe('vue');
      expect(options.typescript).toBeUndefined();
    });
  });

  describe('AppConfig', () => {
    it('should define AppConfig interface correctly', () => {
      const config: AppConfig = {
        apiKey: 'test-key',
        defaultFramework: 'react',
        defaultStyling: 'tailwind',
        typescript: true,
        templatesDir: './templates'
      };

      expect(config.apiKey).toBe('test-key');
      expect(config.defaultFramework).toBe('react');
      expect(config.defaultStyling).toBe('tailwind');
      expect(config.typescript).toBe(true);
      expect(config.templatesDir).toBe('./templates');
    });

    it('should accept minimal config', () => {
      const config: AppConfig = {
        apiKey: 'key',
        defaultFramework: 'react',
        defaultStyling: 'css',
        typescript: false
      };

      expect(config.apiKey).toBe('key');
      expect(config.templatesDir).toBeUndefined();
    });
  });
});