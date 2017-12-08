// pages/question/question.js
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition:false,
    poetry:[],
    currentIndex:0,
    subject:{},
    inputValue1:"",
    inputValue2: "" ,
    isAnswer:false   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.yingshangyan.com/api/index/getQuestionList',
      data:{
        level_id:1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res =>{
        var currentIndex = this.data.currentIndex;
        this.setData({
          poetry: res.data.data
        })
        var _poetry = this.data.poetry.slice();
        this.poetryArray(_poetry);
      }
    })    
  },
  poetryArray(array) {
    var currentIndex = this.data.currentIndex;
    var arr = array.splice(currentIndex)
    this.setData({
      subject:arr[0]
    })    
  },
  next(){
    this.data.currentIndex ++;
    if (this.data.currentIndex < this.data.poetry.length){
      var _poetry = this.data.poetry.slice();
      this.poetryArray(_poetry);
      this.clearInput();
    }else{
      this.data.currentIndex = this.data.poetry.length-1;
      return
    }
  },
  prev() {
    this.data.currentIndex --;
    if (this.data.currentIndex >= 0) {
      var _poetry = this.data.poetry.slice();
      this.poetryArray(_poetry);
      this.clearInput();
    } else {
      this.data.currentIndex =0;
      return
    }
  },
  clearInput(){
    this.setData({
      inputValue1: '',
      inputValue2: ''
    })
  },
  bindKeyInput1: function (e) {
    this.setData({
      inputValue1: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      inputValue2: e.detail.value
    })
  },
  submitAsw(){
    var sub = this.data.subject.content;
    if (this.data.inputValue1 && this.data.inputValue2){
      if (this.data.inputValue1 === sub.text1 && this.data.inputValue2 === sub.text3){
        if (this.data.isAnswer){
          wx.showToast({
            title: '请勿重复作答！',
            image: '../../images/error-icon.png',
            duration: 2000
          })
          return;
        }
        this.setData({
          isAnswer:true
        })
        console.log(appInstance.globalData.correctCount)
        wx.showToast({
          title: '回答正确！',
          icon: 'success',
          duration: 2000
        })
        return
      }else{
        wx.showToast({
          title: '再想想看',
          image: '../../images/error-icon.png',
          duration: 2000
        })
      }
    }else{
      wx.showToast({
        title: '请填写答案',
        image: '../../images/error-icon.png',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})