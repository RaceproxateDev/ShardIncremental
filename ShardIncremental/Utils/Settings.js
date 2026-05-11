let CheckBoxes = document.getElementsByClassName("SettingsCheck")

function CheckOrUncheck(bool, checkbox) {
    Data.Settings[bool] = !Data.Settings[bool]

    if (Data.Settings[bool] === true) {
        CheckBoxes[checkbox].innerHTML = "X"
    } else {
        CheckBoxes[checkbox].innerHTML = ""
    }
}

setInterval(() => {
    CheckBoxes[0].innerHTML = (Data.Settings.AutobuyShardUpgs === true) ? "X" : ""
    CheckBoxes[1].innerHTML = (Data.Settings.AutobuyConstructionUpgs === true) ? "X" : ""
}, 100)