requirejs(['./node_modules/nyan-cat-festival/dist/index'], function ({ default: Nyan }) {
  const mockTrialNyan = new Nyan({
    cues: [{
      delay: 0.25 * 1000,
      start: 'left',
      end: 'right'
    }, {
      delay: 2.25 * 1000,
      start: 'right-top',
      end: 'left-top'
    }, {
      delay: 4.90 * 1000,
      start: 'right-bottom',
      end: 'left-bottom'
    }, {
      delay: 8.26 * 1000,
      start: 'top-left',
      end: 'bottom-right'
    }]
  })

  document.getElementById('mocktrial').onclick = function () {
    mockTrialNyan.nyan()
  }

  const haydnNyan = new Nyan({
    rumble: false,
    song: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3',
    transitionDuration: 5 * 1000,
    transitionTiming: 'cubic-bezier(0.0, 0.0, 0.85, 1.0)',
    zIndex: 100,
    cues: [{
      delay: 0,
      start: 'left',
      zIndex: 5
    }, {
      delay: 1500,
      start: 'left-top',
      zIndex: 5
    }, {
      delay: 3000,
      start: 'left-bottom',
      end: 'right-top',
      rumble: true,
      transitionDuration: 10 * 1000,
      transitionTiming: 'ease-in',
      zIndex: 10
    }]
  })

  document.getElementById('haydn').onclick = function() {
    haydnNyan.nyan()
  }
})
