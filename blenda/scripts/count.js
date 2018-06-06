window.statSettings = {

	// Интенсив
	intensivePrice: 159, // новая цена
	intensiveOldPrice: 289, // старая цена
	intensiveEndDate: '31 апреля', // дата конца скидки

	// Базовый курс
	basePrice: 199, // новая цена
	baseOldPrice: 300, // старая цена
	baseEndDate: '30 марта', // дата конца скидки

	// Стандартный курс
	standartPrice: 299, // новая цена
	standartOldPrice: 400, // старая цена
	standartEndDate: '15 апреля', // дата конца скидки

	// Премиум-курс
	premiumPrice: 470 // цена
};

(function () {
	var s = window.statSettings;
	s.intensiveEconomy = s.intensiveOldPrice - s.intensivePrice;
	s.baseEconomy = s.baseOldPrice - s.basePrice;
	s.standartEconomy = s.standartOldPrice - s.standartPrice;
})();
