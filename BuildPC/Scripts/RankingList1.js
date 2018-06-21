$(document).ready(function () {
    var listcpu = '';
    $.getJSON('/api/cpu/orderby', function (data) {
        $.each(data, function (key, val) {
            listcpu += '<li class="list-group-item" >  <span class="badge" style="color:white; background-color:darkblue; font-size:16px; padding:2">' + val.Diem + '</span><h4>' + val.Model + '</h4><div>Xung nhịp: '+val.XungNhip+' GHz - Số nhân: '+ val.SoNhan+' - Giá bán: '+val.Giaban+' VND </div></li>';
        });

        $('#listCPU').html(listcpu);

    });

    var listgpu = '';
    $.getJSON('/api/gpu/orderby', function (data) {
        $.each(data, function (key, val) {
            listgpu += '<li class="list-group-item" >  <span class="badge" style="color:white; background-color:darkblue; font-size:16px; padding:2">' + val.Diem + '</span><h4>' + val.Model + '</h4><div>VGA: ' + val.VGA + ' - Bộ nhớ: ' + val.BoNho + ' GB - Giá bán: ' + val.Giaban + ' VND </div></li>';
        });

        $('#listGPU').html(listgpu);

    });

})