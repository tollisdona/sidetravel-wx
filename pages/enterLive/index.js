// pages/enterLive/index.js
const EARTH_RADIUS = 6371.0;
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    userposition: {
      latitude: 0,
      longitude: 0
    },
    avatarList: [],
    allRoomList: [
      { roomId: "001", name: "济南大学", latitude: 36.614417, longitude: 116.966653 },
      { roomId: "002", name: "趵突泉公园", latitude: 36.66029, longitude: 117.016228 },
      { roomId: "003", name: "济南大厦", latitude: 36.651363, longitude: 116.997795 },
      { roomId: "004", name: "大明湖风景区", latitude: 36.675148, longitude: 117.026253 }
    ],
    roomList: [],
    selectedRoom: {
      roomId: null,
      roomName: '',
    }
  },
  onLoad(options) {
    this.setData({
      'userposition.latitude': decodeURIComponent(options.lat),
      'userposition.longitude': decodeURIComponent(options.long)
    })
    console.log(this.data.userposition);

  },
  onShow() {
    // 初始化数据
    this.setData({
      selectedRoom: {
        roomId: null,
        roomName: '',
      },
      roomList:[]
    });
    // 计算附近房间
    this.showRoom()
  },
  showRoom() {
    var rooms = this.data.allRoomList;
    rooms.forEach(room => {
      const distance = this.calculateDistance(this.data.userposition.latitude, this.data.userposition.longitude, room.latitude, room.longitude);
      console.log("distance", distance)
      if (distance < 2) {
        this.setData({
          roomList: [...this.data.roomList, room]
        })
      }
    });
  },
  // 将角度转换为弧度
  toRadians: function (degrees) {
    return degrees * (Math.PI / 180);
  },

  // 使用 Haversine 公式计算距离
  calculateDistance: function (lat1, lon1, lat2, lon2) {
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c; // 返回距离，单位：公里
  },
  onSelectRoom(event) {//进入房间
    let room = event.target.dataset.room;
    let roomToken = {
      roomId: room.roomId,
      roomName: room.name,
      userId: (Math.random() * 1000).toString(),
      nickname: this.data.userInfo.username,
      avatar: this.data.userInfo.avatar
    };
    wx.navigateTo({
      url: `../chatRoom/chatRoom?roomToken=` + JSON.stringify(roomToken)
    })
  }
});
