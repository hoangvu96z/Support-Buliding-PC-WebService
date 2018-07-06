
$(document).ready(function ()
{
    var rowscpu = '';
    var rowsgpu = '';
    var rowsmain = '';
    var rowsram = '';
    $.getJSON('/api/cpu', function (data) {
        $.each(data, function (key, val) {
            rowscpu += '<option data-id="' + val.MaCPU + '" value ="' + val.Model + '"></option>';
        });

        $('#lstcpu').html(rowscpu);

    });


    $.getJSON('/api/gpu/getallproduct2', function (data) {
        $.each(data, function (key, val) {
            rowsgpu += '<option value="' + val.Model + '" data-id="' + val.MaGPU + '"></option>';
        });

        $('#lstgpu').html(rowsgpu);

    });

    $.getJSON('/api/mainboard', function (data) {
        $.each(data, function (key, val) {
            rowsmain += '<option value="' + val.Model + '" data-id="' + val.MaMain + '"></option>';
        });

        $('#lstmain').html(rowsmain);

    });

    $.getJSON('/api/ram', function (data) {
        $.each(data, function (key, val) {
            rowsram += '<option value="' + val.Model + '" data-id="' + val.MaRam + '"></option>';
        });

        $('#lstram').html(rowsram);

    });

    $("#Giatien").keyup(function () {
        this.value = PriceFormat(this);
    });
});

function PriceFormat(obj) {
    var Chuoi = obj.value;
    Chuoi = Chuoi.replace(/,/g, '');
    if (Chuoi.length > 3) {
        var Money = Format(Chuoi, '');
        return Money;
    }
    else
        return Chuoi;

}

function Format(Chuoi, result) {
    while (Chuoi.length > 3) {
    result = ',' + Chuoi.substr(Chuoi.length - 3, Chuoi.length - 1) + result;
Chuoi = Chuoi.substr(0, Chuoi.length - 3);
    }
    result = Chuoi + result;
    return result;
}

function GetData(ListID, nhucau) {
    var ListPro = [];
    for (var i = 0; i < ListID.length; i++) {
        $.ajax({
            url: '/api/' + nhucau + '/' + ListID[i],
            async: false,
            dataType: 'json',
            success: function (json) {
                ListPro.push(json);
            }
        });
    }
    return ListPro; // has value of json.whatever
}

