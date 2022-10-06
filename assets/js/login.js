$(function(){
    // 点击‘去注册账号’的链接
    $('#link-reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })


    // 点击“去登录”的链接
    $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })




    // 从layui中获取form对象    
    const url = 'http://www.liulongbin.top:3007'
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数自定义效验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repwd:function(value) {
            // 通过形参拿到的是确认密码框的内容
            // 还需要拿到密码框的内容
            // 然后进行等于判断
            // 判断失败则return一个提示消息 
           var pwd =  $('.reg-box [name=password]').val()
           if(pwd !== value) {
            return '两次密码不一致'
           }
          }
    })
    // 监听注册表单的提交事件
    $('#form-reg').on('submit',function(e){
        e.preventDefault();
        let data = {
            username :$('#form-reg [name=username]').val(),password : $('#form-reg [name=password]').val() }
        $.post(`${url}/api/reguser`,data,
            function(res){
                if(res.status !== 0) {
                    return  layer.msg(reg.message)
                }
                layer.msg('注册成功，请登录！')
                // 注册成功后自动跳转登录界面
                // 模拟人的点击行为
                $('#link-login').click() //新知识！！！！！！！！！！！！！！
            })
    })



    // 监听登录表单的提交事件
    $('#form-login').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:`${url}/api/login`,
            // 快速获取表单中的数据
            data:$(this).serialize(), //不熟悉  serialize
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')
                // 将登录成功的token值存到本地存贮里
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})