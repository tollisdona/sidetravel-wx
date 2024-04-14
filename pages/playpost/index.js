// pages/playpost/index.js
import areaList from '@vant/area-data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    show:false,
    showFrom: false,
    showTo: false,
    areaList,
    description:''

  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      show: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
  },
  inputDes(event){
    this.setData({
      description:event.detail
    })
  }
 
})