let constructResetBtn = document.getElementById("constructResetBtn")
let constructionPointGainTxt = document.getElementById("constructionPointGainTxt")
let constructionDisplayTxt = document.getElementById("constructionDisplayTxt")

let constructionBuyable1LvlTxt = document.getElementById("ConstructionBuyable1LvlTxt")
let constructionBuyable1Btn = document.getElementById("ConstructionBuyable1Btn")

let constructionBuyable2LvlTxt = document.getElementById("ConstructionBuyable2LvlTxt")
let constructionBuyable2Btn = document.getElementById("ConstructionBuyable2Btn")

function updateHtml() {
    if (Data.shards.gte(1000)) {
        constructResetBtn.innerHTML = "Construct"
    } else {
        constructResetBtn.innerHTML = "You need 1,000 shards"
    }

    constructionDisplayTxt.innerHTML = "You have <b>" + format(Data.constructionPoints) + `</b> ${OmegaNum.eq(Data.constructionPoints, 1) ? "construction point" : "construction points"}`
    constructionPointGainTxt.innerHTML = "You will gain <b>" + format(Data.constructionStorage) + "</b> construction points"

    constructionBuyable1LvlTxt.innerHTML = "Level: <b>" + format(Data.Buyables[3].amount) + "</b> / <b>" + format(Data.Buyables[3].max) + "</b>"
    constructionBuyable1Btn.innerHTML = "Cost: <b>" + format(Data.Buyables[3].price) + "</b> construction points"

    constructionBuyable2LvlTxt.innerHTML = "Level: <b>" + format(Data.Buyables[4].amount) + "</b> / <b>" + format(Data.Buyables[4].max) + "</b>"
    constructionBuyable2Btn.innerHTML = "Cost: <b>" + format(Data.Buyables[4].price) + "</b> construction points"
}

function calcConstructionStorage() {
    let exp = new OmegaNum(0.3)
    let baseDiv = new OmegaNum(1000)

    Data.constructionStorage = Data.shards.div(baseDiv).pow(exp).mul(Data.constructionMult)
}

function constructReset(force) {
    if (Data.shards.gte(1000)) {
        resetStats(2, 0)
        resetBuyables(3, 1)
        
        if (!force) {
            Data.constructionPoints = Data.constructionPoints.add(Data.constructionStorage)
        } 
        
        if (!hasContent("construction")) {
            Data.Unlocks.push("construction")
        }
    }
}

function calcConstructionMult() {
    let mult = new OmegaNum(1)
    mult = OmegaNum.times(mult, OmegaNum.add(Data.Buyables[4].amount, 1))
    if (Data.Destructions.gte(1)) mult = OmegaNum.times(mult, 1.5)
    if (Data.Destructions.gte(3)) mult = OmegaNum.times(mult, 1.25)
    if (Data.Destructions.gte(5)) mult = OmegaNum.times(mult, 2.5)
    if (Data.ConstructionEnergy.gte(1000))mult = OmegaNum.times(mult, calcConstructionPointCEBoost())

    Data.constructionMult = mult
    return mult
}

setInterval(function() {
    updateHtml()
    calcConstructionStorage()
    calcConstructionMult()
}, 100)
