import type { Contact, KuolieData, OshiLevel } from './types'
import { lace } from './lace'
import { PLATFORMS } from './platforms'

export function esc(s: string): string {
    return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}

export const asset = (path: string) =>
    /^(https?:|data:)/.test(path) ? path : path.replace(/^\/+/, '')

const list = <T>(items: T[], fn: (item: T, i: number) => string) =>
    items.map(fn).join('')

// ── 小图标 ──

const ICON = {
    heart: '<path d="M12 20.6s-7.4-4.5-9.4-9C1 8 3.1 4.4 6.7 4.4c2 0 3.6 1 5.3 3 1.7-2 3.3-3 5.3-3 3.6 0 5.7 3.6 4.1 7.2-2 4.5-9.4 9-9.4 9z"/>',
    sparkle:
        '<path d="M12 2.5Q12.6 11.4 21.5 12Q12.6 12.6 12 21.5Q11.4 12.6 2.5 12Q11.4 11.4 12 2.5Z"/>',
    cross: '<path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    copy: '<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="3"/><path d="M15.5 8.5V6.5a2.5 2.5 0 0 0-2.5-2.5H6.5A2.5 2.5 0 0 0 4 6.5V13a2.5 2.5 0 0 0 2.5 2.5h2" stroke-linecap="round"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/>',
}

function icon(name: keyof typeof ICON, outline = false): string {
    const style = outline
        ? ' fill="none" stroke="currentColor" stroke-width="2"'
        : ' fill="currentColor"'
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"${style}>${ICON[name]}</svg>`
}

// ── 卡片骨架 ──

/** 用花体（ZCOOL KuaiLe）显示的标题 */
const TITLE = {
    about: 'About me',
    fandom: '喜欢',
    oshi: '推し',
    ng: 'NG',
    notes: '说明',
    flyer: '社交平台',
}

export const displayText = (d: KuolieData) =>
    d.name + Object.values(TITLE).join('')

function card(
    id: string,
    word: string,
    deco: [string, string],
    body: string,
): string {
    return `
<section class="card card--${id}" aria-labelledby="t-${id}">
  <h2 class="card__title" id="t-${id}">
    <span class="deco" aria-hidden="true">${deco[0]}</span>
    <span class="card__word">${esc(word)}</span>
    <span class="deco" aria-hidden="true">${deco[1]}</span>
  </h2>
  ${body}
</section>`
}

const chips = (items: string[], mod = '') =>
    `<ul class="chips">${list(items, (t) => `<li class="chip${mod}">${esc(t)}</li>`)}</ul>`

/** 纯文本，一条一段 */
const paras = (items: string[]) => list(items, (t) => `<p>${esc(t)}</p>`)

// ── 各区块 ──

function hero(d: KuolieData): string {
    return `
<header class="hero">
  <div class="avatar"><img src="${esc(asset(d.avatar))}" alt="${esc(d.name)}的头像" width="128" height="128"></div>
  <h1 class="hero__name">${esc(d.name)}</h1>
  <p class="hero__sub">${esc(d.subName)}</p>
  <p class="hero__motto">${esc(d.motto)}</p>
</header>`
}

function about(d: KuolieData): string {
    if (!d.about.length && !d.tags.length && !d.details.length) return ''
    const facts = d.about.length
        ? `<dl class="facts">${list(d.about, (f) => `<div class="fact"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`)}</dl>`
        : ''
    const tags = d.tags.length ? chips(d.tags) : ''
    const details = d.details.length
        ? `<div class="details">${paras(d.details)}</div>`
        : ''
    return card(
        'about',
        TITLE.about,
        ['✧˖°. ʚ', 'ɞ .°˖✧'],
        facts + tags + details,
    )
}

function group(label: string, body: string): string {
    return `<div class="group"><h3 class="group__label">${esc(label)}</h3>${body}</div>`
}

function fandoms(d: KuolieData): string {
    const groups = d.fandoms.filter((g) => g.items.length)
    if (!groups.length) return ''
    const body = list(groups, (g) =>
        group(g.category, chips(g.items, ' chip--stitch')),
    )
    return card('fandom', TITLE.fandom, ['✢ ✩ · ┈┈ ·', '· ┈┈ · ✩ ✢'], body)
}

