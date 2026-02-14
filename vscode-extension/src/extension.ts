import * as vscode from 'vscode';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

// 扩展激活时调用
export function activate(context: vscode.ExtensionContext) {
    console.log('AI Component Craft 扩展已激活');

    // 注册生成组件命令
    let generateCommand = vscode.commands.registerCommand(
        'ai-component-craft.generateComponent',
        async (uri: vscode.Uri) => {
            try {
                await generateComponent(uri);
            } catch (error) {
                vscode.window.showErrorMessage(`错误: ${error}`);
            }
        }
    );

    // 注册打开设置命令
    let settingsCommand = vscode.commands.registerCommand(
        'ai-component-craft.openSettings',
        () => {
            vscode.commands.executeCommand(
                'workbench.action.openSettings',
                'aiComponentCraft'
            );
        }
    );

    context.subscriptions.push(generateCommand);
    context.subscriptions.push(settingsCommand);

    // 显示欢迎消息
    showWelcomeMessage();
}

// 生成组件主函数
async function generateComponent(uri?: vscode.Uri) {
    // 获取API Key
    const config = vscode.workspace.getConfiguration('aiComponentCraft');
    const apiKey = config.get<string>('apiKey');

    if (!apiKey) {
        const action = await vscode.window.showWarningMessage(
            '请配置OpenAI API Key',
            '打开设置',
            '取消'
        );
        if (action === '打开设置') {
            vscode.commands.executeCommand(
                'workbench.action.openSettings',
                'aiComponentCraft.apiKey'
            );
        }
        return;
    }

    // 获取目标文件夹
    let targetFolder: string;
    if (uri && uri.fsPath) {
        targetFolder = uri.fsPath;
    } else {
        const folders = vscode.workspace.workspaceFolders;
        if (!folders || folders.length === 0) {
            vscode.window.showErrorMessage('请先打开一个工作区文件夹');
            return;
        }
        targetFolder = folders[0].uri.fsPath;
    }

    // 获取组件描述
    const description = await vscode.window.showInputBox({
        prompt: '描述你想要的组件',
        placeHolder: '例如：创建一个带搜索功能的用户列表组件',
        validateInput: (value) => {
            if (!value || value.trim().length === 0) {
                return '描述不能为空';
            }
            return null;
        }
    });

    if (!description) {
        return;
    }

    // 获取框架选择
    const framework = await vscode.window.showQuickPick(
        [
            { label: 'React', value: 'react' },
            { label: 'Vue', value: 'vue' },
            { label: 'Angular', value: 'angular' },
            { label: 'Svelte', value: 'svelte' }
        ],
        {
            placeHolder: '选择框架',
            default: config.get<string>('defaultFramework') || 'react'
        }
    );

    if (!framework) {
        return;
    }

    // 获取样式方案
    const styling = await vscode.window.showQuickPick(
        [
            { label: 'Tailwind CSS', value: 'tailwind' },
            { label: 'CSS', value: 'css' },
            { label: 'SCSS', value: 'scss' },
            { label: 'Styled Components', value: 'styled-components' },
            { label: 'CSS Modules', value: 'css-modules' }
        ],
        {
            placeHolder: '选择样式方案',
            default: config.get<string>('defaultStyling') || 'tailwind'
        }
    );

    if (!styling) {
        return;
    }

    // 是否使用TypeScript
    const useTypescript = await vscode.window.showQuickPick(
        [
            { label: '是', value: true },
            { label: '否', value: false }
        ],
        {
            placeHolder: '使用TypeScript?',
            default: config.get<boolean>('typescript') ? '是' : '否'
        }
    );

    if (useTypescript === undefined) {
        return;
    }

    // 显示进度
    await vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: '正在生成组件...',
            cancellable: false
        },
        async (progress) => {
            try {
                progress.report({ increment: 0 });

                // 初始化OpenAI
                const openai = new OpenAI({ apiKey });

                progress.report({ increment: 30, message: '调用AI生成代码...' });

                // 生成组件
                const componentCode = await generateComponentCode(
                    openai,
                    description,
                    framework.value,
                    styling.value,
                    useTypescript.value
                );

                progress.report({ increment: 60, message: '保存文件...' });

                // 确定文件名
                const fileExtension = useTypescript.value ? 'tsx' : 'jsx';
                const fileName = `GeneratedComponent.${fileExtension}`;
                const filePath = path.join(targetFolder, fileName);

                // 检查文件是否已存在
                if (fs.existsSync(filePath)) {
                    const overwrite = await vscode.window.showWarningMessage(
                        `文件 ${fileName} 已存在，是否覆盖?`,
                        '覆盖',
                        '取消'
                    );
                    if (overwrite !== '覆盖') {
                        return;
                    }
                }

                // 写入文件
                fs.writeFileSync(filePath, componentCode, 'utf8');

                progress.report({ increment: 100, message: '完成!' });

                // 打开文件
                const document = await vscode.workspace.openTextDocument(filePath);
                await vscode.window.showTextDocument(document);

                vscode.window.showInformationMessage(
                    `组件已生成: ${fileName}`,
                    '查看文件'
                ).then(selection => {
                    if (selection === '查看文件') {
                        vscode.commands.executeCommand('revealFileInOS', document.uri);
                    }
                });

            } catch (error) {
                vscode.window.showErrorMessage(`生成失败: ${error}`);
                throw error;
            }
        }
    );
}

// 调用AI生成组件代码
async function generateComponentCode(
    openai: OpenAI,
    description: string,
    framework: string,
    styling: string,
    useTypescript: boolean
): Promise<string> {
    const prompt = buildPrompt(description, framework, styling, useTypescript);

    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: `You are an expert ${framework} developer. Generate clean, production-ready code.`
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
    return cleanGeneratedCode(code);
}

// 构建提示词
function buildPrompt(
    description: string,
    framework: string,
    styling: string,
    useTypescript: boolean
): string {
    return `Generate a ${framework} component with the following description:
${description}

Requirements:
- Framework: ${framework}
- ${useTypescript ? 'Use TypeScript with proper type definitions' : 'Use JavaScript'}
- Styling: ${styling}
- Make it production-ready
- Include comments
- Follow best practices

Please provide only the code, no explanations.`;
}

// 清理生成的代码
function cleanGeneratedCode(code: string): string {
    // 移除markdown代码块标记
    return code.replace(/```[a-z]*\n?/g, '').trim();
}

// 显示欢迎消息
async function showWelcomeMessage() {
    const config = vscode.workspace.getConfiguration('aiComponentCraft');
    const apiKey = config.get<string>('apiKey');

    if (!apiKey) {
        const action = await vscode.window.showInformationMessage(
            '欢迎使用 AI Component Craft! 🎉\n请配置您的OpenAI API Key开始生成组件。',
            '配置API Key',
            '查看文档'
        );

        if (action === '配置API Key') {
            vscode.commands.executeCommand(
                'workbench.action.openSettings',
                'aiComponentCraft.apiKey'
            );
        } else if (action === '查看文档') {
            vscode.env.openExternal(
                vscode.Uri.parse('https://github.com/yourname/ai-component-craft')
            );
        }
    }
}

// 扩展停用时调用
export function deactivate() {
    console.log('AI Component Craft 扩展已停用');
}