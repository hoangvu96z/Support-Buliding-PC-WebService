
$(document).ready(function () {

    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/ram/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowsram = '';
            $.each(data, function (key, val) {
                rowsram += '<tr><td>' + val.Model + '</td>'
                    + '<td>' + val.LoaiRam + '</td>'
                    + '<td>' + val.TocDoBus + '</td>'
                    + '<td>' + val.DungLuong + '</td>'
                    + '<td>' + val.HangSX + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaRam + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaRam + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispRam').html(rowsram);
            $("button[name='btnedit']").click(function ()
            {
                var ram = '';
                $.getJSON('/api/ram/' + this.value, function (val)
                {
                        ram = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                            '<div>Tên sản phẩm: </div><input class="form-control" type="text" id="modelupram" value="' + val.Model + '"></div><div class="form-group">' +
                            '<div>Loại Ram: </div><input class="form-control" type="text" id="loairamupram" value="' + val.LoaiRam + '"></div><div class="form-group">' +
                            '<div>Tốc độ Bus: </div><input class="form-control" type="text" id="tocdobusupram" value="' + val.TocDoBus + '"></div><div class="form-group">' +
                            '<div>Dung lượng: </div><input class="form-control" type="text" id="dungluongupram" value="' + val.DungLuong + '"></div><div class="form-group">' +
                            '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupram" value="' + val.HangSX + '"></div><div class="form-group">' +
                            '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupram" value="' + val.Giaban + '"></div><div class="form-group">' +
                            '<div>Điểm: </div><input class="form-control" type="text" id="diemupram" value="' + val.Diem + '"></div><div class="form-group">' +
                            '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupram" value="' + val.DanhGia + '"></div><div class="form-group">' +
                            '<div>URL: </div><input class="form-control" type="text" id="urlupram" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(ram);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function ()
                    {
                        $('#edit').modal('toggle');
                        var ram = {
                            "MaRam": val.MaRam,
                            "Model": document.getElementById("modelupram").value,
                            "LoaiRam": document.getElementById("loairamupram").value,
                            "TocDoBus": document.getElementById("tocdobusupram").value,
                            "DungLuong": document.getElementById("dungluongupram").value,
                            "HangSX": document.getElementById("hangsxupram").value,
                            "Giaban": document.getElementById("giabanupram").value,
                            "Diem": document.getElementById("diemupram").value,
                            "DanhGia": document.getElementById("danhgiaupram").value,
                            "URL": document.getElementById("urlupram").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/ram',
                            data: JSON.stringify(ram),
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            processData: true,
                            success: function (data) {
                                alert("Sửa thành công !");
                            },
                            error: function (request, message, error)
                            {
                                handleException(request, message, error);
                            }
                        });
                        location.reload();
                    })
                });

            })

            $("button[name='btndel']").click(function () {
                var ramdel = '';
                $.getJSON('/api/ram/' + this.value, function (val) {
                    ramdel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(ramdel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/ram/delete/' + val.MaRam,
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
        '<div class="form-group"><div>Tên sản phẩm: </div><input class="form-control" type="text" style="width: 640dp;" id="Model"></div>'+
        '<div class="form-group"><div>Loại Ram: </div><input class="form-control" type="text" id="LoaiRam"></div>'+
        '<div class="form-group"><div>Tốc độ bus: </div><input class="form-control" type="text" id="TocDoBus"></div>' +
        '<div class="form-group"><div>Dung Lượng: </div><input class="form-control" type="text" id="DungLuong"></div>' +
        '<div class="form-group"><div>Hãng SX: </div><input class="form-control" type="text" id="HangSX"></div>' +
        '<div class="form-group"><div>Giá bán: </div><input class="form-control" type="text" id="Giaban"></div>' +
        '<div class="form-group"><div>Điểm: </div><input class="form-control" type="text" id="Diem"></div>' +
        '<div class="form-group"><div>Đánh giá: </div><input class="form-control" type="text" id="Danhgia"></div>' +
        '<div class="form-group"><div>URL: </div><input class="form-control" type="text" id="URL"></div>' +
        '<button type="button" class="btn btn-success btn-lg" name="btnupdate" style="width: 100%;" > <span class="glyphicon glyphicon-ok-sign"></span> Thêm luôn!!!</button ></form ></div > <div class="modal-footer"></div>';
    $('#edit').html(create);
    $("#edit").modal();
    $("button[name='btnupdate']").click(function () {

        var ram = {
            "MaRam":"",
            "Model": document.getElementById("Model").value,
            "LoaiRam": document.getElementById("LoaiRam").value,
            "TocDoBus": document.getElementById("TocDoBus").value,
            "DungLuong": document.getElementById("DungLuong").value,
            "HangSX": document.getElementById("HangSX").value,
            "Giaban": document.getElementById("Giaban").value,
            "Diem": document.getElementById("Diem").value,
            "Danhgia": document.getElementById("Danhgia").value,
            "URL": document.getElementById("URL").value
        };
        $.ajax({
            type: 'POST',
            url: 'http://doancn.azurewebsites.net/api/ram',
            data: JSON.stringify(ram),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            processData: true,
            success: function (data) {
                alert("Thêm mới thành công!");
            },
            error: function (request, message, error)
            {
                handleException(request, message, error);
            }
        });
        $('#edit').modal('toggle');
        location.reload();
    });
}



function Sua() {
    var ram = {
        "MaRam": document.getElementById("btnedit").value,
        "Model": document.getElementById("modelupram").value,
        "LoaiRam": document.getElementById("loairamupram").value,
        "TocDoBus": document.getElementById("tocdobusupram").value,
        "DungLuong": document.getElementById("dungluongupram").value,
        "HangSX": document.getElementById("hangsxupram").value,
        "Giaban": document.getElementById("giabanupram").value,
        "Diem": document.getElementById("diemupram").value,
        "Danhgia": document.getElementById("danhgiaupram").value,
        "URL": document.getElementById("urlupram").value
    };

    $.ajax({
        type: 'PUT',
        url: 'http://doancn.azurewebsites.net/api/ram',
        data: JSON.stringify(ram),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        processData: true,
        success: function (data) {
                                alert("Success");
                            },
        error: function (request, message, error) {
                                handleException(request, message, error);
                            }
    });
}
function Loc() {
                                $.ajax({
                                    url: 'http://doancn.azurewebsites.net/api/ram/sort/' + document.getElementById("sortMin").value + "/" + document.getElementById("sortMax").value,
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                        var rowsram = '';
                                        var ram = 0;
                                        $.each(data, function (key, val) {
                                            rowsram += '<tr><td>' + val.Model + '</td>'
                                                + '<td>' + val.LoaiRam + '</td>'
                                                + '<td>' + val.TocDoBus + '</td>'
                                                + '<td>' + val.DungLuong + '</td>'
                                                + '<td>' + val.HangSX + '</td>'
                                                + '<td>' + val.Giaban + '</td>'
                                                + '<td>' + val.Diem + '</td>'
                                                + '<td>' + val.DanhGia + '</td>'
                                                + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                                                '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaRam + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                                                '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaRam + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
                                        });

                                        $('#dispRam').html(rowsram);
                                        $("button[name='btnedit']").click(function () {
                                            var ram = '';
                                            $.getJSON('/api/ram/' + this.value, function (val) {
                                                ram = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                                                    '<div>Tên sản phẩm: </div><input class="form-control" type="text" id="modelupram" value="' + val.Model + '"></div><div class="form-group">' +
                                                    '<div>Loại Ram: </div><input class="form-control" type="text" id="loairamupram" value="' + val.LoaiRam + '"></div><div class="form-group">' +
                                                    '<div>Tốc độ Bus: </div><input class="form-control" type="text" id="tocdobusupram" value="' + val.TocDoBus + '"></div><div class="form-group">' +
                                                    '<div>Dung lượng: </div><input class="form-control" type="text" id="dungluongupram" value="' + val.DungLuong + '"></div><div class="form-group">' +
                                                    '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupram" value="' + val.HangSX + '"></div><div class="form-group">' +
                                                    '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupram" value="' + val.Giaban + '"></div><div class="form-group">' +
                                                    '<div>Điểm: </div><input class="form-control" type="text" id="diemupram" value="' + val.Diem + '"></div><div class="form-group">' +
                                                    '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupram" value="' + val.DanhGia + '"></div><div class="form-group">' +
                                                    '<div>URL: </div><input class="form-control" type="text" id="urlupram" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                                                $('#edit').html(ram);
                                                $("#edit").modal();

                                                $("button[name='btnupdate']").click(function () {
                                                    $('#edit').modal('toggle');
                                                    var ram = {
                                                        "MaRam": val.MaRam,
                                                        "Model": document.getElementById("modelupram").value,
                                                        "LoaiRam": document.getElementById("loairamupram").value,
                                                        "TocDoBus": document.getElementById("tocdobusupram").value,
                                                        "DungLuong": document.getElementById("dungluongupram").value,
                                                        "HangSX": document.getElementById("hangsxupram").value,
                                                        "Giaban": document.getElementById("giabanupram").value,
                                                        "Diem": document.getElementById("diemupram").value,
                                                        "DanhGia": document.getElementById("danhgiaupram").value,
                                                        "URL": document.getElementById("urlupram").value
                                                    };

                                                    $.ajax({
                                                        type: 'PUT',
                                                        url: 'http://doancn.azurewebsites.net/api/ram',
                                                        data: JSON.stringify(ram),
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
                                            var ramdel = '';
                                            $.getJSON('/api/ram/' + this.value, function (val) {
                                                ramdel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                                                    '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                                                    '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                                                $('#delete').html(ramdel);
                                                $("button[name='btndelete']").click(function () {
                                                    $('#delete').modal('toggle');
                                                    $.ajax({
                                                        type: 'POST',
                                                        url: 'http://doancn.azurewebsites.net/api/ram/delete/' + val.MaRam,
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
                                    url: 'http://doancn.azurewebsites.net/api/ram/search/' + document.getElementById("search").value,
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                        var rowsram = '';
                                        $.each(data, function (key, val) {
                                            rowsram += '<tr><td>' + val.Model + '</td>'
                                                + '<td>' + val.LoaiRam + '</td>'
                                                + '<td>' + val.TocDoBus + '</td>'
                                                + '<td>' + val.DungLuong + '</td>'
                                                + '<td>' + val.HangSX + '</td>'
                                                + '<td>' + val.Giaban + '</td>'
                                                + '<td>' + val.Diem + '</td>'
                                                + '<td>' + val.DanhGia + '</td>'
                                                + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                                                '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaRam + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                                                '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaRam + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
                                        });

                                        $('#dispRam').html(rowsram);
                                        $("button[name='btnedit']").click(function () {
                                            var ram = '';
                                            $.getJSON('/api/ram/' + this.value, function (val) {
                                                ram = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                                                    '<div>Tên sản phẩm: </div><input class="form-control" type="text" id="modelupram" value="' + val.Model + '"></div><div class="form-group">' +
                                                    '<div>Loại Ram: </div><input class="form-control" type="text" id="loairamupram" value="' + val.LoaiRam + '"></div><div class="form-group">' +
                                                    '<div>Tốc độ Bus: </div><input class="form-control" type="text" id="tocdobusupram" value="' + val.TocDoBus + '"></div><div class="form-group">' +
                                                    '<div>Dung lượng: </div><input class="form-control" type="text" id="dungluongupram" value="' + val.DungLuong + '"></div><div class="form-group">' +
                                                    '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupram" value="' + val.HangSX + '"></div><div class="form-group">' +
                                                    '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupram" value="' + val.Giaban + '"></div><div class="form-group">' +
                                                    '<div>Điểm: </div><input class="form-control" type="text" id="diemupram" value="' + val.Diem + '"></div><div class="form-group">' +
                                                    '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupram" value="' + val.DanhGia + '"></div><div class="form-group">' +
                                                    '<div>URL: </div><input class="form-control" type="text" id="urlupram" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                                                $('#edit').html(ram);
                                                $("#edit").modal();

                                                $("button[name='btnupdate']").click(function () {
                                                    $('#edit').modal('toggle');
                                                    var ram = {
                                                        "MaRam": val.MaRam,
                                                        "Model": document.getElementById("modelupram").value,
                                                        "LoaiRam": document.getElementById("loairamupram").value,
                                                        "TocDoBus": document.getElementById("tocdobusupram").value,
                                                        "DungLuong": document.getElementById("dungluongupram").value,
                                                        "HangSX": document.getElementById("hangsxupram").value,
                                                        "Giaban": document.getElementById("giabanupram").value,
                                                        "Diem": document.getElementById("diemupram").value,
                                                        "DanhGia": document.getElementById("danhgiaupram").value,
                                                        "URL": document.getElementById("urlupram").value
                                                    };

                                                    $.ajax({
                                                        type: 'PUT',
                                                        url: 'http://doancn.azurewebsites.net/api/ram',
                                                        data: JSON.stringify(ram),
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
                                            var ramdel = '';
                                            $.getJSON('/api/ram/' + this.value, function (val) {
                                                ramdel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                                                    '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                                                    '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                                                $('#delete').html(ramdel);
                                                $("button[name='btndelete']").click(function () {
                                                    $('#delete').modal('toggle');
                                                    $.ajax({
                                                        type: 'POST',
                                                        url: 'http://doancn.azurewebsites.net/api/ram/delete/' + val.MaRam,
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

