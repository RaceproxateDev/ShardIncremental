let preventSave = false

var Data = {
    shards: new OmegaNum(0), shardMult: new OmegaNum(1),
    constructionPoints: new OmegaNum(0), constructionMult: new OmegaNum(1), constructionStorage: new OmegaNum(0),
    Destructions: new OmegaNum(0), DestructionReq: new OmegaNum(10), DestructionScale: new OmegaNum(2.5),
    ConstructionEnergy: new OmegaNum(0), ConstructionEnergyMult: new OmegaNum(1),
    RestorationPoints: new OmegaNum(0), RestorationMult: new OmegaNum(1), RestorationStorage: new OmegaNum(0),
    Points: new OmegaNum(0), PointMult: new OmegaNum(1), PointReq: new OmegaNum(50), PointScale: new OmegaNum(5),
    Cells: new OmegaNum(1), CellMult: new OmegaNum(1.01),

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
            // ItsOnReset: "construction"
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(1),
            scale: new OmegaNum(3),
        },

        4: {
            //ItsOnReset: "construction"
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(5),
            scale: new OmegaNum(5),
        },

        5: {
            // ItsOnReset: "restoration"
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(1),
            scale: new OmegaNum(4),
        },

        6: {
            // ItsOnReset: "restoration"
            amount: new OmegaNum(0),
            max: new OmegaNum(10),
            price: new OmegaNum(2.5),
            scale: new OmegaNum(4),
        },

        7: {
            // ItsOnReset: "build"
            amount: new OmegaNum(0),
            max: new OmegaNum(10),
            price: new OmegaNum(1.01),
            scale: new OmegaNum(1.03),
        },
    },

    Unlocks: [],
    Upgrades: [],
}

var Template = {
    shards: new OmegaNum(0), shardMult: new OmegaNum(1),
    constructionPoints: new OmegaNum(0), constructionMult: new OmegaNum(1), constructionStorage: new OmegaNum(0),
    Destructions: new OmegaNum(0), DestructionReq: new OmegaNum(10), DestructionScale: new OmegaNum(2.5),
    ConstructionEnergy: new OmegaNum(0), ConstructionEnergyMult: new OmegaNum(1),
    RestorationPoints: new OmegaNum(0), RestorationMult: new OmegaNum(1), RestorationStorage: new OmegaNum(0),
    Points: new OmegaNum(0), PointMult: new OmegaNum(1), PointReq: new OmegaNum(50), PointScale: new OmegaNum(5),
    Cells: new OmegaNum(1), CellMult: new OmegaNum(1.01),

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
            // ItsOnReset: "construction"
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(1),
            scale: new OmegaNum(3),
        },

        4: {
            // ItsOnReset: "construction"
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(5),
            scale: new OmegaNum(5),
        },

        5: {
            // ItsOnReset: "restoration"
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(1),
            scale: new OmegaNum(4),
        },

        6: {
            // ItsOnReset: "restoration"
            amount: new OmegaNum(0),
            max: new OmegaNum(10),
            price: new OmegaNum(2.5),
            scale: new OmegaNum(4),
        },

        7: {
            // ItsOnReset: "build"
            amount: new OmegaNum(0),
            max: new OmegaNum(10),
            price: new OmegaNum(1.01),
            scale: new OmegaNum(1.03),
        },
    },

    Unlocks: [],
    Upgrades: [],
}

function save() {
   if (!preventSave) {
     localStorage.setItem("contentData", btoa(unescape(encodeURIComponent(JSON.stringify(Data)))))
   }
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

function resetData() {
    if (confirm("Are you sure you want to reset your data?")) {
        preventSave = true
        localStorage.removeItem("contentData")
        location.reload()
    }
}

setInterval(save, 100)

window.addEventListener("load", () => {
    load()
})