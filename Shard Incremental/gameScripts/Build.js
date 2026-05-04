let PointsDisplayTxt = document.getElementById("PointsDisplayTxt");
let BuildReqTxt = document.getElementById("BuildReqTxt");
let BuildResetBtn = document.getElementById("BuildResetBtn");

function calcPointMult() {
    let mult = new OmegaNum(1);

    Data.PointMult = mult;
    return mult;
}

function keepUpgs() {
    let keep = 8;

    return keep;
}

function UpdateBuildDisplay() {
    PointsDisplayTxt.innerHTML = "You have <b>" + format(Data.Points) + "</b> " + (Data.Points.eq(1) ? "Point" : "Points");
    BuildReqTxt.innerHTML = "You need <b>" + format(Data.PointReq) + "</b> Restoration Points to build.";
    BuildResetBtn.innerHTML = (Data.RestorationPoints.gte(Data.PointReq)) ? "Build" : "Meet the requirements to build";
}

function BuildReset(force) {
    if (Data.RestorationPoints.gte(Data.PointReq)) {
        resetStats(13, 0);
        resetBuyables(6, 1);

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

setInterval(function() {
    calcPointMult();
    UpdateBuildDisplay();
}, 100)