const OSHI: Record<OshiLevel, { label: string; mark: string }> = {
    main: { label: '主推', mark: icon('heart') },
    sub: { label: '副推', mark: icon('heart', true) },
    like: { label: '好感', mark: icon('sparkle') },
}

function oshi(d: KuolieData): string {
    const groups = d.oshi.filter((g) => g.members.length)
    if (!groups.length) return ''
    const legend = `<ul class="legend" aria-hidden="true">${list(
        Object.entries(OSHI),
        ([key, o]) =>
            `<li class="legend__item legend__item--${key}">${o.mark}${o.label}</li>`,
    )}</ul>`
    const body = list(groups, (g) =>
        group(
            g.series,
            `<ul class="chips">${list(
                g.members,
                (m) =>
                    `<li class="oshi oshi--${m.level}">${OSHI[m.level].mark}${esc(m.name)}<span class="sr">（${OSHI[m.level].label}）</span></li>`,
            )}</ul>`,
        ),
    )
    return card('oshi', TITLE.oshi, ['˚.♡ ⊹ ┈┈ ·', '· ┈┈ ⊹ ♡.˚'], legend + body)
}

function bullets(items: string[], mark: string): string {
    return `<ul class="bullets">${list(items, (t) => `<li>${mark}<span>${esc(t)}</span></li>`)}</ul>`
}

function ng(d: KuolieData): string {
    if (!d.ng.length) return ''
    return card(
        'ng',
        TITLE.ng,
        ['.•°✕ ┈┈ ·', '· ┈┈ ✕°•.'],
        bullets(d.ng, icon('cross')),
    )
}

function notes(d: KuolieData): string {
    if (!d.notes.length) return ''
    return card('notes', TITLE.notes, ['⋆ ┈┈ ·', '· ┈┈ ⋆'], paras(d.notes))
}

// ── 社交平台：图标 + 用户名，号码用小字跟在下面，点一下复制 ──

function link(c: Contact): string {
    const p = PLATFORMS[c.app]
    // 有用户名时号码退到第二行；只有号码时号码当主文字，第二行写它是什么号
    const main = c.name ?? c.id ?? ''
    const sub =
        c.name && c.id
            ? `<span class="link__label">${p.idLabel}</span>${esc(c.id)}`
            : c.name
              ? p.name
              : p.idLabel
    const copy = c.id ?? c.name ?? ''
    const label = c.id ? p.idLabel : '用户名'
    return `
<li>
  <button type="button" class="link" data-copy="${esc(copy)}" data-label="${label}">
    <span class="link__icon" style="--brand: ${p.color}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${p.path}"/></svg></span>
    <span class="link__text">
      <span class="sr">${p.name}</span>
      <span class="link__main">${esc(main)}</span>
      <span class="link__sub">${sub}</span>
      <span class="sr">（点按复制${label}）</span>
    </span>
    <span class="link__state" aria-hidden="true">${icon('copy', true)}${icon('check', true)}</span>
  </button>
</li>`
}

function flyer(d: KuolieData): string {
    if (!d.contacts.length) return ''
    return `
<section class="flyer" aria-labelledby="t-flyer">
  <span class="tape" aria-hidden="true"></span>
  <h2 class="flyer__title" id="t-flyer">${TITLE.flyer}</h2>
  <p class="flyer__hint">目前可以公开的情报</p>
  <ul class="links">${list(d.contacts, link)}</ul>
</section>`
}

export function renderPage(d: KuolieData): string {
    const cards = [about, fandoms, oshi, ng, notes].map((fn) => fn(d)).join('')
    return `
${lace('top')}
<main class="sheet">
  ${hero(d)}
  <div class="board">${cards}</div>
  ${flyer(d)}
  <footer class="foot">
    <span>更新于 ${esc(d.updated)}</span>
  </footer>
</main>
${lace('bottom')}
<div class="toast" role="status" aria-live="polite"></div>`
}
