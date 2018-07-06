$(document).ready(function(){
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
});

function Check()
{
    var magpu = $("#lstgpu option[value='" + $('#gpu').val() + "']").attr('data-id');
    var maram = $("#lstram option[value='" + $('#ram').val() + "']").attr('data-id');
    var macpu = $("#lstcpu option[value='" + $('#cpu').val() + "']").attr('data-id');
    var mamain = $("#lstmain option[value='" + $('#main').val() + "']").attr('data-id');
    var error = '';

    if (document.getElementById('gpu').value === "" || document.getElementById('ram').value === "" || document.getElementById('cpu').value === "" || document.getElementById('main').value === "") {
        tong = 0;
        alert("Vui lòng chọn đầy đủ bộ phận.")
    }
    else {
        var check = CheckPC(mamain, maram, macpu, magpu);
        if (check[0] === 0) {
            alert("Cấu hình bạn vừa xây dựng tương thích hoàn toàn với nhau.");
        }
        else {
            for (var i = 0; i < check.length; i++) {
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
            error += ". ";
            for (i = 0; i < check.length; i++) {
                if (check[i] === 'cpu')
                    error += "Ngoài ra Card màn hình quá mạnh với CPU này (bạn vẫn có thể dùng 2 bộ phận này nhưng hiệu suất khi sử dụng không tốt.)";
                if (check[i] === 'gpu')
                    error += "Ngoài ra Card màn hình quá yếu với CPU này (bạn vẫn có thể dùng 2 bộ phận này nhưng hiệu suất khi sử dụng không tốt.)";
            }
            $('#dispTongtien').html("");
            alert("Cấu hình bạn vừa xây dựng không tương thích ở các vộ phận: " + error);
        }
    }
}

function CheckRM(MaRam, MaMain)
{
    var Check1 = false;
    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkrm/' + MaRam + '/' + MaMain,
        async: false,
        dataType: 'json',
        success: function (data) {
            Check1 = data;
        }
    });
}

function CheckCM(MaCPU, MaMain)
{
    var Check3 = false;
    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkcm/' + MaCPU + '/' + MaMain,
        async: false,
        dataType: 'json',
        success: function (data) {
            Check3 = data;
        }
    });
}

function CheckGM(MaGPU, MaMain)
{
    var Check2 = false;
    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkgm/' + MaGPU + '/' + MaMain,
        async: false,
        dataType: 'json',
        success: function (data) {
            Check2 = data;
        }
    });
}

function CheckCG(MaCPU, MaGPU)
{
    var Check4;
    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkcg/' + MaCPU + '/' + MaGPU,
        async: false,
        dataType: 'json',
        success: function (data) {
            Check4 = data;
        }
    });
}

function CheckPC(MaMain, MaRam, MaCPU, MaGPU) {
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

function Test(obj) {
    obj.value = "";
}