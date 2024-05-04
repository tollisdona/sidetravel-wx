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
    showSuggestions:false,
    suggestions:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInputFocus(event){
      this.triggerEvent('focus',{event});
    },
    //输入搜索内容
    handleInputChange(event){
      const inputValue = event.detail.value;
      if(inputValue === ''){
        this.setData({
          showSuggestions:false
        });
      }else{
      this.setData({
        value:inputValue,
        showSuggestions:true,
      });
    }
      // 在这里可以根据 inputValue 去调用接口或者本地数据进行联想匹配，并更新 suggestions 数据
      // 假设这里是一个本地数据的联想匹配函数
      const suggestions = this.getLocalSuggestions(inputValue);
      this.setData({
        suggestions: suggestions
      });
      // this.keywordSearch(this.data.value);
      // const value = this.keywordSearch();
      // this.triggerEvent('search',{keyword:value})
    },
    // 模拟本地数据的联想匹配函数
  getLocalSuggestions: function(inputValue) {
    const suggestionsData = ['济南', '济南打卡地', '攻略','青岛攻略', '西安攻略', '大明湖风景区','山东枣庄','山东济宁'];
    const filteredSuggestions = suggestionsData.filter(item => item.includes(inputValue));
    return filteredSuggestions;
  },
  // 点击联想建议列表中的某一项
  selectSuggestion: function(e) {
    const selectedItem = e.currentTarget.dataset.item;
    console.log(selectedItem);
    // 跳转到搜索结果页面，并携带选中的联想建议项进行搜索
    wx.navigateTo({
      url: '/pages/searchResults/index?keyword=' + selectedItem
    });
  },
  // 搜索函数，在用户按下回车键或者点击搜索建议列表中的某一项时触发
  handleInputConfirm: function(e) {
    const inputValue = e.detail.value;
    // 跳转到搜索结果页面，并携带选中的联想建议项进行搜索
    wx.navigateTo({
      url: '/pages/searchResults/searchResults?keyword=' + inputValue
    });
  },
    //取消搜索
    onCancel(){
      this.triggerEvent('cancel');
    },
    //清除输入内容
    onClearTap(){
      this.setData({
        value: '',
        showSuggestions:false
      });
      // this.triggerEvent('clear');
    },

    //deprecated 处理联想关键词列表的点击事件
    handleItemTap(event){
      const index = event.currentTarget.dataset.index;
      const item = this.data.searchResult[index];
      console.log('dianjile',index,'neirongshi,',item);
      //触发搜索
      this.triggerEvent('search',{keyword:item})
    }
  }
})