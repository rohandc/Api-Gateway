function api_function(type) {

    var url = "";
    var h1= "";
    switch (type) {
        case "Nasa":
            url = "/Api/Nasa";
            h1="Nasa";
            break;
        case "Twitter":
            url = "/Api/Twitter";
            h1="Twitter";
            break;
        default:
            url = "/Api/Imdb";
            h1="Imdb";
            break;
    }

    $.ajax({
        url: url,
        type: 'GET',
        dataType: "text",
        error: function (error) {
            console.log(error)
        },
        success: function (data) {

            data=JSON.parse(data);
             var p=  $('p');
             var h= $('h1');
             var ptext=JSON.stringify(data);
             p.html(ptext);
             h.html(h1);
             $('#View').html(' ')
            $('#View').html(h).html(p);

        }

    });

}