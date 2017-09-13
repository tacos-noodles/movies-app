/**
 * es6 modules and imports
 */
import sayHello from './hello';
import $ from "jquery";
sayHello('World');
import getLoadMsg from "./loading";



$(".container").text(`${getLoadMsg()}`);
/**
 * require style imports
 */
const getMovies = require('./getMovies.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  let movie = "";
  movies.forEach(({title, rating, id}) => {
     movie += (`id#${id} - ${title} - rating: ${rating}`);
  });

      $(".movieList").html('').append(movie);

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});


