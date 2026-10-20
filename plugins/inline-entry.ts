import type { Plugin } from 'vite'

// 把打包出的入口 JS 和 CSS 直接内联进 index.html。
// 浏览器不允许 file:// 页面加载带 crossorigin 的样式表和模块脚本，
// 内联之后双击 dist/index.html 也能正常显示（花体字会退回系统字体）。

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function inlineEntry(): Plugin {
    return {
        name: 'inline-entry',
        apply: 'build',
        enforce: 'post',
        generateBundle(_, bundle) {
            const page = bundle['index.html']
            if (page?.type !== 'asset') return
            let html = String(page.source)

            for (const [name, file] of Object.entries(bundle)) {
                if (file.type === 'chunk' && file.isEntry) {
                    const tag = new RegExp(
                        `<script[^>]*src="\\./${escapeRe(name)}"[^>]*></script>`,
                    )
                    const code = file.code.replaceAll('</script', '<\\/script')
                    html = html.replace(
                        tag,
                        () => `<script type="module">${code}</script>`,
                    )
                    delete bundle[name]
                } else if (file.type === 'asset' && name.endsWith('.css')) {
                    const tag = new RegExp(
                        `<link[^>]*href="\\./${escapeRe(name)}"[^>]*>`,
                    )
                    // CSS 里的字体地址原本相对 assets/，搬进 index.html 后要补上目录
                    const css = String(file.source).replaceAll(
                        'url(./',
                        'url(./assets/',
                    )
                    html = html.replace(tag, () => `<style>${css}</style>`)
                    delete bundle[name]
                }
            }

            page.source = html
        },
    }
}
