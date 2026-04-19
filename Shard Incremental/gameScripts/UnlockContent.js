let content2 = document.getElementById("content2")
let content3 = document.getElementById("content3")
let content3_1 = document.getElementById("content3_1")
let content4 = document.getElementById("content4")

function Unlock() {
    content2.style.display = (Data.shards.gte(1000) || hasContent("construction")) ? "block" : "none"
    content3.style.display = (Data.constructionPoints.gte(10) || hasContent("destruction")) ? "block" : "none"
    content4.style.display = (Data.Destructions.gte(15) || hasContent("restoration")) ? "block" : "none"
}

setInterval(function() {
    Unlock()
}, 100)