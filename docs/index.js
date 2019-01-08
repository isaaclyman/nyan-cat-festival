requirejs(['../dist/index'], function ({ default: Nyan }) {
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
    haydnNyan.stopNyan()
    mockTrialNyan.nyan()
  }

  const haydnCuesTemplate = [{
    delay: 0,
    start: 'left',
    zIndex: 5
  }, {
    delay: 1.5 * 1000,
    start: 'left-top',
    zIndex: 5
  }, {
    delay: 3 * 1000,
    start: 'left-bottom',
    end: 'right-top',
    rumble: true,
    transitionDuration: 10 * 1000,
    transitionTiming: 'ease-in',
    zIndex: 10
  }]
  const haydnCues = Array.from(Array(100).keys()).map(num => {
    const templateCopy = Object.assign({}, haydnCuesTemplate[num % haydnCuesTemplate.length])
    const lastIndex = haydnCuesTemplate.length - 1
    if (num > lastIndex) {
      templateCopy.delay += Math.floor(num / haydnCuesTemplate.length) * 13 * 1000
    }
    return templateCopy
  })

  const haydnNyan = new Nyan({
    rumble: false,
    song: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3',
    transitionDuration: 5 * 1000,
    transitionTiming: 'cubic-bezier(0.0, 0.0, 0.85, 1.0)',
    zIndex: 100,
    cues: haydnCues
  })

  document.getElementById('haydn').onclick = function() {
    mockTrialNyan.stopNyan()
    haydnNyan.nyan()
  }
})
