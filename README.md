# SJTU Shuiyuan Detox Utils

- **[SJTU Shuiyuan Detox](#sjtu-shuiyuan-detox)**
- **[SJTU Shuiyuan Content Filter](#sjtu-shuiyuan-content-filter)**


# SJTU Shuiyuan Detox

A Tampermonkey userscript that restricts access to specific topics on shuiyuan.sjtu.edu.cn (SJTU's discussion forum).

# Please Keep In Mind
## 1. You manually add each topic ID to the script. This lengthens your decision-making time.
## 2. You should **Think Twice** before you add a topic ID: Is it worth to waste your time on it?


# Sins of Shuiyuan
- Browsing Shuiyuan has made my GPA rank drop 20%.
- Browsing Shuiyuan has made me overly anxious on love&relationship topics.

```
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
Blank Space for you to think...
```

## Features
- Allows access only to whitelisted topic IDs
- Displays a friendly restriction message for non-whitelisted pages
- Shows links to allowed topics with their titles
- Attempts to close the tab after 3 seconds

## Usage
1. Install Tampermonkey browser extension
2. Add this script to Tampermonkey
3. Edit `allowedTopics` array to specify permitted topic IDs
4. Visit shuiyuan.sjtu.edu.cn - only whitelisted topics will be accessible

## Requirements
- Tampermonkey browser extension
- Access to shuiyuan.sjtu.edu.cn : You need a Jaccount to access the forum. If you don't have one, don't even try. Stepping into the forum is like drowning into hell.

---

# SJTU Shuiyuan Content Filter

This userscript filters content on `shuiyuan.sjtu.edu.cn` based on predefined keywords and usernames. It dynamically removes posts and topics containing specified keywords or from blocked users. The script also handles topic titles by navigating away or closing the tab if a match is found. It continuously monitors the page for new content and reapplies filters as needed.

**Features:**
- Keyword-based filtering for posts and topics.
- Username-based blocking.
- Dynamic content monitoring and filtering.
- Automatic navigation or tab closure for unwanted topic titles.

**Usage:**
1. Install a userscript manager like Tampermonkey.
2. Add this script and configure the `postStreamKeywords`, `topicListBodyKeywords`, `tags`, and `blockedUsernames` arrays as needed.
3. Navigate to `shuiyuan.sjtu.edu.cn` to see the filters in action.
