// components/tabbar/tabbar.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {


  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedColor:"#B4B4B8",
    color:"#76885B",
    backgroundColor:"#ffffff",
    list: [
      {
        "pagePath": "pages/square/square",
        "text": "首页",
        "iconType":"outline",
        "icon":"home",
        "iconSize":35
      },
      {
        "pagePath": "pages/playmate/index",
        "text": "游伴",
        "iconType":"outline",
        "icon":"group-detail",
        "iconSize":35
      },
      {
        "pagePath": "pages/moment/index",
        "text": "发布",
        "iconType":"outline",
        "icon":"add",
        "bulge":"true",
        "iconSize":55
      },
      {
        "pagePath": "pages/location/index",
        "text": "景点",
        "iconType":"outline",
        "icon":"location",
        "iconSize":35
      },
      {
        "pagePath": "pages/userinfo/index",
        "text": "个人信息",
        "iconType":"outline",
        "icon":"me",
        "iconSize":35
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e){
      const data = e.currentTarget.dataset;
      console.log(data);
      wx.switchTab({
        url: 'pages/moment/index',
      })
    }
  }
})