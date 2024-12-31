// Get the buttons and divs that will be used to change the style of the page
const button_latest = document.getElementById('button_latest');
const button_summary = document.getElementById('button_summary');
const show_latest_long = document.getElementById('show_latest_long');
const show_latest_short = document.getElementById('show_latest_short');
// Get all the divs that will be shown or hidden
const latest_short = document.querySelectorAll('.latest-short');
const latest_long = document.querySelectorAll('.latest-long');
const summary_info = document.querySelectorAll('.summary-info');
const latest_short_button = document.querySelectorAll('.latest-short-button');
const latest_long_button = document.querySelectorAll('.latest-long-button');

// When the 'Latest Votes' button is pressed, only short latest votes should be shown, and the 'Show More' button
button_latest.addEventListener('click', () => {
    // Add or remove classes to change the style of the buttons active/inactive is shading
    button_latest.classList.add('active');
    button_latest.classList.remove('inactive');
    button_summary.classList.remove('active');
    button_summary.classList.add('inactive');

    // Add or remove classes to change the style of the divs (makes them visible or not)
    for (const div of latest_short) {
        div.classList.add('active');
    }
    for (const div of latest_long) {
        div.classList.remove('active');
    }
    for (const div of latest_short_button) {
        div.classList.add('active');
    }
    for (const div of summary_info) {
        div.classList.remove('active');
    }

});

// What happens when the 'Summary' button is pressed
button_summary.addEventListener('click', () => {
    // Change the shading of the top two buttons to show selection
    button_summary.classList.add('active');
    button_summary.classList.remove('inactive');
    button_latest.classList.remove('active');
    button_latest.classList.add('inactive');

    // Show the summary info
    for (const div of summary_info) {
        div.classList.add('active');
    }
    // Hide the latest votes
    for (const div of latest_short) {
        div.classList.remove('active');
    }
    // Hide all votes, in case they are shown
    for (const div of latest_long) {
        div.classList.remove('active');
    }
    // Hide show more and show less buttons
    for (const div of latest_short_button) {
        div.classList.remove('active');
    }
    for (const div of latest_long_button) {
        div.classList.remove('active');
    }
});

// When the 'Show More' button is pressed, show the long latest votes
show_latest_long.addEventListener('click', () => {
    // Hide show more button
    for (const div of latest_short_button) {
        div.classList.remove('active');
    }
    // Show show less button
    for (const div of latest_long_button) {
        div.classList.add('active');
    }
    // Show long latest votes
    for (const div of latest_long) {
        div.classList.add('active');
    }

});

// When the 'Show Less' button is pressed, show the short latest votes
show_latest_short.addEventListener('click', () => {
    // Hide show less button
    for (const div of latest_long_button) {
        div.classList.remove('active');
    }
    // Show show more button
    for (const div of latest_short_button) {
        div.classList.add('active');
    }
    // Show short latest votes
    for (const div of latest_long) {
        div.classList.remove('active');
    }
});

// Scripts for the language and help tabs

document.getElementById('help-icon').addEventListener('click', function (event) {
    event.preventDefault();
    var helpTab = document.getElementById('help-tab');
    if (helpTab.style.display === 'none' || helpTab.style.display === '') {
        helpTab.style.display = 'block';
    } else {
        helpTab.style.display = 'none';
    }
});

document.addEventListener('click', function (event) {
    var helpTab = document.getElementById('help-tab');
    var helpIcon = document.getElementById('help-icon');
    var langTab = document.getElementById('lang-tab');
    var langIcon = document.getElementById('lang-icon');
    var ppTab = document.getElementById('pp-tab');
    var ppLink = document.getElementById('privacy-policy-link');
    if (helpTab.style.display === 'block' && !helpTab.contains(event.target) && !helpIcon.contains(event.target)) {
        helpTab.style.display = 'none';
    }
    if (langTab.style.display === 'block' && !langTab.contains(event.target) && !langIcon.contains(event.target)) {
        langTab.style.display = 'none';
    }
    if (ppTab.style.display === 'block' && !ppTab.contains(event.target) && !ppLink.contains(event.target)) {
        ppTab.style.display = 'none';
}
});

