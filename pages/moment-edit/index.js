// pages/moment-edit/index.js
import util from '../../utils/util'
import api from '../../config/api'
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList:[],
    position:{},
    content:"",
    tag:"",
    isClicked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

// 读取图片
async afterRead(File) {
  console.log("AFTERREAD")
  console.log("file:",File.detail.file)
  const fileLimit = 5 * 1024 * 1024
  let tempFiles = File.detail.file
  for(let i=0; i< tempFiles.length; i++){
    let filePath = tempFiles[i].url
    // let suffixType = filePath.substring(filePath.lastIndexOf(".")+1)
    if(tempFiles[i].size > fileLimit){
      filePath =await this.compressFile(filePath,tempFiles[i].type)
      tempFiles[i].url= filePath
    }
  }
  this.setData({fileList:this.data.fileList.concat(tempFiles)})
  console.log("afterread的filelist",this.data.fileList)
  },
  compressFile(src,type){
    return new Promise((resolve) =>{
      let quality = 80
      if(type === "image"){
        wx.compressImage({
                src:src,
                quality:quality,
                success:function(res){
                  resolve(res.tempFilePath)
                },
                fail: function(err){
                  resolve(src)
                }
              })
      }else if (type === "video"){
        wx.compressVideo({
          quality: "medium",
          src:src,
          success: function(res){
            resolve(res.tempFilePath)
            console.log(res,"yasuochenggong")
          },
          fail:function(err){
            resolve(src)
          }
        })
      }
    })
  },
  uploadFile(i,file){
    return new Promise((resolve, reject) => {
      wx.uploadFile({ 
        url: api.StorageUpload,
        filePath: file.url,
        name: 'file',
        success: (res) => {
          const data = JSON.parse(res.data);
          // 打印数据
          console.log("上传返回数据:",data)
          if (data.errno === 0) {
            // 替换临时链接
            this.setData({
              [`fileList[${i}].url`]: data.data.url
            });
            resolve(data.data.url);  // Resolve with the URL
          } else {
            reject(new Error('Upload failed with errno ' + data.errno));
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  },

  delete(event) {
    const index = event.detail.index;
    this.data.fileList.splice(index,1);
    this.setData({
      fileList:this.data.fileList
    })
   },
  onTapLabel(){

  },
  onTapPosition(){
    var that = this;
    wx.chooseLocation({
    success: function (res) {
        console.log('选择位置成功', res);
        // 获取用户选择的位置信息
        const name = res.name; // 位置名称
        const address = res.address; // 详细地址
        const latitude = res.latitude; // 纬度
        const longitude = res.longitude; // 经度
        // 可以根据需要将位置信息保存到 data 中或者进行其他操作
        that.setData({
          position:{
            name:name,
            address:address,
            latitude:latitude,
            longitude:longitude
          }
        })
       },
        fail: function (err) {
          console.error('选择位置失败', err);
          // 如果用户拒绝授权位置权限，则可能会触发 fail 回调函数
        }
      });
  },

  onTapPost(){
    if(!this.data.content && this.data.fileList.length === 0){
      util.showErrorToast("发表内容为空！")
      return false
    }
    this.setData({isClicked:true})
    wx.showLoading({
      title: '上传中',
    })
    const uploadPromises = this.data.fileList.map((file, index) => this.uploadFile(index, file));
    let that = this
    Promise.all(uploadPromises).then(urlList => {
      // All files have been uploaded successfully
      console.log("地理位置",that.data.position)
      util.request(api.NotePost, {
        content: that.data.content,
        media: urlList,  // Use the new URLs from the uploadFile resolution
        tag: that.data.tag,
        position: JSON.stringify(that.data.position)
      }, "POST", {
        'Content-Type': 'application/json',
        'X-Sidetravel-Token': wx.getStorageSync('token')
      }).then(res => {
        wx.hideLoading();
        if (res.errno === 0) {
          wx.showToast({title: '发布成功'})
          wx.switchTab({url: '/pages/square/square'})
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none'
          });
          this.setData({ isClicked: false });
        }
      }).catch(error => {
        wx.hideLoading();
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
        console.log("Post error:", error);
        this.setData({ isClicked: false });
      });
    }).catch(error => {
      wx.hideLoading();
      wx.showToast({
        title: '上传失败',
        icon: 'none'
      });
      console.log("Upload error:", error);
      this.setData({ isClicked: false });
    });
  },
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if(!app.globalData.hasLogin){
      wx.navigateTo({
        url: '/pages/userinfo/index/index',
      });
      return;
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})