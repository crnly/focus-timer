# Fokus-Timer

Ein ruhiger Fokus-Timer im Browser, gebaut mit HTML, CSS und JavaScript.
Ziele setzen, konzentriert arbeiten und anschließend eine automatische Pause machen.

**[Timer im Browser öffnen](https://crnly.github.io/fokus-timer/)**

## Ablauf

1. Ziele eingeben: maximal vier sichtbare Zeilen.
2. Fokus- und Pausendauer wählen. Standard: **25 + 5 Minuten**.
3. Play drücken. Die Eingabe verschwindet, der Countdown startet.
4. Die Pause beginnt automatisch. Oben erscheint der kleinere Pausentimer,
   darunter stehen die ursprünglichen Ziele mit ihren Zeilenumbrüchen.
5. Nach der Pause erscheint wieder die leere Startansicht. Der nächste Zyklus
   beginnt erst, wenn ein neues Ziel eingegeben und Play gedrückt wird.

Weitere Zeitprofile: **15 + 5, 20 + 5, 30 + 10, 35 + 10, 40 + 10, 50 + 10**.

Die Oberfläche ist englischsprachig. Es gibt keine Pause-, Reset- oder
Skip-Buttons, keine Konten und keinen Sitzungsverlauf. Das ruhige Design
verbindet dunkles Grün, eine feste abgerundete Kontur und ASCII-Kiefern.

## Lokal öffnen

Die Datei `index.html` direkt im Browser öffnen. Eine Paketinstallation,
ein Build oder ein Backend sind nicht erforderlich.

Optional mit lokalem Webserver aus dem Projektverzeichnis:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Anschließend [localhost:4173](http://127.0.0.1:4173) öffnen.
Der frühere Einstieg `prototype/index.html` leitet zur Hauptseite weiter.

## Daten und Zeitmessung

Ziele und Timerzustand bleiben ausschließlich im Arbeitsspeicher des geöffneten
Tabs. Die Ziele werden nach der Pause verworfen. Neuladen oder Schließen beendet
die Sitzung. Es werden keine Ziele an einen Server geschickt oder dauerhaft gespeichert.

Die Restzeit wird aus Zeitstempeln berechnet. Nach einem verzögerten
Anzeigeaufruf wird der Zustand nachberechnet; Standby zählt als verstrichene Zeit.
Browser können Hintergrund-Tabs aussetzen. Es gibt deshalb keine garantierte
Benachrichtigung zum Phasenende. Diese Version ist eine normale Browser-App;
eine Installation als PWA gehört noch nicht dazu.

## Projektstruktur

| Pfad | Inhalt |
| --- | --- |
| `index.html` | Oberfläche und Einstieg |
| `style.css` | Layout und Gestaltung |
| `script.js` | Zieleingabe, Auswahl und Ansichten |
| `timer.js`, `cycle.js` | Countdown und Fokus-Pausen-Ablauf |
| `assets/` | Lokale Hintergrundbilder und Herkunft |
| `tests/` | Automatische Tests ohne externe Pakete |
| `docs/` | Browser-Version, Studien und frühere Überlegungen |
| `background/` | Separate frühere Kiefern-Hintergrundstudie |

## Prüfen

Mit Node.js 24:

```sh
node --test tests/*.test.cjs
node --check script.js
node --check cycle.js
node --check timer.js
```

GitHub Actions führt die Tests bei Pushes und Pull Requests aus.
GitHub Pages veröffentlicht die Dateien aus `main` im Projektverzeichnis.
Es werden nur relative Asset-Pfade verwendet, damit auch der Unterpfad
`/fokus-timer/` funktioniert.

## Hintergrund und Entwicklung

- [Browser-Version und Bedienung](docs/browser-version.md)
- [Aktueller Umfang und nächste Schritte](docs/naechste-schritte.md)
- [Studien zu Fokus- und Pausendauern](docs/fokus-und-pausen-studien.md)
- [Ursprüngliches Projektkonzept](docs/projektkonzept.md) – historische Überlegungen
- [Herkunft der Kiefern-Bilder](assets/README.md)
- [Separate Hintergrundstudie](background/index.html)

Das Projekt entstand beim Lernen von Git, GitHub und der Zusammenarbeit mit
KI-Coding-Assistenten. Der Code wurde mit Unterstützung von Claude Code und
OpenAI Codex erstellt.
