// Movie DB API Key = 14b7c2e67f36427d72ce8c1df6482552
// Taste Dive API Key = 425677-LeithenC-NQBB975N

let searchFormEl = document.querySelector('#search-form');
let userInputEl = document.querySelector('#user-input');
let searchFormEl2 = document.querySelector('#search-form2');
let userInputEl2 = document.querySelector('#user-input2');
let searchResultsModal = document.querySelector('#search-results-modal')
let searchResults = document.querySelector('#search-results');
let modalCloseEl = document.querySelector('#modal-close')
let modalBackgroundEl = document.querySelector(".modal-background");
let selectedTitleEl = document.querySelector('#selected-title');
let selectedScoreEl = document.querySelector('#selected-score');
let selectedPosterEl = document.querySelector('#selected-poster');
let selectedPlotEl = document.querySelector('#selected-plot');
let selectedProvidersEl = document.querySelector('#selected-providers');
let selectedQueueEl = document.querySelector('#selected-queue');
let landingPageEl = document.querySelector('#landing-page');
let suggestionContainerEl = document.querySelector('#suggestion-container');
let resultPageEl = document.querySelector('#result-page');
let detailsEl = document.querySelector('#result-details');
let logoEl = document.querySelector('#logo');

let input = '';
let showID = '';
let showType = '';

// reset modal upon user entering new search
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Capitalize first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let refresh = function() {
    location.reload();
}

let run = function(event) {
    event.preventDefault();
    input = (userInputEl.value);
    userInputEl.value = '';
    search(input);
}

let run2 = function(event) {
    event.preventDefault();
    input = (userInputEl2.value);
    userInputEl2.value = '';
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
            try {
                console.log(data);
                removeAllChildNodes(searchResults);

                // ensure there is at least 1 show and no more than 10
                let x = 0;
                if (data.results.length > 10) {
                    x = 10;
                    userInputEl.placeholder = "What're you lookin' for?";
                    userInputEl2.placeholder = "What're you lookin' for?";
                } else if (data.results.length > 0) {
                    x = data.results.length;
                    userInputEl.placeholder = "What're you lookin' for?";
                    userInputEl2.placeholder = "What're you lookin' for?";
                } else {
                    noResult();
                    return;
                }

                // iterate over movie database search results and display 20 results in search modal
                for (let i = 0; i < x; i++) {
                    var current = data.results[i]

                    // create elements for results to reside in
                    var resultEl = document.createElement('div');
                    resultEl.classList.add("is-flex", "is-align-items-center", "box", "p-0", "result");
                    var posterImg = document.createElement('img');
                    var resultTitleEl = document.createElement('div');
                    var titleSpanEl = document.createElement('p');
                    titleSpanEl.classList.add("is-size-4", "currentTitle");
                    var showTypeEl = document.createElement('span');
                    showTypeEl.classList.add("showType");
                    var spacerEl = document.createElement('span');
                    spacerEl.innerText = (' – ');
                    var showYear = document.createElement('span');
                    var titleIDSpan = document.createElement('span');
                    titleIDSpan.classList.add("is-hidden", "titleID");

                    // set poster src for each search result if there is one, otherwise use placeholder
                    if (current.poster_path) {
                        posterImg.src = 'https://image.tmdb.org/t/p/w500' + current.poster_path;
                    } else {
                        posterImg.src = 'https://via.placeholder.com/500x750.png?text=Movie+Poster';
                    }

                    // if search result item is a 'MOVIE' type
                    if (current.title) {
                        // assign movie title, type, release year, and movie ID to variables
                        titleSpanEl.innerText = current.title;
                        showTypeEl.innerText = capitalizeFirstLetter(current.media_type);
                        // showTypeEl.innerText = current.media_type;
                        if (current.release_date) { //Check if there is a release date
                            showYear.innerText = current.release_date.substring(0, 4);
                        } else {
                            continue;
                        }
                        titleIDSpan.innerText = current.id;
                    } else { // search result item is 'TV' type
                        titleSpanEl.innerText = current.name;
                        showTypeEl.innerText = current.media_type.toUpperCase();
                        // showTypeEl.innerText = current.media_type;
                        titleIDSpan.innerText = current.id;
                        if (current.first_air_date) {
                            showYear.innerText = current.first_air_date.substring(0, 4); //sometimes set to none
                        } else {
                            showYear.innerText = 'N/A ';
                        }
                    }
                    // append title, media type, release year, and ID variables to elements that were dynamically created above
                    resultEl.appendChild(posterImg);
                    resultTitleEl.appendChild(titleSpanEl);
                    resultTitleEl.appendChild(showTypeEl);
                    resultTitleEl.appendChild(spacerEl);
                    resultTitleEl.appendChild(showYear);
                    resultEl.appendChild(resultTitleEl);
                    resultEl.appendChild(titleIDSpan)
                    searchResults.appendChild(resultEl);
                    searchResultsModal.classList.add('is-active');
                }
            } catch {
                console.log('That search was invalid!');
            }
        })
}

