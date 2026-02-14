export interface ComponentConfig {
  description: string;
  framework: 'react' | 'vue' | 'angular' | 'svelte';
  typescript?: boolean;
  styling?: 'tailwind' | 'css' | 'scss' | 'styled-components' | 'css-modules';
  uiLibrary?: 'material-ui' | 'ant-design' | 'chakra-ui' | 'element-plus';
  outputPath?: string;
}

export interface GeneratedComponent {
  code: string;
  framework: string;
  typescript: boolean;
  styling: string;
  timestamp: string;
}

export interface CLIOptions {
  description?: string;
  framework?: string;
  typescript?: boolean;
  styling?: string;
  output?: string;
  config?: string;
}

export interface AppConfig {
  apiKey: string;
  defaultFramework: string;
  defaultStyling: string;
  typescript: boolean;
  templatesDir?: string;
}