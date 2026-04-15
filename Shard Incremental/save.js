var Data = {
    shards: new OmegaNum(0), shardMult: new OmegaNum(1),
    constructionPoints: new OmegaNum(0), constructionMult: new OmegaNum(1), constructionStorage: new OmegaNum(0),

    Buyables: {
        1: {
            amount: new OmegaNum(0),
            max: new OmegaNum(999),
            price: new OmegaNum(10),
            scale: new OmegaNum(2.5),
        },

        2: {
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(100),
            scale: new OmegaNum(3),
        },
        
        3: {
            ItsOnReset: "construction", // visual only
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(1),
            scale: new OmegaNum(3),
        },

        4: {
            ItsOnReset: "construction", // visual only
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(5),
            scale: new OmegaNum(5),
        },
    },

    Unlocks: [],
}

var Template = {
    shards: new OmegaNum(0), shardMult: new OmegaNum(1),
    constructionPoints: new OmegaNum(0), constructionMult: new OmegaNum(1), constructionStorage: new OmegaNum(0),

    Buyables: {
        1: {
            amount: new OmegaNum(0),
            max: new OmegaNum(999),
            price: new OmegaNum(10),
            scale: new OmegaNum(2.5),
        },

        2: {
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(100),
            scale: new OmegaNum(3),
        },

        3: {
            ItsOnReset: "construction", // visual only
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(1),
            scale: new OmegaNum(3),
        },

        4: {
            ItsOnReset: "construction", // visual only
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(5),
            scale: new OmegaNum(5),
        },
    },

    Unlocks: [],
}

function save() {
    localStorage.setItem("contentData", btoa(unescape(encodeURIComponent(JSON.stringify(Data)))))
}

function fixSave(data, template) {
    for (let key in template) {
        if (data[key] === undefined) {
            data[key] = template[key]
        } else if (template[key] instanceof OmegaNum) {
            data[key] = new OmegaNum(data[key])
        } else if (typeof template[key] === "object") {
            fixSave(data[key], template[key])
        }
    }
}

function load() {
    let savedata = localStorage.getItem("contentData")
   
    if (savedata) {
        let parsed = JSON.parse(decodeURIComponent(escape(atob(savedata))))
        
        fixSave(parsed, Template)
        Data = parsed
    }
}

setInterval(save, 100)

window.addEventListener("load", () => {
    load()
})