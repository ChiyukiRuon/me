import { defineConfig, loadEnv } from 'vite'
import { data } from './src/data'
import { resolveData } from './src/env'
import { asset, displayText, esc, renderPage } from './src/render'
import { inlineEntry } from './plugins/inline-entry'
import { trimFontFaces } from './plugins/trim-font-faces'

// base: './' 让打包产物使用相对路径，放到任意静态托管的子目录都能直接打开
export default defineConfig(({ mode }) => {
    // TITLE、ICP、CONTACTS 只在构建（或启动开发服务器）时读取，直接写进预渲染的 HTML
    const env = loadEnv(mode, '.', '')
    const site = resolveData(data, env)

    return {
        base: './',
        plugins: [
            trimFontFaces('@fontsource/zcool-kuaile', displayText(site)),
            {
                name: 'kuolie-prerender',
                transformIndexHtml(html) {
                    const vars: Record<string, string> = {
                        __THEME__: site.theme,
                        __TITLE__: esc(site.title ?? `${site.name}的扩列条`),
                        __DESCRIPTION__: esc(`${site.subName} · ${site.motto}`),
                        __AVATAR__: esc(asset(site.avatar)),
                    }
                    return html
                        .replace(/__[A-Z]+__/g, (key) => vars[key] ?? key)
                        .replace('<!--app-->', renderPage(site))
                },
            },
            inlineEntry(),
        ],
    }
})
