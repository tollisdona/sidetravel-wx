// components/matelist/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    },
    index:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickItem(){
      wx.navigateTo({
        url: '/pages/mateinfo/index?item='+this.data.item,
      })







      
    }
  }
})