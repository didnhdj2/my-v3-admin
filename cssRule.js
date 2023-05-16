export const cssRule = () => {
  return {
    rules: [
      [
        /^line-(\d+)$/,
        (match) =>
          `-webkit-line-clamp: ${match[1]};overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;`
      ],
      // 颜色两位,三位,6位7位8位
      [/^color-#([\d\w])$/, (match) => `color:#${match[1]};`],
      [/^bg-#([\d\w])$/, (match) => `background-color: #${match[1]};`],
      [/^color-(\w+)$/, (match) => `color: ${match[1]};`],
      [/^bg-(\w+)$/, (match) => `background-color: ${match[1]};`],
      [/^f-(\d+)$/, (match) => `flex: ${match[1]};`],
      [/^fs-(\d+)$/, (match, { unit }) => `font-size: ${match[1]}${unit};`],
      [/^lh-(\d+)$/, (match, { unit }) => `line-height: ${match[1]}${unit};`],
      [
        /^m-(\d+)-(\d+|auto)$/,
        (match, { unit }) => ({
          margin: `${match[1]}${unit} ${match[2]}${unit};`
        })
      ],
      [/^m-(\d+)$/, ([, d], { unit }) => ({ margin: `${d}${unit};` })],
      [/^mt-(\d+)$/, ([, d], { unit }) => ({ 'margin-top': `${d}${unit};` })],
      [/^mb-(\d+)$/, ([, d], { unit }) => ({ 'margin-bottom': `${d}${unit};` })],
      [/^ml-(\d+)$/, ([, d], { unit }) => ({ 'margin-left': `${d}${unit};` })],
      [/^mr-(\d+)$/, ([, d], { unit }) => ({ 'margin-right': `${d}${unit};` })],
      [/^mlr-(\d+)$/, (match, { unit }) => `margin-left:${match[1]}${unit};margin-right:${match[1]}${unit};`],
      [/^mtb-(\d+)$/, (match, { unit }) => `margin-top:${match[1]}${unit};margin-bottom:${match[1]}${unit};`],
      [
        /^m-(\d+)-(\d+)-(\d+)-(\d+)$/,
        (match) => ({
          margin: `${match[1]}${unit} ${match[2]}${unit} ${match[3]}${unit} ${match[4]}${unit};`
        })
      ],
      [
        /^p-(\d+)-(\d+)$/,
        (match, { unit }) => ({
          padding: `${match[1]}${unit} ${match[2]}${unit};`
        })
      ],
      [/^p-(\d+)$/, (match, { unit }) => ({ padding: `${match[1]}${unit}` })],
      [/^pt-(\d+)$/, (match, { unit }) => ({ 'padding-top': `${match[1]}${unit}` })],
      [/^pb-(\d+)$/, (match, { unit }) => ({ 'padding-bottom': `${match[1]}${unit}` })],
      [/^pl-(\d+)$/, (match, { unit }) => ({ 'padding-left': `${match[1]}${unit}` })],
      [/^pr-(\d+)$/, (match, { unit }) => ({ 'padding-right': `${match[1]}${unit}` })],
      [/^ptb-(\d+)$/, (match, { unit }) => `padding-top:${match[1]}${unit};padding-bottom:${match[1]}${unit};`],
      [/^plr-(\d+)$/, (match, { unit }) => `padding-left:${match[1]}${unit};padding-right:${match[1]}${unit};`],
      [
        /^p-(\d+)-(\d+)-(\d+)-(\d+)$/,
        (match, { unit }) => ({
          padding: `${match[1]}${unit} ${match[2]}${unit} ${match[3]}${unit} ${match[4]}${unit};`
        })
      ],
      [/^(width|w)-(\d+)$/, (match, { unit }) => ({ width: `${match[2]}${unit}` })],
      [/^(width|w)-(\d+)(vh|vw|%)$/, (match, { unit }) => ({ width: `${match[2]}${match[3]};` })],
      [/^(height|h)-(\d+)(vh|vw|%)$/, (match, { unit }) => ({ height: `${match[2]}${match[3]};` })],
      [/^(height|h)-(\d+)$/, (match, { unit }) => ({ height: `${match[2]}${unit}` })],
      [/^br-(\d+)$/, (match, { unit }) => ({ 'border-radius': `${match[1]}${unit}` })],
      [/^br-t(\d+)$/, (match, { unit }) => `border-top-left-radius:${match[1]}${unit};border-top-right-radius:${match[1]}${unit};`],
      [/^br-b(\d+)$/, (match, { unit }) => `border-bottom-left-radius:${match[1]}${unit};border-bottom-right-radius:${match[1]}${unit};`],
      {
        poiter: 'cursor: pointer;',
        'box-s': 'box-sizing: border-box;',
        fr: 'display: flex;flex-direction: row',
        frr: 'display: flex; flex-direction: row-reverse',
        fc: 'display: flex;flex-direction: column',
        fw: 'flex-wrap:wrap;',
        'f-ac': 'align-items: center;',
        'f-as': 'align-items: flex-start;',
        'f-ae': 'align-items: flex-end;',
        'f-js': ' justify-content: flex-start;',
        'f-jc': 'justify-content: center;',
        'f-je': 'justify-content: flex-end;',
        'f-jsb': 'justify-content: space-between;',
        'f-jsa': 'justify-content: space-around;',
        'f-ac-jc': ' align-items: center;justify-content: center;',
        'f-ac-je': ' align-items: center;justify-content: flex-end;',
        'f-ac-jsb': ' align-items: center;justify-content: space-between;',
        'f-ac-jsa': ' align-items: center;justify-content: space-around;',
        'as-s': 'align-self: flex-start;',
        'as-e': 'align-self: flex-end;',
        'as-c': 'align-self: center;',
        'as-b': 'align-self: baseline;',
        'as-st': 'align-self: stretch;',
        'text-l': 'text-align: left;',
        'text-c': 'text-align: center;',
        'text-r': 'text-align: right;',
        'text-j': 'text-align: justify;text-align-last: justify;',
        line: ' border-bottom: 2px solid #CDCDCD; width: 100%;height: 2px;',
        'line-dark': ' border-bottom: 2px solid #797B89; width: 100%;height: 2px;',
        'td-lt': 'text-decoration: line-through;',
        'un-line': 'text-decoration: underline;',
        'fw-b': 'font-weight: bold;',
        'scroll-y': ' overflow-y: scroll;',
        'scroll-x': ' overflow-x: scroll;'
      }
    ],

    shortcuts: [{}]
  }
}

export default cssRule
