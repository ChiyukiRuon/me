# 扩列条

纯静态的网页版扩列条，TypeScript + Vite。

## 改内容

- 文字：改 `src/data.ts`，不需要的区块把数组留空 `[]` 就会隐藏
- 头像：`public/`，在 `data.ts` 里写文件名（例如 `avatar: 'avatar.jpg'`）
- 社交平台：`contacts` 里每项填平台、用户名和/或 ID
- 配色：`data.ts` 里的 `theme`，可选 `strawberry` / `mint` / `sky`；
  也可以在地址后面加 `?theme=mint` 临时预览

## 运行与打包

```bash
npm install
npm run dev      # 本地预览
npm run build    # 打包到 dist/
npm run preview  # 预览打包结果
```

## 代码格式

统一使用 4 个空格缩进，由 `.editorconfig` 和 `.prettierrc.json` 配置。TypeScript 保持单引号、不加语句末尾分号。

```bash
npm run format        # 格式化所有支持的项目文件
npm run format:check  # 检查格式，不修改文件
```

格式化排除依赖目录 `node_modules/`、构建产物 `dist/` 和浏览器临时文件 `.playwright-mcp/`。图片等二进制资源不参与格式化。
