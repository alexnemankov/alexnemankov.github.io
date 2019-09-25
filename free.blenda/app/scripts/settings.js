$(function () {
    // Lightbox options
    lightbox.option({
        albumLabel: "Фото %1 из %2",
        wrapAround: true,
        disableScrolling: true
    });

    // Load user settings
    var ws = window.statSettings;
    var rubleForms = ["рубль", "рубля", "рублей"];
    $('.price__intensive-new').html(ws.intensivePrice + "&nbsp;" + getNumEnding(ws.intensivePrice, rubleForms));
    $('.price__intensive-old').html(ws.intensiveOldPrice + "&nbsp;" + getNumEnding(ws.intensiveOldPrice, rubleForms));
    $('.price__intensive-economy').html(ws.intensiveEconomy);
    $('.price__intensive-date').html(ws.intensiveEndDate);

    $('.price__base-new').html(ws.basePrice + "&nbsp;" + getNumEnding(ws.basePrice, rubleForms));
    $('.price__base-old').html(ws.baseOldPrice + "&nbsp;" + getNumEnding(ws.baseOldPrice, rubleForms));
    $('.price__base-economy').html(ws.baseEconomy);
    $('.price__base-date').html(ws.baseEndDate);

    $('.price__standart-new').html(ws.standartPrice + "&nbsp;" + getNumEnding(ws.standartPrice, rubleForms));
    $('.price__standart-old').html(ws.standartOldPrice + "&nbsp;" + getNumEnding(ws.standartOldPrice, rubleForms));
    $('.price__standart-economy').html(ws.standartEconomy);
    $('.price__standart-date').html(ws.standartEndDate);

    $('.price__premium-new').html(ws.premiumPrice + "&nbsp;" + getNumEnding(ws.premiumPrice, rubleForms));
    $('.price__premium-old').html(ws.premiumOldPrice + "&nbsp;" + getNumEnding(ws.premiumOldPrice, rubleForms));
    $('.price__premium-economy').html(ws.premiumEconomy);
    $('.price__premium-date').html(ws.premiumEndDate);

    $('.price__ultrapremium-new').html(ws.ultraPremiumPrice + "&nbsp;" + getNumEnding(ws.ultraPremiumPrice, rubleForms));
    $('.price__ultrapremium-old').html(ws.ultraPremiumOldPrice + "&nbsp;" + getNumEnding(ws.ultraPremiumOldPrice, rubleForms));
    $('.price__ultrapremium-economy').html(ws.ultraPremiumEconomy);
    $('.price__ultrapremium-date').html(ws.ultraPremiumEndDate);
});
