$(function () {
    //magnific-popup settings for teachers works
    var magPopSettings = {
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            }
        }
    };

    $('.popup-gallery-shohan').magnificPopup(magPopSettings);
    $('.popup-gallery-lad').magnificPopup(magPopSettings);
    $('.popup-gallery-arinohin').magnificPopup(magPopSettings);
    $('.popup-gallery-kovalchuk').magnificPopup(magPopSettings);
    $('.popup-gallery-barilo').magnificPopup(magPopSettings);
    $('.popup-gallery-bahurevich').magnificPopup(magPopSettings);
    $('.popup-gallery-mekler').magnificPopup(magPopSettings);
    $('.popup-gallery-sibas').magnificPopup(magPopSettings);
    $('.popup-gallery-pryadko').magnificPopup(magPopSettings);
    $('.popup-gallery-pavlovskaya').magnificPopup(magPopSettings);
    $('.portfolio-gallery-people-01').magnificPopup(magPopSettings);
    $('.portfolio-gallery-people-02').magnificPopup(magPopSettings);
    $('.portfolio-gallery-people-03').magnificPopup(magPopSettings);
    $('.portfolio-gallery-people-04').magnificPopup(magPopSettings);
    $('.portfolio-gallery-people-05').magnificPopup(magPopSettings);
    $('.portfolio-gallery-people-06').magnificPopup(magPopSettings);
    $('.portfolio-gallery-people-07').magnificPopup(magPopSettings);
    $('.portfolio-gallery-people-08').magnificPopup(magPopSettings);


    //faq toggle
    $(".faq-item__question").on("click", function () {
        $(this).parent().toggleClass("opened");
        $(this).next().slideToggle(150)
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

    addPhoneToggle();

    function addPhoneToggle() {
        if ($('body').width() > 800) {
            var phoneLink = $('.nd-header__phones__main-phone__link'),
                phoneLinkArrow = $('.nd-header__phones__arrow');

            phoneLink.on('click', function(e) {
                e.preventDefault();

                phoneLinkArrow.click();
            });

        }
    }

    // Reviews slider
    $('.nd-flex-composite-grid__item').click(function () {
        var isActive = $(this).hasClass("active");
        $('.nd-flex-composite-grid__item').removeClass("active");
        if (!isActive) {
            $(this).addClass("active");
        }
    });

    $(document).on('click', '.nd-reviews__prev, .nd-reviews__next', function () {
        var isPrev = $(this).hasClass('nd-reviews__prev');
        var $authors = $('.nd-reviews__authors').find('.nd-reviews__author');
        var $reviews = $('.nd-reviews__container').find('.nd-review__body');
        var count = $authors.length;
        var index = 1;
        if (isPrev) {
            index = $authors.filter('.active').index() - 1;
            if (index <= 0) {
                index = count;
            }
        } else {
            index = $authors.filter('.active').index() + 1;
            if (index >= count + 1) {
                index = 1;
            }
        }
        index--;
        $authors.removeClass('active');
        $reviews.removeClass('active').removeAttr("style");
        $authors.eq(index).addClass('active');
        $reviews.eq(index).addClass('active');
    });

    $('.nd-reviews__author').click(function () {
        $('.nd-reviews__author').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index() - 1;
        var $active = $($('.nd-review__body').get(index));
        $('.nd-review__body.active').animate({
            opacity: 0
        }, 200, function () {
            $('.nd-review__body').removeClass("active").removeAttr("style");
            $active
                .css({
                    opacity: 0,
                    display: "block"
                })
                .animate({
                    opacity: 1
                }, 200, function () {
                    $active.addClass("active");
                });
        });
    });

    // Swiper Portfolio initialization
    var galleryTop = new Swiper('.gallery-top', {
        autoplay: 4000,
        spaceBetween: 10,
        grabCursor: true,
        autoplayDisableOnInteraction: false
    });

    var galleryShohan = new Swiper('.gallery-shohan', {
        slidesPerView: 1,
        autoplay: 4000,
        spaceBetween: 10,
        grabCursor: true,
        autoplayDisableOnInteraction: true,
        loop: true,
        nextButton: '.nd-team-works__next',
        prevButton: '.nd-team-works__prev'
    });

    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 0,
        slidesPerView: 'auto',
        centeredSlides: true,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        grabCursor: true,
        autoplayDisableOnInteraction: false,
        nextButton: '.swiper-button-next-thumbs',
        prevButton: '.swiper-button-prev-thumbs'
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;

    // Swiper Employees initialization
    var employeesSwiper = new Swiper('.nd-team__swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        grabCursor: true,
        loop: true,
        nextButton: '.nd-team__next',
        prevButton: '.nd-team__prev',
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            760: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });

    var studentsSwiper = new Swiper('.nd-students__swiper-container', {
        slidesPerView: 4,
        spaceBetween: 30,
        grabCursor: true,
        loop: true,
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            760: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });



    // Swiper Prices initialization
    var pricesSwiper = new Swiper('.nd-price__swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        grabCursor: false,
        loop: true,
        uniqueNavElements: false,
    });
    $(document).on('click', '.nd-price__slide-next', function () {
        pricesSwiper.slideNext();
    });
    $(document).on('click', '.nd-price__slide-prev', function () {
        pricesSwiper.slidePrev();
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
    $(["#nd-free-gift-form",
        "#nd-call-form",
        "#nd-success-gift-form",
        "#nd-success-form",
        "#nd-gift-form",
        "#nd-menu-form",
        "#nd-course-standart",
        "#nd-adress-map",
        "#works-shohan-modal",
        "#nd-services__photo-modal",
        "#nd-services__lens-modal",
        "#nd-services__weather-modal",
        "#nd-services__macro-modal",
        "#nd-services__models-modal",
        "#nd-services__lightning-modal",
        "#nd-services__studio-modal",
        "#nd-services__family-modal",
        "#nd-services__light-modal",
        "#nd-services__project-modal",
        "#nd-services__people-modal"
    ].join(", ")).iziModal(baseModalSettings);
    var iziForms = [{
        trigger: '.nd-terms__trigger',
        target: '#nd-terms'
    }, {
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
        target: "#nd-success-form"
    }, {
        target: "#nd-success-gift-form"
    }, {
        target: "#nd-gift-form"
    }, {
        trigger: '.nd-course-standart__trigger',
        target: "#nd-course-standart"
    }, {
        trigger: '.nd-contact__list__item:first',
        target: "#nd-adress-map"
    }, {
        trigger: '#works-shohan',
        target: "#works-shohan-modal"
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
    },
    ];
    iziForms.forEach(function (iziForm) {
        if (iziForm.trigger) {
            $(document).on('click', iziForm.trigger, function (event) {
                event.preventDefault();
                $(iziForm.target).iziModal('open');
            });
        }
    });

    // Call form buttons
    $(document).on('click', '.nd-call-form__btn', function () {
        var $button = $(this);
        var theme = $button.attr("data-theme");
        var emailTheme = $button.attr("data-email-theme");
        var analyticsForm = $button.attr('data-analytics');
        var $form = $("#nd-call-form");
        $form.find('.nd-block-header__header').text(theme);
        $form.find('button.nd-submit')
            .attr("data-theme", emailTheme)
            .attr("data-analytics", analyticsForm);
        $form.iziModal("open");
    });

    // Auto open free gift popup after delay
    (function openGiftFormAfterDelay(delay) {
        setTimeout(function () {
            var someFormIsOpened = iziForms.some(function (iziForm) {
                var state = $(iziForm.target).iziModal('getState');
                return state == "opened" || state == "opening";
            });
            if (!someFormIsOpened) {
                $("#nd-free-gift-form").iziModal("open");
            } else {
                openGiftFormAfterDelay(5000);
            }
        }, delay);
    })(60000);

    $(document).on('click', '.nd-menu-form__list__item', function (event) {
        $('#nd-menu-form').iziModal('close');
    });

    $(document).on('click', '.nd-success-popup__btn', function (event) {
        event.preventDefault();
        $('#nd-success-gift-form').iziModal('close');
        $('#nd-gift-form').iziModal('open');
    });

    $(document).on('click', '.gift__btn', function (event) {
        var $button = $(this);
        var $container = $(this).parent('.nd-contact-form');
        var email = $container.find('input[id$="__email"]').val();
        var name = $container.find('input[id$="__name"]').val() || localStorage['client_name'] || "";
        var analyticsForm = $button.attr('data-analytics');
        if (name) {
            $('input[id$="__name"]').val(name);
        }
        if (email) {
            $('input[id$="__email"]').val(email);
            storeToLocalstorage(name, null, email);
            $button.attr('disabled', 'disabled');
            $.post("./backend/subscribe.php", {
                email: email,
                name: name
            }).done(function (data) {
                $('#nd-gift-form').iziModal('close');
                $('#nd-success-form').iziModal('open');
                if (analyticsForm) {
                    gaForm(analyticsForm);
                    yaGoal(analyticsForm);
                }
            }).always(function () {
                $button.removeAttr('disabled');
            });
        }
    });

    // Add phone mask
    $("input[id*=phone]").mask("+375 (99) 999-99-99");

    // Submit button handler
    $(document).on('click', '.nd-submit', function (event) {
        if ($(this).hasClass('gift__btn')) {
            return;
        }
        var $button = $(this);
        var $container = $button.parent('.nd-contact-form');
        var phone = $container.find('input[id$="__phone"]').val();
        var name = $container.find('input[id$="__name"]').val();
        var theme = $button.attr('data-theme');
        var analyticsForm = $button.attr('data-analytics');
        if (name) {
            $('input[id$="__name"]').val(name);
        }
        if (phone) {
            $('input[id$="__phone"]').val(phone);
            submitForm(theme || 'Заявка на обратный звонок', name, phone);
        }

        function submitForm(theme, name, phone) {
            $button.attr('disabled', 'disabled');
            storeToLocalstorage(name, phone);
            $.post("./backend/submit.php", {
                theme: theme,
                name: name,
                phone: phone
            }).done(function (data) {
                if (data == "OK") {
                    iziForms.forEach(function (iziForm) {
                        $(iziForm.target).iziModal('close');
                    });
                    $('#nd-success-gift-form').iziModal('open');
                    if (analyticsForm) {
                        gaForm(analyticsForm);
                        yaGoal(analyticsForm);
                    } else {
                        gaTrack('/success.html');
                        yaHit('/success.html');
                    }
                    fbq('track', 'success', {
                        name: name,
                        phone: phone
                    });
                }
            }).always(function () {
                $button.removeAttr('disabled');
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
                '<iframe width="640" height="445" ' +
                'src="https://www.youtube.com/embed/ILY7DSbzfPE?autoplay=1" ' +
                'frameborder="0" allowfullscreen></iframe>'
            )
            .removeClass('nd-video')
            .addClass('nd-video__embedded');
        $(window).trigger('resize');
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
