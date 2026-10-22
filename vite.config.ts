import { defineConfig } from 'vite'
import { data } from './src/data'
import { asset, displayText, esc, renderPage } from './src/render'
import { inlineEntry } from './plugins/inline-entry'
import { trimFontFaces } from './plugins/trim-font-faces'

// base: './' 让打包产物使用相对路径，放到任意静态托管的子目录都能直接打开
export default defineConfig({
    base: './',
    plugins: [
        trimFontFaces('@fontsource/zcool-kuaile', displayText(data)),
        {
            name: 'kuolie-prerender',
            transformIndexHtml(html) {
                const vars: Record<string, string> = {
                    __THEME__: data.theme,
                    __TITLE__: esc(`${data.name}的扩列条`),
                    __DESCRIPTION__: esc(`${data.subName} · ${data.motto}`),
                    __AVATAR__: esc(asset(data.avatar)),
                }
                return html
                    .replace(/__[A-Z]+__/g, (key) => vars[key] ?? key)
                    .replace('<!--app-->', renderPage(data))
            },
        },
        inlineEntry(),
    ],
})
