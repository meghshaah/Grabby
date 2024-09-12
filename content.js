// content.js
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
const emails = document.body.innerText.match(emailRegex) || [];

// Get the current URL to tag emails by website
const currentUrl = window.location.hostname;

chrome.runtime.sendMessage({emails: emails, site: currentUrl});
