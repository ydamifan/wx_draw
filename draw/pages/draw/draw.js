//计数器
var interval = null;
//刷新结果
var intervalNumber = null;
//值越大旋转时间越长  即旋转速度
var intime = 50;
//停止位置
var stop_index=0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clickLuck: 'clickLuck',//点击事件
    userDraws: [],
    images: ['/images/wu.png', '/images/5r.png', '/images/20r.png', '/images/iPhone.jpg', '/images/cj.jpg', '/images/iPhone.jpg', '/images/20r.png', '/images//5r.png', '/images/wu.png'],
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
  },
  gotoInfo:function(){
    wx.navigateTo({
      url: '/pages/rule/rule'
    })
  },
  //点击抽奖按钮
  clickLuck: function() {
    var e = this;
    //设置按钮不可点击
    e.setData({
      clickLuck: '',
    })
  
    //每次点击清空计时器
    clearInterval(interval);
    var index = 0;
    //设置每一项的透明度
    interval = setInterval(function() {
      if (index > 7) {
        index = 0;
        e.data.color[7] = 0.5
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5
      }
      e.data.color[index] = 1
      e.setData({
        color: e.data.color,
      })
      index++;
    }, intime);

    var app = getApp();
    var nickname = app.globalData.userInfo.nickName;
    // console.log(nickname)
    wx.request({
      url: 'http://127.0.0.1:8080/draw',
      data: {
        username: nickname
      },
      success(res) {
        //根据结果设置停止位置
        var t = Math.random()
        // console.log(res.data.level);
        if (res.data.level == "一等奖") stop_index = (t >= 0.5 ? 3 : 7)
        else if (res.data.level == "二等奖") stop_index = (t >= 0.5 ? 2 : 6)
        else if (res.data.level == "三等奖") stop_index = (t >= 0.5 ? 1 : 5)
        else stop_index = (t >= 0.5 ? 0 : 4)
        // console.log(stop_index);
        // console.log(e.data.draw),
        //网络请求时间  设为两秒，设置停止位置
        e.setData({
          draw: res.data,
        })
        var stoptime = 2000;
        setTimeout(function () {
          e.stop(stop_index);
        }, stoptime)
        // console.log(res.data)
        // console.log(draw)
      }
    })
  },

  //转动停止
  stop: function(which) {
    var e = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = -1;
    var color = e.data.color;
    for (var i = 0; i < color.length; i++) {
      if (color[i] == 1) {
        current = i;
      }
    }
    //下标从1开始
    var index = current + 1;
    e.stopLuck(which, index, intime, 10);
  },

  /**
   * which:中奖位置
   * index:当前位置
   * time：时间标记
   * splittime：每次增加的时间 值越大减速越快
   */
  stopLuck: function(which, index, time, splittime) {
    var e = this;
    var color = e.data.color;
    setTimeout(function() {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        color[7] = 0.5
      } else if (index != 0) {
        color[index - 1] = 0.5
      }
      //当前位置为选中状态
      color[index] = 1
      e.setData({
        color: color,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
      //直到旋转至中奖位置
      if (time < 400 || index != which) {
        //越来越慢
        splittime++;
        time += splittime;
        //当前位置+1
        index++;
        e.stopLuck(which, index, time, splittime);
      } else {
        //1秒后显示弹窗
        setTimeout(function() {
          if (e.data.draw.level!="未中奖") {
            //中奖
            wx.showModal({
              title: '恭喜您',
              content: '获得' + e.data.draw.level + ":" + e.data.draw.name,
              showCancel: false,
              confirmText: "我知道了",
              success: function(res) {
                if (res.confirm) {
                  //设置按钮可以点击
                  e.setData({
                    clickLuck: 'clickLuck',
                  })
                  //e.loadAnimation();
                }
              }
            })
          } else {
            //未中奖
            wx.showModal({
              title: '很遗憾',
              content: '您未中奖',
              showCancel: false,
              confirmText: "我知道了",
              success: function(res) {
                if (res.confirm) {
                  //设置按钮可以点击
                  e.setData({
                    clickLuck: 'clickLuck',
                  })
                  //e.loadAnimation();
                }
              }
            })
          }
        }, 1000);
      }
    }, time);
    //console.log(time);
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var that = this;
    // var index = 0;
    // interval = setInterval(function () {
    //   if (index > 7) {
    //     index = 0;
    //     that.data.color[7] = 0.5
    //   } else if (index != 0) {
    //     that.data.color[index - 1] = 0.5
    //   }
    //   that.data.color[index] = 1
    //   that.setData({
    //     color: that.data.color,
    //   })
    //   index++;
    // }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/getUserDrawList',
      success: function(res) {
        that.setData({
          userDraws: res.data
        })
      }
    })
    intervalNumber=setInterval(function(){
      wx.request({
        url: 'http://127.0.0.1:8080/getUserDrawList',
        success: function (res) {
          that.setData({
            userDraws: res.data
          })
        }
      },10000)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(intervalNumber)
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