/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');
import getLoadMsg from "./loading";


$('#inputs').hide();
$('#myModalBtn').hide();
$('.table').hide();
$('#edit').hide();
$('#pagination').hide();

/**
 * require style imports
 */
const getMovies = require('./getMovies.js');
//init req for getMovies. this is our first ajax call
(function(){

    function initReq() {
        getMovies().then((movies) => {
            // console.log('Here are all the movies:');
            let movie = "";
            movies.forEach(({title, rating, id, genre}) => {
               movie +=
                    (`<tr><td>${id}</td><td>${title}</td><td>${rating}</td><td>${genre}</td><td><button type="button" class="editMovie" data-toggle="modal" data-target="#editModal">Edit</button></td><td><button class="delete" type="button">Delete</button></td></tr>`);
            });

            $("#movieList").html('').append(movie);
            $('#inputs').show();
            $(".table").show();
            $('#load').hide();
            $('#myModalBtn').show();
            $('#pagination').show();


        }).catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        })
    }

//here we call the function
initReq();

// this is our function to post the input data to our database (db.json) and a we recall initReq() to post our new list
function showEdit(){
    return  $('#edit').show();
}
    $('#add-movie-btn').click( function (e) {
        // $(this).show();
        e.preventDefault();
        fetch("/api/movies", {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "title": document.getElementById('title').value,
                "rating": document.getElementById('rating').value,
                "genre": document.getElementById('genre').value
            })
        }).then(() => {
            initReq();
            $("#myModal").modal("toggle");

        }).then(() =>{
            clearAdd();
        })
        // $('#myModal').modal('hide');
        // $(this).hide();
    });

    function clearAdd(){
        $('#title').val('');
        $('#rating').val('');
        $('#genre').val('');
        // document.getElementById('title').innerHTML.value();
        // document.getElementById('rating').innerHTML.value();

    }

    $('#update').on('submit', function (e) {
        e.preventDefault();
        let id = document.getElementById('id').value;
// we have to pass the value of the ID to target the db and modify it
        fetch(`/api/movies/${id}`, {

            headers: {
                "content-type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify({
                "title": document.getElementById('titleTwo').value,
                "rating": document.getElementById('ratingTwo').value,
                "genre": document.getElementById('genreTwo').value
            })
        }).then(() => {
            initReq();
        });
    });

    $('#movieList').delegate(".delete", 'click', function (e) {
        e.preventDefault();

        let id = e.target.parentElement.parentElement.children[0].innerHTML;//document.getElementById('id').value;
        fetch(`/api/movies/${id}`, {

            headers: {
                "content-type": "application/json"
            },
            method: 'DELETE',
            body: JSON.stringify({
                "id": id
            })
        }).then(() => {
            initReq();
        })
    });

$('#movieList').delegate(".editMovie", 'click', function(e){
    e.preventDefault();
    $('#edit').show();
    $('#id').val($(e.target).parent().parent().find('td').eq(0).text());
    $('#titleTwo').val($(e.target).parent().parent().find('td').eq(1).text());
    $('#ratingTwo').val($(e.target).parent().parent().find('td').eq(2).text());
    $('#genreTwo').val($(e.target).parent().parent().find('td').eq(3).text());

});
})();










