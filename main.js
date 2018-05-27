/*
    Step 1
*/
function generateNumbersArray(n) {
    const numbers = [];
    for (i=1; i<=n; i++) {
        numbers.push(i);
    }
    return numbers;
} 

// return number if divisible
function isDivider(number, divider) {
    return number % divider === 0;
}

function divisibilityCheckerFactory(x) {

    // using for loop
    /*
    function checkerFn(n) {
        let divisibles = [];
        for(i = 1; i <= n.length; i++) {
            if(i % x === 0) {
                divisibles.push(i);
            }
        }
        return divisibles;
    }

    return checkerFn;
    */

    // Same thing can be written using Arrow functions as well
    // Try to do it at your own
    function lookerFn(n) {
        if(Array.isArray(n)) {
            return n.filter(i => isDivider(i,x));
        } else {
            divisibles = [];
            for(i = 1; i <= n; i++) {
                if(isDivider(i,x)) {
                    divisibles.push(i);
                }
            }
            return divisibles;
        }
    }
    return lookerFn;
}

/*
    Following functions returns total numbers divided by each number out of divider
*/

function checkDivisibilityFor1to30() {
    let divisibles = [];
    dividers.map(divider => {
        let checkDivisibility = divisibilityCheckerFactory(divider);
        divisibles.push(checkDivisibility(numbers).length);
    });
    return divisibles;
}


const numbers = generateNumbersArray(1000);
const dividers = generateNumbersArray(30);

const checkDivisibilityBy3 = divisibilityCheckerFactory(3);
const checkDivisibilityBy10 = divisibilityCheckerFactory(10);
const checkDivisibilityBy21 = divisibilityCheckerFactory(21);



console.log("Numbers divisible by 3: ",checkDivisibilityBy3(numbers));
console.log("Amount of numbers divisible by 3: ",checkDivisibilityBy3(numbers).length);

console.log("Numbers divisible by 10: ",checkDivisibilityBy10(numbers));
console.log("Amount of numbers divisible by 10: ",checkDivisibilityBy10(numbers).length);

console.log("Numbers divisible by 21: ",checkDivisibilityBy21(numbers));
console.log("Amount of numbers divisible by 21: ",checkDivisibilityBy21(numbers).length);

console.log("Amount of numbers divisible by 1 to 30: ",checkDivisibilityFor1to30());


/*
    Step 2
*/

const movieContainer = document.querySelector('#allMovies ul');


function getAjaxData(url) {
    return new Promise((resolve, reject) => {
        // Create new ajax call with the js function called XMLHttpRequest
        const request = new XMLHttpRequest();
        request.addEventListener('load', function () {
            // This in here is our callback function
            // Check our server responsecode, 200 means ok, success: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes 
            if (this.status === 200) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject('error');
            }
        });

        request.addEventListener('error', function (error) {
            reject(error);
        });

        // initializes a request with an http method
        request.open("GET", url);
        // Sends the request 
        request.send();
    });
}

// function to Add Tag property
function setMovieTag(movie) {
    if(movie.rating >= 8.5) {
        movie.tag = "Excellent";
    }else if(movie.rating >=8) {
        movie.tag = "Very Good";
    }else {
        movie.tag = "Good";
    }
}

function setGoodMovieTag(movie) {
    if(movie.rating >= 8) { movie.tag = "Good" }    
}

 // Array filters items based on search criteria (query) 
function filterItems(movies, query) {
    return movies.filter(function(el) {
        return el.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
}

function createLi(items) {
    let moviesList = "";
    items.forEach(movie => {
        moviesList += `<li class="list-group-item">${movie.title}</li>`;
    });
    movieContainer.innerHTML = moviesList;
}

// function to list all movies on homepage
function renderMovies(movies) {
    const elemInput = document.querySelector('.user-input');
    let userInput = elemInput.value;
    const movieMatched = filterItems(movies, userInput);
    movieContainer.innerHTML = "";
    createLi(movieMatched);
}   

function getTimeOutPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

const timeOutPromise = getTimeOutPromise();
timeOutPromise
    .then(()=>{
        console.log("1 seconds has passed");
        return getAjaxData('https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json');
    })
    .then((movies) => {
        // 2.1  Set movie tag
        movies.filter(movie => setMovieTag(movie));

        // 2.2  List all movies on webpage
        createLi(movies);
        // 2.3 - show movies that matches user input
        btn.addEventListener('click', function() {
            renderMovies(movies);
        });

    })

