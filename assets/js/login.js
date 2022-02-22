$(function() {
    // 点击“去注册账号” 的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击“去登录” 的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从 layui中获取form对象
    var form = layui.form
        // 通过form.verify来自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位且不能出现空格'],
        // 校验两次密码是否一直的规则
        repwd: function(value) {
            // 通过形参拿到的value是再次确认密码框的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败则return一个错误提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }

        }
    })
    var layer = layui.layer
        // 监听注册表单的提交事件

    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message);

            }
            // console.log('注册成功');
            layer.msg('注册成功')

            // 模拟人的点击行为 跳转到登陆页面
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功')
                    // 将登录成功得到的token字符串保存到localstorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})