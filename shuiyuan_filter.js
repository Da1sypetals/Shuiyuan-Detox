// ==UserScript==
// @name         SJTU Shuiyuan Content Filter
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Filter content on shuiyuan.sjtu.edu.cn based on keywords and usernames
// @author       You
// @match        https://shuiyuan.sjtu.edu.cn/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ---------------------------------------------- Configurations ------------------------------------------------
    // Define keyword lists
    // #### Comment keywords
    const postStreamKeywords = ['学不完', '喝水', 'keyword3']; // Add your keywords here
    // #### Topic post keywords
    const topicListBodyKeywords = ['学不完', "异地", "新用户", "xhs", "帅哥", "情感", "知性感性", "日常"]; // Add your keywords here
    const tags = ["性", "pride", "涉政", "军事", "中国"]; // Add your keywords here

    // #### Define usernames to filter
    const blockedUsernames = []; // Add usernames to block here
    // const blockedUsernames = ['whisper_my_name', 'kubectl']; // Add usernames to block here
    // ----------------------------------------------------------------------------------------------------------------

    // Transform tags into /tag/X and tag-X formats
    const transformedTags = tags.flatMap(tag => [`/tag/${tag}`, `tag-${tag}`]);

    // Append transformed tags to topicListBodyKeywords
    topicListBodyKeywords.push(...transformedTags);




    // Function to check and remove elements based on keywords (case-insensitive for English)
    function filterElements(container, childSelector, keywords) {
        const children = container.querySelectorAll(childSelector);
        children.forEach(child => {
            const childHTML = child.outerHTML.toLowerCase(); // Convert to lowercase for case-insensitive matching
            if (keywords.some(keyword => childHTML.includes(keyword.toLowerCase()))) {
                child.remove();
            }
        });
    }

    // Function to filter posts by blocked usernames
    function filterPostsByUsername(container) {
        const posts = container.querySelectorAll('article[aria-label]');
        posts.forEach(post => {
            const ariaLabel = post.getAttribute('aria-label');
            const usernameMatch = ariaLabel.match(/@(\S+)/); // Extract username from aria-label
            if (usernameMatch && blockedUsernames.includes(usernameMatch[1])) {
                post.remove(); // Remove the post if the username is blocked
            }
        });
    }

    // Function to handle topic-title filtering and actions
    function handleTopicTitle() {
        const topicTitleDiv = document.querySelector('#topic-title');
        console.log(topicTitleDiv);
        if (topicTitleDiv) {
            const topicTitleHTML = topicTitleDiv.outerHTML.toLowerCase(); // Convert to lowercase for case-insensitive matching
            if (topicListBodyKeywords.some(keyword => topicTitleHTML.includes(keyword.toLowerCase()))) {
                // Attempt to go back to the previous page
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    // Attempt to close the tab
                    try {
                        window.close();
                    } catch (e) {
                        // If closing the tab fails, open a new empty tab
                        window.open('about:blank', '_blank');
                    }
                }
            }
        }
    }

    // Function to apply filters to the page
    function applyFilters() {
        const postStream = document.querySelector('.post-stream');
        const topicListBody = document.querySelector('.topic-list-body');

        if (postStream) {
            filterElements(postStream, 'div', postStreamKeywords); // Filter by keywords
            filterPostsByUsername(postStream); // Filter by usernames
        }

        if (topicListBody) {
            filterElements(topicListBody, 'tr', topicListBodyKeywords); // Filter by keywords
        }

        handleTopicTitle(); // Handle topic-title filtering and actions
    }

    // Function to observe DOM changes and reapply filters
    function observeDOMChanges() {
        const observer = new MutationObserver((mutations) => {
            // Check if new nodes are added to the DOM
            const hasNewContent = mutations.some(mutation => mutation.type === 'childList' && mutation.addedNodes.length > 0);
            if (hasNewContent) {
                applyFilters(); // Reapply filters when new content is added
            }
        });

        // Start observing the document body for changes
        observer.observe(document.body, {
            childList: true, // Observe direct children
            subtree: true, // Observe all descendants
        });
    }

    // Main logic
    applyFilters(); // Apply filters on initial page load
    observeDOMChanges(); // Start observing for dynamic content changes
})();