document.getElementById('lang-icon').addEventListener('click', function (event) {
    var langTab = document.getElementById('lang-tab');
    if (langTab.style.display === 'none' || langTab.style.display === '') {
        langTab.style.display = 'block';
    } else {
        langTab.style.display = 'none';
    }
});

// Privacy policy tab
document.getElementById('privacy-policy-link').addEventListener('click', function (event) {
    var langTab = document.getElementById('pp-tab');
    if (langTab.style.display === 'none' || langTab.style.display === '') {
        langTab.style.display = 'block';
    } else {
        langTab.style.display = 'none';
    }
});

// Function to convert a string to title case
function capitalizeWords(str) {
    return str.toLowerCase().replace(/\b\w/g, function (char, index, string) {
        if (index > 0 && string[index - 1] === "'") {
            return char.toLowerCase();
        }
        return char.toUpperCase();
    });
}

// Scripts for hovering over a country grid in the Summary
document.addEventListener('DOMContentLoaded', function () {

    // Function to get text content of all <a> tags within divs of a specific class
    function getTextContentByClass(className) {
        const elements = document.querySelectorAll(`.${className} a`);
        const textContents = [];

        elements.forEach(element => {
            textContents.push(element.textContent);
        });

        return textContents;
    }

    const gridItems = document.querySelectorAll('.grid-item');
    const infoPanel = document.getElementById('info-panel');
    const infoText = document.getElementById('info-text');

    let permanentDisplay = false;

    function updateInfoPanel(item) {
        const countryName = item.getAttribute('country-name');
        const acc = parseInt(item.getAttribute('acc'), 10);
        const no = parseInt(item.getAttribute('no'), 10);
        const abst = parseInt(item.getAttribute('abst'), 10);
        const dv = parseInt(item.getAttribute('dv'), 10);
        const all = acc + no + abst + dv;

        const accPercent = (100 * acc / all).toFixed(2);
        const noPercent = (100 * no / all).toFixed(2);
        const abstPercent = Math.floor((100 * abst / all) * 100) / 100;
        const dvPercent = 100 - accPercent - noPercent - abstPercent;

        infoText.innerHTML = `
            <span class="summary-name">${capitalizeWords(countryName)}</span>
            <div class="bar-chart">
            <div class="bar_summary" data-value="${acc} acceptances" ; style="width: ${accPercent}%; background-color: #31CB00;"></div>
            <div class="bar_summary" data-value="${no} votes no"; style="width: ${noPercent}%; background-color: #D81159;"></div>
            <div class="bar_summary" data-value="${abst} abstentions" ; style="width: ${abstPercent}%; background-color: #009EDB;"></div>
            <div class="bar_summary" data-value="didn't vote ${dv} times" ; style="width: ${dvPercent}%; background-color: darkslategrey;"></div>
            </div>`;
        infoPanel.style.display = 'block';

        // Now update the list of resolutions and their order
        // const textContentsShort = getTextContentByClass('latest-short');
        // const textContentsLong = getTextContentByClass('latest-long');
        // const textContents = textContentsShort.concat(textContentsLong);
        const textContents = record_titles
        const resList = document.getElementById('res-list');

        // Combine textContents and the list of the country's votes into an array of objects
        // Update country name to the variable version by replacing spaces with underscores and removing any other punctuation, but keeping any accented characters as they are
        const modifiedCountryName = countryName.normalize('NFD').replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, '_');
        console.log(modifiedCountryName);
        let selectedArray = countryArrays[modifiedCountryName];
        console.log(selectedArray);
        const combinedArray = textContents.map((text, index) => {
            return { text: text, value: selectedArray[index] };
        });

        // Clear any existing content in the res-list
        resList.innerHTML = '';

        // Create arrays to hold list items for each value
        const acceptedItems = [];
        const rejectedItems = [];
        const abstainedItems = [];
        const didntVoteItems = [];

        // Loop through the combinedArray and add items to the respective arrays
        combinedArray.forEach((item, index) => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = record_links[index];
            link.target = '_blank';
            // Set bullet colour
            listItem.style.color = item.value === 1 ? '#31CB00' : item.value === 0 ? '#D81159' : item.value === 2 ? '#009EDB' : 'darkslategrey';
            link.classList.add('member-state');
            link.textContent = item.text;
            listItem.appendChild(link);

            if (item.value === 1) {
                acceptedItems.push(listItem);
            } else if (item.value === 0) {
                rejectedItems.push(listItem);
            } else if (item.value === 2) {
                abstainedItems.push(listItem);
            } else if (item.value === 3) {
                didntVoteItems.push(listItem);
            }
        });

        // Function to create and append line items
        function appendLineItem(text, color) {
            const lineItem = document.createElement('p');
            lineItem.innerHTML = `<p style="margin-top: 10pt; margin-bottom: 10pt; font-size: 16pt; text-decoration: underline; text-align: center; color: ${color};">${text}</p>`;
            resList.appendChild(lineItem);
        }

        // Append the items to the resList in the desired order
        if (acceptedItems.length > 0) {
            appendLineItem('Accepted', '#31CB00');
            acceptedItems.forEach(item => resList.appendChild(item));
        }
        if (rejectedItems.length > 0) {
            appendLineItem('Rejected', '#D81159');
            rejectedItems.forEach(item => resList.appendChild(item));
        }
        if (abstainedItems.length > 0) {
            appendLineItem('Abstained', '#009EDB');
            abstainedItems.forEach(item => resList.appendChild(item));
        }
        if (didntVoteItems.length > 0) {
            appendLineItem("Didn't Vote", 'darkslategrey');
            didntVoteItems.forEach(item => resList.appendChild(item));
        }
    }

    gridItems.forEach(item => {
        item.addEventListener('mouseover', function () {
            if (!permanentDisplay) {
                updateInfoPanel(item);
            }
        });

        item.addEventListener('click', function () {
            permanentDisplay = true;
            updateInfoPanel(item);
        });
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.summary-info')) {
            permanentDisplay = false;
            infoPanel.style.display = 'none';
        }
    });
});

