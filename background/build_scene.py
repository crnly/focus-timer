"""Compose existing ASCII pines into a sparse full-screen background.

The scene is a new digital arrangement, not a reconstruction of Tohaku's work.
Only tree fragments are reused; no trees are invented or tiled.
"""
from copy import deepcopy
from pathlib import Path
import argparse
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
BACKGROUND = '#0d1410'


def element(tag, attrs=None, parent=None, text=None):
    child = ET.Element(f'{{{NS}}}{tag}', attrs or {})
    child.text = text
    if parent is not None:
        parent.append(child)
    return child


def green_ink(original):
    # Keep the original tonal order, using muted grey-green rather than blue.
    tone = max(0, min(1, (int(original[3:5], 16) - 56) / 157))
    dark, light = (35, 53, 42), (168, 184, 170)
    rgb = tuple(round(a + (b - a) * tone) for a, b in zip(dark, light))
    return '#' + ''.join(f'{value:02x}' for value in rgb)


def gradient(defs, name, axis, extent, stops):
    attrs = {'id': name, 'gradientUnits': 'userSpaceOnUse',
             'x1': '0', 'y1': '0', 'x2': str(extent if axis == 'x' else 0),
             'y2': str(extent if axis == 'y' else 0)}
    grad = element('linearGradient', attrs, defs)
    for offset, opacity in stops:
        element('stop', {'offset': str(offset), 'stop-color': 'white',
                         'stop-opacity': str(opacity)}, grad)


def compose(source, destination, portrait=False):
    width, height = (900, 1600) if portrait else (1920, 1080)
    original = ET.parse(source).getroot()
    glyphs = list(original.iter(f'{{{NS}}}text'))
    svg = element('svg', {'width': str(width), 'height': str(height),
                         'viewBox': f'0 0 {width} {height}', 'role': 'img',
                         'aria-labelledby': 'scene-title scene-description'})
    element('title', {'id': 'scene-title'}, svg, 'Ma — Kiefern im Nebel')
    element('desc', {'id': 'scene-description'}, svg,
            'Wenige ungleich verteilte ASCII-Kieferngruppen lösen sich in dunkelgrünem '
            'Nebel auf. Ein weiter, zusammenhängender Raum bleibt frei. '
            'Neue digitale Komposition aus der vorhandenen ASCII-Adaption von '
            'Hasegawa Tōhakus Pine Trees, Tokyo National Museum.')
    defs = element('defs', parent=svg)
    element('rect', {'width': str(width), 'height': str(height), 'fill': BACKGROUND}, svg)

    def fragment(name, bounds, scale, tx, ty, opacity):
        x, y, bw, bh = bounds
        # Masks fade ink, rather than blurring the individual ASCII characters.
        gradient(defs, name + '-x', 'x', bw,
                 [(0, 0), (.10, .6), (.22, 1), (.76, 1), (.94, .25), (1, 0)])
        gradient(defs, name + '-y', 'y', bh,
                 [(0, 0), (.10, .75), (.22, 1), (.53, .95), (.73, .48), (.96, 0), (1, 0)])
        horizontal = element('mask', {'id': name + '-mask-x', 'maskUnits': 'userSpaceOnUse',
                                      'x': '0', 'y': '0', 'width': str(bw), 'height': str(bh)}, defs)
        element('rect', {'width': str(bw), 'height': str(bh), 'fill': f'url(#{name}-x)'}, horizontal)
        vertical = element('mask', {'id': name + '-mask-y', 'maskUnits': 'userSpaceOnUse',
                                    'x': '0', 'y': '0', 'width': str(bw), 'height': str(bh)}, defs)
        element('rect', {'width': str(bw), 'height': str(bh), 'fill': f'url(#{name}-y)'}, vertical)
        position = element('g', {'id': name, 'transform': f'translate({tx} {ty}) scale({scale})',
                                 'opacity': str(opacity)}, svg)
        masked_x = element('g', {'mask': f'url(#{name}-mask-x)'}, position)
        masked_y = element('g', {'mask': f'url(#{name}-mask-y)'}, masked_x)
        ink = element('g', {'transform': f'translate({-x} {-y})',
                           'font-family': 'Menlo,Consolas,monospace', 'font-size': '5',
                           '{http://www.w3.org/XML/1998/namespace}space': 'preserve'}, masked_y)
        count = 0
        for glyph in glyphs:
            gx, gy = float(glyph.get('x')), float(glyph.get('y'))
            length = float(glyph.get('textLength', '3'))
            if gx + length < x or gx > x + bw or not y <= gy <= y + bh:
                continue
            copy = deepcopy(glyph)
            copy.set('fill', green_ink(copy.get('fill')))
            ink.append(copy)
            count += 1
        return count

    if portrait:
        specs = [
            ('left-distance', (940, 0, 800, 928), .22, 55, 125, .19),
            ('right-middle', (280, 0, 730, 928), .38, 650, 395, .43),
            ('left-near', (2180, 0, 910, 928), .62, -215, 925, .68),
        ]
    else:
        specs = [
            ('left-distance', (940, 0, 800, 928), .28, 300, 145, .20),
            ('left-near', (2180, 0, 910, 928), .60, -170, 415, .70),
            ('right-middle', (280, 0, 730, 928), .52, 1570, 515, .48),
        ]
    count = sum(fragment(*spec) for spec in specs)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(ET.tostring(svg, encoding='unicode') + '\n')
    print(f'{destination.name}: {width} × {height}, {len(specs)} groups, {count} glyph runs')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=ROOT / 'assets/source/pines-original.svg')
    args = parser.parse_args()
    compose(args.source, ROOT / 'assets/pines-ma-desktop.svg')
    compose(args.source, ROOT / 'assets/pines-ma-mobile.svg', portrait=True)
