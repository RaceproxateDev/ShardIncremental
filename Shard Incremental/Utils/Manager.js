function resetStats(limit, start) {
    for (let i = start; i < limit; i++) {
        Data[Object.keys(Data)[i]] = Template[Object.keys(Template)[i]]
    }
}

function resetBuyables(limit, start) {
    for (let i = start; i < limit; i++) {
        Data.Buyables[i] = {
            amount: new OmegaNum(Template.Buyables[i].amount),
            max: new OmegaNum(Template.Buyables[i].max),
            price: new OmegaNum(Template.Buyables[i].price),
            scale: new OmegaNum(Template.Buyables[i].scale)
        };
    }
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