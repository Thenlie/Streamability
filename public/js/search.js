// Select elements so we can work with them
let userInputEl = document.querySelector('#user-input');
let searchFormEl = document.querySelector('#search-form');
let searchResultsModal = document.querySelector('#search-results-modal')
let searchResults = document.querySelector('#search-results');
let modalCloseEl = document.querySelector('#modal-close');
let modalBackgroundEl = document.querySelector(".modal-background");

// Reset modal upon user entering new search
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

// Capitalize first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let refresh = function() {
    location.reload();
}

let run = function(event) {
    event.preventDefault();
    userInputEl.classList.remove('no-user-input')
    current = (event.target[0].value);
    userInputEl.value = ''
    console.log(current)
    search(current);
};

// Function to search for a movie/show using user's input
let search = function(input) {
    // Find the movie and log the ID from MovieDB
    fetch('https://api.themoviedb.org/3/search/multi?api_key=14b7c2e67f36427d72ce8c1df6482552&query=' + input.toLowerCase())
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                noResult();
            }
        })
        .then(function(data) {
            // try {
                removeAllChildNodes(searchResults);

                // ensure there is at least 1 show and no more than 10
                let x = 0;
                if (data.results.length > 10) {
                    x = 10;
                    try {userInputEl.placeholder = "What're you lookin' for?"}
                    catch{ console.log('oh well')}
                    try {userInputEl2.placeholder = "What're you lookin' for?"}
                    catch{ console.log('oh well')}
                } else if (data.results.length > 0) {
                    x = data.results.length;
                    try {userInputEl.placeholder = "What're you lookin' for?"}
                    catch{ console.log('oh well')}
                    try {userInputEl2.placeholder = "What're you lookin' for?"}
                    catch{ console.log('oh well')}
                } else {
                    noResult();
                    return;
                }

                // iterate over movie database search results and display 20 results in search modal
                for (let i = 0; i < x; i++) {
                    var current = data.results[i]

                    // disallow people from displaying
                    if (current.media_type === 'person') {
                        continue;
                    }

                    // create elements for results to reside in
                    var resultEl = document.createElement('div');
                    getTheme();
                    resultEl.classList.add("is-flex", "is-align-items-center", "box", "p-0", "result", theme);
                    var posterImg = document.createElement('img');
                    var resultTitleEl = document.createElement('div');
                    var titleSpanEl = document.createElement('p');
                    titleSpanEl.classList.add("is-size-4", "currentTitle");
                    var showTypeEl = document.createElement('span');
                    showTypeEl.classList.add("showType");
                    var spacerEl = document.createElement('span');
                    spacerEl.innerText = (' – ');
                    var showYear = document.createElement('span');
                    showYear.classList.add('showYear')
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
                            showYear.innerText = 'N/A ';
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
            // } catch {
            //     noResult();
            // }
        })
};

// Use the placeholder to let users know their search returned no results
noResult = function() {
    userInputEl.classList.add('no-user-input');
    userInputEl.placeholder = 'Sorry, there are no results for this search!';
};

//Close the modal when the X is clicked
let closeModal = function() {
    searchResultsModal.classList.remove('is-active');
}

//Reads which option is clicked on
let selected = function(evt) {
    let current = evt.target;
    let parent = current.parentNode;
    let grandparent = parent.parentNode;
    if (current.classList.contains('result')) {
        runSelected(current);
    } else if (parent.classList.contains('result')) {
        runSelected(parent);
    } else if (grandparent.classList.contains('result')) {
        runSelected(grandparent);
    }
    themeAdder(theme);
};

//Takes target from selected function and sends that data to the rest of the functions
let runSelected = function(element) {
    showID = element.querySelector('.titleID').textContent;
    showType = element.querySelector('.showType').textContent.toLowerCase();
    showYear = element.querySelector('.showYear').textContent;
    searchResultsModal.classList.remove('is-active');
    let showTitle = element.querySelector('.currentTitle').textContent;
    document.location.assign(`/info/${showType}/${showTitle}/${showID}`);
}

// Event Listeners
searchFormEl.addEventListener('submit', run) 
searchResults.addEventListener('click', selected)
modalCloseEl.addEventListener('click', closeModal)
modalBackgroundEl.addEventListener('click', closeModal)