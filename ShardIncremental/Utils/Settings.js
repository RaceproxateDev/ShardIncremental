let shardCheckbox = document.getElementById("ShardAutobuyCheck")
let constructionCheckbox = document.getElementById("ConstructionAutobuyCheck")

// Its text
let shardCheckboxTxt = document.getElementById("ShardAutobuyCheckTxt")
let constructionCheckboxTxt = document.getElementById("constructionAutobuyCheckTxt")

function UpdateSettingsGUI() {
    shardCheckboxTxt.textContent = (Data.Settings.AutobuyShardUpgs === true) ? "ON" : "OFF"
    constructionCheckboxTxt.textContent = (Data.Settings.AutobuyConstructionUpgs === true) ? "ON" : "OFF"
}

function EnableDisable(bool) {
    Data.Settings[bool] = !Data.Settings[bool]
}

setInterval(UpdateSettingsGUI, 100)