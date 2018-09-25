window.statSettings = {
	oldPrice: 269, // старая цена курсов онлайн
	newPrice: 99, // новая цена курсов онлайн
	lessonsCount: 10,	// количество уроков

	hoursCount: 10, // часов включено в курс

	oldPriceLightroom: 349, // старая цена двух курсов в одном с Lightroom
	newPriceLightroom: 129, // новая цена двух курсов в одном с Lightroom
	lessonsCountLightroom: 10, // количество занятий онлайн курса
	courseHoursLightroom: 8 // N‑часовой курс
};
window.statSettings.discount = ((window.statSettings.oldPrice - window.statSettings.newPrice) * 100 / window.statSettings.oldPrice).toFixed(0);
window.statSettings.economyLightroom = (window.statSettings.oldPriceLightroom - window.statSettings.newPriceLightroom).toFixed(0);
