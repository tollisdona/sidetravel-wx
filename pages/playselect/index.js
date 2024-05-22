// pages/playselect/index.js
import util from '../../utils/util'
import api from '../../config/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    showDate:false,
    to:'',
    from:'',
    start:null,
    end:null
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
      start: new Date(start),
      end: end
    });
  },
  handleFrom(e){
    var from = e.detail.message
    this.setData({ from:from})

  },
  handleTo(e){
    var to = e.detail.message
    this.setData({ to:to})
  },
  onFinish(){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2]; 
    console.log("dayin:",this.data.start)
    // start=${encodeURIComponent(new Date(this.data.start))}&
    const data = `from=${encodeURIComponent(this.data.from)}&to=${encodeURIComponent(this.data.to)}`
      util.request(api.PartnerSelect,data,"POST").then(res =>{
        console.log("筛选：",res);
      prevPage.setData({
        selectList:res.data.list,
        status:"select"
    })
    }).catch(err =>{
      util.showErrorToast(err);
    })

    wx.navigateBack({
      delta: 1,
    })
    //返回currenttab为select
  }
})