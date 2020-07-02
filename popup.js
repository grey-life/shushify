const adCheck = (tab) => {

    chrome.storage.sync.get('extStatus', function (data) {
        if (data.extStatus) {
            if (tab.url.includes('open.spotify.com')) {
                if (tab.title.includes('Spotify · Spotify') || tab.title.includes('Advertisement · Spotify')) {
                    chrome.tabs.update(tab.id, { "muted": true });
                } else {
                    chrome.tabs.update(tab.id, { "muted": false });
                }
            }
        } else {
            chrome.tabs.update(tab.id, { "muted": false });
        }
    });

}

const button = document.getElementById('status');

chrome.storage.sync.get('extStatus', function (data) {
    const optionText = document.getElementsByClassName('option-text')[0];
    if (data.extStatus) {
        button.checked = true;
        optionText.textContent = 'Shushify (Enabled)';
    } else {
        button.checked = false;
        optionText.textContent = 'Shushify (Disabled)';
    }
});

button.onclick = function () {
    chrome.storage.sync.set({ extStatus: button.checked });

    const optionText = document.getElementsByClassName('option-text')[0];
    if (button.checked) {
        optionText.textContent = 'Shushify (Enabled)';
    } else {
        optionText.textContent = 'Shushify (Disabled)';
    }
    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        adCheck(tabs[0]);
    });

}
