var Data = {
    shards: new OmegaNum(0), shardMult: new OmegaNum(1),
    constructionPoints: new OmegaNum(0), constructionMult: new OmegaNum(1), constructionStorage: new OmegaNum(0),
    Destructions: new OmegaNum(0), DestructionReq: new OmegaNum(10), DestructionScale: new OmegaNum(2.5),
    ConstructionEnergy: new OmegaNum(0), ConstructionEnergyMult: new OmegaNum(1),
    RestorationPoints: new OmegaNum(0), RestorationMult: new OmegaNum(1), RestorationStorage: new OmegaNum(0),
    Points: new OmegaNum(0), PointMult: new OmegaNum(1), PointReq: new OmegaNum(50), PointScale: new OmegaNum(5),
    Cells: new OmegaNum(1), CellMult: new OmegaNum(1.01),
    Extensions: new OmegaNum(0), ExtendReq: new OmegaNum(20), ExtendScale: new OmegaNum(10),

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

        8: {
            // ItsOnReset: "build"
            amount: new OmegaNum(0),
            max: new OmegaNum(10),
            price: new OmegaNum(1.5),
            scale: new OmegaNum(1.25),
        },
    },

    Unlocks: [],
    Upgrades: [],
    Settings: {
        AutobuyShardUpgs: true,
        AutobuyConstructionUpgs: true,
    },
}

var Template = {
    shards: new OmegaNum(0), shardMult: new OmegaNum(1),
    constructionPoints: new OmegaNum(0), constructionMult: new OmegaNum(1), constructionStorage: new OmegaNum(0),
    Destructions: new OmegaNum(0), DestructionReq: new OmegaNum(10), DestructionScale: new OmegaNum(2.5),
    ConstructionEnergy: new OmegaNum(0), ConstructionEnergyMult: new OmegaNum(1),
    RestorationPoints: new OmegaNum(0), RestorationMult: new OmegaNum(1), RestorationStorage: new OmegaNum(0),
    Points: new OmegaNum(0), PointMult: new OmegaNum(1), PointReq: new OmegaNum(50), PointScale: new OmegaNum(5),
    Cells: new OmegaNum(1), CellMult: new OmegaNum(1.01),
    Extensions: new OmegaNum(0), ExtendReq: new OmegaNum(20), ExtendScale: new OmegaNum(10),

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

        8: {
            // ItsOnReset: "build"
            amount: new OmegaNum(0),
            max: new OmegaNum(10),
            price: new OmegaNum(1.5),
            scale: new OmegaNum(1.25),
        },
    },

    Unlocks: [],
    Upgrades: [],
    Settings: {
        AutobuyShardUpgs: true,
        AutobuyConstructionUpgs: true,
    },
}

function save() {
    localStorage.setItem("contentData", btoa(unescape(encodeURIComponent(JSON.stringify(Data)))))
}

function load() {
    let savedata = localStorage.getItem("contentData")
   
    if (savedata) {
        let parsed = JSON.parse(decodeURIComponent(escape(atob(savedata))))
        Data = parsed
    }
}

function resetData() {
    if (confirm("Are you sure you want to reset your data?")) {
        if (localStorage.getItem("contentData")) {
            let freshData = Template;

            Data = freshData;
            save();
            // Optional: reload the page to ensure UI updates
            location.reload();
        }
    }
}

function exportData() {
    try {
        const data = localStorage.getItem("contentData")

        if (!data) {
            alert("No save Data found")
            return;
        }

        navigator.clipboard.writeText(data).then(() => {
            alert("Exported to Clipboard")
        });
    } catch (err) {
        alert("Invalid Export, Export Failed")
    }
}

function ImportData() {
    let inp = prompt("Paste your save here:")
    if (!inp) return;

    try {
        let decoded = decodeURIComponent(escape(atob(inp)));
        let parsed = JSON.parse(decoded);

        Data = parsed;
        save();

        location.reload();
    } catch (err) {
        alert("Invalid Save Data!")
        console.error(err);
    }
}

setInterval(save, 100)

window.addEventListener("load", () => {
    load()
})