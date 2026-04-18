let btn = document.getElementById("DestructionResetBtn");
let reqTxt = document.getElementById("DestroyReqTxt");
let content3 = document.getElementById("content3");
let destructionDisplay = document.getElementById("DestructionDisplayTxt");

let constructionEnergyDisplay = document.getElementById("ConstructionEnergyDisplayTxt");
let constructionEnergyFirstBoost = document.getElementById("ConstructionEnergyFirstBoost");

// Destruction milestones
let DestructionMilestone1 = document.getElementById("DestructionMilestone1");
let DestructionMilestone2 = document.getElementById("DestructionMilestone2");
let DestructionMilestone3 = document.getElementById("DestructionMilestone3");
let DestructionMilestone4 = document.getElementById("DestructionMilestone4");
let DestructionMilestone5 = document.getElementById("DestructionMilestone5");
let DestructionMilestone6 = document.getElementById("DestructionMilestone6");
let DestructionMilestone7 = document.getElementById("DestructionMilestone7");

function DestructionReset(force) {
    if (Data.constructionPoints.gte(Data.DestructionReq)) {
        if (!force) {
            Data.Destructions = Data.Destructions.add(1);
            Data.DestructionReq = Data.DestructionReq.mul(Data.DestructionScale);
        }

        resetStats(5, 0)
        resetBuyables(5, 1);

        if (!hasContent("destruction")) {
            Data.Unlocks.push("destruction")
        }
    }
}

function updateHtmlDestruction() {
    reqTxt.innerHTML = `You need <b>${format(Data.DestructionReq)}</b> construction points`;
    btn.innerHTML = (Data.constructionPoints.gte(Data.DestructionReq)) ? "Destroy" : "Meet the requeriments";
    destructionDisplay.innerHTML = `You made <b>${format(Data.Destructions)}</b> ${Data.Destructions.eq(1) ? "Destruction" : "Destructions"}`;
    constructionEnergyDisplay.innerHTML = `You have <b>${format(Data.ConstructionEnergy)}</b> ${OmegaNum.eq(Data.ConstructionEnergy, 1) ? "Construction Energy" : "Construction Energy"}`;

    constructionEnergyFirstBoost.innerHTML = `<b>${format(calcShardCEBoost())}</b>x Shards`;

    DestructionMilestone1.style.backgroundColor = (Data.Destructions.gte(1)) ? "green" : "black";
    DestructionMilestone2.style.backgroundColor = (Data.Destructions.gte(2)) ? "green" : "black";
    DestructionMilestone3.style.backgroundColor = (Data.Destructions.gte(3)) ? "green" : "black";
    DestructionMilestone4.style.backgroundColor = (Data.Destructions.gte(4)) ? "green" : "black";
    DestructionMilestone5.style.backgroundColor = (Data.Destructions.gte(5)) ? "green" : "black";
    DestructionMilestone6.style.backgroundColor = (Data.Destructions.gte(7)) ? "green" : "black";
    DestructionMilestone7.style.backgroundColor = (Data.Destructions.gte(8)) ? "green" : "black";
}

function Autobuy() {
    if (Data.Destructions.gte(4)) {
        buyUpg(1, "shards");
        buyUpg(2, "shards");
    }

    if (Data.Destructions.gte(7)) {
        buyUpg(3, "constructionPoints");
        buyUpg(4, "constructionPoints");
    }
}

function CanGenConstructionEnergy() {
    let can = false;
    if (Data.Destructions.gte(8)) can = true;

    if (can) {
        Data.ConstructionEnergy = Data.ConstructionEnergy.add(Data.ConstructionEnergyMult);
    }

    return can;
}

function calcShardCEBoost() {
    let exp = new OmegaNum(0.01);
    let base = new OmegaNum(1);
    
    return base.add(Data.ConstructionEnergy.pow(exp));
}

setInterval(() => {
    updateHtmlDestruction()
    Autobuy();
    calcShardCEBoost();
}, 100);

setInterval(() => {
    CanGenConstructionEnergy();
}, 1000);