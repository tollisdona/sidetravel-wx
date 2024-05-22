// pages/location/index.js
var QQMapWX = require('../../static/lib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 39.90469, // 默认纬度
    longitude: 116.40717, // 默认经度
    scale: 16, // 缩放级别
    list:[{
      "id": 1,
      "username": "zhangsan",
      "avatar": "http://storage.oocquin.online/media/0gmnoqqlsseso68ejsu8.jpeg",
      width: 40,
      height: 40,
      latitude: 36.650532,
      longitude: 116.997932,
    },
    {
      "id": 2,
      "username": "lisi",
      "avatar": "http://storage.oocquin.online/media/mibi32i6jisc0rwsweyw.jpg",
      "iconPath":"/iamge/map_marker3.svg",
      width: 40,
      height: 40,
      latitude: 36.653116,
      longitude: 117.000158,
    }],
    markers: [],
    openPosition:false
  },
  onLoad: function() {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
        key: 'ZEJBZ-GRZC3-NFO3J-OP2AP-KAYZV-NTB7W'
    });
    this.mapCtx = wx.createMapContext('myMap');
    this.canIhavePosition();
  },
  onShow(){
    // 检查登录情况
    user.checkLogin().then(res =>{
      console.log("checklogin:",res);
      wx.navigateTo({
        url: '/pages/moment-edit/index',
      })
    }).catch(err =>{
      wx.showToast({
        title: '请先登录！',
        icon:'error'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/userinfo/index/index',
        })
      }, 500); 
    })
  },
  // In your Page definition
  onMapTap: function(e) {
    const latitude = e.detail.latitude;
    const longitude = e.detail.longitude;
    console.log('User tapped at:', latitude, longitude);
    // Optionally convert the tapped coordinates to a more detailed location
    // this.reverseGeocode(latitude, longitude);
  },

  onClickUser(e){
    console.log("点击了用户",e)
  },
  reverseGeocode: function(lat, lon) {
    // Use Tencent Maps SDK or a similar service to fetch location details
    // This example assumes you have a method to perform reverse geocoding
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: lat,  
        longitude: lon
      },
      success: function(res) {
        console.log('Location details:', res);
        if (res.result && res.result.formatted_addresses) {
          // Update your data or UI here
          wx.showToast({
            title: `Location: ${res.result.formatted_addresses.recommend}`,
            icon: 'none'
          });
        }
      },
      fail: function(error) {
        console.error('Reverse geocoding failed:', error);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  canIhavePosition(){
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
          // scale: 16 // 设置地图缩放级别
        });
        // 在这里可以根据获取到的用户位置信息进行后续操作
      },
      fail: (res) => {
        console.log('获取用户位置信息失败', res);
      }
    });
  },
/**
   * 拖动地图回调
   */
  regionChange: function (res) {
    var that = this;
    // 改变中心点位置  
    if (res.type === "end") {
      that.getCenterLocation();
    }
  },

/**
   * 得到中心点坐标
   */
  getCenterLocation: function () {
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.infoCenterLocation(res.latitude, res.longitude);
        // 可以在这里调用地理编码或其他查询功能
        that.regeocodingAddress();
        that.queryMarkerInfo();
      }
    })
  },
  infoCenterLocation(lat,lon){
    // 景区信息弹出
    // this.setData({
    //   latitude:lat,
    //   longitude:lon
    // })
  },
  regeocodingAddress: function() {
    // 实现逆地理编码功能
  },
  queryMarkerInfo: function() {
    // 查询标记信息
  },
  goBackPosition(){
    this.mapCtx.moveToLocation();
  },
  checkOnline(){
    wx.showModal({
      title: '确认授权？',
      content: '需要公开您的位置',
      complete: (res) => {
        if (res.cancel) {
          return;
        }
    
        if (res.confirm) {
          this.setData({openPosition:true})
          console.log("授权成功");
          this.loadMarker();
        }
      }
    })
  },
  loadMarker(){
    let that = this;
    const list = this.data.list;
    console.log(this.data.list)
    list.forEach(function(i,index){
      console.log("iiii",i,index);
      const newmarker ={
        id: index,  // Use index if user ID is not unique
        iconPath: "/images/map_marker3.svg",
        avatar:i.avatar,
        username:i.username,
        latitude: i.latitude,
        longitude: i.longitude,
        width: i.width,
        height: i.height,
        customCallout: {
          anchorX:0,
          anchorY:0,
          display:'ALWAYS'
        }
      }
      that.setData({
        markers:[...that.data.markers,newmarker]
      })
      console.log("markers1",that.data.markers)
    })
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
 lockPosition(){
   this.setData({ openPosition:false})
   wx.showToast({
     title: '已隐藏位置',
     icon:'success'
   })
   this.setData({
     markers:[]
   })
 },
 goChatRoom(){
   wx.navigateTo({
     url: '/pages/enterLive/index',
   })
 },
})