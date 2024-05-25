// pages/playpost/index.js
import areaList from '@vant/area-data'
import util from '../../utils/util'
import api from '../../config/api'
import user from '../../utils/user'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    show:false,
    areaList,
    description:'',
    from:'',
    to:'',
    start:null,
    end:null
  },
  onShow(){
    user.checkLogin().then(res =>{
    }).catch(err =>{
      wx.showToast({
        title: '请先登录！',
        icon:'error'
      })
      // app.globalData.hasLogin = false;
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/userinfo/index/index',
        })
      }, 500); 
    })
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      show: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
      start: start,
      end: end
    });
  },
  inputDes(event){
    this.setData({
      description:event.detail
    })
  },
  handleFrom(e){
    var from = e.detail.message
    this.setData({ from:from})

  },
  handleTo(e){
    var to = e.detail.message
    this.setData({ to:to})
  },
  onClickPost(){
    if(this.data.to == null ||this.data.from == null || this.data.start ==null || this.data.end == null){
      wx.showToast({
        title: '信息不完整！！',
        icon :"none"
      })
      return;
    }

    util.request(api.PartnerPost,{
      toPosition: this.data.to,
      fromPosition:this.data.from,
      fromDate: new Date(this.data.start),
      toDate: new Date(this.data.end),
      description:this.data.description
    },"POST",{
      'Content-Type': 'application/json',
      'X-Sidetravel-Token': wx.getStorageSync('token')
    }).then(res =>{
      console.log("发布寻伴返回：",res);
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      });
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/playmate/index',
        })
      }, 2000); 
    }).catch(err =>{
      util.showErrorToast(err)
    })
  }

})