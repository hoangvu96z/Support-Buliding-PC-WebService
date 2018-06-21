
$(document).ready(function () {

    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/casepc/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowscasepc = '';
            $.each(data, function (key, val) {
                rowscasepc += '<tr><td>' + val.Model + '</td>'
                    + '<td>' + val.ChieuDai + '</td>'
                    + '<td>' + val.ChieuRong + '</td>'
                    + '<td>' + val.ChieuCao + '</td>'
                    + '<td>' + val.HangSX + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaCase + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaCase + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispcasepc').html(rowscasepc);
            $("button[name='btnedit']").click(function () {
                var casepc = '';
                $.getJSON('/api/casepc/' + this.value, function (val) {
                    casepc = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupcasepc" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Chiều dài: </div><input class="form-control" type="text" id="chieudaiupcasepc" value="' + val.ChieuDai + '"></div><div class="form-group">' +
                        '<div>Chiều rộng: </div><input class="form-control" type="text" id="chieurongupcasepc" value="' + val.ChieuRong + '"></div><div class="form-group">' +
                        '<div>Chiều cao: </div><input class="form-control" type="text" id="chieucaoupcasepc" value="' + val.ChieuCao + '"></div><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupcasepc" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupcasepc" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupcasepc" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupcasepc" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupcasepc" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(casepc);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var casepc = {
                            "MaCase": val.MaCase,
                            "Model": document.getElementById("modelupcasepc").value,
                            "ChieuDai": document.getElementById("chieudaiupcasepc").value,
                            "ChieuRong": document.getElementById("chieurongupcasepc").value,
                            "ChieuCao": document.getElementById("chieucaoupcasepc").value,
                            "HangSX": document.getElementById("hangsxupcasepc").value,
                            "Giaban": document.getElementById("giabanupcasepc").value,
                            "Diem": document.getElementById("diemupcasepc").value,
                            "DanhGia": document.getElementById("danhgiaupcasepc").value,
                            "URL": document.getElementById("urlupcasepc").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/casepc',
                            data: JSON.stringify(casepc),
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            processData: true,
                            success: function (data) {
                                alert("Sửa thành công !");
                            },
                            error: function (request, message, error) {
                                handleException(request, message, error);
                            }
                        });
                        location.reload();
                    })
                });

            })

            $("button[name='btndel']").click(function () {
                var casepcdel = '';
                $.getJSON('/api/casepc/' + this.value, function (val) {
                    casepcdel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(casepcdel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/casepc/delete/' + val.MaCase,
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                alert("Xoá thành công!");
                            },
                            error: function (request, message, error) {
                                handleException(request, message, error);
                            }
                        });
                        location.reload();
                    })
                });
                $("#delete").modal();
            })
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
});


function Them() {
    var create = '';
    create = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">THÊM MỚI 1 SẢN PHẨM</h4></div > <div class="modal-body"><form>' +
        '<div class="form-group"><div>Model: </div><input class="form-control" type="text" style="width: 640dp;" id="Model"></div>' +
        '<div class="form-group"><div>Chiều dài: </div><input class="form-control" type="text" id="ChieuDai"></div>' +
        '<div class="form-group"><div>Chiều rộng: </div><input class="form-control" type="text" id="ChieuRong"></div>' +
        '<div class="form-group"><div>Chiều cao: </div><input class="form-control" type="text" id="ChieuCao"></div>' +
        '<div class="form-group"><div>Hãng SX: </div><input class="form-control" type="text" id="HangSX"></div>' +
        '<div class="form-group"><div>Giá bán: </div><input class="form-control" type="text" id="GiaBan"></div>' +
        '<div class="form-group"><div>Điểm: </div><input class="form-control" type="text" id="Diem"></div>' +
        '<div class="form-group"><div>Đánh giá: </div><input class="form-control" type="text" id="DanhGia"></div>' +
        '<div class="form-group"><div>URL: </div><input class="form-control" type="text" id="URL"></div>' +
        '<button type="button" class="btn btn-success btn-lg" name="btnupdate" style="width: 100%;" > <span class="glyphicon glyphicon-ok-sign"></span> Thêm luôn!!!</button ></form ></div > <div class="modal-footer"></div>';
    $('#edit').html(create);
    $("#edit").modal();
    $("button[name='btnupdate']").click(function () {

        var casepc = {
            "MaCase": val.MaCase,
            "Model": document.getElementById("Model").value,
            "ChieuDai": document.getElementById("ChieuDai").value,
            "ChieuRong": document.getElementById("ChieuRong").value,
            "ChieuCao": document.getElementById("ChieuCao").value,
            "HangSX": document.getElementById("HangSX").value,
            "Giaban": document.getElementById("GiaBan").value,
            "Diem": document.getElementById("Diem").value,
            "DanhGia": document.getElementById("DanhGia").value,
            "URL": document.getElementById("URL").value
        };
        $.ajax({
            type: 'POST',
            url: 'http://doancn.azurewebsites.net/api/casepc',
            data: JSON.stringify(casepc),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            processData: true,
            success: function (data) {
                alert("Thêm mới thành công!");
            },
            error: function (request, message, error) {
                handleException(request, message, error);
            }
        });
        $('#edit').modal('toggle');
        location.reload();
    });
}





