$(document).ready(function () {
    var rowscpu = '';
    var rowsmain = '';
    $.getJSON('/api/cpu', function (data) {
        $.each(data, function (key, val) {
            rowscpu += '<option data-id="' + val.MaCPU + '" value ="' + val.Model + '"></option>';
        });

        $('#lstcpu').html(rowscpu);

    });


    $.getJSON('/api/mainboard', function (data) {
        $.each(data, function (key, val) {
            rowsmain += '<option value="' + val.Model + '" data-id="' + val.MaMain + '"></option>';
        });

        $('#lstmain').html(rowsmain);

    });

});

function CheckCM() {
    var macpu = $("#lstcpu option[value='" + $('#cpu').val() + "']").attr('data-id');
    var mamain = $("#lstmain option[value='" + $('#main').val() + "']").attr('data-id');

    var check = false;
    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkcm/' + macpu + '/' + mamain,
        async: false,
        dataType: 'json',
        success: function (data) {
            check = data;
        }
    });

    if (document.getElementById('cpu').value === "" || document.getElementById('main').value === "") {
        alert("Vui lòng chọn đầy đủ bộ phận.")
    }
    else {
        if (check === true)
            alert("CPU và Mainboard tương thích với nhau.");
        else
            alert("CPU và Mainboard không tương thích với nhau.");
    }
}

function Test(obj) {
    obj.value = "";
}