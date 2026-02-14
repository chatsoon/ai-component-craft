# AI Component Craft - 项目结构

```
ai-component-craft/
├── src/
│   ├── core/
│   │   └── generator.ts       # AI生成核心引擎
│   ├── cli/
│   │   └── index.ts           # 命令行工具
│   ├── types/
│   │   └── index.ts           # TypeScript类型定义
│   └── index.ts               # 主入口文件
├── examples/
│   └── usage-examples.md      # 使用示例
├── docs/                      # 文档目录
├── dist/                      # 编译输出目录
├── tests/                     # 测试文件
├── README.md                  # 项目说明
├── package.json               # 包配置
├── tsconfig.json              # TypeScript配置
└── LICENSE                    # 许可证
```

## 核心模块说明

### 1. Core模块 (src/core/)
**generator.ts** - AI生成引擎
- 与OpenAI API交互
- 构建生成提示词
- 处理生成结果
- 代码清理和格式化

### 2. CLI模块 (src/cli/)
**index.ts** - 命令行接口
- 解析命令行参数
- 交互式用户输入
- 调用生成引擎
- 文件保存和输出

### 3. Types模块 (src/types/)
**index.ts** - 类型定义
- ComponentConfig: 组件配置接口
- GeneratedComponent: 生成结果接口
- CLIOptions: CLI选项接口
- AppConfig: 应用配置接口

## 开发计划

### Phase 1: MVP (当前)
- ✅ 基础生成引擎
- ✅ CLI工具
- ✅ TypeScript支持
- ⏳ VS Code扩展
- ⏳ 测试覆盖

### Phase 2: 增强 (Week 2)
- 多AI模型支持
- 自定义模板
- 批量生成
- 代码优化

### Phase 3: 产品化 (Week 3-4)
- VS Code扩展发布
- Pro版功能
- 团队协作
- API服务

## 技术债务

### 需要改进的地方
1. 添加完整的错误处理
2. 实现代码验证机制
3. 添加更多单元测试
4. 优化AI提示词
5. 实现缓存机制

### 已知问题
- 暂无 (项目刚启动)

## 依赖关系

```
CLI (src/cli/)
    ↓
Core Generator (src/core/)
    ↓
OpenAI API

Types (src/types/)
    ↑
被所有模块使用
```

## 扩展点

### 1. 支持更多框架
在 `generator.ts` 中添加框架特定的提示词模板

### 2. 支持更多AI模型
在 `AIGenerator` 类中添加模型切换逻辑

### 3. 自定义模板
在 `ComponentConfig` 中添加模板路径选项

### 4. 插件系统
设计插件接口，允许第三方扩展

## 构建流程

```
1. TypeScript编译
   src/ → dist/

2. 测试运行
   jest运行所有测试

3. 代码检查
   ESLint检查代码质量

4. 打包发布
   npm publish发布到registry
```

## 发布清单

### 发布前检查
- [ ] 所有测试通过
- [ ] 代码已格式化
- [ ] README已更新
- [ ] 版本号已更新
- [ ] CHANGELOG已更新

### 发布步骤
1. 更新版本号
2. 运行测试
3. 构建项目
4. 发布到npm
5. 创建GitHub Release
6. 更新文档

## 贡献指南

### 如何贡献
1. Fork本仓库
2. 创建feature分支
3. 提交代码
4. 创建Pull Request

### 代码规范
- 使用TypeScript
- 遵循ESLint规则
- 编写单元测试
- 更新相关文档

---

*最后更新: 2026年2月14日*