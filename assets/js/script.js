// Movie DB API Key = 14b7c2e67f36427d72ce8c1df6482552
// Taste Dive API Key = 425677-LeithenC-NQBB975N

let searchFormEl = document.querySelector('#search-form');
let userInputEl = document.querySelector('#user-input');
let searchResultsModal = document.querySelector('#search-results-modal')
let searchResults = document.querySelector('#search-results');
let modalCloseEl = document.querySelector('#modal-close')
let selectedTitleEl = document.querySelector('#selected-title');
let selectedScoreEl = document.querySelector('#selected-score');
let selectedPosterEl = document.querySelector('#selected-poster');
let selectedPlotEl = document.querySelector('#selected-plot');
let selectedProvidersEl = document.querySelector('#selected-providers');
let selectedQueueEl = document.querySelector('#selected-queue');

let suggestionContainerEl = document.querySelector('#suggestion-container');

let input = '';
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
    input = (userInputEl.value);
    userInputEl.value = '';
    search(input);
}

let search = function(input) {
    // Find the movie and log the ID from MovieDB
    fetch('https://api.themoviedb.org/3/search/multi?api_key=14b7c2e67f36427d72ce8c1df6482552&query=' + input)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                console.log('Error');
            }
        })
        .then(function(data) {
            //debugger;
            try {
                console.log(data);
                removeAllChildNodes(searchResults);

                // ensure there are at least 10 shows
                let x = 0;
                if (data.results.length > 10) {
                    x = 10;
                } else {
                    x = data.results.length;
                }


                // iterate over movie database search results and display 20 results in search modal
                for (let i = 0; i < x; i++) {
                    var current = data.results[i]

                    // create elements for results to reside in
                    var resultEl = document.createElement('div');
                    resultEl.classList.add("is-flex", "is-align-items-center", "result");
                    var posterImg = document.createElement('img');
                    var titleSpan = document.createElement('p');
                    titleSpan.classList.add("is-size-4", "has-text-left", "currentTitle");
                    var showTypeEl = document.createElement('p');
                    showTypeEl.classList.add("has-text-left", "showType");
                    var showYear = document.createElement('span');
                    var titleIDSpan = document.createElement('span');
                    titleIDSpan.classList.add("titleID");


                    // set poster src for each search result if there is one, otherwise use placeholder
                    if (current.poster_path) {
                        posterImg.src = 'https://image.tmdb.org/t/p/w500' + current.poster_path;
                    } else {
                        posterImg.src = 'https://via.placeholder.com/500x750.png?text=Movie+Poster';
                    }

                    // if search result item is a 'MOVIE' type
                    if (current.title) {
                        // assign movie title, type, release year, and movie ID to variables


                        titleSpan.innerText = current.title;

                        showTypeEl.innerText = current.media_type;

                        if (current.release_date) { //Check if there is a release date
                            showYear.innerText = current.release_date.substring(0, 4) + " ID: ";
                        } else {
                            continue;
                        }
                        titleIDSpan.innerText = current.id;
                    } else { // search result item is 'TV' type


                        titleSpan.innerText = current.name;

                        showTypeEl.innerText = current.media_type;
                        titleIDSpan.innerText = current.id;
                        if (current.first_air_date) {
                            showYear.innerText = current.first_air_date.substring(0, 4) + " ID: "; //sometimes set to none
                        } else {
                            showYear.innerText = 'N/A ';
                        }
                    }
                    // append title, media type, release year, and ID variables to elements that were dynamically created above


                    resultEl.appendChild(posterImg);
                    resultEl.appendChild(titleSpan);
                    resultEl.appendChild(showTypeEl);
                    resultEl.appendChild(showYear);
                    resultEl.appendChild(titleIDSpan)
                    searchResults.appendChild(resultEl);
                    searchResultsModal.classList.add('is-active');

                }
            } catch {
                console.log('That search was invalid!');
            }
        })
}

//Function to close the modal when the X is clicked
let closeModal = function() {
    searchResultsModal.classList.remove('is-active');
}

