// components/comment/index.js
import api from '../../config/api'
var app = getApp()
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    noteId:{
      type: Number,
      value:-1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    commentVoList: [],
    userLocal: wx.getStorageSync("userInfo"),
    hasLogin:false,
    showInput:false,
    reply:''
  },

  /**
   * 组件的方法列表
   */
  lifetimes:{
    created(){
      var page = getCurrentPages()[getCurrentPages().length-1]
      // var options = page.options

      if(app.globalData.hasLogin){
        this.setData({hasLogin:true})
      }
    },
    attached(){

    },
    ready(){
      console.log("page222:",this.properties.noteId)
      console.log("userlocal:",this.data.userLocal)
      // var info = JSON.parse(decodeURIComponent(page.options.info))
      this.fetchComments(this.properties.noteId);
    }
  },
  methods: {
  fetchComments: function(postId) {
      const that = this;
      wx.request({
          url: api.CommentList,
          data: {
              type: 0,  // Example type
              valueId: postId
          },
          success: function(res) {
            console.log(res)
              if (res.data.errno === 0) {
                  that.setData({
                      commentVoList: res.data.data.list
                  });
              } else {
                  wx.showToast({
                      title: 'Failed to fetch comments',
                      icon: 'none'
                  });
              }
          },
          fail: function() {
              wx.showToast({
                  title: 'Network error',
                  icon: 'none'
              });
          }
      });
  },
  replyComment:function(){
    this.setData({showInput:true})
    console.log("点击恢复")
  },
  replyInput:function(e){
    this.setData({reply:e.detail.value})
  },
  hideview:function(){
    this.setData({showInput:false});
  },
  }
})


