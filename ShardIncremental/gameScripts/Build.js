let PointsDisplayTxt = document.getElementById("PointsDisplayTxt");
let BuildReqTxt = document.getElementById("BuildReqTxt");
let BuildResetBtn = document.getElementById("BuildResetBtn");

let BuildMilestone1 = document.getElementById("BuildMilestone1");
let BuildMilestone2 = document.getElementById("BuildMilestone2");
let BuildMilestone3 = document.getElementById("BuildMilestone3");
let BuildMilestone4 = document.getElementById("BuildMilestone4");
let BuildMilestone5 = document.getElementById("BuildMilestone5");
let BuildMilestone6 = document.getElementById("BuildMilestone6");
let BuildMilestone7 = document.getElementById("BuildMilestone7");

let CellDisplayTxt = document.getElementById("CellDisplayTxt");
let CellMultTxt = document.getElementById("CellMultTxt");

let CellBuyable1LvlTxt = document.getElementById("CellBuyable1LvlTxt");
let CellBuyable1Btn = document.getElementById("CellBuyable1Btn");
let CellBuyable2LvlTxt = document.getElementById("CellBuyable2LvlTxt");
let CellBuyable2Btn = document.getElementById("CellBuyable2Btn");

let ExtendResetBtn = document.getElementById("ExtendResetBtn");
let ExtensionsDisplayTxt = document.getElementById("ExtensionsDisplayTxt");


function calcPointMult() {
    let mult = new OmegaNum(1);

    Data.PointMult = mult;
    return mult;
}

function keepUpgs() {
    let keep = 9;

    return keep;
}

function UpdateBuildDisplay() {
    PointsDisplayTxt.innerHTML = "You have <b>" + format(Data.Points) + "</b> " + (Data.Points.eq(1) ? "Point" : "Points");
    BuildReqTxt.innerHTML = "You need <b>" + format(Data.PointReq) + "</b> Restoration Points to build.";
    BuildResetBtn.innerHTML = (Data.RestorationPoints.gte(Data.PointReq)) ? "Build" : "Meet the requirements to build";

    BuildMilestone1.style.backgroundColor = (Data.Points.gte(1)) ? "lightgray" : "black";
    BuildMilestone2.style.backgroundColor = (Data.Points.gte(2)) ? "lightgray" : "black";
    BuildMilestone3.style.backgroundColor = (Data.Points.gte(4)) ? "lightgray" : "black";
    BuildMilestone4.style.backgroundColor = (Data.Points.gte(5)) ? "lightgray" : "black";
    BuildMilestone5.style.backgroundColor = (Data.Points.gte(6)) ? "lightgray" : "black";
    BuildMilestone6.style.backgroundColor = (Data.Points.gte(7)) ? "lightgray" : "black";
    BuildMilestone7.style.backgroundColor = (Data.Points.gte(8)) ? "lightgray" : "black";

    CellDisplayTxt.innerHTML = "You have <b>" + format(Data.Cells) + "</b> " + (Data.Cells.eq(1) ? "Cell" : "Cells");
    CellMultTxt.innerHTML = "<b>" + format(Data.CellMult) + "x</b> every <b>" + CalcSecondsToGenCell() + "</b> seconds";

    CellBuyable1LvlTxt.innerHTML = "Level: <b>" + format(Data.Buyables[7].amount) + "</b> / <b>" + format(Data.Buyables[7].max) + "</b>";
    CellBuyable1Btn.innerHTML = `Cost: <b>${format(Data.Buyables[7].price)}</b> Cells`
    CellBuyable2LvlTxt.innerHTML = "Level: <b>" + format(Data.Buyables[8].amount) + "</b> / <b>" + format(Data.Buyables[8].max) + "</b>";
    CellBuyable2Btn.innerHTML = `Cost: <b>${format(Data.Buyables[8].price)}</b> Cells`

    ExtendResetBtn.innerHTML = (Data.Cells.gte(Data.ExtendReq)) ? "Extend" : `You need <b>${format(Data.ExtendReq)}</b> Cells to extend.`;
    ExtensionsDisplayTxt.innerHTML = "You have <b>" + format(Data.Extensions) + "</b> " + (Data.Extensions.eq(1) ? "Extension" : "Extensions");
}

function BuildReset(force) {
    if (Data.RestorationPoints.gte(Data.PointReq)) {
        resetStats(13, 0);
        resetBuyables(7, 1);

        Data.Upgrades = Data.Upgrades.filter(upg => upg >= keepUpgs())

        if (!force) {
            Data.Points = Data.Points.add(Data.PointMult);
            Data.PointReq = Data.PointReq.mul(Data.PointScale);
        }

        if (!hasContent("build")) {
            Data.Unlocks.push("build");
        }
    }
}

function GenerateCells() {
    Data.Cells = Data.Cells.mul(Data.CellMult);
}

function CellMultCalc() {
    let mult = new OmegaNum(1.01);
    mult = mult.add(Data.Buyables[7].amount.mul(0.01))
    mult = mult.add(Data.Extensions.mul(0.01))
    if (Data.Extensions.gte(5)) mult = mult.add(0.02)
    if (Data.Points.gte(5)) mult = mult.add(0.05)
    if (Data.Points.gte(6)) mult = mult.add(0.01)
    if (Data.Points.gte(8)) mult = mult.add(0.05)

    Data.CellMult = mult;
    return mult;
}

function CalcSecondsToGenCell() {
    let sec = 30
    sec = sec - (Data.Buyables[8].amount.toNumber())
    if (Data.Extensions.gte(2)) sec = sec - 1
    if (Data.Points.gte(6)) sec = sec - 0.5
    if (Data.Points.gte(8)) sec = sec - 1

    return sec;
}

function calcCellUpgsCap() {
    let cellUpg1Cap = new OmegaNum(10);
    let cellUpg2Cap = new OmegaNum(10);

    cellUpg1Cap = cellUpg1Cap.add(Data.Extensions.mul(10));

    Data.Buyables[7].max = cellUpg1Cap;
    Data.Buyables[8].max = cellUpg2Cap;
}

function ExtendReset(force) {
    if (Data.Cells.gte(Data.ExtendReq)) {
        resetStats(18, 17)
        resetBuyables(9, 7)

        if (!force) {
            Data.Extensions = Data.Extensions.add(1);
            Data.ExtendReq = Data.ExtendReq.mul(Data.ExtendScale);
        }
    }
}

function ExtendRequerimentCalc() {
    let req = new OmegaNum(20).times(OmegaNum.pow(Data.ExtendScale, Data.Extensions))
    if (Data.Points.gte(7)) req = req.div(25)

    Data.ExtendReq = req
    return req
}

setInterval(function() {
    calcPointMult();
    UpdateBuildDisplay();
    CellMultCalc();
    calcCellUpgsCap();
    ExtendRequerimentCalc();
}, 100)

setInterval(function() {
    GenerateCells();
}, CalcSecondsToGenCell() * 1000)