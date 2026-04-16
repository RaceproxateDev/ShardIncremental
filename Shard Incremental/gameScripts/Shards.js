let shardTxt = document.getElementById("shardDisplayTxt")
let shardUpg1LvlTxt = document.getElementById("ShardBuyable1LvlTxt")
let buyShardUpg1Btn = document.getElementById("ShardBuyable1Btn")

let shardUpg2LvlTxt = document.getElementById("ShardBuyable2LvlTxt")
let buyShardUpg2Btn = document.getElementById("ShardBuyable2Btn")

function updateShardTxt() {
    shardTxt.innerHTML = `You have <b>${format(Data.shards)}</b> ${OmegaNum.eq(Data.shards, 1) ? "shard" : "shards"}`
    shardUpg1LvlTxt.innerHTML = `Level: <b>${format(Data.Buyables[1].amount)}</b> / <b>${format(Data.Buyables[1].max)}</b>`
    buyShardUpg1Btn.innerHTML = `Cost: <b>${format(Data.Buyables[1].price)}</b> shards`
    shardUpg2LvlTxt.innerHTML = `Level: <b>${format(Data.Buyables[2].amount)}</b> / <b>${format(Data.Buyables[2].max)}</b>`
    buyShardUpg2Btn.innerHTML = `Cost: <b>${format(Data.Buyables[2].price)}</b> shards`
}

function canGenShard() {
    let can = true

    if (can === true) {
        return Data.shards = OmegaNum.add(Data.shards, Data.shardMult)
    }
}

function calcShardMult() {
    let mult = new OmegaNum(1)
    mult = OmegaNum.times(mult, OmegaNum.add(Data.Buyables[1].amount, 1))
    mult = OmegaNum.times(mult, OmegaNum.pow(2, Data.Buyables[2].amount))
    if (Data.Buyables[3].amount.gt(0)) mult = OmegaNum.times(mult, OmegaNum.times(Data.Buyables[3].amount, 2.5))
    if (Data.Destructions.gte(1)) mult = OmegaNum.times(mult, 2)

    Data.shardMult = mult
    return mult
}

setInterval(() => {
    updateShardTxt()
    calcShardMult()
}, 100)

setInterval(() => {
    canGenShard()
}, 1000)