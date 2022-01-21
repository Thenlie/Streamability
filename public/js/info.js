let suggestionContainerEl = document.querySelector('#suggestion-container');
let logoutBtn = document.querySelector('#logout-btn');

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
    
}

if (logoutBtn) {logoutBtn.addEventListener('click', logout)};
suggestionContainerEl.addEventListener('click', suggestionSelect);