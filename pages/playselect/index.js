// pages/playselect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    showDate:false,
    to:'',
    from:''
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
  clickFrom(){


  },
  clickTo(){

  },
  onFinish(){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  
    prevPage.setData({
      selectList:[
      {"date": "05月01日-05月03日",
        "to": "北京",
        "description": "寻找旅游伴侣",
        "user": {
         "name": "小明",
         "avatar": "/images/user-fill.svg",
         "medal":[],
         "gender":"0"
         },
         "posttime": "2024-04-15 14:30"
      }],
      status:'select'
    })
    wx.navigateBack({
      delta: 1,
    })
    //返回currenttab为select
  }
})