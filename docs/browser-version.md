# Focus Timer browser version

A local, English-language interface with a single timer panel:

**Focus → automatic break → manually start the next focus session.**

## Open

Open the repository's `index.html` directly in a browser, or run this from the repository:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open the [local preview](http://127.0.0.1:4173).

## Use

1. Enter a goal beneath “Set your goal and choose your focus + break times.”
   The text field has no placeholder. It receives focus on opening and after
   each completed cycle, so you can type immediately. A blinking muted-green block
   marks the starting position while the focused field is empty; once you type,
   the native text caret takes over in the same colour as the text and instruction.
   The block is steady when reduced
   motion is preferred and disappears when the field loses focus.
   Play remains disabled until the goal contains more than whitespace.
2. Choose a time profile from the styled dropdown beside the instruction, above the goal field.
   The countdown remains hidden until you start.
3. Press Play. The input is cleared; the instruction, goal field, profile choice and button disappear,
   and the countdown becomes visible as focus starts.
4. The break starts automatically when focus ends. Its smaller countdown sits
   in the upper third of the panel. The original goal appears below the timer,
   preserving line breaks, as plain text without editing controls or checkboxes.
5. After the break, the empty goal field and Play return. Enter a new goal to
   start the next cycle. The countdown is hidden again.

The default is **25 minutes of focus + 5 minutes of break**. Before each cycle,
choose from **15 + 5, 20 + 5, 25 + 5, 30 + 10, 35 + 10, 40 + 10 and 50 + 10**.
The profile selector disappears while the cycle runs and returns afterward.

Play only starts a new focus session. It always uses the play symbol, is hidden
throughout the active cycle and becomes available again after a new goal is
entered. There is no pause, resume, reset or skip control. The button has an
accessible name and supports keyboard interaction. There are no tabs, notes,
recaps or history.

All labels, placeholders, validation messages, tooltips, accessible names,
browser titles and runtime error messages are in English.
Before starting, the browser title also contains no time value.

## Break and outline

The goal stays hidden during focus and reappears during the automatic break.
It is held only in memory for the active cycle and discarded when the break ends.
Software and AI insights are omitted from this view.
The rounded rectangular outline stays complete throughout the cycle.
Only the numeric countdown shows the time remaining.

## Design

The design follows the portfolio: dark green, sage accents (`#9bbda2`), system
fonts, monospace details and fine outlines. Pine Trees landscape 05 appears
inside the timer rectangle. The page uses the rectangle's previous dark base
colour (`#0e1611`). See [assets/README.md](../assets/README.md) for image provenance.
No remote images or fonts are required.

The full landscape is scaled to the bottom of the card. The goal input is
positioned higher so it does not conceal the prominent tree groups. The image
placement stays the same when focus starts and throughout the break.

The independent background studies are maintained in the shared
`hintergruende/pine-trees/` collection.

## Timing and limitations

- State exists only in the open tab; reloading or closing it discards it.
  Goals are limited to four visible lines; the input is cleared on successful start.
  The goal is retained in memory for display during the break, then discarded.
  It is not stored or redisplayed after the cycle.
- Timestamps determine remaining time. A delayed display update includes the
  time already elapsed since the scheduled start of the break.
- If both phases have elapsed during a long interruption, the timer returns
  to the idle focus view. It never starts another focus session automatically.
- Sleep counts as elapsed time in this prototype. Timer time is not evidence
  of actual concentration or a consciously taken break.
- Clock changes, restoring a session after reload, multiple tabs and persistent
  storage remain future work.
- The layout targets normal laptop and desktop windows without scrolling.
  Complete access takes priority on small windows or with enlarged text.

## Verification and research

```sh
node --test tests/*.test.cjs
node --check script.js
node --check cycle.js
```

28 tests cover countdowns, focus-break cycles and UI state: all profiles,
automatic breaks, goals during the break, returning to an empty start view,
manual restarts, delayed updates, repeated Play, keyboard profile selection,
silent input overflow handling, asset references and the previous preview redirect.
The generic countdown tests also cover internal operations that are not
available as interface controls.

JavaScript syntax, document references and `git diff --check` are checked.
The published GitHub Pages version was checked in a browser on 2026-10-30
at 1280 × 720: one-line instruction, the styled dropdown, four-line input,
Play, automatic focus-to-break transition, centred multiline goals during
the break and the empty start view after completion. The full 1 + 1 cycle
ran against the real browser clock. The page fits this viewport without scrolling.
The DOM-adapter tests do not replace layout checks; other browser engines and
small/mobile windows have not yet been checked.

[Research behind focus and break profiles](fokus-und-pausen-studien.md)
