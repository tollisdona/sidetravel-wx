// components/search-bar/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    confirmType:{
      type:String,
      value:"search"
    },
    placeholder: String,
    placeholderStyle:{
      type:String,
      value:""
    },
    cancelText:{
      type:String,
      value:"取消"
    },
    value:String,
    type:String,
    showCancel:{
      type:Boolean,
      value:0
    },
    focus: Boolean,
    cursorColor:{
      type:String,
      value:"#000000"
    },
    clear:{
      type:Boolean,
      value:!0
    },
    disabled:Boolean,
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

  }
})