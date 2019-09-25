window.statSettings = {

    // Интенсив
    intensivePrice: 229, // новая цена
    intensiveOldPrice: 300, // старая цена
    intensiveEndDate: '25 сентября', // дата конца скидки

    // Базовый курс
    basePrice: 289, // новая цена
    baseOldPrice: 350, // старая цена
    baseEndDate: '25 сентября', // дата конца скидки

    // Стандартный курс
    standartPrice: 429, // новая цена
    standartOldPrice: 570, // старая цена
    standartEndDate: '25 сентября', // дата конца скидки

    // Премиум-курс
    premiumPrice: 599, // цена
    premiumOldPrice: 700, // старая цена
    premiumEndDate: '25 сентября', // дата конца скидки

    // Ультрапремиум-курс
    ultraPremiumPrice: 990, // цена
    ultraPremiumOldPrice: 1400, // старая цена
    ultraPremiumEndDate: '25 сентября', // дата конца скидки
};

(function () {
    var s = window.statSettings;
    s.intensiveEconomy = s.intensiveOldPrice - s.intensivePrice;
    s.baseEconomy = s.baseOldPrice - s.basePrice;
    s.standartEconomy = s.standartOldPrice - s.standartPrice;
    s.premiumEconomy = s.premiumOldPrice - s.premiumPrice;
    s.ultraPremiumEconomy = s.ultraPremiumOldPrice - s.ultraPremiumPrice;
})();
