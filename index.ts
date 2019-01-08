import { mocktrial } from './assets/mocktrial'
import { nyancat } from './assets/nyancat'

export default class Nyan {
  private context: HTMLDivElement
  private song: HTMLAudioElement = null
  private catHeight = 400
  private catWidth = 400
  
  private options: NyanOptions
  private defaultOptions: NyanOptions = {
    rumble: false,
    song: mocktrial,
    transitionDuration: 5000,
    transitionTiming: 'cubic-bezier(0.0, 0.0, 0.85, 1.0)',
    zIndex: 100,
    cues: []
  }
  private defaultCue: NyanCue = {
    delay: 0,
    start: 'left',
    end: 'right',
    rumble: null,
    transitionDuration: null,
    transitionTiming: null,
    zIndex: 1
  }

  private songReadyResolve
  private songReadyPromise = new Promise((resolve, reject) => {
    this.songReadyResolve = resolve
  })

  private NO_TRANSITION = 'notransition'

  private cueTimeouts: number[] = []
  
  private styledPositions: { [position in NyanPosition]: NyanPositionParams } = {
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
  }

  constructor (options: NyanOptions) {
    this.checkCompat(true)

    this.options = Object.assign({}, this.defaultOptions, options)

    this.prepareContext()
    this.prepareCats()
  }

  nyan(): void {
    this.resetCats()
    this.songReadyPromise.then(() => {
      for (const cat of this.options.cues) {
        this.cueTimeouts.push(window.setTimeout(() => {
          const styledPos = this.styledPositions[cat.end]
          Object.assign(cat._element.style, {
            left: styledPos.left,
            top: styledPos.top
          })
        }, cat.delay))
      }
  
      if (this.song) {
        this.song.pause()
        this.song.currentTime = 0
        this.song.play()
      }
    })
  }

  checkCompat(logErrors: boolean = false): boolean {
    if (!document.querySelector) {
      if (logErrors) {
        console.error('This browser is not compatible with nyan-cat-festival.')
      }
      return false
    }
    return true
  }

  private prepareContext(): void {
    this.context = document.createElement('div')
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
    })
    document.body.appendChild(this.context)

    if (this.options.song !== null) {
      this.song = this.options.song instanceof HTMLAudioElement ? this.options.song : new Audio(this.options.song)
      if (this.song.readyState >= 4) {
        this.songReadyResolve()
      } else {
        this.song.oncanplaythrough = this.songReadyResolve
      }
    } else {
      this.songReadyResolve()
    }

    var stylesheet = document.createElement('style')
    stylesheet.type = 'text/css'
    stylesheet.innerHTML = `.${this.NO_TRANSITION} { transition: none !important; }`
    document.head.appendChild(stylesheet)
  }

  private prepareCats(): void {
    for (const ix in this.options.cues) {
      const cat = Object.assign({}, this.defaultCue, this.options.cues[ix])
      this.options.cues[ix] = cat

      cat._element = document.createElement('div')
      
      const transition = this.getTransition(cat.transitionDuration, cat.transitionTiming)
      const styledPos = this.styledPositions[cat.start]
      Object.assign(cat._element.style, {
        left: styledPos.left,
        top: styledPos.top,
        transform: styledPos.transform,
        filter: styledPos.filter,
        zIndex: cat.zIndex.toString(),
        position: 'absolute',
        transition: `left ${transition}, top ${transition}, right ${transition}, bottom ${transition}`
      })

      const image = document.createElement('img')
      image.src = nyancat
      cat._element.appendChild(image)
      this.context.appendChild(cat._element)
    }
  }

  private resetCats(): void {
    this.cueTimeouts.forEach(timeout => window.clearTimeout(timeout))

    for (const cat of this.options.cues) {
      cat._element.classList.add(this.NO_TRANSITION)
      const styledPos = this.styledPositions[cat.start]
      Object.assign(cat._element.style, {
        left: styledPos.left,
        top: styledPos.top
      })
      window.getComputedStyle(cat._element).opacity // Flushes the CSS changes
      cat._element.classList.remove(this.NO_TRANSITION)
    }
  }

  private getTransition(_duration: number | null, _timingFunction: string | null) {
    const duration = typeof _duration === 'number' ? _duration : this.options.transitionDuration
    const timingFunction = typeof _timingFunction === 'string' ? _timingFunction : this.options.transitionTiming
    return `${duration}ms ${timingFunction}`
  }
}

export interface NyanOptions {
  rumble?: boolean;
  song?: string | HTMLAudioElement | null;
  transitionDuration?: number;
  transitionTiming?: string;
  zIndex?: number;
  cues: NyanCue[];
}

export interface NyanCue {
  delay?: number;
  start?: NyanPosition;
  end?: NyanPosition;
  rumble?: boolean | null;
  transitionDuration?: number;
  transitionTiming?: string;
  zIndex?: number;
  _element?: HTMLDivElement;
}

export type NyanPosition =
  'left-bottom'|'left'|'left-top'|
  'top-left'|'top'|'top-right'|
  'right-top'|'right'|'right-bottom'|
  'bottom-right'|'bottom'|'bottom-left';

interface NyanPositionParams {
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
  transform?: string;
  filter?: string;
}
