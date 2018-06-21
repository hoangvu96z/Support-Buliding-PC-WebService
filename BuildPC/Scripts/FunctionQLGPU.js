
$(document).ready(function () {

    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/gpu/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowsgpu = '';
            $.each(data, function (key, val) {
                rowsgpu += '<tr><td>' + val.HangSX + '</td>'
                    + '<td>' + val.HangChipset + '</td>'
                    + '<td>' + val.Model + '</td>'
                    + '<td>' + val.VGA + '</td>'
                    + '<td>' + val.PCI + '</td>'
                    + '<td>' + val.BoNho + '</td>'
                    + '<td>' + val.LoaiRam + '</td>'
                    + '<td>' + val.DienNang + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaGPU + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaGPU + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispgpu').html(rowsgpu);
            $("button[name='btnedit']").click(function () {
                var gpu = '';
                $.getJSON('/api/gpu/' + this.value, function (val) {
                    gpu = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupgpu" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Hãng Chipset: </div><input class="form-control" type="text" id="hangchipsetupgpu" value="' + val.HangChipset + '"></div><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupgpu" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>VGA: </div><input class="form-control" type="text" id="vgaupgpu" value="' + val.VGA + '"></div><div class="form-group">' +
                        '<div>PCI: </div><input class="form-control" type="text" id="pciupgpu" value="' + val.PCI + '"></div><div class="form-group">' +
                        '<div>Bộ nhớ: </div><input class="form-control" type="text" id="bonhoupgpu" value="' + val.BoNho + '"></div><div class="form-group">' +
                        '<div>Loại Ram: </div><input class="form-control" type="text" id="loairamupgpu" value="' + val.LoaiRam + '"></div><div class="form-group">' +
                        '<div>Điện năng: </div><input class="form-control" type="text" id="diennangupgpu" value="' + val.DienNang + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupgpu" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupgpu" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupgpu" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupgpu" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(gpu);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var gpu = {
                            "MaGPU": val.MaGPU,
                            "HangSX": document.getElementById("hangsxupgpu").value,
                            "HangChipset": document.getElementById("hangchipsetupgpu").value,
                            "Model": document.getElementById("modelupgpu").value,
                            "VGA": document.getElementById("vgaupgpu").value,
                            "PCI": document.getElementById("pciupgpu").value,
                            "BoNho": document.getElementById("bonhoupgpu").value,
                            "LoaiRam": document.getElementById("loairamupgpu").value,
                            "DienNang": document.getElementById("diennangupgpu").value,
                            "Diem": document.getElementById("diemupgpu").value,
                            "DanhGia": document.getElementById("danhgiaupgpu").value,
                            "Giaban": document.getElementById("giabanupgpu").value,
                            "URL": document.getElementById("urlupgpu").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/gpu',
                            data: JSON.stringify(gpu),
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
                var gpudel = '';
                $.getJSON('/api/gpu/' + this.value, function (val) {
                    gpudel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(gpudel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/gpu/delete/' + val.MaGPU,
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
        '<div class="form-group"><div>Hãng SX: </div><input class="form-control" type="text" style="width: 640dp;" id="HangSX"></div>' +
        '<div class="form-group"><div>Hãng Chipset: </div><input class="form-control" type="text" id="HangChipset"></div>' +
        '<div class="form-group"><div>Tên Sản phẩm : </div><input class="form-control" type="text" id="Model"></div>' +
        '<div class="form-group"><div>VGA: </div><input class="form-control" type="text" id="VGA"></div>' +
        '<div class="form-group"><div>PCI: </div><input class="form-control" type="text" id="PCI"></div>' +
        '<div class="form-group"><div>Bộ nhớ: </div><input class="form-control" type="text" id="BoNho"></div>' +
        '<div class="form-group"><div>Loại Ram: </div><input class="form-control" type="text" id="LoaiRam"></div>' +
        '<div class="form-group"><div>Điện năng: </div><input class="form-control" type="text" id="DienNang"></div>' +
        '<div class="form-group"><div>Điểm : </div><input class="form-control" type="text" id="Diem"></div>' +
        '<div class="form-group"><div>Đánh giá: </div><input class="form-control" type="text" id="DanhGia"></div>' +
        '<div class="form-group"><div>Giá bán: </div><input class="form-control" type="text" id="GiaBan"></div>' +
        '<div class="form-group"><div>URL: </div><input class="form-control" type="text" id="URL"></div>' +
        '<button type="button" class="btn btn-success btn-lg" name="btnupdate" style="width: 100%;" > <span class="glyphicon glyphicon-ok-sign"></span> Thêm luôn!!!</button ></form ></div > <div class="modal-footer"></div>';
    $('#edit').html(create);
    $("#edit").modal();
    $("button[name='btnupdate']").click(function () {

        var gpu = {
            "MaGPU": val.MaGPU,
            "HangSX": document.getElementById("HangSX").value,
            "HangChipset": document.getElementById("HangChipset").value,
            "Model": document.getElementById("Model").value,
            "VGA": document.getElementById("VGA").value,
            "PCI": document.getElementById("PCI").value,
            "BoNho": document.getElementById("BoNho").value,
            "LoaiRam": document.getElementById("LoaiRam").value,
            "DienNang": document.getElementById("DienNang").value,
            "Diem": document.getElementById("Diem").value,
            "DanhGia": document.getElementById("DanhGia").value,
            "Giaban": document.getElementById("GiaBan").value,
            "URL": document.getElementById("URL").value
        };
        $.ajax({
            type: 'POST',
            url: 'http://doancn.azurewebsites.net/api/gpu',
            data: JSON.stringify(gpu),
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
        url: 'http://doancn.azurewebsites.net/api/gpu/sort/' + document.getElementById("sortMin").value + "/" + document.getElementById("sortMax").value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowsgpu = '';
            $.each(data, function (key, val) {
                rowsgpu += '<tr><td>' + val.HangSX + '</td>'
                    + '<td>' + val.HangChipset + '</td>'
                    + '<td>' + val.Model + '</td>'
                    + '<td>' + val.VGA + '</td>'
                    + '<td>' + val.PCI + '</td>'
                    + '<td>' + val.BoNho + '</td>'
                    + '<td>' + val.LoaiRam + '</td>'
                    + '<td>' + val.DienNang + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaCPU + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaCPU + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispgpu').html(rowsgpu);
            $("button[name='btnedit']").click(function () {
                var gpu = '';
                $.getJSON('/api/gpu/' + this.value, function (val) {
                    gpu = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupgpu" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Hãng Chipset: </div><input class="form-control" type="text" id="hangchipsetupgpu" value="' + val.HangChipset + '"></div><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupgpu" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>VGA: </div><input class="form-control" type="text" id="vgaupgpu" value="' + val.VGA + '"></div><div class="form-group">' +
                        '<div>PCI: </div><input class="form-control" type="text" id="pciupgpu" value="' + val.PCI + '"></div><div class="form-group">' +
                        '<div>Bộ nhớ: </div><input class="form-control" type="text" id="bonhoupgpu" value="' + val.BoNho + '"></div><div class="form-group">' +
                        '<div>Loại Ram: </div><input class="form-control" type="text" id="loairamupgpu" value="' + val.LoaiRam + '"></div><div class="form-group">' +
                        '<div>Điện năng: </div><input class="form-control" type="text" id="diennangupgpu" value="' + val.DienNang + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupgpu" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupgpu" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupgpu" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupgpu" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(gpu);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var gpu = {
                            "MaGPU": val.MaGPU,
                            "HangSX": document.getElementById("hangsxupgpu").value,
                            "HangChipset": document.getElementById("hangchipsetupgpu").value,
                            "Model": document.getElementById("modelupgpu").value,
                            "VGA": document.getElementById("vgaupgpu").value,
                            "PCI": document.getElementById("pciupgpu").value,
                            "BoNho": document.getElementById("bonhoupgpu").value,
                            "LoaiRam": document.getElementById("loairamupgpu").value,
                            "DienNang": document.getElementById("diennangupgpu").value,
                            "Diem": document.getElementById("diemupgpu").value,
                            "DanhGia": document.getElementById("danhgiaupgpu").value,
                            "Giaban": document.getElementById("giabanupgpu").value,
                            "URL": document.getElementById("urlupgpu").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/gpu',
                            data: JSON.stringify(gpu),
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
                var gpudel = '';
                $.getJSON('/api/gpu/' + this.value, function (val) {
                    gpudel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(gpudel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/gpu/delete/' + val.MaGPU,
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
        url: 'http://doancn.azurewebsites.net/api/gpu/search/' + document.getElementById("search").value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowsgpu = '';
            $.each(data, function (key, val) {
                rowsgpu += '<tr><td>' + val.HangSX + '</td>'
                    + '<td>' + val.HangChipset + '</td>'
                    + '<td>' + val.Model + '</td>'
                    + '<td>' + val.VGA + '</td>'
                    + '<td>' + val.PCI + '</td>'
                    + '<td>' + val.BoNho + '</td>'
                    + '<td>' + val.LoaiRam + '</td>'
                    + '<td>' + val.DienNang + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaCPU + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaCPU + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispgpu').html(rowsgpu);
            $("button[name='btnedit']").click(function () {
                var gpu = '';
                $.getJSON('/api/gpu/' + this.value, function (val) {
                    gpu = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupgpu" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Hãng Chipset: </div><input class="form-control" type="text" id="hangchipsetupgpu" value="' + val.HangChipset + '"></div><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupgpu" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>VGA: </div><input class="form-control" type="text" id="vgaupgpu" value="' + val.VGA + '"></div><div class="form-group">' +
                        '<div>PCI: </div><input class="form-control" type="text" id="pciupgpu" value="' + val.PCI + '"></div><div class="form-group">' +
                        '<div>Bộ nhớ: </div><input class="form-control" type="text" id="bonhoupgpu" value="' + val.BoNho + '"></div><div class="form-group">' +
                        '<div>Loại Ram: </div><input class="form-control" type="text" id="loairamupgpu" value="' + val.LoaiRam + '"></div><div class="form-group">' +
                        '<div>Điện năng: </div><input class="form-control" type="text" id="diennangupgpu" value="' + val.DienNang + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupgpu" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupgpu" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupgpu" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupgpu" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(gpu);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var gpu = {
                            "MaGPU": val.MaGPU,
                            "HangSX": document.getElementById("hangsxupgpu").value,
                            "HangChipset": document.getElementById("hangchipsetupgpu").value,
                            "Model": document.getElementById("modelupgpu").value,
                            "VGA": document.getElementById("vgaupgpu").value,
                            "PCI": document.getElementById("pciupgpu").value,
                            "BoNho": document.getElementById("bonhoupgpu").value,
                            "LoaiRam": document.getElementById("loairamupgpu").value,
                            "DienNang": document.getElementById("diennangupgpu").value,
                            "Diem": document.getElementById("diemupgpu").value,
                            "DanhGia": document.getElementById("danhgiaupgpu").value,
                            "Giaban": document.getElementById("giabanupgpu").value,
                            "URL": document.getElementById("urlupgpu").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/gpu',
                            data: JSON.stringify(gpu),
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
                var gpudel = '';
                $.getJSON('/api/gpu/' + this.value, function (val) {
                    gpudel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(gpudel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/gpu/delete/' + val.MaGPU,
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

