$(document).ready(function () {
    var rowsram = '';
    $.getJSON('/api/ram', function (data) {
        $.each(data, function (key, val) {
            rowsram += '<option data-id="' + val.MaRam + '" data-price="' + val.Giaban + '" value ="' + val.Model + '"></option>';
        });

        $('#dispRam').html(rowsram);

    });


    var rowsgpu = '';
    $.getJSON('/api/gpu/getallproduct2', function (data) {
        $.each(data, function (key, val) {
            rowsgpu += '<option data-id="' + val.MaGPU + '" data-price="' + val.Giaban + '" value ="' + val.Model + '"></option>';
        });

        $('#dispGpu').html(rowsgpu);

    });

    var rowscpu = '';
    $.getJSON('/api/cpu', function (data) {
        $.each(data, function (key, val) {
            rowscpu += '<option data-id="' + val.MaCPU + '" data-price="' + val.Giaban + '" value ="' + val.Model + '"></option>';
        });


        $('#dispCPU').html(rowscpu);

    });

    var rowspower = '';
    $.getJSON('/api/Nguon', function (data) {
        $.each(data, function (key, val) {
            rowspower += '<option data-id="' + val.MaNguon + '" data-price="' + val.Giaban + '" value ="' + val.Model + '"></option>';
        });


        $('#dispPower').html(rowspower);

    });

    var rowsmainboard = '';
    $.getJSON('/api/mainboard', function (data) {
        $.each(data, function (key, val) {
            rowsmainboard += '<option data-id="' + val.MaMain + '" data-price="' + val.Giaban + '" value ="' + val.Model + '"></option>';
        });


        $('#dispMainboard').html(rowsmainboard);

    });

    var rowshdd = '';
    $.getJSON('/api/hdd', function (data) {
        $.each(data, function (key, val) {
            rowshdd += '<option data-id="' + val.MaHDD + '" data-price="' + val.Giaban + '" value ="' + val.Model + '"></option>';
        });


        $('#dispHdd').html(rowshdd);

    });

    var rowscase = '';
    $.getJSON('/api/CasePC', function (data) {
        $.each(data, function (key, val) {
            rowscase += '<option data-id="' + val.MaCase + '" data-price="' + val.Giaban + '" value ="' + val.Model + '"></option>';
        });


        $('#dispCase').html(rowscase);

    });

});




function Tinhtong(){
    var tong = 0;
    var error = '';

    var magpu = $("#dispGpu option[value='" + $('#lstgpu').val() + "']").attr('data-id');
    var maram = $("#dispRam option[value='" + $('#lstram').val() + "']").attr('data-id');
    var macpu = $("#dispCPU option[value='" + $('#lstcpu').val() + "']").attr('data-id');
    var mamain = $("#dispMainboard option[value='" + $('#lstmain').val() + "']").attr('data-id');

    var gpu = parseInt($("#dispGpu option[value='" + $('#lstgpu').val() + "']").attr('data-price'));
    var ram = parseInt($("#dispRam option[value='" + $('#lstram').val() + "']").attr('data-price'));
    var cpu = parseInt($("#dispCPU option[value='" + $('#lstcpu').val() + "']").attr('data-price'));
    var power = parseInt($("#dispPower option[value='" + $('#lstpower').val() + "']").attr('data-price'));
    var mainboard = parseInt($("#dispMainboard option[value='" + $('#lstmain').val() + "']").attr('data-price'));
    var hdd = parseInt($("#dispHdd option[value='" + $('#lsthdd').val() + "']").attr('data-price'));
    var casepc = parseInt($("#dispCase option[value='" + $('#lstcase').val() + "']").attr('data-price'));

    if (document.getElementById('lstgpu').value === "" || document.getElementById('lstram').value === "" || document.getElementById('lstcpu').value === "" || document.getElementById('lstpower').value === "" || document.getElementById('lstmain').value === "" || document.getElementById('lsthdd').value === "" || document.getElementById('lstcase').value === "") {
        tong = 0;
        alert("Vui lòng chọn đầy đủ bộ phận.")
    }
    else {
        var check = Check(mamain, maram, macpu, magpu);
        if (check[0] === 0) {
            tong = (ram + gpu + cpu + power + mainboard + hdd + casepc);
            var money = 0;
            money = Format(tong.toString(), "");
            $('#dispTongtien').html("Tổng tiền là : " + money + " VND");
        }
        else {
            for (var i = 0; i < check.length; i++) {
                switch (check[i]) {
                    case 1:
                        error+= "Ram và Mainboard,";
                        break;
                    case 2:
                        error +="Card màn hình và Mainboard,";
                        break;
                    case 3:
                        error +="CPU và Mainboard,";
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
            $('#dispTongtien').html("");
            alert("Cấu hình bạn vừa xây dựng không tương thích ở các vộ phận: " + error);
        }
    }
}



function Format(Chuoi, result) {
    while (Chuoi.length > 3) {
        result = ',' + Chuoi.substr(Chuoi.length - 3, Chuoi.length - 1) + result;
        Chuoi = Chuoi.substr(0, Chuoi.length - 3);
    }
    result = Chuoi + result;
    return result;
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
    else
    {
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

function Test(obj) {
    obj.value = "";
}

//function Test2() {
//    var magpu = $("#dispGpu option[value='" + $('#lstgpu').val() + "']").attr('data-id');
//    var maram = $("#dispRam option[value='" + $('#lstram').val() + "']").attr('data-id');
//    var macpu = $("#dispCPU option[value='" + $('#lstcpu').val() + "']").attr('data-id');
//    var mamain = $("#dispMainboard option[value='" + $('#lstmain').val() + "']").attr('data-id');
//    var check = Check(mamain, maram, macpu, magpu);
//    alert(check);
//    //$.ajax({
//    //    url: 'http://doancn.azurewebsites.net/api/calculate/checkrm/RA0004/MA0001',
//    //    async: false,
//    //    dataType: 'json',
//    //    success: function (data) {
//    //        alert(data);
//    //    }
//    //});
//}


