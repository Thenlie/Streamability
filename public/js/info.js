let suggestionContainerEl = document.querySelector('#suggestion-container');
let logoutBtn = document.querySelector('#logout-btn');
let addToQueueBtn = document.querySelector('#queue-button');

// Run when a suggestion is clicked on
function suggestionSelect(evt) {
    let current = evt.target;
    if (current.id !== 'suggestion-container') { //Ensure a suggestion is clicked on
        search(current.textContent);
    }
};

async function logout(){
    const response = await fetch('/api/user/logout', {
        method: 'POST'
    })
    if (!response.ok) {
        console.log('error')
    } else {
        document.location.assign('/')
    }
    
};

async function addToQueue() {
    // showID showTitle showImg
    const showId = document.querySelector('#selected-id').textContent
    const showTitle = document.querySelector('#selected-title').textContent
    const showImg = document.querySelector('#selected-poster').src
    const response = await fetch('/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({showId: showId, showTitle: showTitle, showImg: showImg })
    })
    if (!response.ok) {
        console.log('error');
    } else {
        console.log('Added to queue!')
    }
};

if (logoutBtn) {logoutBtn.addEventListener('click', logout)};
suggestionContainerEl.addEventListener('click', suggestionSelect);
addToQueueBtn.addEventListener('click', addToQueue)