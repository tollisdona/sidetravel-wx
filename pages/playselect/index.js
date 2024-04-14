// pages/playselect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    showDate:false,
  },
  onDisplay() {
    this.setData({ showDate: true });
  },
  onClose() {
    this.setData({ showDate: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      showDate: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
  },
  onFinish(){
    //返回currenttab为select
  }
})