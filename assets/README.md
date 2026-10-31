# Pine Trees images in the Focus Timer

## Current: landscape 05 inside the timer rectangle

`pines-ma-05-desktop.png` and `pines-ma-05-mobile.png` are unchanged local copies
from the shared collection:

`hintergruende/pine-trees/05-ma-landschaft/assets/`

The timer currently uses the complete desktop composition inside the rounded
rectangle. `object-fit: contain` and bottom alignment preserve all tree groups
instead of cropping away the outer ones. The input sits higher in the card,
leaving the more prominent trees visible below it. Both phases use this same
placement to avoid a background jump when focus starts. A subtle dark overlay
helps maintain readability; a fixed Arctic Blue outline frames the card.
CSS luminosity blending adapts the original green image to the cool blue
background while preserving its brightness and composition. The image files
remain unchanged.
The portrait image remains available as a source asset but is not currently loaded.

The page and rectangle use the portfolio's dark base colour (`#0d1117`). There are
no pine trees outside the rectangle.

The landscape is a new arrangement of fragments from our existing ASCII
adaptation of Hasegawa Tōhaku's *Pine Trees*, Tokyo National Museum. Sources and
design notes are in the shared collection's `05-ma-landschaft/README.md` and
`03-ma/GESTALTUNG.md`.

## Earlier iteration

`pines-frame-desktop.png` and `pines-frame-mobile.png` are earlier image copies
from the portfolio. The current timer does not load them. Its previous
page-wide grayscale filter, blend mode and fade mask are no longer used.

## Original references

- https://emuseum.nich.go.jp/detail?content_base_id=100151&langId=en
- https://commons.wikimedia.org/wiki/File:Hasegawa_Tohaku,_Pine_Trees_-_low_resolution.jpg

The right-hand reference was supplied for the original portfolio study.
The images are decorative in the timer and hidden from assistive technology.
