import { PLATFORMS } from './platforms'
import type { Contact, ContactApp, KuolieData } from './types'

const APPS = Object.keys(PLATFORMS) as ContactApp[]

/**
 * 构建时用环境变量覆盖 data.ts 里的内容：
 * - ICP：备案号，未设置或为空时不显示
 * - CONTACTS：JSON 数组，整组替换 contacts；未设置时沿用 data.ts
 */
export function resolveData(
    data: KuolieData,
    env: Record<string, string | undefined>,
): KuolieData {
    const icp = env.ICP?.trim() || undefined
    const contacts = env.CONTACTS?.trim()

    return {
        ...data,
        icp,
        contacts: contacts ? parseContacts(contacts) : data.contacts,
    }
}

function fail(reason: string): never {
    throw new Error(`环境变量 CONTACTS ${reason}`)
}

function parseContacts(raw: string): Contact[] {
    let value: unknown
    try {
        value = JSON.parse(raw)
    } catch {
        fail('不是合法的 JSON')
    }
    if (!Array.isArray(value)) fail('必须是 JSON 数组')

    return value.map((item, i) => {
        const where = `第 ${i + 1} 项`
        if (!item || typeof item !== 'object' || Array.isArray(item))
            fail(`${where}必须是对象`)

        const { app, name, id } = item as Record<string, unknown>
        if (typeof app !== 'string' || !APPS.includes(app as ContactApp))
            fail(`${where}的 app 无效，可选值：${APPS.join(' / ')}`)
        if (name !== undefined && typeof name !== 'string')
            fail(`${where}的 name 必须是字符串`)
        if (id !== undefined && typeof id !== 'string')
            fail(`${where}的 id 必须是字符串`)

        const key = app as ContactApp
        const userName = name?.trim()
        const userId = id?.trim()
        if (userName && userId) return { app: key, name: userName, id: userId }
        if (userName) return { app: key, name: userName }
        if (userId) return { app: key, id: userId }
        fail(`${where}至少需要 name 或 id`)
    })
}
