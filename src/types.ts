export type ThemeName = 'strawberry' | 'mint' | 'sky'

export interface Fact {
    label: string
    value: string
}

export interface FandomGroup {
    /** 分类，如 二次元 / 游戏 / 三次元 */
    category: string
    items: string[]
}

/** main 主推 · sub 副推 · like 好感 */
export type OshiLevel = 'main' | 'sub' | 'like'

export interface OshiGroup {
    series: string
    members: { name: string; level: OshiLevel }[]
}

export type ContactApp =
    'qq' | 'xhs' | 'steam' | 'bilibili' | 'netease' | 'douyin' | 'x'

/**
 * name 用户名，id 号码 / UID / 好友代码。
 * 两个至少填一个；点击时优先复制 id。
 */
export type Contact = { app: ContactApp } & (
    { name: string; id?: string } | { name?: string; id: string }
)

export interface KuolieData {
    theme: ThemeName
    avatar: string
    name: string
    subName: string
    motto: string
    about: Fact[]
    tags: string[]
    details: string[]
    fandoms: FandomGroup[]
    oshi: OshiGroup[]
    ng: string[]
    notes: string[]
    contacts: Contact[]
    updated: string
}
