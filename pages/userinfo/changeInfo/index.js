// pages/userinfo/changeInfo/index.js
import util from '../../../utils/util'
import api from '../../../config/api'

Page({
  data: {
    user:{},
    uploadFile:null,
    avatar:''
  },
  onLoad(options){
    var info = JSON.parse(decodeURIComponent(options.user))
    this.setData({
      user: info,
      avatar:info.avatar
    })

  },
  onReady(){

  },

  chooseAvatar: function() {
    wx.chooseMedia({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log(res)
        this.setData({
          avatar: res.tempFiles[0].tempFilePath,
          uploadFile:res.tempFiles[0].tempFilePath
        })
      }
    })
  },

  handleNameInput: function(e) {
    this.setData({
      'user.username': e.detail.value
    })
  },

  handleGenderChange: function(e) {
    this.setData({
      'user.gender': e.detail.value === '女' ? 1 : 0
    })
  },

  handleBirthdayChange: function(e) {
    this.setData({
      'user.birthday': e.detail.value
    })
  },

  confirmEdit: function() {
    //TODO: 保存修改后的个人信息
    console.log('确认修改')
    if(this.data.uploadFile != null){
    console.log("daddad",this.data.uploadFile)
    this.uploadAvatar()
      // 上传图片
      // 替换连接
      // 更新用户数据库
    }else{
      this.updateInfo();
    }
  },
  uploadAvatar(){
    let that = this;
    // console.log("filepath",that.data.uploadFile)
    wx.uploadFile({ 
      url: api.StorageUpload,
      filePath: that.data.uploadFile,
      name: 'file',
      success: (res) => {
        const data = JSON.parse(res.data);
        // 打印数据
        console.log("上传返回数据:",data)
        if (data.errno === 0) {
          // 替换临时链接
          this.setData({
            'user.avatar': data.data.url
          });
          console.log(data.data.url);
         this.updateInfo();
        } else {
          console.log(data.data.url);
          wx.showToast({
            title: '图片上传失败',
          })
          return;    
        }
      },
      fail: (err)=>{
        wx.showToast({
          title: err,
          icon:"error"
        })
      }
    });
  },
  updateInfo(){
    let that = this
    util.request(api.UserUpdate,that.data.user,"POST",{
      'Content-Type': 'application/json',
      'X-Sidetravel-Token': wx.getStorageSync('token')
    }).then(res=>{
      wx.showToast({
        title: '修改成功！',
        icon:'success'
      })
      wx.switchTab({
        url: '/pages/userinfo/index/index',
      })
      wx.setStorageSync('userInfo',res.data)
    }).catch(err=>{
      wx.showToast({
        title: '修改失败',
        icon:'error'
      })
      return
    })
  }
})