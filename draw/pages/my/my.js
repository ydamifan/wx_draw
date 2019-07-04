// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    avatar: null,
    draws:[],
    windowHeight:1334
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var app=getApp();
    this.setData({
      name: app.globalData.userInfo.nickName,
      avatar: app.globalData.userInfo.avatarUrl
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
    var windowInfo=wx.getSystemInfoSync();
    if (windowInfo.windowHeight>=1334)
    {
      this.setData({
        windowHeight: windowInfo.windowHeight
      })
    }
    //console.log(this.data.windowHeight)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8080/getUserDraw',
      data:{userName:that.data.name},
      success:function(res){
        that.setData({
          draws:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})