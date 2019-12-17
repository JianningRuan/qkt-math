export default function () {
  document.getElementById('cnzz') && document.getElementById('cnzz').remove()
  var allScript = document.getElementsByTagName('script')
  for (var i = 0, l = allScript.length; i < l; i++) {
    var str = allScript[i].src
    if (allScript[i].async && str.indexOf('c.cnzz.com') >= 0) {
      allScript[i].remove()
      break
    }
  }
  var bp = document.createElement('script')
  var curProtocol = window.location.protocol.split(':')[0]
  if (curProtocol === 'https') {
    bp.src = 'https://s4.cnzz.com/z_stat.php?id=1260591810&web_id=1260591810'
  } else {
    bp.src = 'http://s4.cnzz.com/z_stat.php?id=1260591810&web_id=1260591810'
  }
  bp.id = 'cnzz'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(bp, s)
}
