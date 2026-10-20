import type { Plugin } from 'vite'

// Fontsource 把中文字体切成了一百多片，CSS 里每片一条 @font-face。
// 页面上用花体的只有名字和几个标题，这里只保留覆盖到这些字的分片，
// 其余的连同 woff 兜底一起去掉：CSS 从 150KB 降到几 KB，dist 里也不会多出几 MB 的字体。

function covers(range: string, points: number[]): boolean {
    return range.split(',').some((part) => {
        const [from, to] = part.trim().replace(/^U\+/i, '').split('-')
        const lo = parseInt(from.replace(/\?/g, '0'), 16)
        const hi = parseInt((to ?? from).replace(/\?/g, 'F'), 16)
        return points.some((p) => p >= lo && p <= hi)
    })
}

export function trimFontFaces(pkg: string, text: string): Plugin {
    const points = [...new Set(text)].map((c) => c.codePointAt(0)!)
    const target = new RegExp(
        `${pkg.replace('/', '[\\\\/]')}[\\\\/][^?]*\\.css$`,
    )

    return {
        name: 'trim-font-faces',
        enforce: 'pre',
        transform(code, id) {
            if (!target.test(id)) return
            const faces = code.match(/@font-face\s*\{[^}]*\}/g) ?? []
            const kept = faces
                .filter((face) => {
                    const range = /unicode-range:\s*([^;]+);/.exec(face)?.[1]
                    return !range || covers(range, points)
                })
                .map((face) =>
                    face.replace(
                        /,\s*url\([^)]*\.woff\)\s*format\('woff'\)/,
                        '',
                    ),
                )
            return { code: kept.join('\n'), map: null }
        },
    }
}
