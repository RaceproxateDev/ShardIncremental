let CheckBoxes = document.getElementsByClassName("SettingsCheck")

function CheckOrUncheck(bool, checkbox) {
    Data.Settings[bool] = !Data.Settings[bool]

    if (Data.Settings[bool] === true) {
        CheckBoxes[checkbox].textContent = "X"
    } else {
        CheckBoxes[checkbox].textContent = ""
    }
}

setInterval(() => {
    CheckBoxes[0].textContent = (Data.Settings.AutobuyShardUpgs === true) ? "X" : ""
    CheckBoxes[1].textContent = (Data.Settings.AutobuyConstructionUpgs === true) ? "X" : ""
}, 100)