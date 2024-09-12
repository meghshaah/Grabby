chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.emails && request.site) {
    const newEntry = { site: request.site, emails: request.emails };

    // Get current emails and add new site data
    chrome.storage.local.get({emailHistory: [], currentEmails: []}, (data) => {
      const updatedHistory = [...data.emailHistory, { site: request.site, emails: data.currentEmails }];
      chrome.storage.local.set({ currentEmails: newEntry.emails, currentSite: newEntry.site, emailHistory: updatedHistory });
    });
  }
});
