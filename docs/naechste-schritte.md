# Nächste Schritte des Fokus-Timers

Stand: 30.10.2026. Die aktuelle Planung ersetzt frühere Oberflächenentscheidungen.
Das [ursprüngliche Konzept](projektkonzept.md) bleibt als historische Grundlage.

## Aktueller Umfang

Ein [Timerfeld](browser-version.md) verbindet Fokus und automatische Pause.
Vor dem Start ist der Countdown ausgeblendet; die Profilauswahl ist sichtbar.
Zuerst wird ein Ziel eingegeben; erst danach ist Play nutzbar. Nach Play werden Eingabe, Profilauswahl und Button
ausgeblendet, die Eingabe geleert und die laufende Zeit eingeblendet.
Der Zieltext bleibt für die Dauer des Zyklus im Arbeitsspeicher.

Die aktuelle Voreinstellung ist 25 + 5. Die Profile 15 + 5, 20 + 5, 25 + 5,
30 + 10, 35 + 10, 40 + 10 und 50 + 10 sind vor jedem Zyklus auswählbar.
[Forschung und Quellen](fokus-und-pausen-studien.md).

Für Tests gibt es zusätzlich 1 + 1.

Nach Ablauf des Fokus beginnt die Pause automatisch. Im oberen Drittel steht
der kleinere Pausentimer; darunter erscheinen die ursprünglichen Ziele zentriert
und mit ihren Zeilenumbrüchen. Danach werden die Ziele verworfen und das Feld kehrt zur
leeren Zieleingabe zurück; der Countdown ist wieder verborgen. Für den nächsten
manuellen Start ist ein neues Ziel erforderlich. Während des gesamten aktiven
Zyklus ist Play ausgeblendet und deaktiviert. Anhalten, Fortsetzen, vorzeitiges
Beenden und Zurücksetzen gehören nicht zur Oberfläche.

Notizen, Rückblick, Verlauf und Tabs gehören nicht zum aktuellen Umfang.
Die Oberfläche verwendet die dunkle Portfolio-Gestaltung mit grünen Akzenten.
Die gesamte aktuelle Timer-Oberfläche ist englischsprachig, einschließlich
Fehlermeldungen, Tooltips und zugänglichen Beschriftungen.
Die Pine-Tree-Landschaft 05 liegt innerhalb des Timer-Rechtecks; die Hauptseite
verwendet den bisherigen dunklen Grundton des Rechtecks.
Die eigenständigen Pine-Tree-Landschaften liegen in der gemeinsamen Sammlung.

## Bedienung und Zuverlässigkeit

Das Feld soll im normalen Laptop-/Desktopfenster ohne Scrollen sichtbar bleiben.
Zieleingabe und Play stehen an festen Stellen. Für kleine Fenster und
vergrößerte Schrift bleiben Lesbarkeit und vollständiger Zugriff vorrangig.

Restzeit und Phasenwechsel richten sich nach Zeitstempeln. Ein verspäteter
Anzeigeaufruf verschiebt den Pausenbeginn nicht nach hinten. Nach einer
Unterbrechung über beide Phasen hinweg startet kein weiterer Fokus automatisch.
Standby zählt im Entwurf als verstrichene Timerzeit, nicht als nachgewiesene
Konzentration. Ein Profilwechsel ist während laufender Phasen gesperrt.

## Browser-Version

Die aktuelle Oberfläche liegt direkt in `index.html` im Projektverzeichnis.
Die frühere Vorschau unter `prototype/index.html` leitet dorthin weiter.
HTML, CSS und JavaScript laufen ohne Build, Backend oder Paketinstallation.
GitHub Pages veröffentlicht den aktuellen Stand aus `main`.
Der Rahmen bleibt vollständig sichtbar; die Restzeit zeigt nur der Countdown.
Die Zieleingabe ist auf vier sichtbare Zeilen begrenzt, ohne Warnhinweis.

## Nächste technische Schritte

- Die veröffentlichte Browser-Version ist bei 1280 × 720 einschließlich eines
  vollständigen 1 + 1-Zyklus geprüft. Weitere Browser und mobile Fenstergrößen
  stehen noch aus.
- Die vorhandenen 29 Tests und Syntaxprüfungen laufen über GitHub Actions.
- Eine spätere installierbare Web-App mit Manifest und Offline-Cache prüfen.
- TypeScript oder Vite erst ergänzen, wenn sie für den Umfang einen konkreten Nutzen bieten.
- Bei der späteren Speicherung Wiederaufnahme, Uhrzeitänderungen, Reset,
  mehrere Tabs und Datenverlust konkret behandeln.

Python/FastAPI, uv, SQLite, Docker und Terraform bleiben mögliche weitere
Lernschritte, soweit sie dem vereinfachten Produkt tatsächlich dienen.
