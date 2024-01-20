"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankValues = exports.vpRanks = exports.RanksProba = exports.ComponentIds = exports.StrengthRank = void 0;
var StrengthRank;
(function (StrengthRank) {
    StrengthRank[StrengthRank["e"] = 1] = "e";
    StrengthRank[StrengthRank["d"] = 1.1] = "d";
    StrengthRank[StrengthRank["c"] = 1.2] = "c";
    StrengthRank[StrengthRank["b"] = 1.3] = "b";
    StrengthRank[StrengthRank["a"] = 1.4] = "a";
    StrengthRank[StrengthRank["s"] = 1.6] = "s";
    StrengthRank[StrengthRank["z"] = 3.5] = "z";
})(StrengthRank || (exports.StrengthRank = StrengthRank = {}));
exports.RanksProba = {
    e: 100,
    d: 80,
    c: 65,
    b: 50,
    a: 40,
    s: 25,
    z: 1
};
exports.vpRanks = {
    e: 10,
    d: 15,
    c: 25,
    b: 40,
    a: 60,
    s: 100,
    z: 500
};
var RankValues;
(function (RankValues) {
    RankValues[RankValues["e"] = 1] = "e";
    RankValues[RankValues["d"] = 2] = "d";
    RankValues[RankValues["c"] = 3] = "c";
    RankValues[RankValues["b"] = 4] = "b";
    RankValues[RankValues["a"] = 5] = "a";
    RankValues[RankValues["s"] = 6] = "s";
    RankValues[RankValues["z"] = 7] = "z";
})(RankValues || (exports.RankValues = RankValues = {}));
var ComponentIds;
(function (ComponentIds) {
    ComponentIds["YokaiHeal"] = "button.static.yokai.heal";
    ComponentIds["YokaiHealSelector"] = "selectors.string.static.yokai.heal.item";
    ComponentIds["BingokaiSelector"] = "selectors.string.dynamic.bingokai.coin";
    ComponentIds["ShopBuy"] = "button.static.shop.buyItem";
    ComponentIds["ShopNext"] = "button.static.shop.page.next";
    ComponentIds["ShopPrevious"] = "button.static.shop.page.previous";
    ComponentIds["ShopBuyModal"] = "modal.dynamic.shop.buy.name";
    ComponentIds["ShopBuyModalField"] = "modal.dynamic.shop.buy.input";
    ComponentIds["ShopBuyModalQuantity"] = "modal.dynamic.shop.buy.quantity";
    ComponentIds["ControlItemModal"] = "modal.dynamic.control.items";
    ComponentIds["ControlItemModalField"] = "modal.dynamic.control.items.name";
    ComponentIds["ControlItemModalQuantity"] = "modal.dynamic.control.items.quantity";
})(ComponentIds || (exports.ComponentIds = ComponentIds = {}));
