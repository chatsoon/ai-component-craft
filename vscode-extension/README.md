# AI Component Craft - VS Code 扩展

🎨 **在VS Code中用AI生成高质量组件**

## ✨ 特性

- 🤖 **AI驱动** - 使用GPT-4生成组件代码
- 💻 **IDE集成** - 右键一键生成组件
- ⚡ **极速生成** - 几秒钟生成完整组件
- 🎯 **类型安全** - 自动生成TypeScript类型
- 🎨 **多框架支持** - React、Vue、Angular、Svelte

## 🚀 快速开始

### 安装

1. 在VS Code中搜索 "AI Component Craft"
2. 点击安装
3. 配置OpenAI API Key

### 配置API Key

1. 打开VS Code设置 (Ctrl+,)
2. 搜索 "AI Component Craft"
3. 在 `aiComponentCraft.apiKey` 中输入你的OpenAI API Key

或者使用命令面板：
```
Cmd/Ctrl + Shift + P → AI Component Craft: 打开设置
```

## 📖 使用方法

### 方法1: 右键菜单

1. 在文件资源管理器中右键点击文件夹
2. 选择 "生成AI组件"
3. 输入组件描述
4. 选择框架、样式方案
5. 组件自动生成并打开

### 方法2: 命令面板

1. 打开命令面板 (Cmd/Ctrl + Shift + P)
2. 输入 "生成AI组件"
3. 按照向导完成生成

## ⚙️ 设置选项

| 设置项 | 描述 | 默认值 |
|--------|------|--------|
| `aiComponentCraft.apiKey` | OpenAI API Key | "" |
| `aiComponentCraft.defaultFramework` | 默认框架 | "react" |
| `aiComponentCraft.defaultStyling` | 默认样式方案 | "tailwind" |
| `aiComponentCraft.typescript` | 默认使用TypeScript | true |
| `aiComponentCraft.model` | AI模型 | "gpt-4" |

## 🎯 示例

### 示例1: 生成按钮组件

**描述**: "创建一个渐变色的主按钮，支持加载状态"

**生成结果**:
```tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  loading = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};
```

### 示例2: 生成表单组件

**描述**: "创建一个用户登录表单，包含邮箱和密码输入"

**生成结果**: 完整的表单组件，包含状态管理、验证、提交处理

## 🛠️ 支持的技术栈

- **前端框架**: React, Vue 3, Angular, Svelte
- **样式方案**: Tailwind CSS, CSS, SCSS, Styled Components, CSS Modules
- **语言**: TypeScript / JavaScript

## 📝 注意事项

1. **需要OpenAI API Key** - 请确保你有可用的API Key
2. **API费用** - 生成组件会消耗OpenAI API额度
3. **网络要求** - 需要连接OpenAI API服务器

## 🐛 故障排除

### 无法生成组件
- 检查API Key是否正确配置
- 检查网络连接
- 查看VS Code输出面板的错误信息

### 生成的代码不符合预期
- 尝试更详细的描述
- 指定具体的框架和样式
- 使用英文描述可能效果更好

## 🤝 贡献

欢迎提交Issue和PR！

## 📄 许可证

MIT License

## 🔗 链接

- [GitHub](https://github.com/yourname/ai-component-craft)
- [文档](https://github.com/yourname/ai-component-craft#readme)
- [问题反馈](https://github.com/yourname/ai-component-craft/issues)

---

**如果对你有帮助，请给个⭐ Star！**