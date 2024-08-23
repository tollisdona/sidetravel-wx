// pages/userinfo/mymoment/index.js
import { installRouteBuilder } from '../../list/route'
import { compareVersion, fixGridList } from '../../list/utils'
import util from '../../../utils/util'
import api from '../../../config/api'
const { screenWidth } = wx.getSystemInfoSync()
const data = `userId=${encodeURIComponent(wx.getStorageSync('userInfo').id)}`;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    safeHeight:0,
    itemWidth:0,
    windowWidth:0,
    sliderLeft:0,
    sliderOffset:0,
    currentTab:1,
    sliderOffsets:[],
    padding: 4,
    gridList: [],
    cardWidth: (screenWidth - 4 * 2 - 4) / 2, // 减去间距
  },
  created() {
    const {SDKVersion} = wx.getSystemInfoSync()
    if (compareVersion(SDKVersion, '2.30.1') < 0) {
      wx.showModal({
        content: '基础库版本低于 v2.30.1 可能会有显示问题，建议升级微信体验。',
        showCancel: false
      })
    }
    installRouteBuilder()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.created();
    //安全高度
    wx.getSystemInfo({
      success:(res) =>{
        console.log("res",res.screenHeight)
        console.log("resdetail",res.safeArea)
        var windowW = res.windowWidth
        var h = res.safeArea.bottom - res.safeArea.top
        h = h * 750 / windowW
        var sh = h- 120 - 44 - 20
        this.setData({
          safeHeight: sh
        })
      }
    })
  },
  onShow(){
    this.loadData();
  },
  loadData(){
    util.request(api.NoteMyList,data,"POST").then(res=>{
      console.log("mympost",res)
      if(res.errno === 0){
        this.setData({
          gridList: fixGridList(res.data.list)
        })
      }else{
        wx.showToast({
          title: res.errno,
          icon:'error'
        })
      }
    }).catch(err =>{
        wx.showToast({
          title: err,
          icon:'error'
        })
    })
  },

})