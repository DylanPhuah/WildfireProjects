// ==UserScript==
// @name         Wildfire RMA SKU Link Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Inserts a link to the product pages of items on an RMA
// @author       Dylan Phuah
// @match        *://www.wildfiresports.com.au/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create the YouTube link button
    function createLinkURLWFS(element) {
        const value = element.value;
        return `https://www.wildfiresports.com.au/_cpanel/products/view?sku=${value}`;
    }
    function createLinkURLUnleashed(element) {
        const value = element.value;
        return `https://au.unleashedsoftware.com/v2/Product/List#ProductFilter=${value}`;
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Button for unleashed links from RMAs
    // Function to create and insert the button for a given input element
    function createUnleashedButton(inputElement) {
        const value = inputElement.value;
        if (!value) {
            return; // Exit if the input value is empty
        }

        const button = document.createElement('a');
        button.href = createLinkURLUnleashed(inputElement);
        button.target = '_blank';
        button.style.backgroundColor = '#FF0000';
        button.style.color = '#FFFFFF';
        button.style.fontWeight = 'bold';
        button.textContent = "U";

        inputElement.parentNode.insertBefore(button, inputElement);
    }

    // Wait for the page to load, then create the buttons for all elements
    window.addEventListener('load', function() {
        const skuInputs = document.querySelectorAll('.input-block-level.sku-input');
        skuInputs.forEach(function(inputElement) {
            createUnleashedButton(inputElement);
        });
    });


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Button for product links from RMAs
    // Function to create and insert the button for a given input element
    function createButtonForElement(inputElement) {
        const value = inputElement.value;
        if (!value) {
            return; // Exit if the input value is empty
        }

        const button = document.createElement('a');
        button.href = createLinkURLWFS(inputElement);
        button.target = '_blank';
        button.style.backgroundColor = 'blue';
        button.style.color = '#FFFFFF';
        button.style.fontWeight = 'bold';
        button.textContent = "#";

        inputElement.parentNode.insertBefore(button, inputElement);
    }

    // Wait for the page to load, then create the buttons for all elements
    window.addEventListener('load', function() {
        const skuInputs = document.querySelectorAll('.input-block-level.sku-input');
        skuInputs.forEach(function(inputElement) {
            createButtonForElement(inputElement);
        });
    });


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function createLinkButtonForSecondReqds() {
        const reqdsElements = document.querySelectorAll('.reqds');
        let targetElement;

        // Loop through the reqds elements to find the second instance
        let count = 0;
        for (const element of reqdsElements) {
            count++;
            if (count === 2) {
                targetElement = element;
                break;
            }
        }

        if (!targetElement) {
            return; // Exit if the second reqds class is not found
        }

        const value = targetElement.textContent.trim();
        if (!value) {
            return; // Exit if the element content is empty
        }

        const button = document.createElement('a');
        button.href = `https://www.ebay.com.au/mesh/ord/details?mode=SH&srn=${encodeURIComponent(value)}&orderid=${encodeURIComponent(value)}`;
        button.target = '_blank';
        button.style.backgroundColor = '#FF0000';
        button.style.color = '#FFFFFF';
        button.style.fontWeight = 'bold';
        button.textContent = 'eBay link';

        targetElement.parentNode.insertBefore(button, targetElement);
    }

    // Wait for the page to load, then create the link button
    window.addEventListener('load', createLinkButtonForSecondReqds);
})();
   // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~








//Additional proposed buttons:
//On order pages, should have link to SKU as well