noResult = function() {
    userInputEl.placeholder = 'Sorry, there are no results for this search!';
    userInputEl2.placeholder = 'Sorry, there are no results for this search!';
};

//close the modal when the X is clicked
let closeModal = function() {
    searchResultsModal.classList.remove('is-active');
}

//reads which option is clicked on
let selected = function(evt) {
    let current = evt.target;
    let parent = current.parentNode;
    let grandparent = parent.parentNode;

    if (current.classList.contains('result')) {
        runSelected(current)
    } else if (parent.classList.contains('result')) {
        runSelected(parent)
    } else if (grandparent.classList.contains('result')) {
        runSelected(grandparent)
    }
}

//takes target from selected function and sends that data to the rest of the functions
let runSelected = function(element) {
    showID = element.querySelector('.titleID').textContent;
    showType = element.querySelector('.showType').textContent.toLowerCase();
    searchResultsModal.classList.remove('is-active');
    let currentTitle = element.querySelector('.currentTitle').textContent;
    watchProviders(showType, showID);
    suggestions(currentTitle, showType);
    landingPageEl.classList.add('is-hidden');
    resultPageEl.classList.remove('is-hidden');
}

// Run when a suggestion is clicked on
let suggestionSelect = function(evt) {
    let current = evt.target;
    if (current.id !== 'suggestion-container') { //Ensure a suggestion is clicked on
        search(current.textContent);
    }
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
    fetch('https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=' + currentTitle + '&type=' + currentType + '&limit=5&info=1&k=425677-LeithenC-C01G9X9L')
        .then(function(res) {
            return (res.json());
        })
        .then(function(data) {
            let current = data.Similar.Results;
            if (current.length) { //if there are suggestions, display them
                for (let i = 0; i < current.length; i++) {
                    let suggestionEl = document.createElement('div');
                    suggestionEl.classList.add('p-2', 'box', 'button', 'is-rounded');
                    suggestionEl.innerText = current[i].Name;
                    suggestionContainerEl.appendChild(suggestionEl);
                }
            } else {
                noSuggestion();
            }
        })
        .catch(function() {
            noSuggestion();
        })
}

//runs when there are no show suggestions
let noSuggestion = function() {
    let suggestionEl = document.createElement('div');
    suggestionEl.classList.add('p-2');
    suggestionEl.innerText = 'Sorry there are no suggestions for this title!';
    suggestionContainerEl.appendChild(suggestionEl);
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
                                    var logoDiv = document.createElement('div');
                                    logoDiv.classList.add('column', 'is-2', 'has-text-centered');
                                    logoDiv.appendChild(providerLogo);
                                    selectedProvidersEl.appendChild(logoDiv);
                                }
                            }
                        } catch {
                            console.log('This show is not available to stream');
                            removeAllChildNodes(selectedProvidersEl);
                            var noProvidersP = document.createElement('p');
                            noProvidersP.innerText = "Sorry, there are no watch providers for this title.";
                            selectedProvidersEl.appendChild(noProvidersP);
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
searchFormEl2.addEventListener('submit', run2); // Listen for submission of search form 2
searchResults.addEventListener('click', selected); // Listen for click of show option
suggestionContainerEl.addEventListener('click', suggestionSelect); // Listen for click of a suggested show
modalCloseEl.addEventListener('click', closeModal); // Listen for click of modal close button
modalBackgroundEl.addEventListener('click', closeModal); // Listen for click on modal background
logoEl.addEventListener('click', refresh); //Refresh page when logo is clicked