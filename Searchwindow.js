// ==UserScript==
// @name         Search Window
// @namespace    http://your-namespace.example/
// @version      1.0
// @description  Creates a search window in the top right corner of the screen with checkboxes to configure search links
// @author       Your Name
// @match      *://*/*
// @grant        GM_addStyle
// ==/UserScript==
(function() {
    'use strict';

    // Create a container div for the search window
    var container = document.createElement('div');
    container.id = 'searchWindow';

    // Create an input element for the search bar
    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';

    // Create a button element for search


    // Create a button element for minimizing the search bar
    var minimizeButton = document.createElement('button');
    minimizeButton.textContent = '-';
    minimizeButton.title = 'Minimize';

    // Append the search input, search button, and minimize button to the container
    container.appendChild(searchInput);
    container.appendChild(minimizeButton);

    // Create checkboxes for configuring search links
    var youtubeCheckbox = createCheckbox('YouTube', 'youtubeCheckbox');
    var googleCheckbox = createCheckbox('Google', 'googleCheckbox');
    var wikipediaCheckbox = createCheckbox('Wikipedia', 'wikipediaCheckbox');

    // Append the checkboxes to the container
    container.appendChild(youtubeCheckbox);
    container.appendChild(googleCheckbox);
    container.appendChild(wikipediaCheckbox);

    // Add an event listener to the search button

    // Add an event listener to the minimize button
    minimizeButton.addEventListener('click', function() {
        container.classList.toggle('minimized');
    });

    // Add an event listener to the search input for Enter key press
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Function to perform the search based on configured checkboxes
    function performSearch() {
        var searchQuery = searchInput.value.trim();
        if (searchQuery !== '') {
            var searchUrls = [];

            if (youtubeCheckbox.querySelector('input').checked) {
                var youtubeSearchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(searchQuery);
                searchUrls.push(youtubeSearchUrl);
            }

            if (googleCheckbox.querySelector('input').checked) {
                var googleSearchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery);
                searchUrls.push(googleSearchUrl);
            }

            if (wikipediaCheckbox.querySelector('input').checked) {
                var wikipediaSearchUrl = 'https://en.wikipedia.org/wiki/Special:Search?search=' + encodeURIComponent(searchQuery);
                searchUrls.push(wikipediaSearchUrl);
            }

            if (searchUrls.length > 0) {
                searchUrls.forEach(function(url) {
                    window.open(url, '_blank');
                });
            }

            searchInput.value = '';
            searchInput.focus();
        }
    }

    // Helper function to create a checkbox with a label
    function createCheckbox(labelText, id) {
        var label = document.createElement('label');
        label.innerHTML = labelText;

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;

        label.appendChild(checkbox);

        return label;
    }

    // Add CSS styles to position the search window
    GM_addStyle(`
        #searchWindow {
            position: fixed;
            bottom: 10px;
            right: 10px;
            padding: 10px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            transition: height 0.3s;
            overflow: hidden;
        }
        #searchWindow.minimized {
            height: 15px;
        }
        #searchWindow input[type="text"] {
            width: 200px;
            padding: 6px;
            border: 1px solid #ccc;
            border-radius: 4px;
            transition: width 0.3s;
        }
        #searchWindow.minimized input[type="text"] {
            width: 0;
            padding: 0;
            border: none;
        }
        #searchWindow button {
            padding: 6px 12px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 5px;
        }
        #searchWindow label {
            display: block;
            margin-bottom: 5px;
        }
    `);

    // Append the search window container to the body of the document
    document.body.appendChild(container);
})();
