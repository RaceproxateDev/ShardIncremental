function resetStats(limit, start) {
    for (let i = start; i < limit; i++) {
        Data[i] = Template[i]
    }
}

function resetBuyables(limit, start) {
    for (let i = start; i < limit; i++) {
        Data.Buyables[i] = Template.Buyables[i]
    }
}

function unlockContent(content) {
    if (Data.Unlocks.includes(content)) return;

    Data.Unlocks.push(content)
}

function hasContent(content) {
    return Data.Unlocks.includes(content)
}

function buyUpg(id, currency) {
    let upg = Data.Buyables[id]
    let cost = upg.price

    if (OmegaNum.gte(Data[currency], cost) && !OmegaNum.gte(upg.amount, upg.max)) {
        Data[currency] = OmegaNum.sub(Data[currency], cost)
        upg.amount = OmegaNum.add(upg.amount, 1)
        upg.price = OmegaNum.times(upg.price, upg.scale)
    }
}