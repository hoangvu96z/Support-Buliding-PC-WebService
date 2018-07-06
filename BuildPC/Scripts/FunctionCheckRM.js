$(document).ready(function () {
    var rowsram = '';
    var rowsmain = '';
    $.getJSON('/api/ram', function (data) {
        $.each(data, function (key, val) {
            rowsram += '<option value="' + val.Model + '" data-id="' + val.MaRam + '"></option>';
        });

        $('#lstram').html(rowsram);

    });


    $.getJSON('/api/mainboard', function (data) {
        $.each(data, function (key, val) {
            rowsmain += '<option value="' + val.Model + '" data-id="' + val.MaMain + '"></option>';
        });

        $('#lstmain').html(rowsmain);

    });

});

function CheckRM() {
    var maram = $("#lstram option[value='" + $('#ram').val() + "']").attr('data-id');
    var mamain = $("#lstmain option[value='" + $('#main').val() + "']").attr('data-id');

    var check = false;
    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkrm/' + maram + '/' + mamain,
        async: false,
        dataType: 'json',
        success: function (data) {
            check = data;
        }
    });

    if (document.getElementById('ram').value === "" || document.getElementById('main').value === "") {
        alert("Vui lòng chọn đầy đủ bộ phận.")
    }
    else {
        if (check === true)
            alert("Ram và Mainboard tương thích với nhau.");
        else
            alert("Ram và Mainboard không tương thích với nhau.");
    }
}

function Test(obj) {
    obj.value = "";
}