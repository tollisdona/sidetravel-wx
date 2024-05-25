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
    start:'',
    end:''
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
      end: new Date(end)
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

    var Dstart = ''
    if(this.data.start !=''){
      Dstart = util.formatTime(this.data.start);
    }
    var Dend = ''
    if(this.data.end !=''){
      Dend = util.formatTime(this.data.end);
    }
    const data = `from=${encodeURIComponent(this.data.from)}&to=${encodeURIComponent(this.data.to)}&start=${encodeURIComponent(Dstart)}&end=${encodeURIComponent(Dend)}`
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