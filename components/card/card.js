import util from '../../utils/util'
import api from '../../config/api'
var app = getApp()
const header = {
  "Content-Type": "application/json",
  'X-Sidetravel-Token': wx.getStorageSync('token')
}
const { shared } = wx.worklet
const FlightDirection = {
  PUSH: 0,
  POP: 1,
}

Component({
  options: {
    virtualHost: true,
  },
  properties: {
    index: {
      type: Number,
      value: -1,
    },
    item: {
      type: Object,
      value: {},
    },
    cardWidth: {
      type: Number,
      value: 0
    },
    heightType:{
      type: Number,
      value:0
    }
  },

  lifetimes: {
    created() {
      this.scale = shared(1)
      this.opacity = shared(0)
      this.direction = shared(0)
      this.srcWidth = shared('100%')
      this.radius = shared(5)

      const beginRect = shared(undefined)
      const endRect = shared(undefined)
      wx.worklet.runOnUI(() => {
        'worklet'
        globalThis['RouteCardSrcRect'] = beginRect
        globalThis['RouteCardDestRect'] = endRect
      })()
    },
    attached() {
      this.applyAnimatedStyle(
        '.card_wrap', 
        () => {
          'worklet'
          return {
            width: this.srcWidth.value,
            transform: `scale(${this.scale.value})`,
          }
        }, 
        {
          immediate: false,
          flush: 'sync'
        },
        () => {}, 
      )

      this.applyAnimatedStyle(
        '.card_img',
        () => {
          'worklet'
          return {
            borderTopRightRadius: this.radius.value, // 不带单位默认是 px
            borderTopLeftRadius: this.radius.value,
          }
        },
        {
          immediate: true,
          flush: 'sync'
        },
        () => {}, 
      )

      this.applyAnimatedStyle(
        '.card_desc',
        () => {
          'worklet'
          return {
            opacity: this.opacity.value,
          }
        },
        {
          immediate: false,
          flush: 'sync'
        },
        () => {}, 
      )
    },
  },

  methods: {
    navigateTo(e) {
      const { index, url, ratio, info} = e.currentTarget.dataset
      console.log("detaiL",e.currentTarget.dataset)
      var pageRoute = getCurrentPages()[getCurrentPages().length - 1].route
      var urlContent
      if(pageRoute.indexOf('/userinfo') !== -1){
        // 当前路径在 /userinfo/ 下，执行相应逻辑
        urlContent = `../../../pages/detail/detail?index=${index}&url=${encodeURIComponent(url)}&ratio=${ratio}&info=${encodeURIComponent(JSON.stringify(info))}`
      }else{
        urlContent = `../../pages/detail/detail?index=${index}&url=${encodeURIComponent(url)}&ratio=${ratio}&info=${encodeURIComponent(JSON.stringify(info))}`
      }
      // console.log("page",page)

      // 添加足迹
      if(wx.getStorageSync('userInfo') != null){
        const data = `uId=${wx.getStorageSync('userInfo').id}&noteId=${info.noteId}`
        util.request(api.FootprintAdd,data,"POST").then(res=>{
          console.log("res",res)
        })
      }
      wx.navigateTo({
        url: urlContent,
        routeType: 'CardScaleTransition',
      })
    },
    handleFrame(data) {
      'worklet'
      this.direction.value = data.direction
      if (data.direction === FlightDirection.PUSH) { // 进入
        // 飞跃过程中，卡片从 100% 改为固定宽度，通过 scale 手动控制缩放
        this.srcWidth.value = `${data.begin.width}px`
        this.scale.value = data.current.width / data.begin.width
        this.opacity.value = 1 - data.progress
        this.radius.value = 0
        // this.shareImgHeight.value = data.begin.height

      } else if (data.direction === FlightDirection.POP) { // 返回
        this.scale.value = data.current.width / data.end.width
        this.opacity.value = data.progress
        this.radius.value = 5
      }

      // globalThis 是 UI 线程的全局变量，将 share-element 初始和目标尺寸保存起来，用于下一页面的缩放动画的计算
      // TODO: 后续计划优化这里的接口设计
      if (globalThis['RouteCardSrcRect'] && globalThis['RouteCardSrcRect'].value == undefined) {
        globalThis['RouteCardSrcRect'].value = data.begin
      }
      if (globalThis['RouteCardDestRect'] && globalThis['RouteCardDestRect'].value == undefined) {
        globalThis['RouteCardDestRect'].value = data.end
      }
    },

    clickLike(){
      let that =this
      this.checkLogin();
      const like = {
        type:0,
        tId:this.data.item.info.noteId,
        uid:wx.getStorageSync('userInfo').id
      }
      util.request(api.InteractLike,like,"POST",{
        "Content-Type": "application/json",
        'X-Sidetravel-Token': wx.getStorageSync('token')
      }).then(res =>{
        if(res.errno === 0){
          this.setData({
          'item.info.isLike': true,
          'item.info.likesCount': that.data.item.info.likesCount + 1 
        })
        }else{
          wx.showToast({
            title: res.errno,
            icon:'error'
          })
        }
      }).catch(err=>{

      })
    },
    clickUnLike(){
      let that = this
      const like = {
        type:0,
        tId:this.data.item.info.noteId,
        uid:wx.getStorageSync('userInfo').id
      }
      util.request(api.InteractLike,like,"POST",{
        "Content-Type": "application/json",
        'X-Sidetravel-Token': wx.getStorageSync('token')
      }).then(res =>{
        if(res.errno === 0){
          this.setData({
          'item.info.isLike': false,
          'item.info.likesCount': that.data.item.info.likesCount -1
        })
        }else{
          wx.showToast({
            title: res.errno,
            icon:"error"
          })
        }
      }).catch(err=>{

      })
    },
    checkLogin: function () {
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
  },
})
