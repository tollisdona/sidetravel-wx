
function formatTime(date) {
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2,'0');
  var day = String(date.getDate()).padStart(2,'0');
  // var hour = date.getHours()
  // var minute = date.getMinutes()
  // var second = date.getSeconds()
  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return `${year}-${month}-${day}`;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封装微信的的request
 */
function request(url, data = {}, method = "POST",header="") {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header === "" ? {
        'content-type': 'application/x-www-form-urlencoded',
        'X-Sidetravel-Token': wx.getStorageSync('token')
      }:header,
      success: function(res) {
        if (res.statusCode == 200) {

          if (res.data.errno == 501) {
            // 表示未登录
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            wx.switchTab({
              url: '/pages/userinfo/index/index'
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function(err) {
        reject(err)
      }
    })
  });
}

function redirect(url) {
  //判断页面是否需要登录
  if (false) {
    wx.switchTab({
      url: '/pages/userinfo/index/index'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    icon:"error"
  })
}

module.exports = {
  formatTime,
  request,
  redirect,
  showErrorToast
}

