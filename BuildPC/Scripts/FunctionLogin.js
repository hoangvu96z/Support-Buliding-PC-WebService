//$('#btnlogin').click(function () {
//    var username = $('#username').val();
//    var password = $('#password').val();

//    alert(username);

//    $.ajax({
//        type: 'GET',
//        url: 'http://doancn.azurewebsites.net/api/user/login',
//        dataType: 'json',
//        headers: {
//            'Authorization': 'Basic' + username + ':' + password
//        },
//        success: function (data) {
//            $.each(data, function (key, val) {
//                var rows = '<p>Quyen truy cap cua ban la:' + val.PhanQuyen + '</p>';
//                $('result').html(rows);
//            });
//        },
//    });


//});

function Test()
{
    var username = document.getElementById('username').value;
    var password = $('#password').val();

    $.ajax
        ({
            type: "GET",
            url: "http://doancn.azurewebsites.net/api/user/login",
            dataType: 'json',
            async: false,
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },

            success: function (data)
            {
                //$('#result').html(data.PhanQuyen);
                if (data.PhanQuyen === 'PQ0001') {
                    document.location.href = 'http://doancn.azurewebsites.net/Home/Quanly';
                    document.getElementById("menu").children[6].style.display = "none";
                }
                if (data.PhanQuyen === 'PQ0003') {
                    document.location.href = 'http://doancn.azurewebsites.net/Home';
                    document.getElementById("menu").children[6].style.display = "none";
                }
                
            },
            //error: function (jqXHR) {
            //    if (jqXHR.status == 401)
            //        alert("Bạn nhập sai tên đăng nhập hoặc mật khẩu.");
            //},
            complete: function (jqXHR)
            {
                if (jqXHR.status == '401')
                    $('#result').html('<p>Sai Username hay Password!</>')
            },
        });
}





