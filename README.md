# nyan-cat-festival

Turn your website into a custom nyan cat festival.

~=[,,_,,]:3

Ɛ:[,,_,,]=~

~=[,,_,,]:3

## Installation

`npm install --save nyan-cat-festival`

## API

First, import the library:

```JavaScript
import Nyan from 'nyan-cat-festival'
```

Then set the options for your festival:

```JavaScript
// Simple festival for simple cats
const festival = new Nyan({
  cues: [{
    start: 'left',
    end: 'right'
  }]
})

// Advanced festival for hacker cats
const festival = new Nyan({
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
```

And finally, get your nyan on:

```JavaScript
festival.nyan()
```

### Options

`rumble`: (optional) Determines whether the cats should rumble. By default, this is false.

`song`: (optional) The URL of the song to play in the background, or an HTMLAudioElement object that is ready to play. If this is `null`, no song will be played. By default, this is the theme song for the show *[Mock Trial with J. Reinhold](https://arresteddevelopment.fandom.com/wiki/Mock_Trial_with_J._Reinhold)*.

`transitionDuration`: (optional) The default duration in milliseconds of each cat's transition from its start position to its end position. By default, this is 5000.

`transitionTiming`: (optional) The default timing function to use for the transition of the cats from their start position to their end position. By default, this is a cubic bezier function that makes the cats fly in very quickly, then fly at a slower speed across the screen.

`zIndex`: (optional) The z-index of the stacking context where all the cats will be appended. The stacking context is a `<div>` attached to your `<body>` element. By default, this is 100.

### Cues

The `cues` option is an array of objects, each of which represents a single nyan cat. The options for a cue are:

`delay`: (optional) The number of milliseconds after the `nyan()` function is called before the cat should appear. The default is 0.

`start`: (optional) The position where the cat should begin (off-screen). The 12 possible values, starting at the bottom of the left side and going clockwise, are `'left-bottom'`, `'left'`, `'left-top'`, `'top-left'`, `'top'`, `'top-right'`, `'right-top'`, `'right'`, `'right-bottom'`, `'bottom-right'`, `'bottom'`, `'bottom-left'`. By default, this is `'left'`.

`end`: (optional) The position where the cat should end (off-screen). This accepts the same values as the `start` option. By default, this is `'right'`.

`rumble`: (optional) An override determining whether this specific cat should rumble.

`transitionDuration`: (optional) An override duration to use for this cat's transition.

`transitionTiming`: (optional) An override timing function to use for this specific cat.

`zIndex`: (optional) The z-index of this specific cat. Keep in mind that z-index can only be used to position cats relative to each other, not to your app, since they exist in a different stacking context. By default, this is 1.

## Troubleshooting

If you try to nyan right when the page loads, the audio won't work on modern browsers due to [autoplay policies](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes). You'll have to nyan in response to a user event (like a click).

## License

MIT Licensed.