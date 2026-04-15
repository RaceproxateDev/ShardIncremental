let construction = document.getElementById("content2")

function UnlockConstruction() {
    if (Data.shards.gte(1000) || hasContent("construction")) {
        construction.style.display = "block"
    } else {
        construction.style.display = "none"
    }
}

setInterval(function() {
    UnlockConstruction()
}, 100)