// Script to display member state votes for a given resolution
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.drop-down-cl').forEach(function (svg) {
        svg.addEventListener('click', function () {
            let useElement = this.querySelector('use');
            let href = useElement.getAttribute('href');

            if (href === '#drop-down') {
                
                // Hide all other minitable divs
                document.querySelectorAll('.resolution-votes').forEach(function (div) {
                    div.style.display = 'none';
                });

                // Set all SVGs to #drop-down
                document.querySelectorAll('.drop-down-cl use').forEach(function (use) {
                    use.setAttribute('href', '#drop-down');
                });
                
                // Change href to #drop-up
                useElement.setAttribute('href', '#drop-up');

                // Show the next minitable div
                let nextDiv = this.parentElement.nextElementSibling;
                if (nextDiv && nextDiv.classList.contains('resolution-votes')) {
                    nextDiv.style.display = 'block';
                }
            } else if (href === '#drop-up') {
                // Change href to #drop-down
                useElement.setAttribute('href', '#drop-down');

                // Hide all minitable divs
                document.querySelectorAll('.resolution-votes').forEach(function (div) {
                    div.style.display = 'none';
                });

                // Set all SVGs to #drop-down
                document.querySelectorAll('.drop-down-cl use').forEach(function (use) {
                    use.setAttribute('href', '#drop-down');
                });
            }
        });
    });
});

// Scripts for hovering over a country grid in the Summary
document.addEventListener('DOMContentLoaded', function () {

    const gridItems = document.querySelectorAll('.grid-item-resolution');
    const infoTextResolutions = document.querySelectorAll('#info-text-resolution');

    function updateInfoPanel(item) {
        const countryName = item.getAttribute('country-name');
        infoTextResolutions.forEach(infoTextResolution => {
            infoTextResolution.innerHTML = `<span class="summary-name-resolution">${capitalizeWords(countryName)}</span>`;
        });
    }

    function clearInfoPanel() {
        infoTextResolutions.forEach(infoTextResolution => {
            infoTextResolution.innerHTML = 'Member State Voting for this Resolution';
        });
    }

    gridItems.forEach(item => {
        item.addEventListener('mouseover', function () {
            updateInfoPanel(item);
        });
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.grid-item-resolution')) {
            clearInfoPanel();
        }
    });

});