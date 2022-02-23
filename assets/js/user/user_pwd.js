$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12为且不能出现空格'],
        samepwd: function(value) {
            var oldPwd = $('.layui-card-body [name=oldPwd]').val()
            if (value === oldPwd) {
                return '两次密码不能一致'
            }
        },
        repwd: function(value) {
            var newPwd = $('.layui-card-body [name=newPwd]').val()
            if (value !== newPwd) {
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);

                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }
                layer.msg('更新密码成功')
                    // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})