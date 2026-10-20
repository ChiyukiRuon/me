import '@fontsource/zcool-kuaile'
import './style.css'
import type { ThemeName } from './types'
import { bindMasonry } from './masonry'
import { bindCopy } from './copy'

// 页面内容在构建时已经预渲染进 index.html，这里只负责交互。
// 地址后面加 ?theme=mint 或 ?theme=sky 可以临时预览其他配色。
const THEMES: ThemeName[] = ['strawberry', 'mint', 'sky']
const preview = new URLSearchParams(location.search).get(
    'theme',
) as ThemeName | null
if (preview && THEMES.includes(preview))
    document.documentElement.dataset.theme = preview

bindMasonry()
bindCopy()
