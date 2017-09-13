/**
 * es6 modules and imports
 */
import sayHello from './hello';
import $ from "jquery";
sayHello('World');
import getLoadMsg from "./loading";



$("body").html(`<span class="load"><h1>${getLoadMsg()}</h1></span>`);
/**
 * require style imports
 */
const getMovies = require('./getMovies.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
      $("body").html(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});


