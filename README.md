# 扩列条

纯静态的网页版扩列条，TypeScript + Vite。

## 改内容

- 文字：改 `src/data.ts`，不需要的区块把数组留空 `[]` 就会隐藏
- 头像：`public/`，在 `data.ts` 里写文件名（例如 `avatar: 'avatar.jpg'`）
- 社交平台：`contacts` 里每项填平台、用户名和/或 ID；也可以用环境变量
  `CONTACTS` 整组覆盖，见下文
- 配色：`data.ts` 里的 `theme`，可选 `strawberry` / `mint` / `sky`；
  也可以在地址后面加 `?theme=mint` 临时预览

## 构建时环境变量

下面三项在构建或启动开发服务器时读取，改完需要重新构建（开发时重启 `npm run dev`）：

| 变量       | 说明                                                                             |
| ---------- | -------------------------------------------------------------------------------- |
| `TITLE`    | 页面标题；不设置或留空时使用「名字的扩列条」                                     |
| `ICP`      | ICP 备案号，例如 `京ICP备00000000号-1`；不设置或留空则页脚不显示备案信息         |
| `CONTACTS` | JSON 数组，整组覆盖 `src/data.ts` 里的 `contacts`；不设置则使用 `data.ts` 的内容 |

`CONTACTS` 的 `app` 可选 `qq` / `xhs` / `steam` / `bilibili` / `netease` / `douyin` / `x`，每项的 `name` 和 `id` 至少填一个：

```bash
TITLE='我的扩列条' \
ICP='京ICP备00000000号-1' \
CONTACTS='[{"app":"bilibili","name":"示例用户名","id":"12345678"}]' \
npm run build
```

也可以写在项目根目录的 `.env` 里（该文件不会提交到仓库，可参考 `.env.example`）：

```dotenv
TITLE=我的扩列条
ICP=京ICP备00000000号-1
CONTACTS=[{"app":"bilibili","name":"示例用户名","id":"12345678"}]
```

不设置 `TITLE` 时标题回退到「名字的扩列条」；不设置 `ICP` 时页脚只显示更新时间；设置 `CONTACTS=[]` 会隐藏整个社交平台区块。
`CONTACTS` 格式不对时构建会直接报错，并指出是第几项有问题。

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
