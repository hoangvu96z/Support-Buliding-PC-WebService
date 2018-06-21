$(document).ready(function ()
{
    $("#Giatien").keyup(function () {
        this.value = PriceFormat(this);
    });
})

function chonloai() {

    var ch1 = "";
    var ch2 = "";
    var rowsct = "";
    var chtt = "";
    $.getJSON(('/api/PhanMem/' + document.getElementById('nhapnhucau').value), function (data) {

        $.each(data, function (key, val) {
            //WriteResponse(val);
            ch1 = val.CHToiThieu;

            rowsct += '<option value=' + val.CHToiThieu + ' data-KK=' + val.CHKhuyenNghi + ' >' + val.TenPM + '</option>';
        });
        $('#dispten').html(rowsct);
        document.getElementById("hienthikhac1").innerHTML = "";
        document.getElementById("hienthikhac2").innerHTML = "";
        document.getElementById("hienthikhac3").innerHTML = "";
        document.getElementById("hienthikhac4").innerHTML = "";
        document.getElementById("hienthikhac5").innerHTML = "";
        document.getElementById("hienthikhac6").innerHTML = "";
        document.getElementById("hienthikhac7").innerHTML = "";
        document.getElementById("hienthikhac8").innerHTML = "";
        document.getElementById("hienthikhac9").innerHTML = "";
        document.getElementById("hienthikhac10").innerHTML = "";
        document.getElementById("hienthikhac").innerHTML = "";
    });
}

function chongame() {
    var chon = document.getElementById("dispten").value;
    var Giatien = document.getElementById('Giatien').value;
    Giatien = Giatien.replace(/,/g, '');

    //lay data-priceconlai trong <option> gpu
    var sel = document.getElementById('dispten');
    var selected = sel.options[sel.selectedIndex];
    var MaCHKK = selected.getAttribute('data-KK');

    var result = "";
    var i = 1;
    var GiaCHTT = getGiaCH(chon);
    var GiaCHKK = getGiaCH(MaCHKK);
    if (Giatien < GiaCHTT) {
        alert("Bạn không đủ tiền để xây dựng PC cho nhu cầu này.");
    }
    else {
        if (Giatien > GiaCHKK)
            chon = MaCHKK;
        $.getJSON(('/api/calculate/' + Giatien + '/' + chon), function (data) {
            $.each(data, function (key, val) {
                var Name = new Array();
                Name = val.split('|');
                var Giaban = Format(Name[9].toString(), "");

                result += '<h2>Cấu hình ' + i + ':</h2><p>Mainboard:' + Name[2] + '</p><p>GPU:' + Name[0] + '</p><p>CPU:' + Name[1] + '</p><p>Ram:' + Name[3] + '</p><p>HDD:' + Name[5] + '</p><p>Nguồn:' + Name[7] + '</p><p>CasePC:' + Name[8] + '</p><p>Giá bán: ' + Giaban + '</p></br></br>';
                $('#hienthikhac').html(result);
                i++;
            });
        });
    }
}

function PriceFormat(obj)
{
    var Chuoi = obj.value;
    Chuoi = Chuoi.replace(/,/g,'');
    if (Chuoi.length > 3) {
        var Money = Format(Chuoi, '');
        return Money;
    }
    else
        return Chuoi;
    
}

function Format(Chuoi,result)
{
    while (Chuoi.length > 3) {
        result = ',' + Chuoi.substr(Chuoi.length - 3, Chuoi.length - 1) + result;
        Chuoi = Chuoi.substr(0, Chuoi.length - 3);
    }
    result = Chuoi + result;
    return result;
}

function Test() {
    var CH = {
        "MaGPU": document.getElementById("gpu").value,
        "MaCPU": document.getElementById("cpu").value,
        "MaMain": document.getElementById("main").value,
        "MaRam": document.getElementById("ram").value,
        "MaRam2": document.getElementById("ram2").value,
        "MaHDD": document.getElementById("hdd").value,
        "MaHDD2": document.getElementById("hdd2").value,
        "MaCase": document.getElementById("casepc").value,
        "MaNguon": document.getElementById("nguon").value,
    };
    $.ajax({
        type: 'POST',
        url: 'http://localhost:50895/api/calculate/postgia',
        data: JSON.stringify(CH),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        processData: true,
        success: function (data) {
            alert(data);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function temp(a) {
    alert(a);
}

function getGiaCH(MaCH) {
    var GiaCH;
    $.ajax({
        url: '/api/CauHinhPC/' + MaCH,
        async: false,
        dataType: 'json',
        success: function (json) {
            GiaCH = json.Giaban;
        }
    });
    return GiaCH; // has value of json.whatever
}









