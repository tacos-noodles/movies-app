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
        let tr= " ";
        movies.forEach(({title, rating, id}) => {
           movie +=
                (`<tr><td>id#${id}</td><td>${title}</td><td>${rating}</td><td><a href="#" class="editMovie">Edit</a></td><td>Delete</td></tr>`);
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
            data: $('form').serialize()
        }).then(initReq());
    });
});

$(function () {

    $('#btn').on('submit', function (e) {

        e.preventDefault();

        $.ajax({
            type: 'PATCH',
            url: '/api/movies',
            data: $('form').serialize(),
        }).then(initReq());
    });
});

$('.edit').click(function (event){
    event.preventDefault();
    console.log($(this).attr('href'));
})









