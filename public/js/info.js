let suggestionContainerEl = document.querySelector('#suggestion-container');

// Run when a suggestion is clicked on
let suggestionSelect = function(evt) {
    let current = evt.target;
    if (current.id !== 'suggestion-container') { //Ensure a suggestion is clicked on
        search(current.textContent);
    }
};

suggestionContainerEl.addEventListener('click', suggestionSelect);