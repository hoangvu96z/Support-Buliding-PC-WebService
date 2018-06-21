
$(document).ready(function () {

    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/hdd/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowshdd = '';
            $.each(data, function (key, val) {
                rowshdd += '<tr><td>' + val.Model+ '</td>'
                    + '<td>' + val.LoaiOCung + '</td>'
                    + '<td>' + val.HangSX + '</td>'
                    + '<td>' + val.DungLuong + '</td>'
                    + '<td>' + val.ChuanKetNoi + '</td>'
                    + '<td>' + val.TocDoDoc + '</td>'
                    + '<td>' + val.TocDoGhi + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaHDD + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaHDD + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#disphdd').html(rowshdd);
            $("button[name='btnedit']").click(function () {
                var hdd = '';
                $.getJSON('/api/hdd/' + this.value, function (val) {
                    hdd = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modeluphdd" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Loại Ổ Cứng: </div><input class="form-control" type="text" id="loaiocunguphdd" value="' + val.LoaiOCung + '"></div><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxuphdd" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Dung lượng: </div><input class="form-control" type="text" id="dungluonguphdd" value="' + val.DungLuong + '"></div><div class="form-group">' +
                        '<div>Chuẩn kết nối: </div><input class="form-control" type="text" id="chuanketnoiuphdd" value="' + val.ChuanKetNoi + '"></div><div class="form-group">' +
                        '<div>Tốc độ đọc: </div><input class="form-control" type="text" id="tocdodocuphdd" value="' + val.TocDoDoc + '"></div><div class="form-group">' +
                        '<div>Tốc độ ghi: </div><input class="form-control" type="text" id="tocdoghiuphdd" value="' + val.TocDoGhi + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemuphdd" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiauphdd" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanuphdd" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urluphdd" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(hdd);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var hdd = {
                            "MaHDD": val.MaHDD,
                            "LoaiOCung": document.getElementById("loaiocunguphdd").value,
                            "HangSX": document.getElementById("hangsxuphdd").value,
                            "DungLuong": document.getElementById("dungluonguphdd").value,
                            "ChuanKetNoi": document.getElementById("chuanketnoiuphdd").value,
                            "TocDoDoc": document.getElementById("tocdodocuphdd").value,
                            "TocDoGhi": document.getElementById("tocdoghiuphdd").value,
                            "Diem": document.getElementById("diemuphdd").value,
                            "DanhGia": document.getElementById("danhgiauphdd").value,
                            "URL": document.getElementById("urluphdd").value,
                            "Giaban": document.getElementById("giabanuphdd").value
                           
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/hdd',
                            data: JSON.stringify(hdd),
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
                var hdddel = '';
                $.getJSON('/api/hdd/' + this.value, function (val) {
                    hdddel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(hdddel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/hdd/delete/' + val.MaHDD,
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
        '<div class="form-group"><div>Loại Ổ Cứng: </div><input class="form-control" type="text" id="LoaiOCung"></div>' +
        '<div class="form-group"><div>Hãng SX : </div><input class="form-control" type="text" id="HangSX"></div>' +
        '<div class="form-group"><div>Dung lượng: </div><input class="form-control" type="text" id="DungLuong"></div>' +
        '<div class="form-group"><div>Chuẩn kết nối: </div><input class="form-control" type="text" id="ChuanKetNoi"></div>' +
        '<div class="form-group"><div>Tốc độ đọc: </div><input class="form-control" type="text" id="TocDoDoc"></div>' +
        '<div class="form-group"><div>Tốc độ ghi: </div><input class="form-control" type="text" id="TocDoGhi"></div>' +
        '<div class="form-group"><div>Điểm : </div><input class="form-control" type="text" id="Diem"></div>' +
        '<div class="form-group"><div>Đánh giá: </div><input class="form-control" type="text" id="DanhGia"></div>' +
        '<div class="form-group"><div>Giá bán: </div><input class="form-control" type="text" id="GiaBan"></div>' +
        '<div class="form-group"><div>URL: </div><input class="form-control" type="text" id="URL"></div>' +
        '<button type="button" class="btn btn-success btn-lg" name="btnupdate" style="width: 100%;" > <span class="glyphicon glyphicon-ok-sign"></span> Thêm luôn!!!</button ></form ></div > <div class="modal-footer"></div>';
    $('#edit').html(create);
    $("#edit").modal();
    $("button[name='btnupdate']").click(function () {

        var hdd = {
            "MaHDD": val.MaHDD,
            "LoaiOCung": document.getElementById("LoaiOCung").value,
            "HangSX": document.getElementById("HangSX").value,
            "DungLuong": document.getElementById("DungLuong").value,
            "ChuanKetNoi": document.getElementById("ChuanKetNoi").value,
            "TocDoDoc": document.getElementById("TocDoDoc").value,
            "TocDoGhi": document.getElementById("TocDoGhi").value,
            "Diem": document.getElementById("Diem").value,
            "DanhGia": document.getElementById("DanhGia").value,
            "URL": document.getElementById("URL").value,
            "Giaban": document.getElementById("GiaBan").value
        };
        $.ajax({
            type: 'POST',
            url: 'http://doancn.azurewebsites.net/api/hdd',
            data: JSON.stringify(hdd),
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



//function Sua() {
//    var hdd = {
//        "MaHDD": document.getElementById("btnedit").value,
//        "Model": document.getElementById("modeluphdd").value,
//        "Loaihdd": document.getElementById("loaihdduphdd").value,
//        "TocDoBus": document.getElementById("tocdobusuphdd").value,
//        "DungLuong": document.getElementById("dungluonguphdd").value,
//        "HangSX": document.getElementById("hangsxuphdd").value,
//        "Giaban": document.getElementById("giabanuphdd").value,
//        "Diem": document.getElementById("diemuphdd").value,
//        "Danhgia": document.getElementById("danhgiauphdd").value,
//        "URL": document.getElementById("urluphdd").value
//    };

//    $.ajax({
//        type: 'PUT',
//        url: 'http://doancn.azurewebsites.net/api/hdd',
//        data: JSON.stringify(hdd),
//        contentType: "application/json; charset=utf-8",
//        dataType: 'json',
//        processData: true,
//        success: function (data) {
//            alert("Success");
//        },
//        error: function (request, message, error) {
//            handleException(request, message, error);
//        }
//    });
//}

function Loc() {
    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/hdd/sort/' + document.getElementById("sortMin").value + "/" + document.getElementById("sortMax").value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowshdd = '';
            $.each(data, function (key, val) {
                rowshdd += '<tr><td>' + val.Model + '</td>'
                    + '<td>' + val.LoaiOCung + '</td>'
                    + '<td>' + val.HangSX + '</td>'
                    + '<td>' + val.DungLuong + '</td>'
                    + '<td>' + val.ChuanKetNoi + '</td>'
                    + '<td>' + val.TocDoDoc + '</td>'
                    + '<td>' + val.TocDoGhi + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaHDD + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaHDD + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#disphdd').html(rowshdd);
            $("button[name='btnedit']").click(function () {
                var hdd = '';
                $.getJSON('/api/hdd/' + this.value, function (val) {
                    hdd = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modeluphdd" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Loại Ổ Cứng: </div><input class="form-control" type="text" id="loaiocunguphdd" value="' + val.LoaiOCung + '"></div><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxuphdd" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Dung lượng: </div><input class="form-control" type="text" id="dungluonguphdd" value="' + val.DungLuong + '"></div><div class="form-group">' +
                        '<div>Chuẩn kết nối: </div><input class="form-control" type="text" id="chuanketnoiuphdd" value="' + val.ChuanKetNoi + '"></div><div class="form-group">' +
                        '<div>Tốc độ đọc: </div><input class="form-control" type="text" id="tocdodocuphdd" value="' + val.TocDoDoc + '"></div><div class="form-group">' +
                        '<div>Tốc độ ghi: </div><input class="form-control" type="text" id="tocdoghiuphdd" value="' + val.TocDoGhi + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemuphdd" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiauphdd" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanuphdd" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urluphdd" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(hdd);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var hdd = {
                            "MaHDD": val.MaHDD,
                            "LoaiOCung": document.getElementById("loaiocunguphdd").value,
                            "HangSX": document.getElementById("hangsxuphdd").value,
                            "DungLuong": document.getElementById("dungluonguphdd").value,
                            "ChuanKetNoi": document.getElementById("chuanketnoiuphdd").value,
                            "TocDoDoc": document.getElementById("tocdodocuphdd").value,
                            "TocDoGhi": document.getElementById("tocdoghiuphdd").value,
                            "Diem": document.getElementById("diemuphdd").value,
                            "DanhGia": document.getElementById("danhgiauphdd").value,
                            "URL": document.getElementById("urluphdd").value,
                            "Giaban": document.getElementById("giabanuphdd").value

                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/hdd',
                            data: JSON.stringify(hdd),
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
                var hdddel = '';
                $.getJSON('/api/hdd/' + this.value, function (val) {
                    hdddel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(hdddel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/hdd/delete/' + val.MaHDD,
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
        url: 'http://doancn.azurewebsites.net/api/hdd/search/' + document.getElementById("search").value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowshdd = '';
            $.each(data, function (key, val) {
                rowshdd += '<tr><td>' + val.Model + '</td>'
                    + '<td>' + val.LoaiOCung + '</td>'
                    + '<td>' + val.HangSX + '</td>'
                    + '<td>' + val.DungLuong + '</td>'
                    + '<td>' + val.ChuanKetNoi + '</td>'
                    + '<td>' + val.TocDoDoc + '</td>'
                    + '<td>' + val.TocDoGhi + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaHDD + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaHDD + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#disphdd').html(rowshdd);
            $("button[name='btnedit']").click(function () {
                var hdd = '';
                $.getJSON('/api/hdd/' + this.value, function (val) {
                    hdd = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modeluphdd" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Loại Ổ Cứng: </div><input class="form-control" type="text" id="loaiocunguphdd" value="' + val.LoaiOCung + '"></div><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxuphdd" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Dung lượng: </div><input class="form-control" type="text" id="dungluonguphdd" value="' + val.DungLuong + '"></div><div class="form-group">' +
                        '<div>Chuẩn kết nối: </div><input class="form-control" type="text" id="chuanketnoiuphdd" value="' + val.ChuanKetNoi + '"></div><div class="form-group">' +
                        '<div>Tốc độ đọc: </div><input class="form-control" type="text" id="tocdodocuphdd" value="' + val.TocDoDoc + '"></div><div class="form-group">' +
                        '<div>Tốc độ ghi: </div><input class="form-control" type="text" id="tocdoghiuphdd" value="' + val.TocDoGhi + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemuphdd" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiauphdd" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanuphdd" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urluphdd" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(hdd);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var hdd = {
                            "MaHDD": val.MaHDD,
                            "LoaiOCung": document.getElementById("loaiocunguphdd").value,
                            "HangSX": document.getElementById("hangsxuphdd").value,
                            "DungLuong": document.getElementById("dungluonguphdd").value,
                            "ChuanKetNoi": document.getElementById("chuanketnoiuphdd").value,
                            "TocDoDoc": document.getElementById("tocdodocuphdd").value,
                            "TocDoGhi": document.getElementById("tocdoghiuphdd").value,
                            "Diem": document.getElementById("diemuphdd").value,
                            "DanhGia": document.getElementById("danhgiauphdd").value,
                            "URL": document.getElementById("urluphdd").value,
                            "Giaban": document.getElementById("giabanuphdd").value

                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/hdd',
                            data: JSON.stringify(hdd),
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
                var hdddel = '';
                $.getJSON('/api/hdd/' + this.value, function (val) {
                    hdddel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(hdddel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/hdd/delete/' + val.MaHDD,
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
