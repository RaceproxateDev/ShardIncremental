let ProgressBar = document.getElementById("ProgressBar1")
let progress =  document.getElementById("GameProgress")

let GameRequeriments = {
    construct: new OmegaNum(1000), // shards
    destruct: new OmegaNum(10), // construction Points
    restore: new OmegaNum(15), // Destruction Points
    build: new OmegaNum(50), // Restoration Points
    CellsContent: new OmegaNum(4), // Points
}

function GrantStep(requeriment, currency) {
    if (Data[currency].gte(GameRequeriments[requeriment])) {
        Data.GameProgress = Data.GameProgress.add(1)
        UpdateProgress();
    }
}

function UpdateProgress() {
    if (Data.GameProgress.eq(0)) {
        let req = GameRequeriments.construct
        let percent = Data.shards.div(req).times(100).floor()

        progress.textContent = `Get 1,000 shards [${format(percent)} %]`
        ProgressBar.value = percent.toNumber()
       
        GrantStep("construct", "shards")

    } else if (Data.GameProgress.eq(1)) {
        let req = GameRequeriments.destruct
        let percent = Data.constructionPoints.div(req).times(100)

        progress.textContent = `Get 20 construction Points [${format(percent)} %]`
        ProgressBar.value = percent.toNumber()

        GrantStep("destruct", "constructionPoints")

    }  else if (Data.GameProgress.eq(2)) {
        let req = GameRequeriments.restore
        let percent = Data.Destructions.div(req).times(100)

        progress.textContent = `Get 15 Destructions [${format(percent)} %]`
        ProgressBar.value = percent.toNumber()

        GrantStep("restore", "Destructions")
    }
}

setInterval(() => {
    UpdateProgress();
}, 100)