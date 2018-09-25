window.statSettings = {

    // Интенсив
    intensivePrice: 159, // новая цена
    intensiveOldPrice: 289, // старая цена
    intensiveEndDate: '14 июня', // дата конца скидки

    // Базовый курс
    basePrice: 239, // новая цена
    baseOldPrice: 310, // старая цена
    baseEndDate: '14 июня', // дата конца скидки

    // Стандартный курс
    standartPrice: 369, // новая цена
    standartOldPrice: 490, // старая цена
    standartEndDate: '14 июня', // дата конца скидки

    // Премиум-курс
    premiumPrice: 539 // цена
};

(function () {
    var s = window.statSettings;
    s.intensiveEconomy = s.intensiveOldPrice - s.intensivePrice;
    s.baseEconomy = s.baseOldPrice - s.basePrice;
    s.standartEconomy = s.standartOldPrice - s.standartPrice;
})();
