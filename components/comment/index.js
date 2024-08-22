// components/comment/index.js
import api from '../../config/api'
var app = getApp()
const header = {
  "Content-Type": "application/json",
  'X-Sidetravel-Token': wx.getStorageSync('token')
}
const uid = wx.getStorageSync('userInfo').id
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    noteId: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    commentVoList: [],
    userLocal: wx.getStorageSync("userInfo"),
    hasLogin: false,
    showInput: false,
    reply: '',
    replyIndex: null,  // 保存被回复评论的索引
    clickLike: true,
    clickLike2: true
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    created() {
      if (app.globalData.hasLogin) {
        this.setData({ hasLogin: true })
      }
    },
    attached() {

    },
    ready() {
      this.fetchComments(this.properties.noteId);
    }
  },
  methods: {
    clicklike(e) {
      console.log("clikced", this.data.commentVoList);
      this.setData({
        clickLike: !this.data.clickLike
      })
    },
    clicklike2(e) {
      console.log("clikced");
      this.setData({
        clickLike2: !this.data.clickLike2
      })
    },
    fetchComments: function (postId) {
      const that = this;
      wx.request({
        url: api.CommentList,
        data: {
          type: 0,  // Example type
          valueId: postId
        },
        success: function (res) {
          // console.log(res)
          if (res.data.errno === 0) {
            // console.log(res)
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
        fail: function () {
          wx.showToast({
            title: 'Network error',
            icon: 'none'
          });
        }
      });
    },
    // replyComment: function (e) {
    //   // console.log('pinglun信息',e);
    //   this.triggerEvent('pullUpInput', { message: e.detail })
    //   this.setData({ showInput: true })
    //   console.log("点击恢复")
    // },
    replyComment: function (e) {
      const index = e.currentTarget.dataset.index;
      this.setData({ showInput: true, reply: '', replyIndex: index });
      const query = wx.createSelectorQuery().in(this);
      query.select(`#comment-${index}`).boundingClientRect(function (rect) {
        wx.pageScrollTo({
          scrollTop: rect.top,
          duration: 300
        });
      }).exec();
    },
    replyInput: function (e) {
      this.setData({ reply: e.detail.value })
    },
    submitReply: function () {
      let that = this
      const { reply, replyIndex, commentVoList } = this.data;
      console.log(reply, replyIndex, commentVoList)
      if (reply.trim() === '') {
        wx.showToast({
          title: '回复内容不能为空',
          icon: 'none'
        });
        return;
      }
      // 获取被回复的评论信息
      let comment;
      if (typeof replyIndex === 'number') {
        // 一级评论
        comment = commentVoList[replyIndex];
      console.log("comment", comment)

      // 提交回复逻辑
        wx.request({
          url: api.CommentPost,
          method: "POST",
          data: {
            content: that.data.reply,
            type: 0,
            valueId: comment.valueId,
            rootCommentId: comment.id,
            toCommentId: ""
          },
          header: header,
          success: (res) => {
            if (res.data.errno === 0) {
              wx.showToast({
                title: '评论成功',
                icon: 'success'
              });
              // 清空输入框并隐藏
              that.setData({ showInput: false, reply: '', replyIndex: null });
              // 刷新页面 -- 通过id 获取comment组件 重新加载
              that.fetchComments(comment.valueId);
            } else {
              wx.showToast({
                title: '评论失败，请稍后重试',
                icon: 'none'
              });
            }
          },
          fail: (err) => {
            console.log("Err",err)
          }
        })
      } else {
        const [parentIndex, childIndex] = replyIndex.split('-');
        comment = commentVoList[parentIndex].childComments[childIndex];
      console.log("comment", comment)

      // 提交回复逻辑
        wx.request({
          url: api.CommentPost,
          method: "POST",
          data: {
            content: that.data.reply,
            type: 0,
            valueId: comment.child.valueId,
            rootCommentId: comment.child.rootCommentId,
            toCommentId: comment.child.id
          },
          header: header,
          success: (res) => {
            if (res.data.errno === 0) {
              wx.showToast({
                title: '评论成功',
                icon: 'success'
              });
              // 清空输入框并隐藏
              that.setData({ showInput: false, reply: '', replyIndex: null });
              // 刷新页面 -- 通过id 获取comment组件 重新加载
              that.fetchComments(comment.child.valueId);
            } else {
              wx.showToast({
                title: '评论失败，请稍后重试',
                icon: 'none'
              });
            }
          },
          fail: () => {
            console.log("Err",err)

          }
        })
      }
    },
    handleTap: function () {
      // 隐藏输入框
      if (this.data.showInput) {
        this.setData({ showInput: false });
      }
    },
    preventTap: function () {
      // 阻止事件冒泡
    }
  }
})


