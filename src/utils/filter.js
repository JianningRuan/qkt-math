import dayJs from 'dayjs'

const filter = {
  // momnent 自定义输出时间格式
  moment: (value, formatString) => {
    formatString = formatString || 'YYYY-MM-DD HH:mm'
    return dayJs(value).format(formatString)
  },
  // 阿拉伯数字转中文数字
  Arab2Chn: (value) => {
    let cn = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    return cn[value]
  },
  fromNow: (value) => {
    let now = new Date().getTime()
    let oldTime = new Date(value).getTime()
    let difference = now - oldTime
    let result = ''
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let month = day * 30
    let year = month * 12
    let _year = difference / year
    let _month = difference / month
    let _week = difference / (7 * day)
    let _day = difference / day
    let _hour = difference / hour
    let _min = difference / minute
    if (_year >= 1) { result = ~~(_year) + ' 年前' } else if (_month >= 1) { result = ~~(_month) + ' 个月前' } else if (_week >= 1) { result = ~~(_week) + ' 周前' } else if (_day >= 1) { result = ~~(_day) + ' 天前' } else if (_hour >= 1) { result = ~~(_hour) + ' 个小时前' } else if (_min >= 1) { result = ~~(_min) + ' 分钟前' } else result = '刚刚'
    return result
  },
  timeCnFormat (value) {
    let s = value % 60
    let m = parseInt((value / 60)) % 60
    let h = parseInt((value / 60 / 60)) % 60
    let formatTime = ''
    /* if (h !== 0) {
      formatTime = h + '小时' + m + '分钟' + s + '秒'
    } else if (m !== 0) {
      formatTime = m + '分钟' + s + '秒'
    } else {
      formatTime = s + '秒'
    } */
    let hTime = h !== 0 ? h + '小时' : ''
    let mTime = m !== 0 ? m + '分钟' : ''
    let sTime = s !== 0 ? s + '秒' : ''
    formatTime = hTime + mTime + sTime
    return formatTime
  },
  timeFormat (value) {
    let s = value % 60
    let m = parseInt((value / 60)) % 60
    let h = parseInt((value / 60 / 60)) % 60
    let formatTime = ''
    /* if (h !== 0) {
      formatTime = h + '小时' + m + '分钟' + s + '秒'
    } else if (m !== 0) {
      formatTime = m + '分钟' + s + '秒'
    } else {
      formatTime = s + '秒'
    } */
    let hTime = h !== 0 ? (h < 10 ? '0' + h : h) + ':' : ''
    let mTime = m !== 0 ? (m < 10 ? '0' + m : m) + ':' : '00:'
    let sTime = s !== 0 ? (s < 10 ? '0' + s : s) + '' : '00'
    formatTime = hTime + mTime + sTime
    return formatTime
  }
}
export default filter
