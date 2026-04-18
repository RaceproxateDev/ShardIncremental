let content2 = document.getElementById("2")
let content3 = document.getElementById("content3")
let content3_1 = document.getElementById("content3_1")

function Unlock() {
    if (Data.shards.gte(1000) || hasContent("construction")) {
        content2.style.display = "block"
    } else {
        content2.style.display = "none"
    }

    if (Data.constructionPoints.gte(10) || hasContent("destruction")) {
        content3.style.display = "block"
    } else {
        content3.style.display = "none"
    }

    if (Data.Destructions.gte(8)) {
        content3_1.style.display = "block"
    } else {
        content3_1.style.display = "none"
    }
}

setInterval(function() {
    Unlock()
}, 100)