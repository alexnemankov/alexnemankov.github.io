$(function () {
    // Load user settings
    $('.nd-gift-percent').text(window.statSettings.discount);

    $('.nd-price-discount-hours-count').text(window.statSettings.courseHoursLightroom);

    $('.nd-services-hours').text(window.statSettings.hoursCount);
    $('.nd-services-hours-text').text(getNumEnding(window.statSettings.hoursCount, ["час", "часа", "часов"]));

    $('.nd-gift-lessons-count').text(window.statSettings.lessonsCount);
    $('.nd-gift-lessons-count-text').text(getNumEnding(window.statSettings.lessonsCount, ["урок", "урока", "уроков"]));

    $('.nd-price-discount-lessons-count').text(window.statSettings.lessonsCountLightroom);
    $('.nd-price-discount-lessons-count-text').text(getNumEnding(window.statSettings.lessonsCountLightroom, ["занятия", "занятий", "занятий"]));

    var prices = [{
        selector: '.nd-gift-price-new',
        value: window.statSettings.newPrice
    }, {
        selector: '.nd-gift-price-old',
        value: window.statSettings.oldPrice
    }, {
        selector: '.nd-price-price-new',
        value: window.statSettings.newPriceLightroom
    }, {
        selector: '.nd-price-price-old',
        value: window.statSettings.oldPriceLightroom
    }, {
        selector: '.nd-price-economy',
        value: window.statSettings.economyLightroom
    }];

    //change prices for russians
    if($('body').data('country') == 'ru') {
        $.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(data) {
            var rubCourse = data.Valute.BYN.Value;

            $('.number').each(function() {
                $( this ).html(Math.round($( this ).html() * rubCourse));
            });

            $('.nd-price-economy').html($('.nd-price-price-old').html() - $('.nd-price-price-new').html());
        });
    }

    prices.forEach(function (price) {
        $(price.selector).text(price.value);
        $(price.selector + '-text')
            .text(getNumEnding(price.value, ["рубль", "рубля", "рублей"]));
    });

    //Fixed navigation
    var $menu = $(".nd-header");
    var headerHeight = $menu.height();
    $(window).on("scroll load resize", function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > headerHeight) {
            $menu.addClass("nd-header--fixed");
        } else if (scrollTop <= headerHeight) {
            $menu.removeClass("nd-header--fixed");
        }
        $(window).trigger("lookup");
    });

    // Smooth scroll to :target links
    var smoothScrollTime = 700;
    $(document).on('click', 'a[href*="#"]:not([href="#"])', function (event) {
        event.preventDefault();
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, smoothScrollTime);
                return true;
            }
        }
    });

    // Phones toggle
    $('.nd-header__phones__arrow').click(function () {
        $(this).toggleClass('active');
        $('.nd-header__phones__dropdown').toggleClass('active');
    });
    var isPhonesBlockAnimationInProgress = false;
    $(window).on("scroll load resize", function () {
        if (!isPhonesBlockAnimationInProgress) {
            isPhonesBlockAnimationInProgress = true;
            $('.nd-header__phones__arrow').removeClass('active');
            $('.nd-header__phones__dropdown').fadeOut(600, function () {
                $(this).removeClass('active').removeAttr("style");
                isPhonesBlockAnimationInProgress = false;
            });
        }
    });

    $('.nd-flex-composite-grid__item').click(function () {
        var isActive = $(this).hasClass("active");
        $('.nd-flex-composite-grid__item').removeClass("active");
        if (!isActive) {
            $(this).addClass("active");
        }
    });

    // Swiper Review initialization
    var swiper = new Swiper('.swiper-reviews', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next-review',
        prevButton: '.swiper-button-prev-review',
        spaceBetween: 30,
        loop: true,
        autoHeight: true,
        slidesPerView: 1,
        centeredSlides: true,
        grabCursor: true
    });

    // Init popups
    var openedPopups = [];
    var isInOpening = false;
    var baseModalSettings = {
        width: '750px',
        padding: 0,
        radius: 0,
        navigateCaption: false,
        navigateArrows: false,
        history: false,
        bodyOverflow: false,
        closeOnEscape: true,
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        timeout: false,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown',
        focusInput: false,
        onOpening: function (modal) {
            isInOpening = true;
            openedPopups.forEach(function (popup) {
                popup.close();
            });
            isInOpening = false;
            openedPopups.push(modal);
        },
        onClosing: function () {
            if (isInOpening) {
                return;
            }
            openedPopups.pop();
            if (openedPopups.length) {
                var previousPopup = openedPopups.pop();
                previousPopup.open();
            }
            gaTrack('/');
            yaHit('/');
        }
    };
    $("#nd-terms").iziModal($.extend({}, baseModalSettings, {
        width: '1000px',
        openFullscreen: true
    }));
    $("#nd-more").iziModal($.extend({}, baseModalSettings, {
        width: '900px'
    }));
    $("#nd-free-gift-form, " +
        "#nd-courses-form, " +
        "#nd-call-form, " +
        "#nd-success-gift-form, " +
        "#nd-menu-form, " +
        "#nd-gift-form, " +
        "#nd-approve-subscribe-form, " +
        "#nd-services__photo-modal, " +
        "#nd-services__lens-modal, " +
        "#nd-services__weather-modal, " +
        "#nd-services__macro-modal, " +
        "#nd-services__models-modal, " +
        "#nd-services__lightning-modal, " +
        "#nd-services__studio-modal, " +
        "#nd-services__family-modal, " +
        "#nd-services__light-modal, " +
        "#nd-services__project-modal, " +
        "#nd-services__people-modal, " +
        "#nd-payment, " +
        "#nd-course-standart").iziModal(baseModalSettings);
    var iziForms = [{
        trigger: '.nd-terms__trigger',
        target: '#nd-terms'
    }, {
        trigger: '.nd-courses-form__trigger',
        target: '#nd-courses-form'
    }, {
        trigger: '.nd-call-form__trigger',
        target: '#nd-call-form'
    }, {
        trigger: '.nd-menu-form__trigger',
        target: '#nd-menu-form'
    }, {
        trigger: '.nd-more__trigger',
        target: '#nd-more'
    }, {
        target: "#nd-free-gift-form"
    }, {
        target: "#nd-success-gift-form"
    }, {
        target: "#nd-gift-form"
    }, {
        trigger: '.nd-course-standart__trigger',
        target: "#nd-course-standart"
    },{
        trigger: '.nd-services__photo-trigger',
        target: "#nd-services__photo-modal"
    },{
        trigger: '.nd-services__lens-trigger',
        target: "#nd-services__lens-modal"
    },{
        trigger: '.nd-services__weather-trigger',
        target: "#nd-services__weather-modal"
    },{
        trigger: '.nd-services__macro-trigger',
        target: "#nd-services__macro-modal"
    },{
        trigger: '.nd-services__models-trigger',
        target: "#nd-services__models-modal"
    },{
        trigger: '.nd-services__lightning-trigger',
        target: "#nd-services__lightning-modal"
    },{
        trigger: '.nd-services__studio-trigger',
        target: "#nd-services__studio-modal"
    },{
        trigger: '.nd-services__family-trigger',
        target: "#nd-services__family-modal"
    },{
        trigger: '.nd-services__light-trigger',
        target: "#nd-services__light-modal"
    },{
        trigger: '.nd-services__project-trigger',
        target: "#nd-services__project-modal"
    },{
        trigger: '.nd-services__people-trigger',
        target: "#nd-services__people-modal"
    },{
        trigger: '.nd-payment-trigger',
        target: "#nd-payment"
    }];
    iziForms.forEach(function (iziForm) {
        if (iziForm.trigger) {
            $(document).on('click', iziForm.trigger, function (event) {
                event.preventDefault();
                $(iziForm.target).iziModal('open');
            });
        }
    });

    // Auto open free gift popup after delay
    // (function openGiftFormAfterDelay(delay) {
    //     setTimeout(function () {
    //         var someFormIsOpened = iziForms.some(function (iziForm) {
    //             var state = $(iziForm.target).iziModal('getState');
    //             return state == "opened" || state == "opening";
    //         });
    //         if (!someFormIsOpened) {
    //             $("#nd-free-gift-form").iziModal("open");
    //         } else {
    //             openGiftFormAfterDelay(5000);
    //         }
    //     }, delay);
    // })(90000);

    $(document).on('click', '.nd-menu-form__list__item', function (event) {
        $('#nd-menu-form').iziModal('close');
    });

    $(document).on('click', '.nd-success-popup__btn', function (event) {
        event.preventDefault();
        $('#nd-success-gift-form').iziModal('close');
        $('#nd-gift-form').iziModal('open');
    });

    $(document).on('click', '.gift__btn', function (event) {
        var $container = $(this).closest('.nd-contact-form');
        var email = $container.find('input[id$="__email"]').val();
        var name = $container.find('input[id$="__name"]').val();
        if (email) {
            $('#nd-gift-form').iziModal('close');
            storeToLocalstorage(name, null, email);
            $.post("/backend/subscribe.php", {
                name: name,
                email: email
            }).always(function (data) {
                iziForms.forEach(function (iziForm) {
                    $(iziForm.target).iziModal('close');
                });
                $('#nd-approve-subscribe-form').iziModal('open');
            });
        }
    });

    // Add phone mask
    // $("input[id*=phone]").mask("+375 (99) 999-99-99");

    // Submit button handler
    $(document).on('click', '.nd-submit', function (event) {
        if ($(this).hasClass('gift__btn')) {
            return;
        }
        var $container = $(this).closest('.nd-contact-form');
        var phone = $container.find('input[id$="__phone"]').val();
        var name = $container.find('input[id$="__name"]').val();
        var email = $container.find('input[id$="__email"]').val();
        var theme = $(this).attr('data-theme');
        if (name) {
            $('input[id$="__name"]').val(name);
        }
        if (email) {
            $('input[id$="__email"]').val(email);
        }
        if (phone) {
            $('input[id$="__phone"]').val(phone);
            submitForm(theme || 'Заявка на обратный звонок', name, phone, email);
        }

        function submitForm(theme, name, phone, email) {
            storeToLocalstorage(name, phone, email);
            $.post("/backend/submit.php", {
                theme: theme,
                name: name,
                phone: phone,
                email: email
            }).done(function (data) {
                if (data == "OK") {
                    iziForms.forEach(function (iziForm) {
                        $(iziForm.target).iziModal('close');
                    });
                    $('#nd-success-gift-form').iziModal('open');
                    gaTrack('/success.html');
                    yaHit('/success.html');
                    fbq('track', 'success', {
                        name: name,
                        phone: phone,
                        email: email
                    });
                }
            });
        }
    });

    // Submit button handler for pay
    $(document).on('click', '.nd-submit-and-pay', function (event) {
        if ($(this).hasClass('gift__btn')) {
            return;
        }
        var $container = $(this).closest('.nd-contact-form');
        var phone = $container.find('input[id$="__phone"]').val();
        var name = $container.find('input[id$="__name"]').val();
        var email = $container.find('input[id$="__email"]').val();
        var theme = $(this).attr('data-theme');
        if (name) {
            $('input[id$="__name"]').val(name);
        }
        if (email) {
            $('input[id$="__email"]').val(email);
        }
        if (phone) {
            $('input[id$="__phone"]').val(phone);
            submitForm(theme || 'Заявка на обратный звонок', name, phone, email);
        }

        function submitForm(theme, name, phone, email) {
            storeToLocalstorage(name, phone, email);
            $.post("/backend/submit.php", {
                theme: theme,
                name: name,
                phone: phone,
                email: email
            }).done(function (data) {
                if (data == "OK") {
                    iziForms.forEach(function (iziForm) {
                        $(iziForm.target).iziModal('close');
                    });
                    // $('#nd-success-gift-form').iziModal('open');
                    location.href = 'https://api.bepaid.by/products/prd_e656e2c648e29019/pay';
                    gaTrack('/success.html');
                    yaHit('/success.html');
                    fbq('track', 'success', {
                        name: name,
                        phone: phone,
                        email: email
                    });
                }
                // window.open('https://api.bepaid.by/products/prd_6b5698d781ad1a5c/pay', '_blank');

            });
        }
    });

    // Submit button handler for pay
    $(document).on('click', '.nd-submit-and-pay-two', function (event) {
        if ($(this).hasClass('gift__btn')) {
            return;
        }
        var $container = $(this).closest('.nd-contact-form');
        var phone = $container.find('input[id$="__phone"]').val();
        var name = $container.find('input[id$="__name"]').val();
        var email = $container.find('input[id$="__email"]').val();
        var theme = $(this).attr('data-theme');
        if (name) {
            $('input[id$="__name"]').val(name);
        }
        if (email) {
            $('input[id$="__email"]').val(email);
        }
        if (phone) {
            $('input[id$="__phone"]').val(phone);
            submitForm(theme || 'Заявка на обратный звонок', name, phone, email);
        }

        function submitForm(theme, name, phone, email) {
            storeToLocalstorage(name, phone, email);
            $.post("/backend/submit.php", {
                theme: theme,
                name: name,
                phone: phone,
                email: email
            }).done(function (data) {
                if (data == "OK") {
                    iziForms.forEach(function (iziForm) {
                        $(iziForm.target).iziModal('close');
                    });
                    // $('#nd-success-gift-form').iziModal('open');
                    location.href = 'https://api.bepaid.by/products/prd_65a4e6567b7b25da/pay';
                    gaTrack('/success.html');
                    yaHit('/success.html');
                    fbq('track', 'success', {
                        name: name,
                        phone: phone,
                        email: email
                    });
                }
            });
        }
    });

    // Youtube video block
    $(document).on('click', '.nd-video__icon', function (event) {
        var height = $('.nd-video').outerHeight();
        $('.nd-video')
            .css({
                'max-height': height
            })
            .html(
                '<iframe width="640" height="360" ' +
                'src="https://www.youtube.com/embed/videoseries?list=PLJJ6y-ag9R6GIoPlpR1tqCu_leyD4APk8&autoplay=1" ' +
                'frameborder="0" allowfullscreen></iframe>'
            )
            .removeClass('nd-video')
            .addClass('nd-video__embedded');
        $(window).trigger('resize');
    });

    // Portfolio
    $("img").unveil(1000);
    lightbox.option({
        resizeDuration: 200,
        wrapAround: true,
        albumLabel: "Работа %1 из %2"
    });
    $(document).on('click', '.nd-tab__header__title', function () {
        var $toggler = $(this);
        var targetId = $toggler.attr('data-target');
        $('.nd-tab__header__title').removeClass('nd-tab__header__title--active');
        $toggler.addClass('nd-tab__header__title--active');
        $('.nd-tab__content__container').removeClass('nd-tab__content__container--active');
        $('#' + targetId)
            .addClass('nd-tab__content__container--active')
            .find('img:not(.hidden)')
            .trigger('unveil');
    });
    $(document).on('click', '.nd-slider__show-more__text', function () {
        var $container = $(this).closest('.nd-tab__content__container');
        $container.find('.hidden').removeClass('hidden');
        $container.find('img').trigger('unveil');
        $(this).remove();
    });

    // Scrollup button
    var scrollupSelector = '.nd-scrollup';
    var smoothScrollTime = 700;
    $(window).on("scroll load resize", function () {
        if ($(this).scrollTop() > 200) {
            $(scrollupSelector).fadeIn();
        } else {
            $(scrollupSelector).fadeOut();
        }
    });
    $(scrollupSelector).click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, smoothScrollTime);
        return false;
    });

    $(".current-year").text(new Date().getFullYear());
    loadFromLocalstorage();



});

