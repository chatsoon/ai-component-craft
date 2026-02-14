import OpenAI from 'openai';
import { ComponentConfig, GeneratedComponent } from '../types';

export class AIGenerator {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateComponent(config: ComponentConfig): Promise<GeneratedComponent> {
    const prompt = this.buildPrompt(config);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert frontend developer specializing in ${config.framework}. 
            Generate clean, production-ready code with TypeScript support.
            Follow best practices and modern patterns.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const code = response.choices[0]?.message?.content || '';
      
      return {
        code: this.cleanGeneratedCode(code),
        framework: config.framework,
        typescript: config.typescript || false,
        styling: config.styling || 'css',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to generate component: ${error.message}`);
    }
  }

  private buildPrompt(config: ComponentConfig): string {
    const { description, framework, typescript, styling, uiLibrary } = config;
    
    let prompt = `Generate a ${framework} component with the following description:\n${description}\n\n`;
    
    prompt += `Requirements:\n`;
    prompt += `- Framework: ${framework}\n`;
    prompt += `- TypeScript: ${typescript ? 'Yes, include proper types' : 'No'}\n`;
    prompt += `- Styling: ${styling}\n`;
    
    if (uiLibrary) {
      prompt += `- UI Library: ${uiLibrary}\n`;
    }
    
    prompt += `\nPlease provide:\n`;
    prompt += `1. Complete component code\n`;
    prompt += `2. TypeScript interfaces/types (if applicable)\n`;
    prompt += `3. Styling code\n`;
    prompt += `4. Usage example\n`;
    prompt += `\nEnsure the code is production-ready, well-commented, and follows best practices.`;
    
    return prompt;
  }

  private cleanGeneratedCode(code: string): string {
    // Remove markdown code blocks if present
    return code.replace(/```[a-z]*\n?/g, '').trim();
  }
}