function Update() {
    var magpu = $("#lstgpu option[value='" + $('#gpu').val() + "']").attr('data-id');
    var maram = $("#lstram option[value='" + $('#ram').val() + "']").attr('data-id');
    var macpu = $("#lstcpu option[value='" + $('#cpu').val() + "']").attr('data-id');
    var mamain = $("#lstmain option[value='" + $('#main').val() + "']").attr('data-id');

    var radio = document.getElementsByName("nhucau");
    var radiovalue = '';
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            radiovalue = radio[i].value;
            break;
        }
    }
    var rowstitle='';
    var rowsresult = '';
    var Giatien = document.getElementById("Giatien").value;
    Giatien = Giatien.replace(/,/g, '');
    if (Giatien === "")
        alert("Bạn chưa nhập số tiền");
    var CH = {
        "MaGPU": magpu,
        "MaCPU": macpu,
        "MaMain": mamain,
        "MaRam": maram,
        "MaRam2": "",
        "MaHDD": "",
        "MaHDD2": "",
        "MaCase": "",
        "MaNguon": "",
    };

    if (document.getElementById('gpu').value === "" || document.getElementById('ram').value === "" || document.getElementById('cpu').value === "" || document.getElementById('main').value === "") {
        alert("Vui lòng chọn đầy đủ bộ phận.")
    }
    else
    {
        var check = Check(mamain, maram, macpu, magpu);
        if (check[0] === 0)
        {
            $.ajax({
                type: 'POST',
                url: 'http://doancn.azurewebsites.net/api/calculate/update/' + Giatien + '/' + document.querySelector('input[name="nhucau"]:checked').value,
                data: JSON.stringify(CH),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                processData: true,
                success: function (data) {
                    if (data === "") {
                        $('#title').html('');
                        $('#result').html('');
                        alert("Số tiền không đủ để nâng cấp bộ phận này!");
                    }
                    else {
                        if (document.querySelector('input[name="nhucau"]:checked').value === "RAM") {
                            var ListPro = GetData(data, document.querySelector('input[name="nhucau"]:checked').value);
                            rowsresult = '<table class="table table-bordred table-striped"><thead><th>Model</th><th>LoaiRam</th><th>TocDoBus</th><th>DungLuong</th><th>Giaban</th><th>DanhGia</th><th>Ảnh</th></thead><tbody>';
                            $.each(ListPro, function (key, val) {
                                var Gia = Format(val.Giaban.toString(), '');
                                rowsresult += '<tr><td>' + val.Model + '</td>'
                                    + '<td>' + val.LoaiRam + '</td>'
                                    + '<td>' + val.TocDoBus + '</td>'
                                    + '<td>' + val.DungLuong + '</td>'
                                    + '<td>' + Gia + ' VND</td>'
                                    + '<td>' + val.DanhGia + '</td>'
                                    + '<td><image style="width:100px" src="' + val.URL + '"/></td></tr>'
                            });
                            rowsresult += '</tbody></table>';
                            $('#result').html(rowsresult);
                        }
                        else {
                            if (document.querySelector('input[name="nhucau"]:checked').value === "CPU") {
                                ListPro = GetData(data, document.querySelector('input[name="nhucau"]:checked').value);
                                rowsresult = '<table class="table table-bordred table-striped"><thead><th>Model</th><th>Socket</th><th>SoNhan</th><th>SoLuong</th><th>XungNhip</th><th>Cache</th><th>DanhGia</th><th>Giaban</th><th>Ảnh</th></thead><tbody>';
                                $.each(ListPro, function (key, val) {
                                    Gia = Format(val.Giaban.toString(), '');
                                    rowsresult += '<tr><td>' + val.Model + '</td>'
                                        + '<td>' + val.Socket + '</td>'
                                        + '<td>' + val.SoNhan + '</td>'
                                        + '<td>' + val.SoLuong + '</td>'
                                        + '<td>' + val.XungNhip + '</td>'
                                        + '<td>' + val.Cache + '</td>'
                                        + '<td>' + val.DanhGia + '</td>'
                                        + '<td>' + Gia + ' VND</td>'
                                        + '<td><image style="width:100px" src="' + val.URL + '"/></td></tr>'
                                });
                                rowsresult += '</tbody></table>';
                                $('#result').html(rowsresult);
                            }
                            else {
                                ListPro = GetData(data, document.querySelector('input[name="nhucau"]:checked').value);
                                rowsresult = '<table class="table table-bordred table-striped"><thead><th>Model</th><th>VGA</th><th>PCI</th><th>BoNho</th><th>DanhGia</th><th>Giaban</th><th>Ảnh</th></thead><tbody>';
                                $.each(ListPro, function (key, val) {
                                    Gia = Format(val.Giaban.toString(), '');
                                    rowsresult += '<tr><td>' + val.Model + '</td>'
                                        + '<td>' + val.VGA + '</td>'
                                        + '<td>' + val.PCI + '</td>'
                                        + '<td>' + val.BoNho + '</td>'
                                        + '<td>' + val.DanhGia + '</td>'
                                        + '<td>' + Gia + ' VND</td>'
                                        + '<td><image style="width:100px" src="' + val.URL + '"/></td></tr>'
                                });
                                rowsresult += '</tbody></table>';
                                $('#result').html(rowsresult);
                            }
                        }

                        //$.each(data, function (key, val) {
                        //    alert(val);
                        //});
                        rowstitle = "<h4>Các bộ phận " + document.querySelector('input[name="nhucau"]:checked').value + " bạn có thể nâng cấp với số tiền này là:</h4>";
                        $('#title').html(rowstitle);
                        $('#disresult').css({ "visibility": "visible" });
                    }
                },
                error: function (request, message, error)
                {
                    handleException(request, message, error);
                }
            });
        }
        else
        {
            var error = '';
            for (i = 0; i < check.length; i++) {
                switch (check[i]) {
                    case 1:
                        error += "Ram và Mainboard,";
                        break;
                    case 2:
                        error += "Card màn hình và Mainboard,";
                        break;
                    case 3:
                        error += "CPU và Mainboard,";
                        break;
                }
            }

            error = error.slice(0, error.length - 1);
            error += ".";
            for (i = 0; i < check.length; i++) {
                if (check[i] === 'cpu')
                    error += "Card màn hình quá mạnh với CPU này (bạn vẫn có thể dùng 2 bộ phận này nhưng hiệu suất khi sử dụng không tốt.)";
                if (check[i] === 'gpu')
                    error += "Card màn hình quá yếu với CPU này (bạn vẫn có thể dùng 2 bộ phận này nhưng hiệu suất khi sử dụng không tốt.)";
            }
            alert("Cấu hình bạn vừa xây dựng không tương thích ở các vộ phận: " + error);
        }
    }
}

function Test(obj) {
    obj.value = "";
}

function Check(MaMain, MaRam, MaCPU, MaGPU) {
    var Check1 = false;
    var Check2 = false;
    var Check3 = false;
    var Check4;
    var lstFalse = [];
    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkrm/' + MaRam + '/' + MaMain,
        async: false,
        dataType: 'json',
        success: function (data) {
            Check1 = data;
        }
    });

    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkgm/' + MaGPU + '/' + MaMain,
        async: false,
        dataType: 'json',
        success: function (data) {
            Check2 = data;
        }
    });

    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkcm/' + MaCPU + '/' + MaMain,
        async: false,
        dataType: 'json',
        success: function (data) {
            Check3 = data;
        }
    });

    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkcg/' + MaCPU + '/' + MaGPU,
        async: false,
        dataType: 'json',
        success: function (data) {
            Check4 = data;
        }
    });
    if (Check1 === true && Check2 === true && Check3 === true && Check4 === 0)
        lstFalse.push(0);
    else {
        if (Check1 === false)
            lstFalse.push(1);
        if (Check2 === false)
            lstFalse.push(2);
        if (Check3 === false)
            lstFalse.push(3);
        if (Check4 === 1)
            lstFalse.push('cpu');
        if (Check4 === 2)
            lstFalse.push('gpu');
    }
    return lstFalse;
}
