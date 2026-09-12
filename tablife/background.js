const tabRegistry = {};

console.log("TABLIFE HQ ONLINE");

/* ======================
   CAUSE OF DEATH ENGINE
====================== */

function getCause(title){

    title = title.toLowerCase();

    if(title.includes("youtube"))
        return "Time Well Wasted";

    if(title.includes("react"))
        return "False Ambition";

    if(title.includes("chatgpt"))
        return "Question Answered";

    if(title.includes("github"))
        return "Dependency Issues";

    if(title.includes("stackoverflow"))
        return "Copied Without Understanding";

    if(title.includes("amazon"))
        return "Financial Reality";

    return "Lost Relevance";
}

/* ======================
   AFTERLIFE ENGINE
====================== */

function getDestination(title){

    title = title.toLowerCase();

    if(
        title.includes("learn") ||
        title.includes("tutorial") ||
        title.includes("docs") ||
        title.includes("documentation") ||
        title.includes("study") ||
        title.includes("research")
    ){
        return "HEAVEN";
    }

    if(
        title.includes("youtube") ||
        title.includes("shorts") ||
        title.includes("reels") ||
        title.includes("meme")
    ){
        return "HELL";
    }

    return "⏳ LIMBO";
}

/* ======================
   REINCARNATION ENGINE
====================== */

function getReincarnation(){

    const options = [

        "Another YouTube Tab",

        "Wikipedia Rabbit Hole",

        "Stack Overflow",

        "ChatGPT Session",

        "GitHub Issue",

        "Learn React Again",

        "Top 10 Productivity Tips"
    ];

    return options[
        Math.floor(
            Math.random()*options.length
        )
    ];
}

/* ======================
   OBITUARY ENGINE
====================== */

function getObituary(){

    const list = [

        "Opened with hope. Closed with uncertainty.",

        "The user promised to return.",

        "Its purpose remains unfinished.",

        "May its cache rest in peace.",

        "Never fully explored.",

        "That promise was never fulfilled."
    ];

    return list[
        Math.floor(
            Math.random()*list.length
        )
    ];
}

/* ======================
   BIRTH REGISTRY
====================== */

chrome.tabs.onUpdated.addListener(
(tabId, changeInfo, tab)=>{

    if(tab.title){

        tabRegistry[tabId] = {

            title: tab.title,

            url: tab.url,

            birthTime: Date.now()
        };
    }
});

/* ======================
   DEATH DETECTOR
====================== */

chrome.tabs.onRemoved.addListener(
(tabId)=>{

    const tab = tabRegistry[tabId];

    if(!tab) return;

    const ageSeconds =
    Math.floor(
        (Date.now()-tab.birthTime)/1000
    );

    const record = {

        title: tab.title,

        age: ageSeconds,

        cause: getCause(tab.title),

        destination:
            getDestination(tab.title),

        reincarnation:
            getReincarnation(),

        obituary:
            getObituary(),

        deathTime:
            new Date().toLocaleString()
    };

    chrome.storage.local.get(
    ["graveyard"],
    (result)=>{

        const graveyard =
        result.graveyard || [];

        graveyard.push(record);

        chrome.storage.local.set({
            graveyard
        });

    });

    console.log(
        " TAB SENT TO AFTERLIFE"
    );
});
