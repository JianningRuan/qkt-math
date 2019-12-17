export const common = {
  gradeList: [{ id: 1, name: '一年级' }, { id: 2, name: '二年级' }, { id: 3, name: '三年级' }, { id: 4, name: '四年级' }, { id: 5, name: '五年级' }, { id: 6, name: '六年级' }],
  semesterList: [{ id: 1, name: '上册' }, { id: 2, name: '下册' }],
  classList: [{ id: 1, name: '1班' }, { id: 2, name: '2班' }, { id: 3, name: '3班' }, { id: 4, name: '4班' }, { id: 5, name: '5班' }, { id: 6, name: '6班' }, { id: 7, name: '7班' }, { id: 8, name: '8班' }, { id: 9, name: '9班' }, { id: 10, name: '10班' }, { id: 11, name: '11班' }, { id: 12, name: '12班' }, { id: 13, name: '13班' }, { id: 14, name: '14班' }, { id: 15, name: '15班' }, { id: 16, name: '16班' }, { id: 17, name: '17班' }, { id: 18, name: '18班' }, { id: 19, name: '19班' }, { id: 20, name: '20班' }]
}
// 抽离成公共方法
export const awaitWrap = (promise) => {
  return promise
    .then(data => [null, data])
    .catch(err => [err, null])
}
// 判断是否在移动端
export const isPhoneDevice = () => {
  const sUserAgent = navigator.userAgent.toLowerCase()
  const bIsIpad = sUserAgent.match(/ipad/i) === 'ipad'
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os'
  const bIsMidp = sUserAgent.match(/midp/i) === 'midp'
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4'
  const bIsUc = sUserAgent.match(/ucweb/i) === 'ucweb'
  const bIsAndroid = sUserAgent.match(/android/i) === 'android'
  const bIsCE = sUserAgent.match(/windows ce/i) === 'windows ce'
  const bIsWM = sUserAgent.match(/windows mobile/i) === 'windows mobile'
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return true
  } else {
    return false
  }
}
// 字符串转布尔
export const bool = (value) => {
  return (/^true$/i).test(value)
}
