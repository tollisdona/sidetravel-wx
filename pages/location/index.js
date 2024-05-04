// pages/location/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 39.90469, // 默认纬度
    longitude: 116.40717, // 默认经度
    scale: 16, // 缩放级别
    markers: [{ // 标记数组
      id: 1,
      latitude: 39.90469,
      longitude: 116.40717,
      iconPath: '/images/location.png', // 自定义标记图标路径
      width: 40,
      height: 40
    }]
  },
  setTabbar(){
    if (typeof this.getTabBar === 'function' ) {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selected: 3
        })
      })
    }
},
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取用户当前的授权状态
    wx.getSetting({
      success: (res) => {
        // 如果用户已经授权地理位置权限
        if (res.authSetting['scope.userLocation'] === true) {
          // 直接获取用户位置信息
          this.getLocation();
        } else if (res.authSetting['scope.userLocation'] === false) {
          // 如果用户已拒绝授权地理位置权限，则显示提示信息，引导用户打开设置页面手动授权
          wx.showModal({
            title: '提示',
            content: '请允许使用地理位置信息',
            confirmText: '去设置',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    // 用户在设置页面完成授权操作后，再次获取用户位置信息
                    if (res.authSetting['scope.userLocation'] === true) {
                      this.getLocation();
                    }
                  }
                });
              }
            }
          });
        } else {
          // 如果用户尚未授权地理位置权限，则直接请求地理位置权限
          this.getLocation();
        }
      }
    });
  },
  // 获取用户位置信息
  getLocation: function () {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('获取用户位置信息成功', res);
        const latitude = res.latitude;
        const longitude = res.longitude;
        const includePoints = [{
          latitude: latitude,
          longitude: longitude
        }];
        // 调整地图显示范围，包含用户位置点
        this.setData({
          latitude: latitude,
          longitude: longitude,
          includePoints: includePoints,
          scale: 16 // 设置地图缩放级别
        });
        // 在这里可以根据获取到的用户位置信息进行后续操作
      },
      fail: (res) => {
        console.log('获取用户位置信息失败', res);
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setTabbar()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  }
})