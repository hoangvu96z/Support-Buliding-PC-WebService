$(document).ready(function () {
    var rowsgpu = '';
    var rowsmain = '';
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

});

function CheckGM() {
    var magpu = $("#lstgpu option[value='" + $('#gpu').val() + "']").attr('data-id');
    var mamain = $("#lstmain option[value='" + $('#main').val() + "']").attr('data-id');

    var check = false;
    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkgm/' + magpu + '/' + mamain,
        async: false,
        dataType: 'json',
        success: function (data) {
            check = data;
        }
    });

    if (document.getElementById('gpu').value === "" || document.getElementById('main').value === "") {
        alert("Vui lòng chọn đầy đủ bộ phận.")
    }
    else {
        if (check === true)
            alert("GPU và Mainboard tương thích với nhau.");
        else
            alert("GPU và Mainboard không tương thích với nhau.");
    }
}

function Test(obj) {
    obj.value = "";
}