
/**
 * 随机生成一个范围内的日期
 */
function generateTime (start, end) {
  // 开始时间
  let s = new Date(start)
  let e = new Date(end)

  if (Number.isNaN(s.getTime())) {
    throw new Error('传入的开始时间格式不对，请参照 2020-12-20, 或者 2020-12-20 10:22:01')
  }

  if (Number.isNaN(s.getTime())) {
    throw new Error('传入的结束时间格式不对，请参照 2020-12-20, 或者 2020-12-20 10:22:01')
  }

  // 中间的间隔
  let distance = e.getTime() - s.getTime()

  if (distance < 0) {
    throw new Error('开始时间小于结束时间')
  }

  let t = new Date(s.getTime() + parseInt(Math.random() * distance))
  // 年-月-日 （月， 日是补齐0的）
  let t1 = t.toJSON().substring(0, 10)

  t = t.toLocaleString().replace(/\//g, '-').split(' ')

  let t2 = t[1].substr(2)

  // 时分秒 可能缺少0
  t2 = t2.split(':').map(p => {
    if (p.length !== 2) {
      p = '0' + p
    }
    return p
  }).join(':')

  return t1 + ' ' + t2
}

module.exports = {
  generateTime
}