function Loc() {
    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/casepc/sort/' + document.getElementById("sortMin").value + "/" + document.getElementById("sortMax").value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowscasepc = '';
            $.each(data, function (key, val) {
                rowscasepc += '<tr><td>' + val.Model + '</td>'
                    + '<td>' + val.ChieuDai + '</td>'
                    + '<td>' + val.ChieuRong + '</td>'
                    + '<td>' + val.ChieuCao + '</td>'
                    + '<td>' + val.HangSX + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaCase + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaCase + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispcasepc').html(rowscasepc);
            $("button[name='btnedit']").click(function () {
                var casepc = '';
                $.getJSON('/api/casepc/' + this.value, function (val) {
                    casepc = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupcasepc" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Chiều dài: </div><input class="form-control" type="text" id="chieudaiupcasepc" value="' + val.ChieuDai + '"></div><div class="form-group">' +
                        '<div>Chiều rộng: </div><input class="form-control" type="text" id="chieurongupcasepc" value="' + val.ChieuRong + '"></div><div class="form-group">' +
                        '<div>Chiều cao: </div><input class="form-control" type="text" id="chieucaoupcasepc" value="' + val.ChieuCao + '"></div><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupcasepc" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupcasepc" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupcasepc" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupcasepc" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupcasepc" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(casepc);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var casepc = {
                            "MaCase": val.MaCase,
                            "Model": document.getElementById("modelupcasepc").value,
                            "ChieuDai": document.getElementById("chieudaiupcasepc").value,
                            "ChieuRong": document.getElementById("chieurongupcasepc").value,
                            "ChieuCao": document.getElementById("chieucaoupcasepc").value,
                            "HangSX": document.getElementById("hangsxupcasepc").value,
                            "Giaban": document.getElementById("giabanupcasepc").value,
                            "Diem": document.getElementById("diemupcasepc").value,
                            "DanhGia": document.getElementById("danhgiaupcasepc").value,
                            "URL": document.getElementById("urlupcasepc").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/casepc',
                            data: JSON.stringify(casepc),
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            processData: true,
                            success: function (data) {
                                alert("Sửa thành công !");
                            },
                            error: function (request, message, error) {
                                handleException(request, message, error);
                            }
                        });
                        location.reload();
                    })
                });

            })

            $("button[name='btndel']").click(function () {
                var casepcdel = '';
                $.getJSON('/api/casepc/' + this.value, function (val) {
                    casepcdel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(casepcdel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/casepc/delete/' + val.MaCase,
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                alert("Xoá thành công!");
                            },
                            error: function (request, message, error) {
                                handleException(request, message, error);
                            }
                        });
                        location.reload();
                    })
                });
                $("#delete").modal();
            })
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function Timkiem() {
    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/casepc/search/' + document.getElementById("search").value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowscasepc = '';
            $.each(data, function (key, val) {
                rowscasepc += '<tr><td>' + val.Model + '</td>'
                    + '<td>' + val.ChieuDai + '</td>'
                    + '<td>' + val.ChieuRong + '</td>'
                    + '<td>' + val.ChieuCao + '</td>'
                    + '<td>' + val.HangSX + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaCase + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaCase + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispcasepc').html(rowscasepc);
            $("button[name='btnedit']").click(function () {
                var casepc = '';
                $.getJSON('/api/casepc/' + this.value, function (val) {
                    casepc = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupcasepc" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Chiều dài: </div><input class="form-control" type="text" id="chieudaiupcasepc" value="' + val.ChieuDai + '"></div><div class="form-group">' +
                        '<div>Chiều rộng: </div><input class="form-control" type="text" id="chieurongupcasepc" value="' + val.ChieuRong + '"></div><div class="form-group">' +
                        '<div>Chiều cao: </div><input class="form-control" type="text" id="chieucaoupcasepc" value="' + val.ChieuCao + '"></div><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupcasepc" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupcasepc" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupcasepc" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupcasepc" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupcasepc" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(casepc);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var casepc = {
                            "MaCase": val.MaCase,
                            "Model": document.getElementById("modelupcasepc").value,
                            "ChieuDai": document.getElementById("chieudaiupcasepc").value,
                            "ChieuRong": document.getElementById("chieurongupcasepc").value,
                            "ChieuCao": document.getElementById("chieucaoupcasepc").value,
                            "HangSX": document.getElementById("hangsxupcasepc").value,
                            "Giaban": document.getElementById("giabanupcasepc").value,
                            "Diem": document.getElementById("diemupcasepc").value,
                            "DanhGia": document.getElementById("danhgiaupcasepc").value,
                            "URL": document.getElementById("urlupcasepc").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/casepc',
                            data: JSON.stringify(casepc),
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            processData: true,
                            success: function (data) {
                                alert("Sửa thành công !");
                            },
                            error: function (request, message, error) {
                                handleException(request, message, error);
                            }
                        });
                        location.reload();
                    })
                });

            })

            $("button[name='btndel']").click(function () {
                var casepcdel = '';
                $.getJSON('/api/casepc/' + this.value, function (val) {
                    casepcdel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(casepcdel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/casepc/delete/' + val.MaCase,
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                alert("Xoá thành công!");
                            },
                            error: function (request, message, error) {
                                handleException(request, message, error);
                            }
                        });
                        location.reload();
                    })
                });
                $("#delete").modal();
            })
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });

}

