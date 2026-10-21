import type { KuolieData } from './types'

/**
 * 扩列条内容 —— 只需要改这个文件。
 * 头像放进 public/ 文件夹，这里写文件名即可。
 * 不需要的区块，把对应数组留空 [] 就会自动隐藏。
 */
export const data: KuolieData = {
    // 配色：'strawberry' 草莓格纹 · 'mint' 薄荷格纹 · 'sky' 天空格纹
    theme: 'strawberry',

    avatar: '/avatar.jpg',
    name: '千雪琉音',
    subName: 'ChiyukiRuon',
    motto: '我们所度过的每个平凡的日常，也许就是连续发生的奇迹',

    about: [
        { label: 'cn', value: '千雪琉音/千雪' },
        { label: '年龄', value: '03年' },
        { label: 'IP', value: '江浙沪(主要是浙沪)' },
        { label: '性别', value: '生心男' },
    ],

    tags: [
        '家里蹲',
        '社恐',
        '无情的点赞机器',
        '阴间作息',
        '杂食',
        '爱发表情包',
        '百合厨',
        '纯爱战士',
    ],

    details: [
        '就算是社恐也想交朋友，不管是不是同坑都欢迎呀！',
        '每个季度都会追新番，时不时会看一些轻小说和漫画，有空的时候也会推推 Gal 打打单机什么的。',
        '最近也开始尝试出 COS 跑活，在可预见的未来应该只会出现在 BW、烤 Only 或者一些神秘的团建活动。',
        '萌新乌蒙吃，偶尔会出勤。目前在玩的二游只有烤，打歌剧情两手抓。也会磕磕 CP/CB，主要是杏豆/糖画/雫爱/遥实。GL/NL/BL 随意，可拆可逆，刷到什么磕什么。',
    ],

    fandoms: [
        {
            category: '比较常玩的游戏',
            items: ['世界计划', 'Minecraft', 'APEX'],
        },
        {
            category: '二次相关',
            items: ['虚拟歌姬', '动画', '轻小说', '漫画', 'Galgame'],
        },
        {
            category: '三次相关',
            items: ['水手服', '量产型', '圣地巡礼', 'Live'],
        },
    ],

    oshi: [
        {
            series: '世界计划',
            members: [
                { name: '桃井爱莉', level: 'main' },
                { name: '晓山瑞希', level: 'main' },
                { name: '东云绘名', level: 'main' },
                { name: 'MMJ', level: 'sub' },
                { name: '25', level: 'sub' },
                { name: '烤 OC 全肯定', level: 'like' },
            ],
        },
        {
            series: 'Charlotte',
            members: [{ name: '友利奈绪', level: 'main' }],
        },
        {
            series: '孤独摇滚',
            members: [
                { name: '喜多郁代', level: 'main' },
                { name: '后藤一里', level: 'like' },
                { name: '伊地知虹夏', level: 'like' },
                { name: '山田凉', level: 'like' },
            ],
        },
        {
            series: '超辉夜姬',
            members: [
                { name: '绫䌷芦花', level: 'main' },
                { name: '月见八千代', level: 'sub' },
                { name: '酒寄彩叶', level: 'sub' },
                { name: '驹泽乃依', level: 'like' },
            ],
        },
        {
            series: '我推的孩子',
            members: [{ name: '有马加奈', level: 'main' }],
        },
    ],

    ng: ['键政', '高浓度内娱', '引战拉踩', '女拳'],

    notes: ['一般都活跃在 QQ 群，二三次不分号。其它的平台可能不怎么发东西。'],

    // 平台：qq · xhs 小红书 · steam · bilibili · netease 网易云音乐 · douyin 抖音
    // name 用户名、id 号码至少填一个；两个都填时号码用小字显示，点击复制号码
    contacts: [
        { app: 'bilibili', name: '千雪琉音', id: '33908380' },
        { app: 'netease', name: '千雪琉音' },
        { app: 'steam', name: '千雪今天玩什么', id: '458096871' },
        { app: 'xhs', name: '千雪琉音', id: 'ChiyukiRuon' },
        { app: 'douyin', name: '千雪琉音', id: 'ChiyukiRuon' },
    ],

    updated: '2026.10.21',
}