//Function to run when a show option is clicked
let selected = function(evt) {
    let parent = evt.target.parentNode;
    let currentTitle = parent.querySelector('.currentTitle').textContent;

    if (parent.classList.contains('result')) {
        showID = parent.querySelector('.titleID').textContent;
        showType = parent.querySelector('.showType').textContent;
        console.log("Type: " + showType + " ID: " + showID);
        searchResultsModal.classList.remove('is-active');
        watchProviders(showType, showID);
        suggestions(currentTitle, showType);
    } else {
        console.log('Out')
    }
}

let suggestionSelect = function(evt) { // Run when a suggestion is clicked on
    let current = evt.target
    search(current.textContent)
}

let suggestions = function(currentTitle, currentType) {
    removeAllChildNodes(suggestionContainerEl);
    // Check if show or movie was searched for
    if (currentType === 'movie') {
        currentType = 'movies'
    } else {
        currentType = 'shows'
    }

    // Taste Dive API Request
    fetch('https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=' + currentTitle + '&type=' + currentType + '&limit=5&k=425677-LeithenC-C01G9X9L')
        .then(function(res) {
            return (res.json());
        })
        .then(function(data) {
            let current = data.Similar.Results;
            console.log(data.Similar);
            // Remove suggestions from last search

            if (current.length) {
                for (let i = 0; i < current.length; i++) {
                    let suggestionEl = document.createElement('div');
                    suggestionEl.innerText = current[i].Name;
                    suggestionContainerEl.appendChild(suggestionEl);
                }
            } else {
                let suggestionEl = document.createElement('div');
                suggestionEl.innerText = 'Sorry there are no suggestions for this title!';
                suggestionContainerEl.appendChild(suggestionEl);
            }
        })
        .catch(function(err) {
            let suggestionEl = document.createElement('div');
            suggestionEl.innerText = 'Sorry there are no suggestions for this title!';
            suggestionContainerEl.appendChild(suggestionEl);
        })
}

// Find the provider for searched title on MovieDB
function watchProviders(showType, showID) {
    removeAllChildNodes(searchResults);
    // fetch info for selected title
    fetch('https://api.themoviedb.org/3/' + showType + '/' + showID + '?api_key=14b7c2e67f36427d72ce8c1df6482552')
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                console.log('Error');
            }
        })
        .then(function(data) {
            try {
                var selectedTitleData = data;

                // fetch watch providers for selected title
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
                            // assign selected title, viewer rating, poster, plot, and wath providers to the page
                            // title
                            if (selectedTitleData.title) {
                                selectedTitleEl.innerText = selectedTitleData.title;
                            } else {
                                selectedTitleEl.innerText = selectedTitleData.name;
                            }

                            // viewer rating
                            selectedScoreEl.innerText = "Viewer Rating: " + selectedTitleData.vote_average + "/10";

                            // poster
                            if (selectedTitleData.poster_path) {
                                selectedPosterEl.src = 'https://image.tmdb.org/t/p/w500' + selectedTitleData.poster_path;
                            } else {
                                selectedPosterEl.src = 'https://via.placeholder.com/500x750.png?text=Movie+Poster';
                            }

                            // plot
                            selectedPlotEl.innerText = selectedTitleData.overview;

                            // watch providers
                            var providerData = data.results.US.flatrate;
                            removeAllChildNodes(selectedProvidersEl);
                            console.log(providerData);
                            for (let i = 0; i < providerData.length; i++) {
                                if (providerData.length >= 1) {
                                    var providerLogo = document.createElement('img');
                                    providerLogo.src = 'https://image.tmdb.org/t/p/original' + providerData[i].logo_path;
                                    providerLogo.alt = providerData[i].provider_name;
                                    selectedProvidersEl.appendChild(providerLogo);
                                }
                            }
                        } catch {
                            console.log('This show is not available to stream');
                        }
                    })
                    .catch(function(err) {
                        console.log('This show is not available to stream');
                    })
            } catch {
                console.log('error');
            }
        })
}

searchFormEl.addEventListener('submit', run); // Listen for submission of search form
searchResults.addEventListener('click', selected); // Listen for click of show option
suggestionContainerEl.addEventListener('click', suggestionSelect)
modalCloseEl.addEventListener('click', closeModal)