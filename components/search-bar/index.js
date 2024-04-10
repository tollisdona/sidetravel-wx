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
    value:'',
    showResult:true,
    searchResult:[
      'ferando',
      'lando',
      'charles'
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInputFocus(event){
      this.triggerEvent('focus',{event});
    },
    //输入搜索内容。
    handleInputChange(event){
      this.setData({
        value:event.detail.value,
        showResult:true,
      })
      this.keywordSearch(this.data.value);
      // const value = this.keywordSearch();
      // this.triggerEvent('search',{keyword:value})
    },
    //关键词联想
    keywordSearch(value){
      //调用后端实时搜索
      //如何提取关键词
    },
    //软键盘按下确认搜索
    handleInputConfirm(event){
      const value = this.data.value;
      this.triggerEvent('search',{keyword:value});
    },
    //取消搜素
    onCancel(){
      this.triggerEvent('cancel');
    },
    //清除输入内容
    onClearTap(){
      this.setData({
        value: ''
      });
      // this.triggerEvent('clear');
    },
    //处理联想关键词列表的点击事件
    handleItemTap(event){
      const index = event.currentTarget.dataset.index;
      const item = this.data.searchResult[index];
      console.log('dianjile',index,'neirongshi,',item);
      //触发搜索
      this.triggerEvent('search',{keyword:item})
    }
  }
})