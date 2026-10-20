const TOAST_MS = 2400
const COPIED_MS = 1600

async function copy(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch {
        // 非 https 页面或旧浏览器没有 clipboard API，退回老办法
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.cssText = 'position:fixed;top:0;opacity:0;pointer-events:none'
        document.body.append(ta)
        ta.select()
        const ok = document.execCommand('copy')
        ta.remove()
        return ok
    }
}

export function bindCopy(): void {
    const links = document.querySelector<HTMLElement>('.links')
    const toast = document.querySelector<HTMLElement>('.toast')
    if (!links || !toast) return

    let hide = 0
    const say = (msg: string) => {
        toast.textContent = msg
        toast.classList.add('is-on')
        window.clearTimeout(hide)
        hide = window.setTimeout(
            () => toast.classList.remove('is-on'),
            TOAST_MS,
        )
    }

    links.addEventListener('click', async (e) => {
        const link = (e.target as Element).closest<HTMLElement>('.link')
        if (!link) return
        const { copy: value = '', label = '' } = link.dataset
        // 「UID」这类英文开头的标签前面空一格
        const what = /^[A-Za-z]/.test(label) ? ` ${label}` : label
        if (await copy(value)) {
            link.classList.add('is-copied')
            window.setTimeout(
                () => link.classList.remove('is-copied'),
                COPIED_MS,
            )
            say(`已复制${what}：${value}`)
        } else {
            say(`没能自动复制，${label}是 ${value}`)
        }
    })
}
