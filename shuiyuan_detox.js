// ==UserScript==
// @name         Restrict Shuiyuan SJTU Access by Topic Numbers
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Restrict access to only specific topics on shuiyuan.sjtu.edu.cn, replace other content with a learning hint, and display titles of allowed topics. Dynamically handles URL changes. URLs containing an allowed topic number are considered available.
// @author       Your Name
// @match        https://shuiyuan.sjtu.edu.cn/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
    'use strict';

    // List of allowed topic numbers
    const allowedTopics = [
        346090,
    ];

    // Function to fetch the title of a given URL
    function fetchTitle(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function (response) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, "text/html");
                    const title = doc.querySelector("title").innerText;
                    resolve(title);
                },
                onerror: function (error) {
                    reject(error);
                }
            });
        });
    }

    // Function to generate the forbidden page content
    function generateForbiddenPage(allowedTopicsWithTitles = []) {
        const allowedList = allowedTopicsWithTitles.map(result => `<li><a href="https://shuiyuan.sjtu.edu.cn/t/topic/${result.topic}">${result.title}</a></li>`).join('');
        return `
            <div style="text-align: center; margin-top: 50px; font-family: Arial, sans-serif;">
                <h1>Access Restricted</h1>
                <p>This page is not accessible. Please continue to learn about databases to enhance your knowledge.</p>
                ${allowedTopicsWithTitles.length > 0 ? `<p>You can visit one of the following allowed topics:</p>
                <ul style="list-style-type: none; padding: 0;">
                    ${allowedList}
                </ul>` : `<p>Error fetching allowed topics. Please try again later.</p>`}
            </div>
        `;
    }

    // Function to check if the current URL contains any allowed topic number
    function isTopicAllowed(currentURL) {
        return allowedTopics.some(topic => currentURL.includes(`/t/topic/${topic}`));
    }

    // Function to display the forbidden page
    function displayForbiddenPage() {
        Promise.all(allowedTopics.map(topic => {
            const url = `https://shuiyuan.sjtu.edu.cn/t/topic/${topic}`;
            return fetchTitle(url).then(title => ({ topic, title }));
        }))
            .then(results => {
                document.body.innerHTML = generateForbiddenPage(results);
            })
            .catch(error => {
                console.error("Error fetching titles:", error);
                document.body.innerHTML = generateForbiddenPage(); // Fallback to error message
            });
    }

    // Function to check the current URL and apply restrictions
    function checkAndRestrict() {
        const currentURL = window.location.href;

        // Check if the current URL contains any allowed topic number
        if (!isTopicAllowed(currentURL)) {
            displayForbiddenPage();
        }
    }

    // Initial check when the page loads
    checkAndRestrict();

    // Monitor URL changes
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    // Override history.pushState to detect URL changes
    history.pushState = function () {
        originalPushState.apply(history, arguments);
        checkAndRestrict();
    };

    // Override history.replaceState to detect URL changes
    history.replaceState = function () {
        originalReplaceState.apply(history, arguments);
        checkAndRestrict();
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', checkAndRestrict);
})();
