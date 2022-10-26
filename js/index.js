// window.onload = function () {
//   document.querySelector('.preloader').classList.add("preloader-remove");
// };
document.addEventListener("DOMContentLoaded", () => {

  // GENERAL

  const element = document.querySelector('#selectCustom');
  const choices = new Choices(element, {
    searchEnabled: false,
    shouldSort: false,
  })

  $(function () {
    $(".accordion").accordion({
      // collapsible: true,
      //позволяет закрыть все вопросы
      active: 0,
      header: '.accordion__header',
      heightStyle: 'content'
    });
  });

  let links = document.querySelectorAll('a[href^="#"]'),
    topOffset = 50;

  links.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let href = this.getAttribute('href').slice(1);
      const targetElem = document.getElementById(href);

      const elemPosition = targetElem.getBoundingClientRect().top;
      const offsetPosition = elemPosition - topOffset;
      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });


  // BACK-SLIDER

  const swiper = new Swiper('.back-swiper', {
    autoplay: {
      delay: 8000,
    },
    speed: 1800,
    loop: true,
  });

  // BURGER-MENU

  const burger = document.querySelector('.burger');
  if (burger) {
    const menu = document.querySelector('.menu');
    burger.addEventListener('click', function (e) {
      e.currentTarget.classList.toggle('burger-active');
      menu.classList.toggle('menu-active');
      document.body.classList.toggle('lock')
      const burgerActive = document.querySelector('.burger.burger-active');
      document.querySelectorAll('.menu-nav__item').forEach(item => {
        item.addEventListener("click", function () {
          burgerActive.classList.remove('burger-active');
          menu.classList.remove('menu-active');
          document.body.classList.remove('lock')
        });
      });
    });
  }

  // SEARCH

  const searchCall = document.querySelector('.search-button-call');
  let searchForm = document.querySelector('.search-desctop-form');
  let searchInput = document.querySelector('.search-input');
  let searchClose = document.querySelector('.search-button-close');


  searchCall.addEventListener('click', function () {
    // searchCall.classList.add('visually-hidden');
    searchCall.classList.add('hidden');
    searchForm.classList.add('visible');
    searchInput.classList.add('active');

  });


  searchClose.addEventListener('click', function (e) {
    const timeout = 300;
    searchInput.classList.remove('active');
    setTimeout(function () {
      // searchCall.classList.remove('visually-hidden');
      searchCall.classList.remove('hidden');
      searchForm.classList.remove('visible');
    });
    e.preventDefault();

  });


  // SELECT-MENU

  // document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".item-submenu__button").forEach(item => {
    item.addEventListener("click", function () {
      let btn = this;
      let dropdown = this.parentElement.querySelector(".item-submenu__container");

      document.querySelectorAll(".item-submenu__button").forEach(el => {
        if (el != btn) {
          el.classList.remove("active--button");
        }
      });

      document.querySelectorAll(".item-submenu__container").forEach(el => {
        if (el != dropdown) {
          el.classList.remove("active-bottom-bar__item");
        }
      })
      dropdown.classList.toggle("active-bottom-bar__item");
      btn.classList.toggle("active--button")
    })
  })

  document.addEventListener("click", function (e) {
    let target = e.target;
    if (!target.closest(".bottom-bar")) {
      document.querySelectorAll(".item-submenu__container").forEach(el => {
        el.classList.remove("active-bottom-bar__item");
      })
      document.querySelectorAll(".item-submenu__button").forEach(el => {
        el.classList.remove("active--button");
      });
    }
  })
  // })

  // GALLERY 

  let gallerySlider = new Swiper(".gallery__swiper", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    speed: 1500,
    spaceBetween: 50,
    pagination: {
      el: ".swiper__pagination",
      type: "fraction"
    },


    breakpoints: {

      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0
      },

      600: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34
      },
      1300: {
        slidesPerView: 3,
        // slidesPerGroup: 3,
        spaceBetween: 50
      },
    },
    navigation: {
      nextEl: ".gallery__button-next",
      prevEl: ".gallery__button-prev"
    },

    a11y: {
      prevSlideMessage: 'Предыдущие картины',
      nextSlideMessage: 'Следующие картины',
    }
  });


  // TAB ACTORS

  let actor = function () {
    let tabActors = document.querySelectorAll('.accordion__item-artist'),
      tabAbout = document.querySelectorAll('.about-artist'),
      tabSelect;

    tabActors.forEach(item => {
      item.addEventListener('click', selectTabActors)
    });


    function selectTabActors() {
      tabActors.forEach(item => {
        item.classList.remove('is-active');
      });
      this.classList.add('is-active');
      tabSelect = this.getAttribute('data-tab-name');
      if (document.documentElement.clientWidth > 319 && document.documentElement.clientWidth < 769) {
        const about = document.getElementById('about-artist');
        about.scrollIntoView({ inline: "center", behavior: 'smooth' });
      }
      selectTabAbout(tabSelect);
    }

    function selectTabAbout(tabSelect) {
      tabAbout.forEach(item => {
        item.classList.contains(tabSelect) ? item.classList.add('is-active') : item.classList.remove('is-active');
      })

    }
  };

  actor();

  // EVENTS

  let eventsSlider = new Swiper(".events__swiper", {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 50,
    speed: 800,

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34
      },
      1024: {
        slidesPerGroup: 3,
        spaceBetween: 27
      },

      1440: {
        spaceBetween: 50
      }
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.events__button-next',
      prevEl: '.events__button-prev',
    },

    a11y: {
      prevSlideMessage: 'Предыдущее событие',
      nextSlideMessage: 'Следующее событие',
    }
  });


  // PROJECTS_TOOLTIP

  tippy('#tooltip-1', {
    content: "Пример современных тенденций - современная методология разработки",
    theme: 'Tooltip',
    delay: [500, 200],
    maxWidth: 264,
  });
  tippy('#tooltip-2', {
    content: "Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции",
    theme: 'Tooltip',
    delay: [500, 200],
    maxWidth: 264,
  });
  tippy('#tooltip-3', {
    content: "В стремлении повысить качество",
    theme: 'Tooltip',
    delay: [500, 200],
    maxWidth: 264,
  });


  // PROJECTS_PARTNERS 

  let partnersSlider = new Swiper(".partners__swiper", {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 50,
    speed: 800,
    loop: true,

    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 34,
      },
      1024: {
        slidesPerView: 2,
      },
      1440: {
        slidesPerView: 3,
      }
    },
    navigation: {
      nextEl: '.partners__button-next',
      prevEl: '.partners__button-prev',
    },

    a11y: {
      prevSlideMessage: 'Предыдущий партнер',
      nextSlideMessage: 'Следующий партнер',
    }
  });


  // CONTACTS

  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999)-999-99-99");

  im.mask(selector);

  new window.JustValidate('.callback__form', {
    colorWrong: '#D11616',

    rules: {
      name: {
        required: true,
        strength: {
          custom: '^[a-zA-Zа-яА-Яё]',
        }
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
    },

    messages: {
      name: {
        required: 'Как Вас зовут?',
        strength: 'Недопустимый формат',
      },

      tel: {
        required: 'Укажите Ваш телефон',
        function: 'Введите корректный номер',
      },
    },
    submitHandler: function (form) {
      let formData = new FormData(form);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }
      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      form.reset();
      popupThanks();
    },
  })

  function popupThanks() {
    var popupThanks = document.querySelector('.callback-popup');
    const timeoutClose = 4000;
    popupThanks.classList.add('open');
    setTimeout(function () {
      popupThanks.classList.remove('open');
    }, timeoutClose);

  }



  // CONTACTS_MAP

  ymaps.ready(init);

  function init() {
    // Создание карты.
    let myMap = new ymaps.Map("map", {
      center: [55.758468, 37.601088],
      zoom: 14,
      controls: [],
    });

    let myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [20, 20],
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.controls.add('geolocationControl');
    myMap.controls.add('zoomControl');
    myMap.behaviors.disable('scrollZoom');

  }


  // POPUP//

  const popupButtons = document.querySelectorAll('.popup-button'); //все элементы при клике на которые открывается popup
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock-padding'); //на эти элементы не действует функция bodyLock, которая убирает скрол 
  const popupCloseIcon = document.querySelectorAll('.popup__close');

  let unlock = true;

  const timeout = 500;


  if (popupButtons.length > 0) {
    for (let index = 0; index < popupButtons.length; index++) {
      const popupButton = popupButtons[index];
      popupButton.addEventListener('click', function (e) {
        const popupName = popupButton.getAttribute('data-popup');
        const curentPopup = document.getElementById(popupName);
        popupButton.classList.add('active');
        console.log(popupButton);
        popupOpen(curentPopup);
        e.preventDefault();
      });
    }
  }
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();

      });
    }
  }



  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      //если он существует
      if (popupActive) {
        //закрываем его
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }

      curentPopup.classList.add('open');
      curentPopup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }

    function focusPopup() {
      const focusPopup = document.querySelector('.popup.open .popup__close')
      console.log(focusPopup);
      setTimeout(function () {
        focusPopup.focus();
      }, timeout)
    }
    focusPopup();
  }





  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {

      popupActive.classList.remove('open');

      if (doUnlock) {
        bodyUnlock();
      }
    }

    function focusPopupButton() {
      const focusPopupButton = document.querySelector('.popup-button.active')
      console.log(focusPopupButton);
      setTimeout(function () {
        focusPopupButton.focus();
      }, timeout)
    }
    focusPopupButton();
  }



  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.gallery').offsetWidth + 'px';
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.getElementsByClassName.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }


  function bodyUnlock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);
  }

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);


  //ЗАКРЫТИЕ POPUP ПО КЛАВИШЕ ESC
  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  })
});
