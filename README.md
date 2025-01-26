# SJTU Shuiyuan Detox Utils

- **[Shuiyuan Detox](#sjtu-shuiyuan-detox)**
- **[Shuiyuan Black White List](#shuiyuan-bwlist)**


# Sins of Shuiyuan
- Browsing Shuiyuan has made my GPA rank drop 20%.
- Browsing Shuiyuan has made me overly anxious on love&relationship topics.
- Browsing Shuiyuan has cost me an enormous amount of time.


# SJTU Shuiyuan Detox

A Tampermonkey userscript that restricts access to specific topics on shuiyuan.sjtu.edu.cn (SJTU's discussion forum).

# Please Keep In Mind
## 1. You manually add each topic ID to the script. This lengthens your decision-making time.
## 2. You should **Think Twice** before you add a topic ID: Is it worth to waste your time on it?



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


# Shuiyuan BWList

This Tampermonkey script filters content on `shuiyuan.sjtu.edu.cn` based on customizable keywords and usernames.

## Features

- **Keyword Filtering**:
  - Blacklist or whitelist keywords for posts and topics.
  - Automatically removes or keeps content based on defined keywords.

- **Username Blocking**:
  - Blocks posts from specific usernames.

- **Dynamic Filtering**:
  - Applies filters to dynamically loaded content.

- **Topic Title Handling**:
  - Automatically navigates away or closes tabs for blacklisted topic titles.

- **Customizable Modes**:
  - Switch between blacklist or whitelist modes for topic filtering.

## Configuration

- Edit 
  - `postStreamKeywords`, 
  - `topicListBodyKeywordsWhitelist`, 
  - `topicListBodyKeywordsBlacklist`, 
  - `blockedUsernames`,

  arrays to customize filtering.
- Set `useBlackWhiteList` to `"black"` for blacklist mode or leave empty for whitelist mode (only for topics).

## Usage

1. Install the script in Tampermonkey.
2. Customize the configuration arrays.
3. Browse `shuiyuan.sjtu.edu.cn` with filtered content.


## Note
Please read the configuration part of the script.