"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLevelEnum = exports.PreparationTimeEnum = exports.CategoryEnum = exports.ObjectifEnum = void 0;
var ObjectifEnum;
(function (ObjectifEnum) {
    ObjectifEnum["ALL"] = "Tous";
    ObjectifEnum["PERDRE_POIDS"] = "Perdre du poids";
    ObjectifEnum["PRENDRE_POIDS"] = "Prendre du poids";
    ObjectifEnum["MUSCLER"] = "Se muscler";
    ObjectifEnum["MAINTENIR_POIDS"] = "Maintenir le poids";
})(ObjectifEnum || (exports.ObjectifEnum = ObjectifEnum = {}));
var CategoryEnum;
(function (CategoryEnum) {
    CategoryEnum["ALL"] = "Tous";
    CategoryEnum["DINER"] = "Diner";
    CategoryEnum["DEJ"] = "D\u00E9jeuner";
    CategoryEnum["PETIT_DEJ"] = "Petit D\u00E9jeuner";
    CategoryEnum["SNACK"] = "Snack";
    CategoryEnum["ENTREE"] = "Entr\u00E9e";
    CategoryEnum["PRINCIPAL"] = "Plat principal";
})(CategoryEnum || (exports.CategoryEnum = CategoryEnum = {}));
var PreparationTimeEnum;
(function (PreparationTimeEnum) {
    PreparationTimeEnum["ALL"] = "Tous";
    PreparationTimeEnum["VERY_SHORT"] = "Moins de 15 minutes";
    PreparationTimeEnum["SHORT"] = "15-30 minutes";
    PreparationTimeEnum["MEDIUM"] = "30-45 minutes";
    PreparationTimeEnum["LONG"] = "45-60 minutes";
    PreparationTimeEnum["VERY_LONG"] = "Plus de 60 minutes";
})(PreparationTimeEnum || (exports.PreparationTimeEnum = PreparationTimeEnum = {}));
var ActivityLevelEnum;
(function (ActivityLevelEnum) {
    ActivityLevelEnum["SEDENTAIRE"] = "S\u00E9dentaire";
    ActivityLevelEnum["LEG_ACTIF"] = "L\u00E9g\u00E8rement actif";
    ActivityLevelEnum["MOD_ACTIF"] = "Mod\u00E9r\u00E9ment actif";
    ActivityLevelEnum["TRES_ACTIF"] = "Tr\u00E8s actif";
    ActivityLevelEnum["EXT_ACTIF"] = "Extr\u00EAmement actif";
})(ActivityLevelEnum || (exports.ActivityLevelEnum = ActivityLevelEnum = {}));
//# sourceMappingURL=recipe-enums.js.map