function storeToLocalstorage(name, phone, email) {
    if (supports_html5_storage()) {
        if (name) {
            localStorage.setItem('client_name', name);
        }
        if (phone) {
            localStorage.setItem('client_phone', phone);
        }
        if (email) {
            localStorage.setItem('client_email', email);
        }
    }
}

function loadFromLocalstorage() {
    if (supports_html5_storage()) {
        if (localStorage['client_name']) {
            $('input[id$="__name"]').val(localStorage['client_name']);
        }
        if (localStorage['client_phone']) {
            $('input[id$="__phone"]').val(localStorage['client_phone']);
        }
        if (localStorage['client_email']) {
            $('input[id$="__email"]').val(localStorage['client_email']);
        }
    }
}

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

// Source: https://habrahabr.ru/post/105428/
function getNumEnding(iNumber, aEndings) {
    var sEnding, i;
    iNumber = iNumber % 100;
    if (iNumber >= 11 && iNumber <= 19) {
        sEnding = aEndings[2];
    } else {
        i = iNumber % 10;
        switch (i) {
            case (1):
                sEnding = aEndings[0];
                break;
            case (2):
            case (3):
            case (4):
                sEnding = aEndings[1];
                break;
            default:
                sEnding = aEndings[2];
        }
    }
    return sEnding;
}
