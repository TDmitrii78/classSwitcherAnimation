function animationElement(settingArrey) {
    class Element {
        constructor(track, animateElement, activClass, disableClass, enableClass, startDelay, delayBetweenElement, ratio, sensivityOffset, cycleAnimation) {
            this.track = track,
            this.animateElement = animateElement,
            this.activClass = activClass,
            this.disableClass = disableClass,
            this.enableClass = enableClass,
            this.startDelay = startDelay,
            this.delayBetweenElement = delayBetweenElement,
            this.ratio = ratio,
            this.cycleAnimation = cycleAnimation,
            this.sensivityOffset = sensivityOffset,
            this.visibleAnimate = false,
            this.done = false
        }
        detector() {
            const track = (this.track) ? this.track: this.animateElement;
            if ((track.offsetTop - window.innerHeight + this.sensivityOffset <= window.pageYOffset * this.ratio)) {
                this.visibleAnimate = true;
            }
            if ((track.offsetTop - window.innerHeight - this.sensivityOffset > window.pageYOffset * this.ratio)) {
                this.visibleAnimate = false;
            }
        }
    }
    
    function createElement(trackElement, animateElements, activClass, disableClass, enableClass, startDelay, delayBetweenElement, ratio, sensivityOffset, cycleAnimation) {
        const track = (trackElement) ? document.querySelector(`${(trackElement)}`) : false; 
        const allAnimateElement = document.querySelectorAll(`${animateElements}`);
        const arr = [];
        for (el of allAnimateElement) {
            arr.push(new Element(track, el, activClass, disableClass, enableClass, startDelay, delayBetweenElement, ratio, sensivityOffset, cycleAnimation));
        }
        startupEnableClass(arr, enableClass);
        startupDisableClass(arr, disableClass);
        return arr;
    }

    const arrObjElement = [];

    for (item of settingArrey) {
        arrObjElement.push(createElement(...item));
    }

    function  startupDisableClass(arrObjElement, disableClass) {
        if (disableClass) {
            removeClass(arrObjElement, disableClass);
        }
    }

    function removeClass(arrObjElement, disableClass) {
        for (item of disableClass.split(' ')) {
            arrObjElement.forEach(el => {
                if (el.animateElement.classList.contains(item)) {
                    el.animateElement.classList.remove(item);
                }
            })
        }  
    }

    function  startupEnableClass(arrObjElement, enableClass) {
        if (enableClass) {
            addClass(arrObjElement, enableClass);
        }
    }

    function addClass(arrObjElement, enableClass) {
        for (item of enableClass.split(' ')) {
            arrObjElement.forEach(el => { 
                if (!el.animateElement.classList.contains(item)) {
                    el.animateElement.classList.add(item);
                }
            })
        } 
    }
   
    function baseLogic(arrObjElement) {
        arrObjElement.forEach((item, index, arr) => {
            item.detector();
            if (item.visibleAnimate) {
                if (!item.animateElement.classList.contains(item.activClass) & !item.done) {
                    item.done = true;
                    setTimeout(() => {
                        item.animateElement.classList.add(`${item.activClass}`);
                    }, item.startDelay + delay);
                    console.log(delay);
                    delay += item.delayBetweenElement;
                    if (arr.length <= index + 1) {
                        delay = 0;
                    }
         
                }
            }
            if (!item.visibleAnimate & item.cycleAnimation) {
                if (item.animateElement.classList.contains(item.activClass)) {
                    item.done = false;
                    delay = 0;
                    item.animateElement.classList.remove(`${item.activClass}`);
                }
            }
        })
    }
    let delay = 0;
    
    return function start() {
        for (item of arrObjElement) {
            baseLogic(item);
        }
    }
}
// Здесь ниже в массиве animation выставляем свои настройки для анимации.
const animation = animationElement([ 
    [false, ".advantages__item", "animation", '', 'advantages__item_translate-left', 0, 0, 1, 0, true],  // Здесь задаются настройки для одной группы анимации
    [false, ".work__item", "work__item_animation", '', '', 0, 500, 0.9, 0, true],     // Здесь для другой группы
    [".prices__item", ".prices__item", "prices__item_animation", '', '', 0, 200, 1, 0, true],  // И для другой
    [false, ".scheme__item", "scheme__item_animation", '', '', 0, 0, 1, 0, true]  // И так делее.. можно задать нужное количество групп анимации
]);

window.onscroll = () => {
    animation();
}


// [track, animateElement, activClass, disableClass, enableClass, startDelay, delayBetweenElement, ratio, sensivityOffset, cycleAnimation]

// track - указываем класс элемента (например: ".prices__item") 
//         при появлении которого на экране, будет запускаться анимация всех элементов.
//         Если нужно включать анимацию отдельно для каждого элемента, то устанавливаем false

// animateElement - класс элементов которые нужно анимировать (например: ".prices__item")

// activClass - класс который будет анимировать элементы. В нем пишем анимацию. Например: "animation"

// disableClass - Здесь пишем  классы которые нужно отключить при загрузке страницы (например: "promo__item"),
//         можно несколько классов (например: "promo__item work__img qwer") и тд. При старте они будут отключены.
//         Если ничего отключать ненадо то - ""

// enableClass - Здесь пишем классы которые нужно включить при загрузке страницы. (например: "promo__item work__img qwer")
//              При загрузке страницы они применятся. Если ничего включать не надо пишем - ""

// startDelay - Здесь задержка запуска анимации в мс. От 0... и тд.

// delayBetweenElement - Задержка между анимируемыми элементами в мс. От 0... и тд.

// ratio - Коэфициент, им можно отрегулировать когда сработает анимация. 
//                  Например: 1 - стандартный, меньше 1 - анимация сработает позже 
//                  и больше 1 - анимация сработает раньше.

// sensivityOffset - Влияет на порог переключение видимый/невидимый элемент. 0 нет порога, 
//                 например если 100 - будет порог срабатывания между видимый/невидимый 200px.

// cycleAnimation - Режим анимации. true - работает всегда. false - работает один раз.


