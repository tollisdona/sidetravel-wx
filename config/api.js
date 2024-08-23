// 以下是业务服务器API地址
// 本机开发时使用
var WxApiRoot = 'http://localhost:8082/wx/';
// 局域网测试使用
// var WxApiRoot = 'http://192.168.164.114:8082/wx/';
// 内网穿透测试 
// var WxApiRoot = 'https://3ackenqpjiej-5997.beijing-02.dayunet.com:443/wx/';
// 云平台部署时使用
// var WxApiRoot = 'http://122.51.199.160:8080/wx/';
// 云平台上线时使用
// var WxApiRoot = 'https://www.oocquin.online/wx/'; 

module.exports = {
  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
  AuthLogout: WxApiRoot + 'auth/logout', //账号登出
  NoteHotList: WxApiRoot + 'notes/hotlist',// 首页热门动态
  NoteNearList: WxApiRoot + 'notes/nearlist',// 首页附近动态
  NoteFollowList: WxApiRoot + 'notes/followlist',//首页关注动态
  NoteMyList: WxApiRoot + 'notes/mylist',// 个人信息页面我的动态
  NoteLikeList : WxApiRoot + 'notes/likelist',//个人信息页面点赞动态
  NoteCollectList : WxApiRoot + 'notes/likelist',//个人信息页面收藏动态
  NoteSearch: WxApiRoot + 'notes/search', //动态搜索
  StorageUpload: WxApiRoot + 'storage/upload', //图片上传
  NotePost: WxApiRoot + 'notes/post', //发表动态
  FootprintAdd: WxApiRoot + 'footprint/add',//添加足迹
  FootprintList:WxApiRoot + 'footprint/list',//足迹列表
  CommentPost: WxApiRoot + 'comment/post', //发表评论
  CommentList: WxApiRoot + 'comment/list', //评论列表
  PartnerList: WxApiRoot + 'partner/list', //全部寻伴信息
  PartnermyList: WxApiRoot + 'partner/mylist',//我的寻伴信息
  PartnerPost: WxApiRoot + 'partner/add', //发布寻伴信息
  PartnerSelect: WxApiRoot + 'partner/select', //筛选寻伴信息
  PartnerDelete: WxApiRoot + 'partner/delete',// 删除寻伴信息
  UserFollow: WxApiRoot + '/interact/followList', // 获取关注列表
  UserFollower: WxApiRoot + '/interact/fansList', // 获取粉丝列表
  UserCommon: WxApiRoot + '/interact/commonList', // 获取互相关注列表
  UserUpdate: WxApiRoot + '/user/update',//更新用户信息
  UserFind: WxApiRoot + '/user/find', // 获取其他用户信息
  InteractLike: WxApiRoot + '/interact/like', //点赞
  InteractCheckLike: WxApiRoot + '/interact/checkLike', //检查点赞
  InteractFollow: WxApiRoot + '/interact/follow', //关注
  InteractUnFollow: WxApiRoot + '/interact/unfollow', //取消关注
  InteractCheckRelation: WxApiRoot + '/interact/checkRelation', //检查关注
  InteractCount: WxApiRoot + '/interact/count',//获取关注人数
  OnlineGo : WxApiRoot+ '/online/goOnline', // 上线
  OnlineOff: WxApiRoot + '/online/doOff', // 下线
  OnlineCheck: WxApiRoot + '/online/check',// 检查在线情况
  OnlineList : WxApiRoot + '/online/nearUser', //附近用户
  OnlineChat : WxApiRoot + '/online/nearChat', //附近聊天室
  //////////////////////////////////////////////////
};