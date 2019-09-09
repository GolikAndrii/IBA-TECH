function slowScroll(triggerSymbol, headerClassName) {
  const allLinks = document.querySelectorAll('a');

  allLinks.forEach((link) => {
    if (link.hash[0] === triggerSymbol) {
      link.onclick = (e) => {
        e.preventDefault();
        slowScrolling(e);
      }
    }
  });

  function slowScrolling(event) {
    const id = event.target.hash,
      to = document.querySelector(id).offsetTop - document.querySelector(`.${headerClassName}`).clientHeight - 10;
    window.scroll({
      top: to,
      left: 0,
      behavior: 'smooth'
    });
  }
}

function manageNavLinks() {
  if(document.location.pathname !== '/' || document.location.pathname !== '/index.html') {
    const nav = document.querySelector('.navbar__menu-wrapper');
    const navHandle = (e) => {
      e.preventDefault();
      if(e.target.hash === '#programs' || e.target.hash === '#stages' || e.target.hash === '#about') {
        const language = localStorage.getItem('lang') || 'az';
        switch (localStorage.getItem('lang')) {
          case 'az':
            window.location.assign(`${document.location.origin}/${e.target.hash}`);
            break;
          case "en":
            window.location.assign(`${document.location.origin}/en/${e.target.hash}`);
            break;
          case 'ru':
            window.location.assign(`${document.location.origin}/ru/${e.target.hash}`);
            break;
          default:
            localStorage.setItem('lang', 'az');
            window.location.assign(`${document.location.origin}/${e.target.hash}`);
            break;
        }
      } else if(e.target.parentElement.classList.contains('navbar__submenu-wrapper')) {
        window.location.assign(e.target.href);
      } else {
        window.scroll({
          top: document.querySelector(e.target.hash).offsetTop,
          left: 0,
          behavior: 'smooth'
        });
      }
    };
    nav.addEventListener('click', navHandle);
    nav.addEventListener('touchstart', navHandle);
    nav.addEventListener('mousedown', navHandle);
  }
}

(function () {
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', "az");
  }
})();
manageNavLinks();
slowScroll('#', 'navbar');
// // ************************************************************************
// //  about
// // ************************************************************************
//
// const sponsor1 = document.querySelector('.about-sponsors__sponsor-1');
// const sponsor2 = document.querySelector('.about-sponsors__sponsor-2');
//
// if(sponsor1) {
//     sponsor1.addEventListener('click', () => {
//         const modalWindowBank = document.getElementById('modal-bank');
//         modalWindowBank.style.visibility = 'visible';
//     });
// }
// if(sponsor2) {
//     sponsor2.addEventListener('click', () => {
//         const modalWindowDanit = document.getElementById('modal-danit');
//         modalWindowDanit.style.visibility = 'visible';
//     });
// }
// // hide any of show modal window
// document.querySelectorAll('.modal-window__box .modal-btn-close').forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         e.currentTarget.parentNode.parentNode.style.visibility = 'hidden';
//     });
// });
//
// // click on underlay closing itself
// document.querySelectorAll('.modal-window__underlay').forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         if (e.target.classList.contains('modal-window__underlay')) {
//             e.currentTarget.style.visibility = 'hidden';
//         }
//     });
// });

// ************************************************************************
//
// ************************************************************************

let accordion = (function (element) {

    let _getItem = function (elements, className) {
        let element = undefined;
        elements.forEach(function (item) {
            if (item.classList.contains(className)) {
                element = item;
            }
        });
        return element;
    };

    return function () {
        let _mainElement = {},
          _items = {},
          _contents = {};


        let _actionClick = function (e) {
              if (!e.target.classList.contains('accordion-item-header')) {
                  return;
              }
              e.preventDefault();
              let header = e.target,
                item = header.parentElement,
                itemActive = _getItem(_items, 'show');

              if (itemActive === undefined) {
                  item.classList.add('show');
              } else {

                  itemActive.classList.remove('show');

                  if (itemActive !== item) {
                      item.classList.add('show');
                  }
              }
          },
          _setupListeners = function () {

              _mainElement.addEventListener('click', _actionClick);
          };

        return {
            init: function (element = {}) {
                try {
                    _mainElement = (typeof element === 'string' ? document.querySelector(element) : element);
                    _items = _mainElement.querySelectorAll('.accordion-item');
                    _setupListeners();
                } catch (e) {

                }
            }
        }

    }
})();

