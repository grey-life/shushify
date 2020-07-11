chrome.runtime.onInstalled.addListener(function () {

    chrome.storage.sync.set({ extStatus: true }, function () {
        console.log('Extension status set');
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'open.spotify.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

});

const adCheck = (tab) => {

    chrome.storage.sync.get('extStatus', function (data) {
        if (data.extStatus) {
            if (tab.url.includes('open.spotify.com')) {
                if (tab.title.includes('Spotify · Spotify') || tab.title.includes('Advertisement')) {
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

chrome.tabs.onUpdated.addListener(function (id, obj, tab) {
    adCheck(tab);
});
