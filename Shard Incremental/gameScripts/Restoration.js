let CalcRestorationGainTxt = document.getElementById("RestorationGainTxt");
let RestorationDisplayTxt = document.getElementById("RestorationDisplayTxt");
let RestorationBtn = document.getElementById("RestorationResetBtn");

let RestorationBuyable1LvlTxt = document.getElementById("RestorationBuyable1LvlTxt");
let RestorationBuyable1Btn = document.getElementById("RestorationBuyable1Btn");

let RestorationBuyable2LvlTxt = document.getElementById("RestorationBuyable2LvlTxt");
let RestorationBuyable2Btn = document.getElementById("RestorationBuyable2Btn");

let RestorationBuyable3LvlTxt = document.getElementById("RestorationBuyable3LvlTxt");
let RestorationBuyable3Btn = document.getElementById("RestorationBuyable3Btn");

let RestorationBuyable4LvlTxt = document.getElementById("RestorationBuyable4LvlTxt");
let RestorationBuyable4Btn = document.getElementById("RestorationBuyable4Btn");

// Upgrade Tree
let RestorationUpgTree2 = document.getElementById("RestorationUpgTree2");
let RestorationUpgTree3 = document.getElementById("RestorationUpgTree3");
let RestorationUpgTree4 = document.getElementById("RestorationUpgTree4");

let RestorationUpgTree1CostTxt = document.getElementById("RestorationUpgTree1CostTxt");
let RestorationUpgTree2CostTxt = document.getElementById("RestorationUpgTree2CostTxt");
let RestorationUpgTree3CostTxt = document.getElementById("RestorationUpgTree3CostTxt");
let RestorationUpgTree4CostTxt = document.getElementById("RestorationUpgTree4CostTxt");

function UpdateRestorationDisplay() {
    RestorationDisplayTxt.innerHTML = "You have <b>" + format(Data.RestorationPoints) + "</b>" + (Data.RestorationPoints.eq(1) ? " Restoration Point" : " Restoration Points");
    CalcRestorationGainTxt.innerHTML = "You will gain <b>" + format(Data.RestorationStorage) + "</b>" + (Data.RestorationStorage.eq(1) ? " Restoration Point" : " Restoration Points");
    RestorationBtn.innerHTML = (Data.Destructions.gte(15) && Data.ConstructionEnergy.gte(8000)) ? "Restore" : "Get atleast 15 Destructions and 8,000 Construction Energy";

    RestorationBuyable1LvlTxt.innerHTML = `Level: <b>${format(Data.Buyables[5].amount)}</b> / <b>${format(Data.Buyables[5].max)}</b>`
    RestorationBuyable1Btn.innerHTML = "Cost: <b>" + format(Data.Buyables[5].price) + "</b> Restoration Points"

    RestorationBuyable2LvlTxt.innerHTML = `Level: <b>${format(Data.Buyables[6].amount)}</b> / <b>${format(Data.Buyables[6].max)}</b>`
    RestorationBuyable2Btn.innerHTML = "Cost: <b>" + format(Data.Buyables[6].price) + "</b> Restoration Points"

    RestorationBuyable3LvlTxt.innerHTML = `Level: <b>${format(Data.Upgrades.includes(1) ? 1 : 0)}</b> / <b>1</b>`
    RestorationBuyable3Btn.innerHTML = (Data.Upgrades.includes(1)) ? "Bought" : "Cost: <b>5</b> Restoration Points"

    RestorationBuyable4LvlTxt.innerHTML = `Level: <b>${format(Data.Upgrades.includes(2) ? 1 : 0)}</b> / <b>1</b>`
    RestorationBuyable4Btn.innerHTML = (Data.Upgrades.includes(2)) ? "Bought" : "Cost: <b>10</b> Restoration Points"

    // Upgrade Tree
    RestorationUpgTree1CostTxt.innerHTML = (Data.Upgrades.includes(3)) ? "Bought" : "Cost: <b>5</b> Restoration Points"

    RestorationUpgTree2.style.display = (Data.Upgrades.includes(3)) ? "block" : "none"
    RestorationUpgTree2CostTxt.innerHTML = (Data.Upgrades.includes(4)) ? "Bought" : "Cost: <b>6</b> Restoration Points"

    RestorationUpgTree3.style.display = (Data.Upgrades.includes(3)) ? "block" : "none"
    RestorationUpgTree3CostTxt.innerHTML = (Data.Upgrades.includes(5)) ? "Bought" : "Cost: <b>10</b> Restoration Points"

    RestorationUpgTree4.style.display = (Data.Upgrades.includes(4) || Data.Upgrades.includes(5)) ? "block" : "none"
    RestorationUpgTree4CostTxt.innerHTML = (Data.Upgrades.includes(6)) ? "Bought" : "Cost: <b>12</b> Restoration Points"
}

function CalcRestorationGain() {
    let exp = 0.35;
    let exp2 = 0.5;

    Data.RestorationStorage = Data.Destructions.div(15).pow(exp).mul(Data.ConstructionEnergy.div(8000).pow(exp2)).times(Data.RestorationMult);
}

function RestorationReset(force) {
    if (Data.Destructions.gte(15) && Data.ConstructionEnergy.gte(8000)) {
        resetStats(10, 0);
        resetBuyables(5, 1);

        if (!force) {
            Data.RestorationPoints = OmegaNum.add(Data.RestorationPoints, Data.RestorationStorage)
        }

        if (!hasContent("restoration")) {
            Data.Unlocks.push("restoration");
        }
    }
}

function CalcRestorationMult() {
    let mult = new OmegaNum(1);
    if (Data.Upgrades.includes(3)) mult = mult.mul(1.5);
    if (Data.Upgrades.includes(6)) mult = mult.mul(3);
    if (Data.Destructions.gte(60)) mult = mult.mul(1.5);

    Data.RestorationMult = mult;
    return mult;
}

setInterval(function() {
    CalcRestorationGain();
    CalcRestorationMult();
    UpdateRestorationDisplay();
}, 100)