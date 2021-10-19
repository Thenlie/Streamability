// Movie DB API Key = 14b7c2e67f36427d72ce8c1df6482552
// Taste Dive API Key = 425677-LeithenC-NQBB975N

let searchFormEl = document.querySelector('#search-form');
let userInputEl = document.querySelector('#user-input');
let searchResultsModal = document.querySelector('#search-results-modal')
let searchResults = document.querySelector('#search-results');

let selectedTitle = document.querySelector('#selected-title');
let sekectedScore = document.querySelector('#selected-score');
let selectedPoster = document.querySelector('#selected-poster');
let selectedPlot = document.querySelector('#selected-plot');
let selectedProviders = document.querySelector('#selected-providers');
let selectedQueue = document.querySelector('#selected-queue');

let suggestionContainerEl = document.querySelector('#suggestion-container')

let showID = '';
let showType = '';

// reset modal upon user entering new search
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let run = function(event) {
    event.preventDefault();
    let search = (userInputEl.value);
    userInputEl.value = '';

    // Find the movie and log the ID from MovieDB
    fetch('https://api.themoviedb.org/3/search/multi?api_key=14b7c2e67f36427d72ce8c1df6482552&query=' + search)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                console.log('Error');
            }
        })
        .then(function(data) {
            try {
                removeAllChildNodes(searchResults)

                // ensure there are at least 10 shows
                let x = 0
                if (data.results.length > 10) {
                    x = 10
                } else {
                    x = data.results.length
                }


                // iterate over movie database search results and display 20 results in search modal
                for (let i = 0; i < x; i++) {
                    var current = data.results[i]

                    // create elements for results to reside in
                    var resultEl = document.createElement('div');
                    resultEl.classList.add("result");
                    var posterImg = document.createElement('img');
                    var titleSpan = document.createElement('span');
                    titleSpan.classList.add("currentTitle");
                    var showTypeEl = document.createElement('span');
                    showTypeEl.classList.add("currentType")
                    var showYear = document.createElement('span');
                    var titleIDSpan = document.createElement('span');

                    titleIDSpan.classList.add("titleID");
                    showTypeEl.classList.add("showType");

                    // set poster src for each search result if there is one, otherwise use placeholder
                    if (current.poster_path) {
                        posterImg.src = 'https://image.tmdb.org/t/p/w500' + current.poster_path;
                    } else {
                        posterImg.src = 'https://via.placeholder.com/500x750.png?text=Movie+Poster';
                    }

                    // if search result item is a 'MOVIE' type
                    if (current.title) {
                        // assign movie title, type, release year, and movie ID to variables


                        titleSpan.innerHTML = current.title;

                        showTypeEl.innerHTML = current.media_type;

                        if (current.release_date) { //Check if there is a release date
                            showYear.innerHTML = current.release_date.substring(0, 4) + " ID: ";
                        } else {
                            continue;
                        }
                        titleIDSpan.innerHTML = current.id;
                    } else { // search result item is 'TV' type


                        titleSpan.innerHTML = current.name;

                        showTypeEl.innerHTML = current.media_type;
                        titleIDSpan.innerHTML = current.id;
                        if (current.first_air_date) {
                            showYear.innerHTML = current.first_air_date.substring(0, 4) + " ID: "; //sometimes set to none
                        } else {
                            showYear.innerHTML = 'N/A '
                        }
                    }
                    // append title, media type, release year, and ID variables to elements that were dynamically created above


                    resultEl.appendChild(posterImg);
                    resultEl.appendChild(titleSpan);
                    resultEl.appendChild(showTypeEl);
                    resultEl.appendChild(showYear);
                    resultEl.appendChild(titleIDSpan)
                    searchResults.appendChild(resultEl);

                }
            } catch {
                console.log('That search was invalid!');
            }
        })
}

//Function to run when a show option is clicked
let selected = function(evt) {
    let parent = evt.target.parentNode
    let classes = parent.classList
    let currentID = parent.querySelector('.titleID').textContent
    let currentTitle = parent.querySelector('.currentTitle').textContent
    let currentType = parent.querySelector('.currentType').textContent
    if (classes.contains('result')) {

        //console.log('In')
        showID = parent.querySelector('.titleID').textContent;
        showType = parent.querySelector('.showType').textContent;
        console.log("Type: " + showType + " ID: " + showID);
        //create a function to display the movie info passing through the titleID
        watchProviders(showType, showID);

        suggestions(currentTitle, currentType);

    } else {
        console.log('Out')
    }
}

let suggestionSelect = function(evt) {
    let current = evt.target
    console.log(current.textContent)
}

let watchProviders = function(currentID) {
    console.log(currentID)
}

let suggestions = function(currentTitle, currentType) {
    console.log(currentTitle)
    console.log(currentType)

    if (currentType === 'movie') { // If user selects a Movie
        currentType = 'movies'
    } else { // If user selects a TV Show
        currentType = 'shows'
    }

    // Taste Dive API Request
    fetch('https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=' + currentTitle + '&type=' + currentType + '&limit=5&k=425677-LeithenC-C01G9X9L')
        .then(function(res) {
            return (res.json());
        })
        .then(function(data) {
            let current = data.Similar.Results
            console.log(current)
            removeAllChildNodes(suggestionContainerEl);

            if (current.length) {
                console.log('Hit')
                for (let i = 0; i < current.length; i++) {
                    let suggestionEl = document.createElement('div')
                    suggestionEl.innerHTML = current[i].Name
                    suggestionContainerEl.appendChild(suggestionEl);
                }
            } else {
                console.log('No suggestions :(')
            }
        })
        .catch(function(err) {
            console.log('Unfortunately there are no suggestions for that title');
        })
}

searchFormEl.addEventListener('submit', run); // Listen for submission of search form
searchResults.addEventListener('click', selected); // Listen for click of show option
suggestionContainerEl.addEventListener('click', suggestionSelect)


// Find the provider for searched title on MovieDB
function watchProviders(showType, showID) {
    fetch('https://api.themoviedb.org/3/' + showType + '/' + showID + '/watch/providers?api_key=14b7c2e67f36427d72ce8c1df6482552')
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                console.log('Error');
            }
        })
        .then(function(data) {
            try {
                console.log(data);
                for (let i = 0; i < providerData.length; i++) {
                    var providerData = data.results.US.flatrate[i]
                }
            } catch {
                console.log('This show is not available to stream');
            }
        })
        .catch(function(err) {
            console.log('This show is not available to stream');
        })
}