// Initialize Firebase
var config = {
    apiKey: "AIzaSyCFoaziF96crxMBaVGiYUHdouDys_zXt8k",
    authDomain: "jquery-project-28037.firebaseapp.com",
    databaseURL: "https://jquery-project-28037.firebaseio.com",
    storageBucket: "jquery-project-28037.appspot.com",
    messagingSenderId: "980728597455"
};
firebase.initializeApp(config);

var dbRef = firebase.database().ref();

$(document).on('pageinit', '#home', function() {

    var welcomeText = document.getElementById('welcomeText');
    var footerText = document.getElementById('footerText');
    dbRef.on('value', snap => {
        welcomeText.innerText = snap.val().welcome;
        footerText.innerText = snap.val().footer;
    });
    
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
    $('#scenarioTitle').empty();
    $('#scenarioImage').empty();
    $('#q1_h').empty();
    $('#q1').empty();
    $('#q2_h').empty();
    $('#q2').empty();
    $('#q3_h').empty();
    $('#q3').empty();
    $('#q4_h').empty();
    $('#q4').empty();
    $('#q5_h').empty();
    $('#q5').empty();
    $.each(movieInfo.scenario, function(i, row) {
        if (row.name == movieInfo.name) {
            $('#scenarioTitle').append(row.name);
            $('#scenarioImage').append('<img src=' + row.image + '>');
            $('#q1_h').append(row.p1.english);
            $('#q1').append('<p>' + row.p1.french + '</p>');
            $('#q2_h').append(row.p2.english);
            $('#q2').append('<p>' + row.p2.french + '</p>');
            $('#q3_h').append(row.p3.english);
            $('#q3').append('<p>' + row.p3.french + '</p>');
            $('#q4_h').append(row.p4.english);
            $('#q4').append('<p>' + row.p4.french + '</p>');
            $('#q5_h').append(row.p5.english);
            $('#q5').append('<p>' + row.p5.french + '</p>');
        }
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
