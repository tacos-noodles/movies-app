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
//init req for getMovies. this is our first ajax call
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
//here we call the function
initReq();
// this is our function to post the input data to our database (db.json) and a we recall initReq() to post our new list
$(function () {

    $('#add').on('submit', function (e) {
        e.preventDefault();
        fetch("/api/movies", {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "title": document.getElementById('title').value,
                "rating": document.getElementById('rating').value
            })
        }).then(initReq());
    });
});

$(function () {

    $('#update').on('submit', function (e) {
        e.preventDefault();
        let id = document.getElementById('id').value;

        fetch(`/api/movies/${id}`, {

            headers: {
                "content-type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify({
                "title": document.getElementById('titleTwo').value,
                "rating": document.getElementById('ratingTwo').value
            })
        }).then(initReq());
    })
});

$('#movieList').delegate(".editMovie", 'click', function(e){
    e.preventDefault();
    $('#id').val($(e.target).parent().parent().find('td').eq(0).text());
    $('#titleTwo').val($(e.target).parent().parent().find('td').eq(1).text());
    $('#ratingTwo').val($(e.target).parent().parent().find('td').eq(2).text());
});










