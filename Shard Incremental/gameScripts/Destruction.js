let btn = document.getElementById("DestructionResetBtn");
let reqTxt = document.getElementById("DestroyReqTxt");
let content3 = document.getElementById("content3");

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
    if (Data.constructionPoints.gte(10) || hasContent("destruction")) {
        content3.style.display = "block";
    } else {
        content3.style.display = "none";
    }

    reqTxt.innerHTML = `You need <b>${format(Data.DestructionReq)}</b> construction points`;
}

setInterval(() => {
    updateHtmlDestruction()
}, 100);