let accordion1 = accordion();
accordion1.init('#accordion');
const form = document.querySelector('#appForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#formName');
  const age = document.querySelector('#formAge');
  const tel = document.querySelector('#formPhone');
  const email = document.querySelector('#formMail');
  const program = document.querySelector('#formProgram');
  const schedule = document.querySelector('#formSchedule');
  const letter = document.querySelector('#formLetter');

  const url = new URL('https://script.google.com/macros/s/AKfycbzKBJ4yX6b8mwtzJmaPtGew0wOCthTeceoXNAidAJE53y_vsA/exec');
  url.searchParams.append('name', name.value);
  url.searchParams.append('age', age.value);
  url.searchParams.append('tel', tel.value);
  url.searchParams.append('mail', email.value);
  url.searchParams.append('program', program.value);
  url.searchParams.append('schedule', schedule.value);
  url.searchParams.append('letter', letter.value);

  fetch(url).then(() => {
    let responseMessages = {
      az: `Qeydiyyat üçün təşəkkürümüzü bildiririk. Sizin ərizəniz qəbul olunmuş və baxılmaq üçün təqdim edilmişdir. Yaxın zamanlarda əməkdaşlarımız sizinlə əlaqə saxlayacaqlar.

Hər hansı suallarınızla bağlı +994(12)937 nömrəli Məlumat Mərkəzinə zəng edə bilərsiniz.

Hörmətlə, IBA Tech komandası`,
      en: `Thank you for registration. Your application has been accepted and sent for processing.
Our manager will contact you shortly.

If you have any questions, please call + 994 (12) 937.

With kind regards,
The IBA Tech Academy Team`,
      ru: `Спасибо за регистрацию. Ваша заявка получена и отправлена на обработку.
В ближайшее время с вами свяжется наш менеджер.

Если у вас возникли вопросы, требующие срочного ответа, вы можете позвонить по телефону + 994 (12) 937.

С уважением, 
команда IBA Tech Academy`
    };

    let message = responseMessages.az;

    switch (true) {
      case window.location.pathname.includes('az'):
        message = responseMessages.az;
        break;
      case window.location.pathname.includes('en'):
        message = responseMessages.en;
        break;
      case window.location.pathname.includes('ru'):
        message = responseMessages.ru;
        break;
      default:
        message = responseMessages.az;
    }

    fetch("/email", {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: `sendTo=${email.value}&message=${message}`
    }).then((res) => {
        console.log(res);
        const modal = document.querySelector('.app-modal');
        modal.style.display = 'flex';

        console.log('after email post request - ', res);

        document.querySelector('.app-modal__msg > .btn-extra').onclick = (e) => {
          document.querySelector('.app-modal').style.display = 'none';
        }
      }, (error) => {
        console.dir(error)
      });
  }).then(() => {
    debugger
    name.innerHTML = '';
    age.innerHTML = '';
    tel.innerHTML = '';
    email.innerHTML = '';
    // program.innerHTML = '';
    // schedule.innerHTML = '';
    letter.innerHTML = '';
  });
});

// ************************************************************************
// Handle Change Languages
const langList = document.getElementById('navbar__lang-list');
let langStorage = localStorage.getItem('lang');

langList.addEventListener('change', () => {
    function redirectURL(toFolder) {
        let resURL = '';
        if(window.location.pathname.includes('frontend')){
            resURL = window.location.origin.concat(toFolder).concat('frontend')
        } else if(window.location.pathname.includes('backend')) {
            resURL = window.location.origin.concat(toFolder).concat('backend')
        } else {
            resURL = window.location.origin.concat(toFolder)
        }
        return resURL;
    }

    switch (langList.value) {
        case 'az':
            localStorage.setItem('lang','az');
            window.location.assign(redirectURL('/'));
            break;
        case 'en':
            localStorage.setItem('lang','en');
            window.location.assign(redirectURL('/en/'));
            break;
        case 'ru':
            localStorage.setItem('lang','ru');
            window.location.assign(redirectURL('/ru/'));
            break;
        default:
            console.log('Unknown language!');
    }
});

// ************************************************************************
// Handle burger menu
function uncheckBurgerMenu() {
    document.getElementById('navbar__checkbox').checked = false;
}

function hideMenu(e) {
    if (e.target.closest('A')) {
        uncheckBurgerMenu();
    }
}

document.querySelector('.navbar__menu-wrapper').addEventListener('click',  (e) => {
    if (document.body.clientWidth < 981) {
        hideMenu(e);
    }

});

window.addEventListener('resize', () => {
    if (document.body.clientWidth > 979) {
        uncheckBurgerMenu();
    }
});



function toggleFullProgram() {
  document.querySelectorAll('.program__module').forEach((module, ind) => {
    if(ind > 1) {
      module.hidden = !module.hidden;
    }
  });
}
(function () {
  const showMoreBtn = document.querySelector('.program__show-more-btn') || document.createElement('div');
  const showMore = document.querySelector('.program__show-more') || document.createElement('div');
  toggleFullProgram();
  const expandMoreHandler = (e) => {
    e.preventDefault();
    window.scroll({
      top: document.querySelectorAll('.program__module')[0].offsetTop - 80,
      left: 0,
      behavior: 'smooth'
    });
    toggleFullProgram();
    showMoreBtn.classList.toggle('program__show-more-btn--activated');
  };
  showMore.addEventListener('mousedown', expandMoreHandler);
  showMore.addEventListener('touchstart', expandMoreHandler);
})();

