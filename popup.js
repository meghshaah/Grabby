document.addEventListener('DOMContentLoaded', function() {
  const emailList = document.getElementById('emailList');
  const historyList = document.getElementById('historyList');
  const clearEmails = document.getElementById('clearEmails');
  const historyButton = document.getElementById('history');
  const copyAllButton = document.getElementById('copyAll');
  const copyHistoryAllButton = document.getElementById('copyHistoryAll');
  const backToMainButton = document.getElementById('backToMain');
  const mainSection = document.getElementById('mainSection');
  const historySection = document.getElementById('historySection');

  // Function to copy text to clipboard
  function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }

  // Show the main email list
  chrome.storage.local.get('currentEmails', function(data) {
    const emails = data.currentEmails || [];
    let allEmailsText = '';

    emails.forEach(email => {
      const li = document.createElement('li');
      li.textContent = email;

      const copyButton = document.createElement('button');
      copyButton.textContent = 'Copy';
      copyButton.addEventListener('click', () => {
        copyToClipboard(email);
        copyButton.textContent = 'Copied!';
        setTimeout(() => copyButton.textContent = 'Copy', 2000);
      });

      li.appendChild(copyButton);
      emailList.appendChild(li);
      allEmailsText += email + '\n';
    });

    // Copy all emails from the main list
    copyAllButton.addEventListener('click', () => {
      copyToClipboard(allEmailsText);
      copyAllButton.textContent = 'All Copied!';
      setTimeout(() => copyAllButton.textContent = 'Copy All Emails', 2000);
    });
  });

  // Show the history list
  historyButton.addEventListener('click', () => {
    mainSection.style.display = 'none';
    historySection.style.display = 'block';

    chrome.storage.local.get('emailHistory', (data) => {
      const history = data.emailHistory || [];
      historyList.innerHTML = '';
      let historyEmailsText = '';

      history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `Site: ${entry.site}, Emails: ${entry.emails.join(', ')}`;
        historyList.appendChild(li);
        historyEmailsText += `${entry.emails.join(', ')}\n`;
      });

      // Copy all emails from the history
      copyHistoryAllButton.addEventListener('click', () => {
        copyToClipboard(historyEmailsText);
        copyHistoryAllButton.textContent = 'All History Copied!';
        setTimeout(() => copyHistoryAllButton.textContent = 'Copy All History Emails', 2000);
      });
    });
  });

  // Go back to the main section
  backToMainButton.addEventListener('click', () => {
    mainSection.style.display = 'block';
    historySection.style.display = 'none';
  });

  // Clear emails from the main list
  clearEmails.addEventListener('click', () => {
    chrome.storage.local.set({ currentEmails: [] }, () => {
      emailList.innerHTML = '';
    });
  });
});
