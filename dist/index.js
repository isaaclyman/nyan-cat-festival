(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./assets/mocktrial", "./assets/nyancat"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const mocktrial_1 = require("./assets/mocktrial");
    const nyancat_1 = require("./assets/nyancat");
    class Nyan {
        constructor(options) {
            this.song = null;
            this.catHeight = 400;
            this.catWidth = 400;
            this.defaultOptions = {
                rumble: false,
                song: mocktrial_1.mocktrial,
                transitionDuration: 5000,
                transitionTiming: 'cubic-bezier(0.0, 0.0, 0.85, 1.0)',
                zIndex: 100,
                cues: []
            };
            this.defaultCue = {
                delay: 0,
                start: 'left',
                end: 'right',
                rumble: null,
                transitionDuration: null,
                transitionTiming: null,
                zIndex: 1
            };
            this.songReadyPromise = new Promise((resolve, reject) => {
                this.songReadyResolve = resolve;
            });
            this.NO_TRANSITION = 'notransition';
            this.cueTimeouts = [];
            this.styledPositions = {
                'left-bottom': {
                    left: `${-this.catWidth}px`,
                    top: `calc(75vh - ${this.catHeight / 2}px)`
                },
                'left': {
                    left: `${-this.catWidth}px`,
                    top: `calc(50vh - ${this.catHeight / 2}px)`
                },
                'left-top': {
                    left: `${-this.catWidth}px`,
                    top: `calc(25vh - ${this.catHeight / 2}px)`
                },
                'top-left': {
                    left: `calc(25vw - ${this.catWidth / 2}px)`,
                    top: `${-this.catHeight}px`,
                    transform: `rotate(90deg)`
                },
                'top': {
                    left: `calc(50vw - ${this.catWidth / 2}px)`,
                    top: `${-this.catHeight}px`,
                    transform: `rotate(90deg)`
                },
                'top-right': {
                    left: `calc(75vw - ${this.catWidth / 2}px)`,
                    top: `${-this.catHeight}px`,
                    transform: `rotate(90deg)`
                },
                'right-top': {
                    left: `calc(100vw + ${this.catWidth}px)`,
                    top: `calc(25vh - ${this.catHeight / 2}px)`,
                    transform: 'scaleX(-1)',
                    filter: 'flipH'
                },
                'right': {
                    left: `calc(100vw + ${this.catWidth}px)`,
                    top: `calc(50vh - ${this.catHeight / 2}px)`,
                    transform: 'scaleX(-1)',
                    filter: 'flipH'
                },
                'right-bottom': {
                    left: `calc(100vw + ${this.catWidth}px)`,
                    top: `calc(75vh - ${this.catHeight / 2}px)`,
                    transform: 'scaleX(-1)',
                    filter: 'flipH'
                },
                'bottom-right': {
                    left: `calc(75vw - ${this.catWidth / 2}px)`,
                    top: `calc(100vh + ${this.catHeight}px)`,
                    transform: `rotate(-90deg)`
                },
                'bottom': {
                    left: `calc(50vw - ${this.catWidth / 2}px)`,
                    top: `calc(100vh + ${this.catHeight}px)`,
                    transform: `rotate(-90deg)`
                },
                'bottom-left': {
                    left: `calc(25vw - ${this.catWidth / 2}px)`,
                    top: `calc(100vh + ${this.catHeight}px)`,
                    transform: `rotate(-90deg)`
                }
            };
            this.checkCompat(true);
            this.options = Object.assign({}, this.defaultOptions, options);
            this.prepareContext();
            this.prepareCats();
        }
        nyan() {
            this.resetCats();
            this.songReadyPromise.then(() => {
                for (const cat of this.options.cues) {
                    this.cueTimeouts.push(window.setTimeout(() => {
                        const styledPos = this.styledPositions[cat.end];
                        Object.assign(cat._element.style, {
                            left: styledPos.left,
                            top: styledPos.top
                        });
                    }, cat.delay));
                }
                if (this.song) {
                    this.song.pause();
                    this.song.currentTime = 0;
                    this.song.play();
                }
            });
        }
        checkCompat(logErrors = false) {
            if (!document.querySelector) {
                if (logErrors) {
                    console.error('This browser is not compatible with nyan-cat-festival.');
                }
                return false;
            }
            return true;
        }
        prepareContext() {
            this.context = document.createElement('div');
            Object.assign(this.context.style, {
                zIndex: this.options.zIndex.toString(),
                pointerEvents: 'none',
                position: 'absolute',
                overflow: 'hidden',
                height: '100vh',
                width: '100vw',
                left: '0',
                top: '0',
                right: '0',
                bottom: '0'
            });
            document.body.appendChild(this.context);
            if (this.options.song !== null) {
                this.song = this.options.song instanceof HTMLAudioElement ? this.options.song : new Audio(this.options.song);
                if (this.song.readyState >= 4) {
                    this.songReadyResolve();
                }
                else {
                    this.song.oncanplaythrough = this.songReadyResolve;
                }
            }
            else {
                this.songReadyResolve();
            }
            var stylesheet = document.createElement('style');
            stylesheet.type = 'text/css';
            stylesheet.innerHTML = `.${this.NO_TRANSITION} { transition: none !important; }`;
            document.head.appendChild(stylesheet);
        }
        prepareCats() {
            for (const ix in this.options.cues) {
                const cat = Object.assign({}, this.defaultCue, this.options.cues[ix]);
                this.options.cues[ix] = cat;
                cat._element = document.createElement('div');
                const transition = this.getTransition(cat.transitionDuration, cat.transitionTiming);
                const styledPos = this.styledPositions[cat.start];
                Object.assign(cat._element.style, {
                    left: styledPos.left,
                    top: styledPos.top,
                    transform: styledPos.transform,
                    filter: styledPos.filter,
                    zIndex: cat.zIndex.toString(),
                    position: 'absolute',
                    transition: `left ${transition}, top ${transition}, right ${transition}, bottom ${transition}`
                });
                const image = document.createElement('img');
                image.src = nyancat_1.nyancat;
                cat._element.appendChild(image);
                this.context.appendChild(cat._element);
            }
        }
        resetCats() {
            this.cueTimeouts.forEach(timeout => window.clearTimeout(timeout));
            for (const cat of this.options.cues) {
                cat._element.classList.add(this.NO_TRANSITION);
                const styledPos = this.styledPositions[cat.start];
                Object.assign(cat._element.style, {
                    left: styledPos.left,
                    top: styledPos.top
                });
                window.getComputedStyle(cat._element).opacity; // Flushes the CSS changes
                cat._element.classList.remove(this.NO_TRANSITION);
            }
        }
        getTransition(_duration, _timingFunction) {
            const duration = typeof _duration === 'number' ? _duration : this.options.transitionDuration;
            const timingFunction = typeof _timingFunction === 'string' ? _timingFunction : this.options.transitionTiming;
            return `${duration}ms ${timingFunction}`;
        }
    }
    exports.default = Nyan;
});
