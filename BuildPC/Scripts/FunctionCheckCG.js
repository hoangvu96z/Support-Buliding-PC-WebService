$(document).ready(function () {
    var rowscpu = '';
    var rowsgpu = '';
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

});

function CheckCG() {
    var magpu = $("#lstgpu option[value='" + $('#gpu').val() + "']").attr('data-id');
    var macpu = $("#lstcpu option[value='" + $('#cpu').val() + "']").attr('data-id');
    var check;

    $.ajax({
        url: 'http://doancn.azurewebsites.net/api/calculate/checkcg/' + macpu + '/' + magpu,
        async: false,
        dataType: 'json',
        success: function (data) {
            check = data;
        }
    });

    if (document.getElementById('gpu').value === "" || document.getElementById('cpu').value === "") {
        alert("Vui lòng chọn đầy đủ bộ phận.")
    }
    else {
        if (check === 1)
            alert("Card màn hình quá mạnh với CPU này (bạn vẫn có thể dùng 2 bộ phận này nhưng hiệu suất khi sử dụng không tốt.)");
        else
            if(check === 2)
                alert("Card màn hình quá yếu với CPU này (bạn vẫn có thể dùng 2 bộ phận này nhưng hiệu suất khi sử dụng không tốt.)");
            else
                alert("CPU và GPU tương đồng với nhau!")
    }
}

function Test(obj) {
    obj.value = "";
}