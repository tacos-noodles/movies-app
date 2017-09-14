/**
 * es6 modules and imports
 */
import sayHello from './hello';
import $ from "jquery";
sayHello('World');
import getLoadMsg from "./loading";


$('#inputs').hide();
$("#load").text(`${getLoadMsg()}`);
$('.table').hide();

/**
 * require style imports
 */
const getMovies = require('./getMovies.js');

function initReq() {
    getMovies().then((movies) => {
        // console.log('Here are all the movies:');
        let movie = "";
        movies.forEach(({title, rating, id}) => {
           movie +=
                (`<tr><td>${id}</td><td>${title}</td><td>${rating}</td><td><div class="editMovie">Edit</div></td><td>Delete</td></tr>`);
        });

        $("#movieList").html('').append(movie);
        $('#inputs').show();
        $(".table").show();
        $('#load').hide();

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    })
}

initReq();

$(function () {

    $('form').on('submit', function (e) {

        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/api/movies',
            data: $('form').serialize(),
            success: function () {
                alert('form was submitted');
            }
        }).then(initReq());
    });
});

// fetch('/api/movies/', {
//     headers: {
//         "content-type": "application/json"
//     },
//     method: "POST",
//     body: JSON.stringify({param1, param2, ...})
// }).then( (response) => {
//     response.json();
// });






$(function () {

    $('#btn').on('edit', function (e) {

        e.preventDefault();

        $.ajax({
            type: 'PUT',
            url: '/api/movies',
            data: $('form').serialize(),
        }).then(initReq());
    });
});

$('#movieList').delegate(".editMovie", 'click', function(e){
    e.preventDefault();
    console.log('clicked');
    $('#id').val($(e.target).parent().parent().find('td').eq(0).text());
    $('#title').val($(e.target).parent().parent().find('td').eq(1).text());
    $('#rating').val($(e.target).parent().parent().find('td').eq(2).text());
});










