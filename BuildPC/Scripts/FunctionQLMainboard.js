
$(document).ready(function () {

    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/mainboard/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowsmainboard = '';
            $.each(data, function (key, val) {
                rowsmainboard += '<tr><td>' + val.HangSX + '</td>'
                    + '<td>' + val.Model + '</td>'
                    + '<td>' + val.Socket + '</td>'
                    + '<td>' + val.Chipset + '</td>'
                    + '<td>' + val.RamToiDa + '</td>'
                    + '<td>' + val.PCI + '</td>'
                    + '<td>' + val.SoKheRam + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td>' + val.LoaiRamToiDa + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaMain + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaMain + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispmainboard').html(rowsmainboard);
            $("button[name='btnedit']").click(function () {
                var mainboard = '';
                $.getJSON('/api/mainboard/' + this.value, function (val) {
                    mainboard = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupmainboard" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupmainboard" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Socket: </div><input class="form-control" type="text" id="socketupmainboard" value="' + val.Socket + '"></div><div class="form-group">' +
                        '<div>Chipset: </div><input class="form-control" type="text" id="chipsetupmainboard" value="' + val.Chipset + '"></div><div class="form-group">' +
                        '<div>Ram tối đa: </div><input class="form-control" type="text" id="ramtoidaupmainboard" value="' + val.RamToiDa + '"></div><div class="form-group">' +
                        '<div>PCI: </div><input class="form-control" type="text" id="pciupmainboard" value="' + val.PCI + '"></div><div class="form-group">' +
                        '<div>Số khe Ram: </div><input class="form-control" type="text" id="sokheramupmainboard" value="' + val.SoKheRam + '"></div><div class="form-group">' +
                        '<divLoại Ram tối đa: </div><input class="form-control" type="text" id="loairamtoidaupmainboard" value="' + val.LoaiRamToiDa + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupmainboard" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupmainboard" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupmainboard" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupmainboard" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(mainboard);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var mainboard = {
                            "MaMain": val.MaMain,
                            "HangSX": document.getElementById("hangsxupmainboard").value,
                            "Model": document.getElementById("modelupmainboard").value,
                            "Socket": document.getElementById("socketupmainboard").value,
                            "Chipset": document.getElementById("chipsetupmainboard").value,
                            "RamToiDa": document.getElementById("ramtoidaupmainboard").value,
                            "PCI": document.getElementById("pciupmainboard").value,
                            "SoKheRam": document.getElementById("sokheramupmainboard").value,
                            "Giaban": document.getElementById("giabanupmainboard").value,
                            "LoaiRamToiDa": document.getElementById("loairamtoidaupmainboard").value,
                            "DanhGia": document.getElementById("danhgiaupmainboard").value,
                            "Diem": document.getElementById("diemupmainboard").value,
                            "URL": document.getElementById("urlupmainboard").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/mainboard',
                            data: JSON.stringify(mainboard),
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
                var mainboarddel = '';
                $.getJSON('/api/mainboard/' + this.value, function (val) {
                    mainboarddel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(mainboarddel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/mainboard/delete/' + val.MaMain,
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
        '<div class="form-group"><div>Model: </div><input class="form-control" type="text" id="Model"></div>' +
        '<div class="form-group"><div>Socket : </div><input class="form-control" type="text" id="Socket"></div>' +
        '<div class="form-group"><div>Chipset : </div><input class="form-control" type="text" id="Chipset"></div>' +
        '<div class="form-group"><div>Ram tối đa: </div><input class="form-control" type="text" id="RamToiDa"></div>' +
        '<div class="form-group"><div>PCI : </div><input class="form-control" type="text" id="PCI"></div>' +
        '<div class="form-group"><div>Số khe Ram : </div><input class="form-control" type="text" id="SoKheRam"></div>' +
        '<div class="form-group"><div>Giá bán : </div><input class="form-control" type="text" id="GiaBan"></div>' +
        '<div class="form-group"><div>Loại Ram tối đa : </div><input class="form-control" type="text" id="LoaiRamToiDa"></div>' +
        '<div class="form-group"><div>Đánh giá : </div><input class="form-control" type="text" id="DanhGia"></div>' +
        '<div class="form-group"><div>Điểm : </div><input class="form-control" type="text" id="Diem"></div>' +
        '<div class="form-group"><div>URL: </div><input class="form-control" type="text" id="URL"></div>' +
        '<button type="button" class="btn btn-success btn-lg" name="btnupdate" style="width: 100%;" > <span class="glyphicon glyphicon-ok-sign"></span> Thêm luôn!!!</button ></form ></div > <div class="modal-footer"></div>';
    $('#edit').html(create);
    $("#edit").modal();
    $("button[name='btnupdate']").click(function () {

        var mainboard = {
            "MaMain": val.MaMain,
            "HangSX": document.getElementById("HangSX").value,
            "Model": document.getElementById("Model").value,
            "Socket": document.getElementById("Socket").value,
            "Chipset": document.getElementById("Chipset").value,
            "RamToiDa": document.getElementById("RamToiDa").value,
            "PCI": document.getElementById("PCI").value,
            "SoKheRam": document.getElementById("SoKheRam").value,
            "Giaban": document.getElementById("GiaBan").value,
            "LoaiRamToiDa": document.getElementById("LoaiRamToiDa").value,
            "DanhGia": document.getElementById("DanhGia").value,
            "Diem": document.getElementById("Diem").value,
            "URL": document.getElementById("URL").value
        };
        $.ajax({
            type: 'POST',
            url: 'http://doancn.azurewebsites.net/api/mainboard',
            data: JSON.stringify(mainboard),
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
        url: 'http://doancn.azurewebsites.net/api/mainboard/sort/' + document.getElementById("sortMin").value + "/" + document.getElementById("sortMax").value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowsmainboard = '';
            $.each(data, function (key, val) {
                rowsmainboard += '<tr><td>' + val.HangSX + '</td>'
                    + '<td>' + val.Model + '</td>'
                    + '<td>' + val.Socket + '</td>'
                    + '<td>' + val.Chipset + '</td>'
                    + '<td>' + val.RamToiDa + '</td>'
                    + '<td>' + val.PCI + '</td>'
                    + '<td>' + val.SoKheRam + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td>' + val.LoaiRamToiDa + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaMain + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaMain + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispmainboard').html(rowsmainboard);
            $("button[name='btnedit']").click(function () {
                var mainboard = '';
                $.getJSON('/api/mainboard/' + this.value, function (val) {
                    mainboard = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupmainboard" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupmainboard" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Socket: </div><input class="form-control" type="text" id="socketupmainboard" value="' + val.Socket + '"></div><div class="form-group">' +
                        '<div>Chipset: </div><input class="form-control" type="text" id="chipsetupmainboard" value="' + val.Chipset + '"></div><div class="form-group">' +
                        '<div>Ram tối đa: </div><input class="form-control" type="text" id="ramtoidaupmainboard" value="' + val.RamToiDa + '"></div><div class="form-group">' +
                        '<div>PCI: </div><input class="form-control" type="text" id="pciupmainboard" value="' + val.PCI + '"></div><div class="form-group">' +
                        '<div>Số khe Ram: </div><input class="form-control" type="text" id="sokheramupmainboard" value="' + val.SoKheRam + '"></div><div class="form-group">' +
                        '<divLoại Ram tối đa: </div><input class="form-control" type="text" id="loairamtoidaupmainboard" value="' + val.LoaiRamToiDa + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupmainboard" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupmainboard" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupmainboard" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupmainboard" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(mainboard);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var mainboard = {
                            "MaMain": val.MaMain,
                            "HangSX": document.getElementById("hangsxupmainboard").value,
                            "Model": document.getElementById("modelupmainboard").value,
                            "Socket": document.getElementById("socketupmainboard").value,
                            "Chipset": document.getElementById("chipsetupmainboard").value,
                            "RamToiDa": document.getElementById("ramtoidaupmainboard").value,
                            "PCI": document.getElementById("pciupmainboard").value,
                            "SoKheRam": document.getElementById("sokheramupmainboard").value,
                            "Giaban": document.getElementById("giabanupmainboard").value,
                            "LoaiRamToiDa": document.getElementById("loairamtoidaupmainboard").value,
                            "DanhGia": document.getElementById("danhgiaupmainboard").value,
                            "Diem": document.getElementById("diemupmainboard").value,
                            "URL": document.getElementById("urlupmainboard").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/mainboard',
                            data: JSON.stringify(mainboard),
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
                var mainboarddel = '';
                $.getJSON('/api/mainboard/' + this.value, function (val) {
                    mainboarddel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(mainboarddel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/mainboard/delete/' + val.MaMain,
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
        url: 'http://doancn.azurewebsites.net/api/mainboard/search/' + document.getElementById("search").value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rowsmainboard = '';
            $.each(data, function (key, val) {
                rowsmainboard += '<tr><td>' + val.HangSX + '</td>'
                    + '<td>' + val.Model + '</td>'
                    + '<td>' + val.Socket + '</td>'
                    + '<td>' + val.Chipset + '</td>'
                    + '<td>' + val.RamToiDa + '</td>'
                    + '<td>' + val.PCI + '</td>'
                    + '<td>' + val.SoKheRam + '</td>'
                    + '<td>' + val.Giaban + '</td>'
                    + '<td>' + val.LoaiRamToiDa + '</td>'
                    + '<td>' + val.DanhGia + '</td>'
                    + '<td>' + val.Diem + '</td>'
                    + '<td><image style="width:100px" src="' + val.URL + '"/></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" value="' + val.MaMain + '" name="btnedit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' +
                    '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" value="' + val.MaMain + '" name="btndel"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
            });

            $('#dispmainboard').html(rowsmainboard);
            $("button[name='btnedit']").click(function () {
                var mainboard = '';
                $.getJSON('/api/mainboard/' + this.value, function (val) {
                    mainboard = '<div class="modal-dialog"><div class="modal-content"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">CẬP NHẬT DỮ LIỆU</h4></div > <div class="modal-body"><div class="form-group">' +
                        '<div>Hãng SX: </div><input class="form-control" type="text" id="hangsxupmainboard" value="' + val.HangSX + '"></div><div class="form-group">' +
                        '<div>Model: </div><input class="form-control" type="text" id="modelupmainboard" value="' + val.Model + '"></div><div class="form-group">' +
                        '<div>Socket: </div><input class="form-control" type="text" id="socketupmainboard" value="' + val.Socket + '"></div><div class="form-group">' +
                        '<div>Chipset: </div><input class="form-control" type="text" id="chipsetupmainboard" value="' + val.Chipset + '"></div><div class="form-group">' +
                        '<div>Ram tối đa: </div><input class="form-control" type="text" id="ramtoidaupmainboard" value="' + val.RamToiDa + '"></div><div class="form-group">' +
                        '<div>PCI: </div><input class="form-control" type="text" id="pciupmainboard" value="' + val.PCI + '"></div><div class="form-group">' +
                        '<div>Số khe Ram: </div><input class="form-control" type="text" id="sokheramupmainboard" value="' + val.SoKheRam + '"></div><div class="form-group">' +
                        '<divLoại Ram tối đa: </div><input class="form-control" type="text" id="loairamtoidaupmainboard" value="' + val.LoaiRamToiDa + '"></div><div class="form-group">' +
                        '<div>Điểm: </div><input class="form-control" type="text" id="diemupmainboard" value="' + val.Diem + '"></div><div class="form-group">' +
                        '<div>Đánh giá: </div><input class="form-control" type="text" id="danhgiaupmainboard" value="' + val.DanhGia + '"></div><div class="form-group">' +
                        '<div>Giá bán: </div><input class="form-control" type="text" id="giabanupmainboard" value="' + val.Giaban + '"></div><div class="form-group">' +
                        '<div>URL: </div><input class="form-control" type="text" id="urlupmainboard" value="' + val.URL + '"></div></div><div class="modal-footer"><button type="button" class="btn btn-warning btn-lg" name="btnupdate" style="width: 100%;" ><span class="glyphicon glyphicon-ok-sign"></span> Cập nhật luôn!!!</button></div>';
                    $('#edit').html(mainboard);
                    $("#edit").modal();

                    $("button[name='btnupdate']").click(function () {
                        $('#edit').modal('toggle');
                        var mainboard = {
                            "MaMain": val.MaMain,
                            "HangSX": document.getElementById("hangsxupmainboard").value,
                            "Model": document.getElementById("modelupmainboard").value,
                            "Socket": document.getElementById("socketupmainboard").value,
                            "Chipset": document.getElementById("chipsetupmainboard").value,
                            "RamToiDa": document.getElementById("ramtoidaupmainboard").value,
                            "PCI": document.getElementById("pciupmainboard").value,
                            "SoKheRam": document.getElementById("sokheramupmainboard").value,
                            "Giaban": document.getElementById("giabanupmainboard").value,
                            "LoaiRamToiDa": document.getElementById("loairamtoidaupmainboard").value,
                            "DanhGia": document.getElementById("danhgiaupmainboard").value,
                            "Diem": document.getElementById("diemupmainboard").value,
                            "URL": document.getElementById("urlupmainboard").value
                        };

                        $.ajax({
                            type: 'PUT',
                            url: 'http://doancn.azurewebsites.net/api/mainboard',
                            data: JSON.stringify(mainboard),
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
                var mainboarddel = '';
                $.getJSON('/api/mainboard/' + this.value, function (val) {
                    mainboarddel = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Xoá dữ liệu</h4></div><div class="modal-body">' +
                        '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Mày chắc sẽ xoá sản phẩm <b>' + val.Model + '</b> chứ?</div>' +
                        '</div><div class="modal-footer "><button type="button" class="btn btn-success" name="btndelete" ><span class="glyphicon glyphicon-ok-sign"></span>Ừ</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Thôi thôi</button></div></div></div>';
                    $('#delete').html(mainboarddel);
                    $("button[name='btndelete']").click(function () {
                        $('#delete').modal('toggle');
                        $.ajax({
                            type: 'POST',
                            url: 'http://doancn.azurewebsites.net/api/mainboard/delete/' + val.MaMain,
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

