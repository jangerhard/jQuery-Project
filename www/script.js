$(document).on('pageinit', '#home', function() {
    var url = 'https://jquery-project-28037.firebaseio.com/.json';

    $.ajax({
        url: url,
        dataType: "json",
        async: true,
        success: function(result) {
            ajax.parseJSON(result);
        },
        error: function(request, error) {
            alert('Network error has occurred please try again!');
        }
    });
});

$(document).on('pagebeforeshow', '#headline', function() {
    $('#movie-data').empty();
    $('#scenario-title').empty();
    $.each(movieInfo.scenario, function(i, row) {
        if (row.name == movieInfo.name) {
            $('#scenario-title').append('<h3>' + row.name + '</h3>');
            $('#movie-data').append('<img src=' + row.image + '>');
            $('#movie-data').append('<li><div id="accordion"><h3>' + row.p1.english + '</h3><div><p>' + row.p1.french + '</p></div></div></li>');
            $('#movie-data').append('<li><div id="accordion"><h3>' + row.p2.english + '</h3><div><p>' + row.p2.french + '</p></div></div></li>');
            $('#movie-data').append('<li><div id="accordion"><h3>' + row.p3.english + '</h3><div><p>' + row.p3.french + '</p></div></div></li>');
            $('#movie-data').append('<li><div id="accordion"><h3>' + row.p4.english + '</h3><div><p>' + row.p4.french + '</p></div></div></li>');
            $('#movie-data').append('<li><div id="accordion"><h3>' + row.p5.english + '</h3><div><p>' + row.p5.french + '</p></div></div></li>');
            $('#movie-data').listview('refresh');
        }
    });
});

$(function() {
    $("#accordion").accordion({
        collapsible: true
    });
});

$(document).on('vclick', '#movie-list li a', function() {
    movieInfo.name = $(this).attr('data-id');
    $.mobile.changePage("#headline", {
        transition: "slide",
        changeHash: false
    });
});

var movieInfo = {
    name: null,
    scenario: null
}

var ajax = {
    parseJSON: function(result) {
        movieInfo.scenario = result.scenarios;
        $.each(result.scenarios, function(i, row) {
            console.log(JSON.stringify(row));
            $('#movie-list').append('<li><a href="" data-id="' + row.name + '"><img src= "' + row.image + '"><h3>' + row.name + '</h3></a></li>');
        });
        $('#movie-list').listview('refresh');
    }
}
