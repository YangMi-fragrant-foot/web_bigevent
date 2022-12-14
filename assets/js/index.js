$(function(){

// 调用getUserInfo()获取用户的基本信息
 getUserInfo()


 const layer = layui.layer 


 $('#btnLogout').on('click',function(){
    // 提示用户是否退出
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'},
     function(index){
        // 1.清空本地存储的headers
         localStorage.removeItem('token')
        // 2.重新跳转到登录页
        location.href='/login.html'
        //do something
        // 关闭confirm询问框
        layer.close(index);
      });
 })
})

// 获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // headers 就是请求头配置对象
        // headers : {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
                // 调用函数 rendurAvatar  渲染用户头像
                renderAvatar(res.data)
        },
        // 不论成功或失败都会调用comolete函数
        // complete : function (res){
        //     // 在complete回调函数中 可以使用res.responseJSON拿到从服务器响应回来的数据
        //     console.log(res);
        //     if (res.responseJSON.status ===1 && res.responseJSON.message==='身份认证失败！'){
        //         // 1.强制情况token数据
        //         localStorage.removeItem('token')
        //         // 2.强制调转到登录页面
        //         location.href='/login.html'
        //     }
        // }
    })
}

function renderAvatar (user){
    // 1.获取用户名称
    let name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户头像
    if(user.user_pic !== null) {
        // 3.1渲染用户头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else 
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
}