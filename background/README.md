# Ma — Kiefern im Nebel

Eine eigenständige, bildschirmfüllende Hintergrundseite. Öffnen:
[index.html](index.html). Die Seite zeigt ausschließlich die Landschaft; Titel
und Beschreibung sind nur für assistive Technik vorhanden. Es gibt keine
Bedienelemente, Animationen, Zufallsmuster oder externen Laufzeitabhängigkeiten.

## Gestaltung

Diese neue digitale Anordnung verwendet Ausschnitte der vorhandenen
ASCII-Kiefern. Ausgangspunkt ist die Portfolio-Studie nach Hasegawa Tōhakus
*Pine Trees* (Tokyo National Museum). Sie ist eine eigenständige Interpretation,
keine Rekonstruktion oder Erweiterung des historischen Gemäldes.

Der Wunsch nach Ma wird hier als Gestaltungsentscheidung umgesetzt:

- Drei ungleich verteilte Gruppen statt einer geschlossenen Waldumrandung.
- Eine nähere Gruppe links unten, eine kleinere rechts und eine schwache
  Andeutung in der Ferne.
- Ein zusammenhängender freier Raum in der Mitte, der durch nichts gefüllt wird.
- Tonabstufungen sowie weiche horizontale und vertikale Masken lassen Teile
  der Bäume im Nebel verschwinden. Die ASCII-Zeichen selbst werden nicht verwischt.
- Keine gezeichnete Horizontlinie, künstliche Wolken oder zusätzliche Ornamente.
- Dunkles Grün als ruhige Fortführung der Timer-Gestaltung.

Die leere Fläche ist bewusst Teil der Komposition. Das Bild wird nicht gekachelt.
Für Hochformat gibt es eine eigene Anordnung anstelle eines bloßen Zuschnitts.

## Dateien

- `index.html` und `style.css`: eigenständige Hintergrundseite.
- `assets/pines-ma-desktop.svg`: editierbare Komposition, 1920 × 1080.
- `assets/pines-ma-mobile.svg`: editierbare Komposition, 900 × 1600.
- Gleichnamige PNG-Dateien: direkt verwendbare Bildexporte mit fest gerenderten
  ASCII-Zeichen, damit die Darstellung nicht von installierten Fonts abhängt.
- `assets/source/pines-original.svg`: unveränderte Kopie der vorhandenen
  ASCII-Vorlage aus dem Portfolio.
- `build_scene.py`: erzeugt beide SVG-Kompositionen ausschließlich aus diesen
  vorhandenen Zeichen und Baumausschnitten.

Neu erzeugen:

```sh
python3 background/build_scene.py
```

Die PNG-Exporte wurden anschließend mit dem verfügbaren SVG-Renderer von Sharp
berechnet. Der Generator selbst benötigt nur die Python-Standardbibliothek.

## Verwendung als Timer-Hintergrund

Diese frühere Studie bleibt als eigenständige Hintergrundseite erhalten.
Die aktuelle Timer-Hauptseite im Projektverzeichnis verwendet Landschaft 05
aus der gemeinsamen Kiefern-Sammlung; deren lokale Bildkopien liegen in `assets/`.

## Geprüft

- Beide SVGs erfolgreich erzeugt und als PNG gerendert.
- Beide Bildexporte visuell geprüft.
- Der mittlere Streifen von 32 bis 68 Prozent der Bildbreite ist in beiden
  Exporten über die volle Höhe vollständig frei von Baumzeichen.
- Rund 3,94 Prozent der Desktop-Pixel und 4,51 Prozent der Hochformat-Pixel
  weichen um mehr als 2/255 von der Grundfarbe ab. Das ist eine technische
  Dichtemessung der Zeichen, keine Messung der ästhetischen Wirkung von Ma.
- Dateiverweise und XML geprüft. Kein JavaScript für die Hintergrundseite nötig.
- Eine Browserprüfung der HTML-Seite steht noch aus; der Testbrowser hat das
  Öffnen lokaler Datei-URLs zuvor abgelehnt. Die Bildprüfung ist davon unabhängig.

## Herkunft und Referenzen

Die ursprüngliche ASCII-Komposition ist in `portfolio/design/forest-composition.md`
und `portfolio/design/build_pine_frame.py` dokumentiert. Die Originaldateien im
Portfolio wurden nicht geändert.

- [Tokyo National Museum: Pine Trees](https://www.tnm.jp/modules/r_exhibition/index.php?controller=item&id=6470&lang=en)
- [Tokyo National Museum auf Google Arts & Culture: Pine Trees](https://artsandculture.google.com/asset/pine-trees-0040/HgFQR4hgzPorXg)
- [Columbia University: Ma — The Japanese Spatial Expression](https://www.columbia.edu/itc/ealac/V3613/ma/)
- [Vom Nutzer genannte Erläuterung zu Ma](https://en.wikipedia.org/wiki/Ma_(negative_space))

Die Museumsbeschreibungen betonen die Abstufungen der Tusche und die im Nebel
auftauchenden Baumgruppen. Die räumliche Neuanordnung und ihre Anwendung auf
einen Softwarehintergrund sind eigene Gestaltungsentscheidungen für dieses Projekt.
