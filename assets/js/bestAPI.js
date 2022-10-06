// 注意：每次调用$.get $.post $.ajax的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中 可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局统一挂载complete回调函数
    options.complete = function (res) {
        // 在complete回调函数中 可以使用res.responseJSON拿到从服务器响应回来的数据
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制情况token数据
            localStorage.removeItem('token')
            // 2.强制调转到登录页面
            location.href = '/login.html'
        }
    }
})