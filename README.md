# SJTU Shuiyuan Detox

A Tampermonkey userscript that restricts access to specific topics on shuiyuan.sjtu.edu.cn (SJTU's discussion forum).

# Please Keep In Mind
## 1. You manually add each topic ID to the script. This lengthens your decision-making time.
## 2. You should **Think Twice** before you add a topic ID: Is it worth to waste your time on it?

## Features
- Allows access only to whitelisted topic IDs
- Displays a friendly restriction message for non-whitelisted pages
- Shows links to allowed topics with their titles
- Handles dynamic URL changes

## Usage
1. Install Tampermonkey browser extension
2. Add this script to Tampermonkey
3. Edit `allowedTopics` array to specify permitted topic IDs
4. Visit shuiyuan.sjtu.edu.cn - only whitelisted topics will be accessible

## Requirements
- Tampermonkey browser extension
- Access to shuiyuan.sjtu.edu.cn : You need a Jaccount to access the forum.