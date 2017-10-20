

var re = /https:\/\/www.youtube.com\/(?:watch\?v=|embed\/)([^\&\?]+).*/;
var vid = '';

function openthumb() {
    var thumb = "https://i.ytimg.com/vi/" + vid + "/maxresdefault.jpg";
   browser.tabs.create({
     "url": thumb
   });
}


function checkurl() {

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});

    gettingActiveTab.then((tabs) => {
        var gettingTab = browser.tabs.get(tabs[0].id);
        gettingTab.then((tab) => {
            vid = re.exec(tab.url)[1];
            if (vid) {
              browser.pageAction.hide(tabs[0].id);
              browser.pageAction.show(tabs[0].id);
            }
        });
    });
}

browser.tabs.onCreated.addListener(checkurl);
browser.tabs.onActivated.addListener(checkurl);
browser.tabs.onUpdated.addListener(checkurl);

browser.pageAction.onClicked.addListener(openthumb);


