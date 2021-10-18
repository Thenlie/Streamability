// Movie DB API Key = 14b7c2e67f36427d72ce8c1df6482552
// Taste Dive API Key = 425677-LeithenC-NQBB975N

let searchFormEl = document.querySelector('#search-form');
let userInputEl = document.querySelector('#user-input');
let searchResults = document.querySelector('#search-results');
let showID = '';

let run = function(event) {
    event.preventDefault();
    let search = (userInputEl.value);

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
                console.log(data);
                // reset modal upon user entering new search
                function removeAllChildNodes(parent) {
                    while (parent.firstChild) {
                        parent.removeChild(parent.firstChild);
                    }
                }
                removeAllChildNodes(searchResults)
                // iterate over movie database search results and display 20 results in search modal
                for (let i = 0; i < 10; i++) {
                    // create elements for results to reside in
                    var resultDiv = document.createElement(`div`);
                    var posterImg = document.createElement(`img`);
                    var infoDiv = document.createElement(`div`);
                    var titleSpan = document.createElement(`span`);
                    var typeAndYearSpan = document.createElement(`span`);
                    var titleIDSpan = document.createElement(`span`);

                    // add class="result" to each element inside an individual search result for later use in event listener below
                    resultDiv.classList.add("result");
                    posterImg.classList.add("result");
                    infoDiv.classList.add("result");
                    titleSpan.classList.add("result");
                    typeAndYearSpan.classList.add("result");
                    titleIDSpan.classList.add("result");
                    titleIDSpan.classList.add("titleID");

                    // set poster src for each search result
                    posterImg.src = `https://image.tmdb.org/t/p/w500` + data.results[i].poster_path;

                    // if search result item is a 'movie' type
                    if (data.results[i].title) {
                        // assign movie title, type, release year, and movie ID to variables
                        var showTitle = document.createTextNode(data.results[i].title);
                        var showTypeAndYear = document.createTextNode(data.results[i].media_type + `, ` + data.results[i].release_date.substring(0, 4) + " ID: ");
                        var titleID = document.createTextNode(data.results[i].id);
                    } else {
                        // search result item type is 'tv'; assign tv title, type, release year, and tv ID to variables
                        var showTitle = document.createTextNode(data.results[i].name);
                        var showTypeAndYear = document.createTextNode(data.results[i].media_type + `, ` + data.results[i].first_air_date.substring(0, 4) + " ID: ");
                        var titleID = document.createTextNode(data.results[i].id);
                    }
                    // append title, media type, release year, and ID variables to elements that were dynamically created above
                    resultDiv.appendChild(posterImg);
                    resultDiv.appendChild(infoDiv)
                    infoDiv.appendChild(titleSpan);
                    infoDiv.appendChild(typeAndYearSpan);
                    infoDiv.appendChild(titleIDSpan)
                    titleSpan.appendChild(showTitle)
                    typeAndYearSpan.appendChild(showTypeAndYear);
                    titleIDSpan.appendChild(titleID);
                    searchResults.appendChild(resultDiv);
                }

                document.addEventListener('click',function(e){
                    if(e.target.classList == "result"){
                        alert("click");
                    }
                });
                
                showID = (data.results[0].id); // Set id to MovieDB ID
                console.log(data.results[0].original_title); // Log MovieDB official title
            } catch {
                console.log('That search was invalid!');
            }

            // Find the provider for searched Movie on MovieDB
            fetch('https://api.themoviedb.org/3/movie/' + showID + '/watch/providers?api_key=14b7c2e67f36427d72ce8c1df6482552&language=en-US')
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    } else {
                        alert('Error');
                    }
                })
                .then(function(data) {
                    try {
                        console.log('AVAILABLE TO STREAM ON: ' + data.results.US.flatrate[0].provider_name); // Log streaming provider
                    } catch {
                        console.log('This show is not available to stream');
                    }
                })
                .catch(function(err) {
                    console.log('This show is not available to stream');
                })
        })



    // Taste Dive API Request
    fetch('https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=' + search + '&k=425677-LeithenC-C01G9X9L')
        .then(function(res) {
            return (res.json());
        })
        .then(function(data) {
            console.log('---Suggestions---')
            for (i = 0; i < 5; i++) {
                console.log(data.Similar.Results[i].Name); // Log list of suggestions
            }
        })
        .catch(function(err) {
            console.log('Unfortunately there are no suggestions for that title');
        })
}

searchFormEl.addEventListener("submit", run); // List for submission of search form