requirejs(['./node_modules/nyan-cat-festival/dist/index'], function ({ default: Nyan }) {
  const nyan = new Nyan({
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

  document.getElementById('startmagic').onclick = function () {
    nyan.nyan()
  }
})
