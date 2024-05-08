import { Curves, CurveAnimation, lerp } from '../list/route'
import { clamp } from '../list/utils'
import api from '../../config/api.js'

const { screenWidth } = wx.getSystemInfoSync()
const { shared, timing, Easing } = wx.worklet
var app = getApp()

const GestureState = {
  POSSIBLE: 0, // 0 此时手势未识别，如 panDown等
  BEGIN: 1, // 1 手势已识别
  ACTIVE: 2, // 2 连续手势活跃状态
  END: 3, // 3 手势终止
  CANCELLED: 4, // 4 手势取消，
}

const transLowerBound = -1/3 * screenWidth
const transUpperBound = 2/3 * screenWidth

Component({
  properties: {
    index: {
      type: Number,
      value: -1,
    },
    url: {
      type: String,
      value: '',
    },
    ratio: {
      type: Number,
      value: 1
    }
  },
  data: {
    swiperHeight: 0,
    info:{},
    safeTop:0,
    safeBottom:0,
    system:'',
    hasLogin:false,
    comment:''
  },
  lifetimes: {
    created() {
      this.startX = shared(0)
      this.startY = shared(0)
      this.transX = shared(0)
      this.transY = shared(0)
      this.isInteracting = shared(false)
      const res = wx.getSystemInfoSync()
      console.log("system:",res.brand)
      console.log("system:",res)
      if(app.globalData.hasLogin){
        this.setData({hasLogin:true})
      }
    },
    ready(){
      var page = getCurrentPages()[getCurrentPages().length-1]
      console.log("page:",page.options)
      this.setData({
        info:JSON.parse(decodeURIComponent(page.options.info))
      })
    },
    attached() {
      this.setData({
        swiperHeight: screenWidth / this.data.ratio,
      })
      this.customRouteContext = wx.router?.getRouteContext(this);
      const { 
        primaryAnimation,
        primaryAnimationStatus,
        userGestureInProgress,
        shareEleTop
      } = this.customRouteContext || {}

      // 根据进入或返回使用不同曲线换算到的值
      const _curvePrimaryAnimation = CurveAnimation({
        animation: primaryAnimation,
        animationStatus: primaryAnimationStatus,
        curve: Easing.in(Curves.fastOutSlowIn),
        reverseCurve: Easing.out(Curves.fastOutSlowIn)
      })

      this.applyAnimatedStyle('.detail-content', () => {
        'worklet'
        return {
          opacity: _curvePrimaryAnimation.value
        }
      })

      this.applyAnimatedStyle('#fake-host', () => {
        'worklet'
        // pan 手势释放后，触发返回动画，userGestureInProgress 由 startUserGesture() 标记
        if (userGestureInProgress.value && 
          globalThis['RouteCardSrcRect'] && 
          globalThis['RouteCardSrcRect'].value != undefined
        ) {
          const begin = globalThis['RouteCardSrcRect'].value
          const end = globalThis['RouteCardDestRect'].value
          
          const t = 1 - _curvePrimaryAnimation.value
          const shareEleX = lerp(begin.left, end.left, t)
          const shareEleY = lerp(begin.top, end.top, t)
          const shareEleW = lerp(begin.width, end.width, t)
          
          const scale = shareEleW / screenWidth
          const transX = shareEleX
          // shareEleTop 是完全展开时 share-element 的 top 值，换比例换算
          // 使得缩放过程中，最后图片顶部对齐卡片图片顶部
          const transY = shareEleY - shareEleTop.value * scale

          return {
            transform: `translateX(${transX}px) translateY(${transY}px) scale(${scale})`,
            transformOrigin: '0 0',
          }
        }
        // pan 手势移动阶段
        const transX = this.transX.value
        const transY = this.transY.value
        // 根据横坐标位移比例缩放
        const scale = clamp(1 - transX / screenWidth * 0.5, 0, 1)
        return {
          transform: `translateX(${transX}px) translateY(${transY}px) scale(${scale})`,
          transformOrigin: '50% 50%'
        }
      }, { immediate: false })
    },
  },
  methods: {
    handlePanGesture(e) {
      'worklet'
      const {
        startUserGesture,
        stopUserGesture,
        primaryAnimation,
        didPop,
      } = this.customRouteContext

      if (e.state === GestureState.BEGIN) {
        this.startX.value = e.absoluteX
        this.startY.value = e.absoluteY
      } else if (e.state === GestureState.ACTIVE) {
        // 往右滑时
        if (e.deltaX > 0 && !this.isInteracting.value) {
          this.isInteracting.value = true
        }
        if (!this.isInteracting.value) return

        const transX = e.absoluteX - this.startX.value
        this.transX.value = clamp(transX, transLowerBound, transUpperBound)
        this.transY.value = e.absoluteY - this.startY.value
      } else if (e.state === GestureState.END || e.state === GestureState.CANCELLED) {
        if (!this.isInteracting.value) return
        this.isInteracting.value = false

        // 是要返回还是取消返回
        let shouldFinish = false
        if (e.velocityX > 500 || this.transX.value / screenWidth > 0.25) {
          shouldFinish = true
        }
        if (shouldFinish) {
          startUserGesture()
          primaryAnimation.value = timing(0.0, {
            duration: 180,
            easing: Easing.linear
          }, () => {
            'worklet'
            stopUserGesture()
            didPop()
          })
        } else {
          this.transX.value = timing(0.0, { duration: 100 })
          this.transY.value = timing(0.0, { duration: 100 })
        }
      }
    },
    checkLogin: function() {
      if (!app.globalData.hasLogin) {  // Assuming isUserLoggedIn is a method that checks login status
          wx.showToast({
              title: '请先登录',
              icon: 'none',
              duration: 2000
          });
          setTimeout(() => {
              wx.switchTab({
                url: '/pages/userinfo/index/index',// Update this with the path to your login page
              })
          }, 500); // Wait for the toast to end before redirecting
          return;
      }
      // If the user is logged in, do nothing, let the input gain focus naturally
    },
    postComment: function() {
    if (!this.data.comment) {
        wx.showToast({
            title: '评论内容不能为空',
            icon: 'none'
        });
        return;
    }
    let that =this
    wx.request({
        url: api.CommentPost,
        method: 'POST',
        data: {
            content: that.data.comment, // Content of the comment
            type:0,
            valueId: that.data.info.noteId,   // ID of the post being commented on
            parentId:""
        },
        header: {
            'content-type': 'application/json', // Assuming JSON data
            'X-Sidetravel-Token': wx.getStorageSync('token')
        },
        success: (res) => {
            if (res.data.errno === 0) {
                wx.showToast({
                    title: '评论成功',
                    icon: 'success'
                });
                // Optionally clear the comment input field
                that.setData({
                    comment: ''
                });
                // 刷新页面
                that.onLoad()
                // that.fectchComment(that.data.info.noteId)
                // Refresh comments or handle as needed
            } else {
                wx.showToast({
                    title: '评论失败，请稍后重试',
                    icon: 'none'
                });
            }
        },
        fail: () => {
            wx.showToast({
                title: '网络错误',
                icon: 'none'
            });
        }
    });
  },
    bindKeyInput: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },

  },
})
