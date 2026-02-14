# 贡献指南

感谢您对AI Component Craft项目的关注！我们欢迎所有形式的贡献。

## 如何贡献

### 报告Bug

如果您发现了bug，请通过GitHub Issues报告：

1. 使用最新的代码版本测试
2. 检查是否已经有相关的issue
3. 创建新的issue，包含：
   - 清晰的标题和描述
   - 复现步骤
   - 期望的行为和实际行为
   - 环境信息（Node.js版本、操作系统等）

### 提出功能建议

1. 检查是否已经有类似的功能请求
2. 创建新的issue，包含：
   - 功能描述
   - 使用场景
   - 可能的实现方案

### 提交代码

1. **Fork项目**
   ```bash
   git clone https://github.com/yourname/ai-component-craft.git
   cd ai-component-craft
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **进行开发**
   - 编写代码
   - 添加测试
   - 更新文档

5. **运行测试**
   ```bash
   npm test
   npm run lint
   ```

6. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

7. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **创建Pull Request**

## 开发规范

### 代码风格
- 使用TypeScript
- 遵循ESLint规则
- 使用Prettier格式化代码

### 提交信息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型(type):**
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例:**
```
feat(generator): add support for Vue 3

Add Vue 3 composition API support in the generator.

Closes #123
```

### 测试要求
- 所有新功能必须有单元测试
- 测试覆盖率不低于80%
- 确保所有测试通过

### 文档要求
- 更新README（如需要）
- 添加JSDoc注释
- 更新CHANGELOG

## 开发流程

### 设置开发环境

1. 克隆仓库
2. 安装依赖: `npm install`
3. 创建.env文件并添加OpenAI API Key
4. 运行测试: `npm test`
5. 开始开发: `npm run dev`

### 项目结构

```
src/
├── core/       # 核心生成引擎
├── cli/        # 命令行工具
├── types/      # TypeScript类型
└── index.ts    # 入口文件
```

### 调试技巧

- 使用`console.log`或调试器
- 运行单个测试: `npm test -- generator.test.ts`
- 使用`npm run dev`监视模式

## 社区

- 加入Discord服务器: [链接]
- 关注Twitter: [@ai_component]
- 订阅邮件列表: [链接]

## 许可证

通过提交代码，您同意您的贡献将在MIT许可证下发布。

## 感谢

感谢所有贡献者让这个项目变得更好！

---

如有问题，请通过GitHub Issues联系我们。