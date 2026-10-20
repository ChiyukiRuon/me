// 蕾丝花边：一段横向平铺的 SVG 图案。颜色全部走 CSS 变量，换主题不用改这里。

const TILE = 40
const HEIGHT = 46

function sparkle(cx: number, cy: number, r: number): string {
    return `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`
}

export function lace(side: 'top' | 'bottom'): string {
    const tile = `lace-tile-${side}`
    const spark = `lace-spark-${side}`
    // 上半是实心饰带，下半是一排扇贝边，每个扇贝中间挖一个小孔（evenodd 镂空）
    const scallop = `M0 0H${TILE}V22A20 20 0 0 1 0 22Z M16.6 32a3.4 3.4 0 1 0 6.8 0a3.4 3.4 0 1 0 -6.8 0Z`

    return `
<div class="lace lace--${side}" aria-hidden="true">
  <svg class="lace__svg" width="100%" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="${tile}" width="${TILE}" height="${HEIGHT}" patternUnits="userSpaceOnUse">
        <path class="lace__fill" fill-rule="evenodd" d="${scallop}"/>
        <path class="lace__stitch" d="M33 22A13 13 0 0 1 7 22"/>
      </pattern>
      <pattern id="${spark}" width="${TILE * 2}" height="${HEIGHT}" patternUnits="userSpaceOnUse">
        <path class="lace__spark" d="${sparkle(TILE, 24, 8)}"/>
      </pattern>
    </defs>
    <rect width="100%" height="${HEIGHT}" fill="url(#${tile})"/>
    <line class="lace__stitch" x1="0" y1="10" x2="100%" y2="10"/>
    <rect width="100%" height="${HEIGHT}" fill="url(#${spark})"/>
  </svg>
</div>`
}
