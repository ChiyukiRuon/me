// 宽屏两列瀑布流：每张卡片放进当前更矮的那一列。
// 只改 grid 定位，不移动 DOM，读屏顺序保持不变；没有 JS 时退回 CSS 多列布局。

const WIDE = window.matchMedia('(min-width: 960px)')
const GAP = 22

export function bindMasonry(): void {
    const board = document.querySelector<HTMLElement>('.board')
    if (!board) return
    const cards = [...board.querySelectorAll<HTMLElement>(':scope > .card')]

    const layout = () => {
        for (const card of cards) card.style.removeProperty('grid-area')
        board.classList.toggle('is-masonry', WIDE.matches)
        if (!WIDE.matches) return

        const heights = [0, 0]
        for (const card of cards) {
            const col = heights[0] <= heights[1] ? 0 : 1
            const span = Math.ceil(card.getBoundingClientRect().height) + GAP
            card.style.gridArea = `auto / ${col + 1} / span ${span}`
            heights[col] += span
        }
    }

    let frame = 0
    const schedule = () => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(layout)
    }

    layout()
    WIDE.addEventListener('change', schedule)
    window.addEventListener('resize', schedule)
    document.fonts.ready.then(schedule)
}
