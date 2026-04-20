let CalcRestorationGainTxt = document.getElementById("RestorationGainTxt");
let RestorationDisplayTxt = document.getElementById("RestorationDisplayTxt");
let RestorationBtn = document.getElementById("RestorationResetBtn");

let RestorationBuyable1LvlTxt = document.getElementById("RestorationBuyable1LvlTxt");
let RestorationBuyable1Btn = document.getElementById("RestorationBuyable1Btn");
let RestorationBuyable2LvlTxt = document.getElementById("RestorationBuyable2LvlTxt");
let RestorationBuyable2Btn = document.getElementById("RestorationBuyable2Btn");

function CalcRestorationGain() {
    let exp = 0.2;
    let exp2 = 0.5;

    Data.RestorationStorage = Data.Destructions.div(15).pow(exp).mul(Data.ConstructionEnergy.div(8000).pow(exp2));
}

function RestorationReset(force) {
    if (Data.Destructions.gte(15) && Data.ConstructionEnergy.gte(8000)) {
        if (!force) {
            Data.RestorationPoints = Data.RestorationPoints.add(Data.RestorationStorage);
        }

        resetStats(10, 0);
        resetBuyables(5, 1);

        if (!hasContent("restoration")) {
            Data.Unlocks.push("restoration");
        }
    }
}

function UpdateRestorationDisplay() {
    RestorationDisplayTxt.innerHTML = "You have <b>" + format(Data.RestorationPoints) + "</b>" + (Data.RestorationPoints.eq(1) ? " Restoration Point" : " Restoration Points");
    CalcRestorationGainTxt.innerHTML = "You will gain <b>" + format(Data.RestorationStorage) + "</b>" + (Data.RestorationStorage.eq(1) ? " Restoration Point" : " Restoration Points");
    RestorationBtn.innerHTML = (Data.RestorationStorage.gte(1) ? "Restore" : "Get atleast 15 Destructions and 8,000 Construction Energy to restore");

    RestorationBuyable1LvlTxt.innerHTML = `Level: <b>${format(Data.Buyables[5].amount)}</b> / <b>${format(Data.Buyables[5].max)}</b>`
    RestorationBuyable1Btn.innerHTML = "Cost: <b>" + format(Data.Buyables[5].price) + "</b> Restoration Points"

    RestorationBuyable2LvlTxt.innerHTML = `Level: <b>${format(Data.Buyables[6].amount)}</b> / <b>${format(Data.Buyables[6].max)}</b>`
    RestorationBuyable2Btn.innerHTML = "Cost: <b>" + format(Data.Buyables[6].price) + "</b> Restoration Points"
}

setInterval(function() {
    CalcRestorationGain();
    UpdateRestorationDisplay();
}, 100)