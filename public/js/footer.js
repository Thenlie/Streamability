let themeSelectEl = document.querySelector('#dropdown-content');

// Function to add the each theme's name as a class to the corresponding elements
function themeAdder(themeName) {
    try { document.querySelector('a').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#form-submit').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#search-form2').querySelector('#form-submit').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#queue-button').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#delete-all-queue').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#delete-all-queue2').classList.add(themeName);
    } catch { console.log('oh well')}

    // Add theme each queue box
    let queueDiv = document.getElementsByClassName('queueBox');
    for (let i = 0; i < queueDiv.length; i++) {
        queueDiv[i].classList.add(themeName);
    };
    // Add theme class to each delete button
    var deleteButtonEls = document.getElementsByClassName('delete-btn');
    for (let i = 0; i < deleteButtonEls.length; i++) {
        deleteButtonEls[i].classList.add(themeName);
    };
    try { document.querySelector('#header-logo').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#logo-image-2').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#user-input').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#user-input2').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#queue-header-1').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#queue-header-2').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#search-queue').classList.add(themeName);
    } catch { console.log('oh well')}
 

    try { document.querySelector('#search-queue2').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#suggestions-header').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#suggestion-container').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#modal-header').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#search-results').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#result-details').classList.add(themeName);
    } catch { console.log('oh well')}

    // Add theme class to each div in the result details container
    var resultDetailsDivs = document.getElementsByTagName('div');
    for (let i = 0; i < resultDetailsDivs.length; i++) {
        resultDetailsDivs[i].classList.add(themeName);
    };
    try { document.querySelector('#selected-title').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#selected-score').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#selected-plot').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#streamability-title').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.querySelector('#logo-text').classList.add(themeName);
    } catch { console.log('oh well')}

    try { document.body.classList.add(themeName);
    } catch { console.log('oh well')}

    // Save the theme to local storage so it's persistent
    localStorage.setItem('theme', themeName);
}


// Function to remove/reset theme
function themeRemover() {
    try { document.querySelector('a').classList.remove('tyler', 'solo-jazz', 'darkmode');
    }
    catch { console.log('oh well')}

    try { document.querySelector('#form-submit').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#search-form2').querySelector('#form-submit').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#queue-button').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#delete-all-queue').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#delete-all-queue2').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    var deleteButtonEls = document.getElementsByClassName('delete-btn');
    for (let i = 0; i < deleteButtonEls.length; i++) {
        deleteButtonEls[i].classList.remove('tyler', 'solo-jazz', 'darkmode');
    };
    try { document.querySelector('#header-logo').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#logo-image-2').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#user-input').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#user-input2').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#queue-header-1').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#queue-header-2').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#search-queue').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#search-queue2').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#suggestions-header').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#suggestion-container').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#modal-header').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#search-results').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#result-details').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    var resultDetailsDivs = document.getElementsByTagName('div');
    for (let i = 0; i < resultDetailsDivs.length; i++) {
        resultDetailsDivs[i].classList.remove('tyler', 'solo-jazz', 'darkmode');
    };
    try { document.querySelector('#selected-title').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#selected-score').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#selected-plot').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#streamability-title').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    try { document.querySelector('#logo-text').classList.remove('tyler', 'solo-jazz', 'darkmode');
    } catch { console.log('oh well')}

    document.body.classList.remove('tyler', 'solo-jazz', 'darkmode');
    // "Reset" the theme in local storage
    localStorage.setItem('theme', 'none');
}

// Function to load the theme from local storage
function getTheme() {
    let newTheme = localStorage.getItem('theme');
    if (newTheme != null) {
        theme = newTheme;
    } else {
        return;
    }
    themeAdder(theme);
}

let themeClickHandler = function(event) {
    themeRemover();
    let themeName = event.target.id;
    if (themeName === 'default' || themeName === 'dropdown-content') {
        themeRemover();
    } else {
        themeAdder(themeName);
    };
}

getTheme();

themeSelectEl.addEventListener('click', themeClickHandler); //Listens for a theme to be clicked