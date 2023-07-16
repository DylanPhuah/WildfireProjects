// ==UserScript==
// @name         Table Injector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Dylan
// @match        http://127.0.0.1:3000/index.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Find the table element
    var table = document.querySelector('table');

    // Find the row containing 'Data 1'
    var rows = table.getElementsByTagName('tr');
    var targetRow;
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        for (var j = 0; j < cells.length; j++) {
            if (cells[j].textContent.trim() === 'Data 4') {
                targetRow = rows[i];
                break;
            }
        }
        if (targetRow) {
            break;
        }
    }
    function openWebpage(url) {
        window.open(url, '_blank');
    }


    if (targetRow) {
        var linkedText = targetRow.querySelector('td:nth-child(2)').textContent.trim();
        // Create a button element
        var button = document.createElement('button');
        button.textContent = 'Click Me';

        // Add an event listener to the button
        button.addEventListener('click', function() {
            var webpageUrl = 'https://www.' + linkedText + '.com'; // Replace with your desired webpage URL
            console.log(webpageUrl);
            openWebpage(webpageUrl);
        });

        // Insert the button next to the 'Data 1' cell
        var cell = targetRow.querySelector('td');
        cell.appendChild(button);
    }
})();