#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { AIGenerator } from '../core/generator';
import { ComponentConfig, CLIOptions } from '../types';

const program = new Command();

program
  .name('ai-component-craft')
  .description('用自然语言生成高质量React/Vue组件')
  .version('0.1.0');

program
  .command('generate')
  .alias('g')
  .description('生成组件')
  .option('-d, --description <desc>', '组件描述')
  .option('-f, --framework <framework>', '框架类型 (react|vue|angular|svelte)', 'react')
  .option('--typescript', '使用TypeScript', false)
  .option('-s, --styling <styling>', '样式方案 (tailwind|css|scss|styled-components)', 'tailwind')
  .option('-o, --output <path>', '输出路径', './components')
  .option('-c, --config <path>', '配置文件路径')
  .action(async (options: CLIOptions) => {
    try {
      // 如果没有提供描述，交互式询问
      let config: Partial<ComponentConfig> = {
        framework: options.framework as any,
        typescript: options.typescript,
        styling: options.styling as any,
        outputPath: options.output
      };

      if (!options.description) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'description',
            message: '请描述你想要的组件:',
            validate: (input) => input.trim() !== '' || '描述不能为空'
          },
          {
            type: 'list',
            name: 'framework',
            message: '选择框架:',
            choices: ['react', 'vue', 'angular', 'svelte'],
            default: options.framework
          },
          {
            type: 'confirm',
            name: 'typescript',
            message: '使用TypeScript?',
            default: options.typescript
          },
          {
            type: 'list',
            name: 'styling',
            message: '选择样式方案:',
            choices: ['tailwind', 'css', 'scss', 'styled-components', 'css-modules'],
            default: options.styling
          }
        ]);

        config = { ...config, ...answers };
      } else {
        config.description = options.description;
      }

      // 检查API Key
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        console.log(chalk.red('错误: 请设置 OPENAI_API_KEY 环境变量'));
        console.log(chalk.yellow('示例: export OPENAI_API_KEY=your-api-key'));
        process.exit(1);
      }

      // 生成组件
      const spinner = ora('正在生成组件...').start();
      
      const generator = new AIGenerator(apiKey);
      const component = await generator.generateComponent(config as ComponentConfig);
      
      spinner.succeed('组件生成成功!');

      // 保存文件
      const outputDir = path.resolve(config.outputPath || './components');
      await fs.ensureDir(outputDir);

      const fileName = `GeneratedComponent.${component.typescript ? 'tsx' : 'jsx'}`;
      const filePath = path.join(outputDir, fileName);

      await fs.writeFile(filePath, component.code);

      console.log(chalk.green(`✓ 组件已保存到: ${filePath}`));
      console.log(chalk.blue('\n生成的组件代码:\n'));
      console.log(component.code);

    } catch (error: any) {
      console.error(chalk.red('错误:'), error.message);
      process.exit(1);
    }
  });

program
  .command('config')
  .description('配置设置')
  .action(() => {
    console.log(chalk.blue('配置功能开发中...'));
    console.log(chalk.yellow('当前请使用环境变量设置API Key:'));
    console.log('export OPENAI_API_KEY=your-api-key');
  });

program.parse();