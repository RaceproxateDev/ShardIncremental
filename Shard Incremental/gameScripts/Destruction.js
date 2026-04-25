let btn = document.getElementById("DestructionResetBtn");
let reqTxt = document.getElementById("DestroyReqTxt");
let destructionDisplay = document.getElementById("DestructionDisplayTxt");

let constructionEnergyDisplay = document.getElementById("ConstructionEnergyDisplayTxt");
let constructionEnergyFirstBoost = document.getElementById("ConstructionEnergyFirstBoost");
let constructionEnergySecondBoost = document.getElementById("ConstructionEnergySecondBoost");

// Destruction milestones
let DestructionMilestone1 = document.getElementById("DestructionMilestone1");
let DestructionMilestone2 = document.getElementById("DestructionMilestone2");
let DestructionMilestone3 = document.getElementById("DestructionMilestone3");
let DestructionMilestone4 = document.getElementById("DestructionMilestone4");
let DestructionMilestone5 = document.getElementById("DestructionMilestone5");
let DestructionMilestone6 = document.getElementById("DestructionMilestone6");
let DestructionMilestone7 = document.getElementById("DestructionMilestone7");
let DestructionMilestone8 = document.getElementById("DestructionMilestone8");
let DestructionMilestone9 = document.getElementById("DestructionMilestone9");
let DestructionMilestone10 = document.getElementById("DestructionMilestone10");
let DestructionMilestone11 = document.getElementById("DestructionMilestone11");

function DestructionReset(force) {
    if (Data.constructionPoints.gte(Data.DestructionReq)) {
        if (!force) {
            Data.Destructions = Data.Destructions.add(1);
            Data.DestructionReq = Data.DestructionReq.mul(Data.DestructionScale);
        }

        resetStats(5, 0);
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
    constructionEnergySecondBoost.style.display = (Data.ConstructionEnergy.gte(1000)) ? "block" : "none";
    constructionEnergySecondBoost.innerHTML = `<b>${format(calcConstructionPointCEBoost())}</b>x Construction Points`;

    DestructionMilestone1.style.backgroundColor = (Data.Destructions.gte(1)) ? "green" : "black";
    DestructionMilestone2.style.backgroundColor = (Data.Destructions.gte(2)) ? "green" : "black";
    DestructionMilestone3.style.backgroundColor = (Data.Destructions.gte(3)) ? "green" : "black";
    DestructionMilestone4.style.backgroundColor = (Data.Destructions.gte(4)) ? "green" : "black";
    DestructionMilestone5.style.backgroundColor = (Data.Destructions.gte(5)) ? "green" : "black";
    DestructionMilestone6.style.backgroundColor = (Data.Destructions.gte(7)) ? "green" : "black";
    DestructionMilestone7.style.backgroundColor = (Data.Destructions.gte(8)) ? "green" : "black";
    DestructionMilestone8.style.backgroundColor = (Data.Destructions.gte(9)) ? "green" : "black";
    DestructionMilestone9.style.backgroundColor = (Data.Destructions.gte(10)) ? "green" : "black";
    DestructionMilestone10.style.backgroundColor = (Data.Destructions.gte(11)) ? "green" : "black";
    DestructionMilestone11.style.backgroundColor = (Data.Destructions.gte(15)) ? "green" : "black";

}

function Autobuy() {
    let spend = true;
    let ConstructionSpend = true;

    if (Data.Destructions.gte(4)) {
        buyUpg(1, "shards", spend);
        buyUpg(2, "shards", spend);
    }

    if (Data.Destructions.gte(7)) {
        buyUpg(3, "constructionPoints", ConstructionSpend);
        buyUpg(4, "constructionPoints", ConstructionSpend);
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

function CalcConstructionEnergyMult() {
    let mult = new OmegaNum(1);

    if (Data.Destructions.gte(9)) mult = mult.times(3);
    if (Data.Destructions.gte(10)) mult = mult.times(5);

    let pmult = OmegaNum.pow(2, Data.Buyables[5].amount);
    
    mult = mult.times(pmult);

    Data.ConstructionEnergyMult = mult;
    return mult;
}

function passiveConstructionPointGain() {
    let p = new OmegaNum(0);
    if (Data.Destructions.gte(10)) p = p.add(0.01);
    if (Data.Destructions.gte(11)) p = p.add(0.99);

    if (Data.Destructions.gte(10)) {
        Data.constructionPoints = Data.constructionPoints.add(Data.constructionStorage.mul(p));
    }

    return p;
}

// Construction Energy boosts

function calcShardCEBoost() {
    let exp = new OmegaNum(0.1);
    
    return Data.ConstructionEnergy.pow(exp);
}

function calcConstructionPointCEBoost() {
    let exp = new OmegaNum(0.05);

    return Data.ConstructionEnergy.div(1000).pow(exp);
}

setInterval(() => {
    updateHtmlDestruction();
    Autobuy();
    calcShardCEBoost();
    CalcConstructionEnergyMult();
}, 100);

setInterval(() => {
    CanGenConstructionEnergy();
    passiveConstructionPointGain();
}, 1000);