// pages/userinfo/mypartner/index.js
import util from '../../../utils/util'
import api from '../../../config/api'
Page({
  data: {
    postList:[]
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadAllPartner();
  },
  onClickPost(){
    wx.navigateTo({
      url: '/pages/playpost/index',
    })
  },
  loadAllPartner:function(){
    util.request(api.PartnermyList,{},"POST").then(res =>{
      console.log("我的寻伴信息",res);
      this.setData({postList: res.data.list})
    })
  },
  handleItemLongPress(e){
    let that = this;
    const partnerId = e.detail.id
    const item = e.detail.item
    wx.showActionSheet({
      itemList: ['删除'],
      success: function (res) {
        if(res.tapIndex === 0){
          that.delete(partnerId)
        }
        // console.log(JSON.stringify(res))
        // console.log(res.tapIndex) // 用户点击的按钮，从上到下的顺序，从0开始
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })

  },
  delete(id){
    let that =this;
    console.log(id);
    const data = `id=${encodeURIComponent(id)}`
    util.request(api.PartnerDelete,data,"POST").then(res =>{
      console.log("结果",res);
      that.loadAllPartner()
    })
  }
})