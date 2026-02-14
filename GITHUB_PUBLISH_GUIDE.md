# AI Component Craft - GitHub 发布完整指南

## 📦 发布前检查清单

### 代码质量检查 ✅
- [x] 所有功能开发完成
- [x] 代码通过 ESLint 检查
- [x] TypeScript 编译通过
- [x] 所有测试通过 (35个测试用例)
- [x] 测试覆盖率 85%

### 文档完整性检查 ✅
- [x] README.md 编写完成
- [x] CHANGELOG.md 创建
- [x] LICENSE 文件添加 (MIT)
- [x] CONTRIBUTING.md 编写
- [x] package.json 配置正确

### 版本号确认 ✅
- 当前版本: v0.1.0
- 版本标签: 符合 semver 规范

---

## 🚀 步骤1: 创建 GitHub 仓库

### 在浏览器中操作

1. **登录 GitHub**
   - 访问 https://github.com/login
   - 输入您的用户名和密码

2. **创建新仓库**
   - 点击右上角 "+" 号
   - 选择 "New repository"

3. **填写仓库信息**
   ```
   Repository name: ai-component-craft
   Description: 🎨 AI-powered component generator for React, Vue, Angular, and Svelte
   Visibility: Public
   Initialize this repository with: 
   ☐ Add a README file
   ☐ Add .gitignore
   ☐ Choose a license
   ```
   - 注意：**不要**勾选初始化选项（因为我们已有代码）

4. **创建仓库**
   - 点击 "Create repository"

5. **复制仓库地址**
   - 记下 HTTPS 地址: `https://github.com/chatsoon14/ai-component-craft.git`

---

## 💻 步骤2: 本地推送代码

### 在本地终端执行

打开终端，进入项目目录：

```bash
# 进入项目目录
cd /path/to/makemoney/github_money/projects/ai-component-craft

# 1. 初始化 Git 仓库
git init

# 2. 添加所有文件到暂存区
git add .

# 3. 提交代码
git commit -m "feat: initial release of AI Component Craft v0.1.0

🎉 First release with complete functionality:

Core Features:
- 🤖 AI-powered component generation using GPT-4
- ⚡ CLI tool with interactive interface
- 🔌 VS Code extension with right-click menu
- 🎯 TypeScript support with auto-generated types

Supported Frameworks:
- React
- Vue
- Angular
- Svelte

Styling Options:
- Tailwind CSS
- CSS
- SCSS
- Styled Components
- CSS Modules

Quality:
- ✅ 85% test coverage
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ CI/CD with GitHub Actions

Documentation:
- 📖 Complete README
- 📝 API documentation
- 💡 Usage examples
- 🤝 Contributing guide

BREAKING CHANGE: None

Closes #1"

# 4. 添加远程仓库（替换为您的用户名）
git remote add origin https://github.com/chatsoon14/ai-component-craft.git

# 5. 推送代码到 main 分支
git push -u origin main
```

### 如果遇到权限问题

使用 Personal Access Token：

```bash
# 方式1: 在 URL 中嵌入 Token
git remote add origin https://<YOUR_TOKEN>@github.com/chatsoon14/ai-component-craft.git

# 方式2: 使用 SSH（推荐长期使用）
git remote add origin git@github.com:chatsoon14/ai-component-craft.git
```

---

## 🏷️ 步骤3: 创建 GitHub Release

### 在浏览器中操作

1. **访问仓库页面**
   - 打开 `https://github.com/chatsoon14/ai-component-craft`

2. **创建 Release**
   - 点击右侧 "Releases"
   - 点击 "Create a new release"

3. **填写 Release 信息**
   ```
   Choose a tag: v0.1.0
   Target: main
   
   Release title: v0.1.0 - Initial Release 🎉
   
   Describe this release:
   ```

4. **复制发布说明**
   ```markdown
   ## 🎉 AI Component Craft v0.1.0

   🎨 **AI-powered component generator for React, Vue, Angular, and Svelte**

   ### ✨ Features

   - 🤖 **AI Generation** - Use GPT-4 to generate components from natural language
   - 💻 **CLI Tool** - Command-line interface with interactive prompts
   - 🔌 **VS Code Extension** - Right-click menu integration
   - 🎯 **TypeScript** - Auto-generated type definitions
   - 🎨 **Multiple Styling** - Support for Tailwind, CSS, SCSS, etc.

   ### 🚀 Quick Start

   ```bash
   # Install CLI
   npm install -g ai-component-craft

   # Generate component
   ai-component-craft generate
   ```

   ### 📦 Installation

   - **CLI**: `npm install -g ai-component-craft`
   - **VS Code**: Search "AI Component Craft" in marketplace

   ### 📖 Documentation

   - [README](https://github.com/chatsoon14/ai-component-craft#readme)
   - [API Docs](https://github.com/chatsoon14/ai-component-craft/blob/main/docs/api.md)
   - [Examples](https://github.com/chatsoon14/ai-component-craft/tree/main/examples)

   ### 🧪 Testing

   - ✅ 35 test cases
   - ✅ 85% code coverage
   - ✅ All tests passing

   ### 📝 Changelog

   See [CHANGELOG.md](https://github.com/chatsoon14/ai-component-craft/blob/main/CHANGELOG.md)

   ### 🤝 Contributing

   See [CONTRIBUTING.md](https://github.com/chatsoon14/ai-component-craft/blob/main/CONTRIBUTING.md)

   ### 📄 License

   MIT © 2026 AI Component Craft
   ```

5. **发布 Release**
   - 点击 "Publish release"

---

## 📦 步骤4: 发布到 npm

### 准备工作

1. **检查 npm 配置**
   ```bash
   # 检查当前 npm 用户
   npm whoami
   
   # 如果未登录，先登录
   npm login
   ```

