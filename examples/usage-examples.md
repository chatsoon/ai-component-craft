# 使用示例

## 示例1: 基础用法

```typescript
import { AIGenerator } from 'ai-component-craft';

const generator = new AIGenerator('your-openai-api-key');

const component = await generator.generateComponent({
  description: '创建一个带搜索功能的用户列表组件',
  framework: 'react',
  typescript: true,
  styling: 'tailwind'
});

console.log(component.code);
```

## 示例2: 带样式的按钮组件

```typescript
const buttonComponent = await generator.generateComponent({
  description: '创建一个渐变色的主按钮，支持加载状态，有悬停效果',
  framework: 'react',
  typescript: true,
  styling: 'tailwind'
});
```

## 示例3: 数据展示组件

```typescript
const tableComponent = await generator.generateComponent({
  description: '创建一个支持排序和筛选的数据表格，包含分页功能',
  framework: 'vue',
  typescript: true,
  styling: 'scss'
});
```

## 示例4: 表单组件

```typescript
const formComponent = await generator.generateComponent({
  description: '创建一个用户注册表单，包含邮箱验证、密码强度检查',
  framework: 'react',
  typescript: true,
  styling: 'styled-components',
  uiLibrary: 'material-ui'
});
```

## 示例5: 导航组件

```typescript
const navComponent = await generator.generateComponent({
  description: '创建一个响应式导航栏，支持下拉菜单和移动端汉堡菜单',
  framework: 'react',
  typescript: false,
  styling: 'css'
});
```

## CLI使用示例

### 交互式生成
```bash
npx ai-component-craft generate
```

### 命令行直接生成
```bash
npx ai-component-craft generate "创建一个卡片组件" --framework react --typescript --styling tailwind --output ./my-components
```

### 简写命令
```bash
npx acc g "创建一个按钮组件" -f react --typescript -s tailwind -o ./components
```