
$(document).ready(function ()
{
    var rowsram = '<option>-----Chon-----</option>';
    $.getJSON('/api/ram', function (data)
    {
        var ram = 0;
        $.each(data, function (key, val)
        {
            ram = parseInt(val.Giaban);
            rowsram += '<option value=' + val.Giaban + '>' + val.Model + '</option>';
        });

        $('#dispRam').html(rowsram);

    });


    var rowsgpu = '<option>-----Chon-----</option>';
    $.getJSON('/api/gpu', function (data) {
        var gpu = 0;
        $.each(data, function (key, val) {
            gpu = parseInt(val.Giaban);
            rowsgpu += '<option value=' + val.Giaban + '>' + val.Model + '</option>';
        });

        $('#dispGpu').html(rowsgpu);

    });

    var rowscpu = '<option>-----Chon-----</option>';
    $.getJSON('/api/cpu', function (data) {
        var cpu = 0;
        $.each(data, function (key, val) {
            cpu = parseInt(val.Giaban);
            rowscpu += '<option value=' + val.Giaban + '>' + val.Model + '</option>';
        });


        $('#dispCPU').html(rowscpu);

    });

    var rowspower = '<option>-----Chon-----</option>';
    $.getJSON('/api/Nguon', function (data) {
        var power = 0;
        $.each(data, function (key, val) {
            power = parseInt(val.Giaban);
            rowspower += '<option value=' + val.Giaban + '>' + val.Model + '</option>';
        });


        $('#dispPower').html(rowspower);

    });

    var rowsmainboard = '<option>-----Chon-----</option>';
    $.getJSON('/api/mainboard', function (data) {
        var mainboard = 0;
        $.each(data, function (key, val) {
            mainboard = parseInt(val.Giaban);
            rowsmainboard += '<option value=' + val.Giaban + '>' + val.Model + '</option>';
        });


        $('#dispMainboard').html(rowsmainboard);

    });

    var rowshdd = '<option>-----Chon-----</option>';
    $.getJSON('/api/hdd', function (data) {
        var hdd = 0;
        $.each(data, function (key, val) {
            mainboard = parseInt(val.Giaban);
            rowshdd += '<option value=' + val.Giaban + '>' + val.Model + '</option>';
        });


        $('#dispHdd').html(rowshdd);

    });

    var rowscase = '<option>-----Chon-----</option>';
    $.getJSON('/api/CasePC', function (data) {
        var casepc = 0;
        $.each(data, function (key, val) {
            casepc = parseInt(val.Gia);
            rowscase += '<option value=' + val.Giaban + '>' + val.Model + '</option>';
        });


        $('#dispCase').html(rowscase);

    });

    $(document).ready(function () {
    $("select[name='ram']").click(function () {
        ram = parseInt(this.value);
        //alert(i);

    })
    })

    $(document).ready(function () {
    $("select[name='gpu']").click(function () {
        gpu = parseInt(this.value);
        //alert(j);

    })
    })

    $(document).ready(function () {
    $("select[name='cpu']").click(function () {
        cpu = parseInt(this.value);
        //alert(k);

    })
    })

    $(document).ready(function () {
    $("select[name='power']").click(function () {
        power = parseInt(this.value);
        //alert(k);

    })
    })

    $(document).ready(function () {
    $("select[name='mainboard']").click(function () {
        mainboard = parseInt(this.value);

    })
    })

    $(document).ready(function () {
    $("select[name='hdd']").click(function () {
        hdd = parseInt(this.value);

    })
    })
    $(document).ready(function () {
    $("select[name='case']").click(function () {
        casepc = parseInt(this.value);

    });
    });


    $(document).ready(function () {
    $("button[name='3']").click(function () {
        var tong = 0;
        tong = (ram + gpu + cpu + power + mainboard + hdd + casepc);
        var money = Format(tong.toString(), "");
        $('#dispTongtien').html("Tổng tiền là : " + money+ " VND");
    })
    });
})

function Format(Chuoi, result) {
    while (Chuoi.length > 3) {
        result = ',' + Chuoi.substr(Chuoi.length - 3, Chuoi.length - 1) + result;
        Chuoi = Chuoi.substr(0, Chuoi.length - 3);
    }
    result = Chuoi + result;
    return result;
}