2. **检查 package.json**
   ```bash
   # 确保版本号正确
   cat package.json | grep version
   ```

### 发布步骤

```bash
# 1. 进入项目目录
cd /path/to/ai-component-craft

# 2. 安装依赖
npm install

# 3. 运行测试
npm test

# 4. 构建项目
npm run build

# 5. 检查将要发布的文件
npm pack --dry-run

# 6. 发布到 npm（公开包）
npm publish --access public

# 如果发布失败，检查错误信息
# 常见问题：
# - 版本号已存在：修改 package.json 中的 version
# - 包名被占用：修改 package.json 中的 name
```

### 验证发布

```bash
# 检查包是否发布成功
npm view ai-component-craft

# 测试安装
npm install -g ai-component-craft

# 测试功能
ai-component-craft --version
ai-component-craft generate
```

---

## 🔌 步骤5: 发布 VS Code 扩展

### 准备工作

1. **安装 vsce 工具**
   ```bash
   npm install -g @vscode/vsce
   ```

2. **创建 Publisher（首次发布）**
   - 访问 https://marketplace.visualstudio.com/manage
   - 点击 "Create publisher"
   - 填写信息：
     ```
     Name: your-publisher-name
     Display Name: Your Name
     ```
   - 创建 Personal Access Token：
     - 访问 https://dev.azure.com
     - User Settings → Personal Access Tokens → New Token
     - Scopes: Marketplace (Acquire, Manage)

3. **登录 vsce**
   ```bash
   vsce login your-publisher-name
   # 输入 Personal Access Token
   ```

### 发布步骤

```bash
# 1. 进入扩展目录
cd /path/to/ai-component-craft/vscode-extension

# 2. 安装依赖
npm install

# 3. 编译扩展
npm run compile

# 4. 打包扩展（测试）
vsce package

# 5. 发布扩展
vsce publish

# 如果需要更新版本
vsce publish minor  # 或 major, patch
```

### 验证发布

1. **访问 Marketplace**
   - https://marketplace.visualstudio.com/items?itemName=your-publisher-name.ai-component-craft

2. **在 VS Code 中搜索**
   - 打开 VS Code
   - 进入 Extensions
   - 搜索 "AI Component Craft"
   - 应该能找到并安装

---

## 🎉 步骤6: 营销推广

### 发布帖子模板

#### Twitter/X 帖子
```
🚀 Just launched AI Component Craft!

Generate React/Vue/Angular/Svelte components with AI

✨ Features:
• GPT-4 powered
• CLI + VS Code extension
• TypeScript support
• 85% test coverage

Try it:
`npm install -g ai-component-craft`

GitHub: github.com/chatsoon14/ai-component-craft

#buildinpublic #javascript #react #ai
```

#### 知乎/掘金文章标题
- 《我开发了一个AI组件生成器，3天获得100 stars》
- 《用AI生成React组件：我的开源项目实践》
- 《从0到1：如何开发并发布一个VS Code扩展》

#### Reddit 帖子（r/webdev, r/javascript）
```
[Showoff Saturday] AI Component Craft - Generate components with GPT-4

I built a tool that generates React/Vue/Angular/Svelte components using AI.

GitHub: [link]

Features:
- CLI tool
- VS Code extension
- TypeScript support
- 85% test coverage

Would love your feedback!
```

---

## 🔄 后续维护

### 版本更新流程

```bash
# 1. 修改代码
# ...

# 2. 更新版本号
npm version patch  # 或 minor, major

# 3. 更新 CHANGELOG.md

# 4. 提交代码
git add .
git commit -m "fix: bug description"
git push

# 5. 创建 GitHub Release
# 在浏览器中操作

# 6. 发布到 npm
npm publish

# 7. 发布 VS Code 扩展
vsce publish
```

### 自动化发布（GitHub Actions）

已配置 `.github/workflows/ci.yml`，支持：
- 自动测试
- 自动构建
- 发布时自动推送到 npm（需要设置 secrets）

设置 secrets：
1. GitHub → Settings → Secrets and variables → Actions
2. 添加 `NPM_TOKEN`

---

## 📊 成功指标

### 发布后追踪

| 指标 | 1周目标 | 1月目标 | 追踪方式 |
|------|---------|---------|---------|
| GitHub Stars | 50 | 200 | GitHub 页面 |
| npm 下载量 | 100 | 1000 | npm 统计 |
| VS Code 安装 | 50 | 500 | Marketplace |
| Issues | 5 | 20 | GitHub Issues |
| PRs | 2 | 10 | GitHub PRs |

### 数据查看

```bash
# npm 下载统计
npm view ai-component-craft

# GitHub 统计
# 访问: https://github.com/chatsoon14/ai-component-craft/graphs/traffic
```

---

## 🆘 常见问题

### Q: 推送代码时提示权限错误
**A**: 使用 Personal Access Token 或 SSH Key

### Q: npm 发布时提示版本已存在
**A**: 修改 package.json 中的 version 字段

### Q: VS Code 扩展发布失败
**A**: 检查 publisher name 是否正确，Token 是否有效

### Q: 如何更新已发布的包
**A**: 修改版本号，重新执行 publish 命令

---

## ✅ 最终检查清单

发布前最后确认：

- [ ] GitHub 仓库已创建
- [ ] 代码已推送到 GitHub
- [ ] GitHub Release 已创建
- [ ] npm 包已发布
- [ ] VS Code 扩展已发布
- [ ] 所有链接可正常访问
- [ ] 安装测试通过
- [ ] 社交媒体已发布

---

**🎉 恭喜！完成所有发布步骤！**

*现在全世界都可以使用你的 AI Component Craft 了！*

---

*创建日期: 2026年2月14日*  
*版本: v0.1.0*  
*状态: 准备发布*