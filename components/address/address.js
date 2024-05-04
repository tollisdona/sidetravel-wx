// components/addressOption/addressOption.js
//省市区数据引入使用
import { areaList } from "@vant/area-data";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      optionValue: {
          type: String,
          value: ""
      },
      mustfFillIn: {
          type: String,
          value: false
      },
      label:{
        type:String,
        value:""
      },
      title:{
        type:String,
        value:""
      },
      placeholder:{
        type:String,
        value:""
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      areaList,
      show:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
      onClick() {
          this.setData({
              show: true,
          });
      },

      onConfirm(e){
          console.log("确定省市区：",e)
          var address=""
          e.detail.values.forEach(element => {
              address=address+element.name
          });
          this.setData({
              fieldValue: address,
              show: false,
          })
          this.handleTap()
          console.log("省市区为：",address)
      },

      handleTap() {
          let value = this.data.address
          console.log("fieldValue 地址：", value)
          this.triggerEvent("addressTab", value)
      },

      onClose() {
          this.setData({
              show: false,
          });
      },

  },
  observers: {
      optionValue: function (e) {
          this.setData({
              fieldValue: e
          })
      }
  },
})