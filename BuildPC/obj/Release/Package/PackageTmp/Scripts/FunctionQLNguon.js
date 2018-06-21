
$(document).ready(function () {

    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/nguon/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowsnguon = '';
            $.each(data, function (key, val) {
                rowsnguon += '<tr><td>' + val.Model + '</td>'
                    + '<td>' + val.HangSX + '</td>'
                    + '<td>' + val.CongSuat + '</td>'
                    + '<td>' + val.HieuSuat + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.Danhgia + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaNguon + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaNguon + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispnguon').html(rowsnguon);
            $("button[name='btnedit']").click(function () {
                var nguon = '';
                $.getJSON('/api/nguon/' + this.value, function (val) {
                    nguon = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupnguon" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupnguon" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Công suất: </div><input class="form-control" type="text" id="congsuatupnguon" value="' + val.CongSuat + '"></div><div class="form-group">' +
                        '<div>Hiệu suất: </div><input class="form-control" type="text" id="hieusuatupnguon" value="' + val.HieuSuat + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupnguon" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupnguon" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupnguon" value="' + val.Danhgia + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupnguon" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(nguon);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var nguon = {
                            "MaNguon": val.MaNguon,
                            "Model": document.getElementById("modelupnguon").value,
                            "HangSX": document.getElementById("hangsxupnguon").value,
                            "CongSuat": document.getElementById("congsuatupnguon").value,
                            "HieuSuat": document.getElementById("hieusuatupnguon").value,
                            "Giaban": document.getElementById("giabanupnguon").value,
                            "Diem": document.getElementById("diemupnguon").value,
                            "Danhgia": document.getElementById("danhgiaupnguon").value,
                            "URL": document.getElementById("urlupnguon").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/nguon',
                            data: JSON.stringify(nguon),
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
                var nguondel = '';
                $.getJSON('/api/nguon/' + this.value, function (val) {
                    nguondel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(nguondel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/nguon/delete/' + val.MaNguon,
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
        '<div class="form-group"><div>Hãng SX: </div><input class="form-control" type="text" id="HangSX"></div>' +
        '<div class="form-group"><div>Công suất: </div><input class="form-control" type="text" id="CongSuat"></div>' +
        '<div class="form-group"><div>Hiệu suất: </div><input class="form-control" type="text" id="HieuSuat"></div>' +
        '<div class="form-group"><div>Giá bán: </div><input class="form-control" type="text" id="GiaBan"></div>' +
        '<div class="form-group"><div>Điểm: </div><input class="form-control" type="text" id="Diem"></div>' +
        '<div class="form-group"><div>Đánh giá: </div><input class="form-control" type="text" id="Danhgia"></div>' +
        '<div class="form-group"><div>URL: </div><input class="form-control" type="text" id="URL"></div>' +
        '<button type="button" class="btn btn-success btn-lg" name="btnupdate" style="width: 100%;" > <span class="glyphicon glyphicon-ok-sign"></span> Thêm luôn!!!</button ></form ></div > <div class="modal-footer"></div>';
    $('#edit').html(create);
    $("#edit").modal();
    $("button[name='btnupdate']").click(function () {

        var nguon = {
            "MaNguon": val.MaNguon,
            "Model": document.getElementById("Model").value,
            "HangSX": document.getElementById("HangSX").value,
            "CongSuat": document.getElementById("CongSuat").value,
            "HieuSuat": document.getElementById("HieuSuat").value,
            "Giaban": document.getElementById("GiaBan").value,
            "Diem": document.getElementById("Diem").value,
            "Danhgia": document.getElementById("Danhgia").value,
            "URL": document.getElementById("URL").value
        };
        $.ajax({
            type: 'POST',
            url: 'http://doancn.azurewebsites.net/api/nguon',
            data: JSON.stringify(nguon),
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
        url: 'http://doancn.azurewebsites.net/api/nguon/sort/' + document.getElementById("sortMin").value + "/" + document.getElementById("sortMax").value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowsnguon = '';
            $.each(data, function (key, val) {
                rowsnguon += '<tr><td>' + val.Model + '</td>'
                    + '<td>' + val.HangSX + '</td>'
                    + '<td>' + val.CongSuat + '</td>'
                    + '<td>' + val.HieuSuat + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.Danhgia + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaNguon + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaNguon + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispnguon').html(rowsnguon);
            $("button[name='btnedit']").click(function () {
                var nguon = '';
                $.getJSON('/api/nguon/' + this.value, function (val) {
                    nguon = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupnguon" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupnguon" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Công suất: </div><input class="form-control" type="text" id="congsuatupnguon" value="' + val.CongSuat + '"></div><div class="form-group">' +
                        '<div>Hiệu suất: </div><input class="form-control" type="text" id="hieusuatupnguon" value="' + val.HieuSuat + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupnguon" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupnguon" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupnguon" value="' + val.Danhgia + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupnguon" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(nguon);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var nguon = {
                            "MaNguon": val.MaNguon,
                            "Model": document.getElementById("modelupnguon").value,
                            "HangSX": document.getElementById("hangsxupnguon").value,
                            "CongSuat": document.getElementById("congsuatupnguon").value,
                            "HieuSuat": document.getElementById("hieusuatupnguon").value,
                            "Giaban": document.getElementById("giabanupnguon").value,
                            "Diem": document.getElementById("diemupnguon").value,
                            "Danhgia": document.getElementById("danhgiaupnguon").value,
                            "URL": document.getElementById("urlupnguon").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/nguon',
                            data: JSON.stringify(nguon),
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
                var nguondel = '';
                $.getJSON('/api/nguon/' + this.value, function (val) {
                    nguondel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(nguondel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/nguon/delete/' + val.MaNguon,
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
        url: 'http://doancn.azurewebsites.net/api/nguon/search/' + document.getElementById("search").value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowsnguon = '';
            $.each(data, function (key, val) {
                rowsnguon += '<tr><td>' + val.Model + '</td>'
                    + '<td>' + val.HangSX + '</td>'
                    + '<td>' + val.CongSuat + '</td>'
                    + '<td>' + val.HieuSuat + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.Danhgia + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaNguon + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaNguon + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispnguon').html(rowsnguon);
            $("button[name='btnedit']").click(function () {
                var nguon = '';
                $.getJSON('/api/nguon/' + this.value, function (val) {
                    nguon = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupnguon" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupnguon" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Công suất: </div><input class="form-control" type="text" id="congsuatupnguon" value="' + val.CongSuat + '"></div><div class="form-group">' +
                        '<div>Hiệu suất: </div><input class="form-control" type="text" id="hieusuatupnguon" value="' + val.HieuSuat + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupnguon" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupnguon" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupnguon" value="' + val.Danhgia + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupnguon" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(nguon);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var nguon = {
                            "MaNguon": val.MaNguon,
                            "Model": document.getElementById("modelupnguon").value,
                            "HangSX": document.getElementById("hangsxupnguon").value,
                            "CongSuat": document.getElementById("congsuatupnguon").value,
                            "HieuSuat": document.getElementById("hieusuatupnguon").value,
                            "Giaban": document.getElementById("giabanupnguon").value,
                            "Diem": document.getElementById("diemupnguon").value,
                            "Danhgia": document.getElementById("danhgiaupnguon").value,
                            "URL": document.getElementById("urlupnguon").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/nguon',
                            data: JSON.stringify(nguon),
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
                var nguondel = '';
                $.getJSON('/api/nguon/' + this.value, function (val) {
                    nguondel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(nguondel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/nguon/delete/' + val.MaNguon,
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

