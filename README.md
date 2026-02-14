# AI Component Craft

🎨 **用自然语言生成高质量React/Vue组件**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/ai-component-craft.svg)](https://www.npmjs.com/package/ai-component-craft)
[![GitHub stars](https://img.shields.io/github/stars/yourname/ai-component-craft?style=social)](https://github.com/yourname/ai-component-craft/stargazers)

## ✨ 特性

- 🤖 **AI驱动** - 使用GPT-4/Claude生成高质量代码
- ⚡ **极速生成** - 几秒钟生成完整组件
- 🎯 **类型安全** - 自动生成TypeScript类型
- 🎨 **多种框架** - 支持React、Vue、Angular
- 🔧 **自定义模板** - 支持自定义组件模板
- 💻 **IDE集成** - VS Code插件支持

## 📸 效果演示

![Demo](docs/demo.gif)

**输入**: "创建一个带搜索功能的用户列表组件，包含头像、姓名、邮箱，支持分页"

**输出**: 完整的React组件代码，包含TypeScript类型、样式、交互逻辑

## 🚀 快速开始

### 安装

```bash
# 全局安装CLI
npm install -g ai-component-craft

# 或者使用npx
npx ai-component-craft
```

### VS Code扩展

在VS Code扩展商店搜索 "AI Component Craft" 并安装

### 基本使用

#### CLI方式

```bash
# 交互式生成
ai-component-craft generate

# 命令行直接生成
ai-component-craft generate "创建一个带搜索的用户列表组件" --framework react --output ./components
```

#### VS Code方式

1. 右键点击文件夹
2. 选择 "AI Component Craft: 生成组件"
3. 输入组件描述
4. 自动在当前文件夹生成组件

#### API方式

```typescript
import { generateComponent } from 'ai-component-craft';

const component = await generateComponent({
  description: '创建一个带搜索的用户列表组件',
  framework: 'react',
  typescript: true,
  styling: 'tailwind'
});

console.log(component.code);
```

## 📖 文档

- [快速开始指南](docs/quickstart.md)
- [CLI文档](docs/cli.md)
- [VS Code扩展使用](docs/vscode.md)
- [API文档](docs/api.md)
- [配置说明](docs/configuration.md)
- [模板系统](docs/templates.md)

## 🎯 示例

### 示例1: 按钮组件

**描述**: "创建一个渐变色的主按钮，支持加载状态，有悬停效果"

**生成代码**:
```tsx
import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  loading = false,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="
        px-6 py-3 rounded-lg
        bg-gradient-to-r from-blue-500 to-purple-600
        text-white font-medium
        hover:from-blue-600 hover:to-purple-700
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
        flex items-center gap-2
      "
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};
```

### 示例2: 数据表格

**描述**: "创建一个支持排序、筛选、分页的数据表格组件"

[查看更多示例](examples/)

## 🛠️ 支持的技术栈

- **前端框架**: React, Vue 3, Angular, Svelte
- **样式方案**: Tailwind CSS, Styled Components, CSS Modules, SCSS
- **UI库**: Material-UI, Ant Design, Chakra UI, Element Plus
- **类型**: TypeScript (自动生成)

## 🤝 贡献

我们欢迎所有形式的贡献！

- 🐛 [提交Bug](https://github.com/yourname/ai-component-craft/issues)
- 💡 [提出功能建议](https://github.com/yourname/ai-component-craft/issues)
- 📝 [改进文档](https://github.com/yourname/ai-component-craft/pulls)
- 💻 [提交代码](CONTRIBUTING.md)

查看 [贡献指南](CONTRIBUTING.md) 了解更多信息。

## 📄 许可证

[MIT](LICENSE) © 2026 AI Component Craft

---

## 💖 赞助支持

如果这个项目对你有帮助，请考虑赞助我们：

[![GitHub Sponsors](https://img.shields.io/github/sponsors/yourname?style=social)](https://github.com/sponsors/yourname)

你的支持将帮助我们：
- 持续维护和改进项目
- 开发更多高级功能
- 提供更好的文档和支持

## 🌟 Star历史

[![Star History Chart](https://api.star-history.com/svg?repos=yourname/ai-component-craft&type=Date)](https://star-history.com/#yourname/ai-component-craft&Date)

---

**如果这个项目对你有帮助，请给我们一个 ⭐️ Star！**