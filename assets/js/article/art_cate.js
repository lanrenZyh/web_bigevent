$(function() {

    var layer = layui.layer

    var form = layui.form

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var hrmlStr = template('tpl-table', res)
                $('tbody').html(hrmlStr)
            }
        })
    }

    initArtCateList()

    // 为添加类别按钮绑定点击事件
    var indexadd = null
    $('#btnAddCate').on('click', function() {
        indexadd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 为编辑按钮绑定点击事件
    var indexedit = null
    $('tbody').on('click', '.btn-edit', function() {
        indexedit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
            // console.log(id);
            // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改分类数据失败')
                }
                layer.msg('修改成功')
                layer.close(indexedit)
                initArtCateList()
            }
        })
    })

    // 通过代理的形式为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
            // console.log('ok');
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增成功')
                    // 根据索引关闭对应的弹出层
                layer.close(indexadd)
            }
        })
    })

    // 通过代理的方式为删除按钮实现删除功能
    $('tbody').on('click', '.btn-del', function() {

        var id = $(this).attr('data-id')
            // console.log(id);

        layer.confirm('是否确定删除？', { icon: 3, title: '提示' }, function(index) {
            // console.log('ok');
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })

        })
    })
})