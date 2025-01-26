// ==UserScript==
// @name         Shuiyuan BWList
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Filter content on shuiyuan.sjtu.edu.cn based on keywords, usernames, and tags
// @author       You
// @match        https://shuiyuan.sjtu.edu.cn/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ---------------------------------------------- Configurations ------------------------------------------------
    // Define keyword lists
    // #### Comment keywords (blacklist)
    const postStreamKeywords = ['学不完']; // Add your keywords here

    // #### Topic post keywords (whitelist and blacklist)
    const topicListBodyKeywordsWhitelist = ["数码", "科技", "科研", "硬件"]; // Whitelist keywords
    const topicListBodyKeywordsBlacklist = ['学不完', "异地", "新用户", "xhs", "美女", "帅哥", "情感", "知性感性", "日常", "深度讨论", "NSFW", "二刺猿", "二次元", "体育赛事",
        "游戏", "日记", "占卜", "绩点", "成绩", "考研", "发疯", "小仙女", "楠楠", "相约鹊桥", "交友"]; // Blacklist keywords

    // #### Define usernames to filter (blacklist)
    const blockedUsernames = []; // Add usernames to block here
    // const blockedUsernames = ['whisper_my_name', 'kubectl']; // Add usernames to block here

    // #### Select blacklist or whitelist mode for topicListBody
    const useBlackWhiteList = "black"; // Set to "black" to use blacklist mode for topicListBody, default is whitelist

    // #### Define tag-based blacklist
    const tagBlacklist = ["性", "性别议题"]; // Add tags to block here
    // const tagBlacklist = ['tag1', 'tag2']; // Example tags to block
    // ----------------------------------------------------------------------------------------------------------------

    // Function to check and remove elements based on keywords (case-insensitive for English)
    function filterElements(container, childSelector, keywords, isWhitelist = false) {
        const children = container.querySelectorAll(childSelector);
        const keywordPattern = new RegExp(keywords.map(k => k.toLowerCase()).join('|'), 'i');

        children.forEach(child => {
            const childHTML = child.outerHTML.toLowerCase();
            const shouldRemove = isWhitelist ? !keywordPattern.test(childHTML) : keywordPattern.test(childHTML);
            if (shouldRemove) {
                child.remove();
            }
        });
    }

    // Function to filter posts by blocked usernames (blacklist)
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

    // Function to handle topic-title filtering and actions (blacklist)
    function handleTopicTitle() {
        const topicTitleDiv = document.querySelector('#topic-title');
        if (topicTitleDiv) {
            const topicTitleHTML = topicTitleDiv.outerHTML.toLowerCase(); // Convert to lowercase for case-insensitive matching
            // Blacklist mode: remove elements that contain any keyword
            if (topicListBodyKeywordsBlacklist.some(keyword => topicTitleHTML.includes(keyword.toLowerCase()))) {
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

    // Function to filter topics by tags (blacklist)
    function filterTopicsByTags(container) {
        const topics = container.querySelectorAll('tr');
        topics.forEach(topic => {
            const tagLinks = topic.querySelectorAll('a.discourse-tag');
            tagLinks.forEach(tagLink => {
                const tagName = tagLink.textContent.trim();
                if (tagBlacklist.includes(tagName)) {
                    topic.remove(); // Remove the topic if it contains a blacklisted tag
                }
            });
        });
    }

    // Function to apply filters to the page
    function applyFilters() {
        const postStream = document.querySelector('.post-stream');
        const topicListBody = document.querySelector('.topic-list-body');

        // Apply blacklist mode to postStream
        if (postStream) {
            filterElements(postStream, 'div', postStreamKeywords, false); // Blacklist mode
            filterPostsByUsername(postStream); // Filter by usernames (blacklist)
        }

        // Apply whitelist or blacklist mode to topicListBody based on useBlackWhiteList
        if (topicListBody) {
            if (useBlackWhiteList === "black") {
                // Blacklist mode: remove elements that contain any keyword
                filterElements(topicListBody, 'tr', topicListBodyKeywordsBlacklist, false);
            } else {
                // Whitelist mode: only keep elements that contain at least one keyword
                filterElements(topicListBody, 'tr', topicListBodyKeywordsWhitelist, true);
            }

            // Always apply tag-based blacklist, regardless of whitelist/blacklist mode
            filterTopicsByTags(topicListBody);
        }

        handleTopicTitle(); // Handle topic-title filtering and actions (blacklist)
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
