// components/custom-tab-bar/index.js
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
    "list": [
      {
        "pagePath": "pages/square/square",
        "text": "首页",
        "icon":"/images/home.svg",
        "icons":"/images/home-fill.svg",
        "iconSize":50
      },
      {
        "pagePath": "pages/playmate/index",
        "text": "游伴",
        "icon":"/images/customer-group.svg",
        "icons":"/images/customer-group-fill.svg",
        "iconSize":55
      },
      {
        "pagePath": "pages/moment/index",
        "text": "发布",
        "icon":"/images/add-btn.svg",
        "icons":"/images/add-btn-fill.svg",
        "iconSize":90
      },
      {
        "pagePath": "pages/location/index",
        "text": "景点",
        "icon":"/images/position.svg",
        "icons":"/images/position-fill.svg",
      },
      {
        "pagePath": "pages/userinfo/index",
        "text": "个人信息",
        "icon":"/images/user.svg",
        "icons":"/images/user-fill.svg",
        "iconSize":55
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e){
      const data = e.currentTarget.dataset;
      console.log(data);
      wx.switchTab({
        url: "/"+data.path,
      })
    }
  }
})