let content2 = document.getElementById("content2")
let content3 = document.getElementById("content3")
let content3_1 = document.getElementById("content3_1")
let content4 = document.getElementById("content4")
let content4_1 = document.getElementById("content4_1")
let content5 = document.getElementById("content5")

function Unlock() {
    content2.style.display = (Data.shards.gte(1000) || hasContent("construction")) ? "block" : "none"
    content3.style.display = (Data.constructionPoints.gte(10) || hasContent("destruction")) ? "block" : "none"
    content3_1.style.display = (Data.Destructions.gte(8)) ? "block" : "none"
    content4.style.display = (Data.Destructions.gte(15) || hasContent("restoration")) ? "block" : "none"
    content4_1.style.display = (Data.RestorationPoints.gte(5) || Data.Upgrades.includes(3)) ? "block" : "none"
    content5.style.display = (Data.RestorationPoints.gte(50) || hasContent("build")) ? "block" : "none"
}

setInterval(function() {
    Unlock()
}, 100)