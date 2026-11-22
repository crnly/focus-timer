# Focus Timer – Projekt- und Lernplan

Stand: 21. November 2026

## Ziel

Wir bauen eine vollständige Focus-App als langfristiges Lernprojekt. Ausgangspunkt ist ein bereits mit KI-Unterstützung entwickelter Focus Timer auf GitHub. Die neue Version entsteht bewusst von Hand: Jede Zeile soll selbst geschrieben und verstanden werden.

Wir beginnen schlicht mit HTML und CSS. Die Anwendung wächst anschließend schrittweise um JavaScript, TypeScript, React, Backend, Datenbank und Benutzerkonten. React ist als Frontend-Bibliothek festgelegt; Vue ist keine zusätzliche Lernstufe in diesem Projekt.

Die bestehende App dient als Referenz. Ihr GitHub-Link und ihr genauer Funktionsumfang müssen noch aufgenommen werden.

## Geplanter Funktionsumfang

Der zentrale Ablauf der späteren App lautet:

**Anmelden → Fokusphase durchführen → Session speichern → Session in der persönlichen Historie wiederfinden.**

Geplante Kernfunktionen:

- Timer starten, pausieren, zurücksetzen, abbrechen und abschließen.
- Fokusphasen sowie kurze und lange Pausen.
- Benutzerkonto mit Registrierung, Anmeldung, Abmeldung und Passwort-Zurücksetzen.
- Persönliche Session-Historie mit Datum, geplanter und tatsächlicher Dauer sowie Status.
- Aufgaben oder Projekte, denen eine Session zugeordnet werden kann.
- Persönliche Einstellungen für Fokusdauer, Pausendauer und Tagesziel.
- Einfache Statistiken zur täglichen und wöchentlichen Fokuszeit und zu abgeschlossenen Sessions.
- Responsive Darstellung für Smartphone und Desktop.

Mögliche spätere Erweiterungen:

- Notizen nach einer Session.
- Filter in der Historie.
- Wochenübersicht.
- Datenexport.
- Synchronisierung zwischen Geräten über das Benutzerkonto.

Nicht alles wird gleichzeitig umgesetzt. Jede Etappe erhält einen kleinen, überprüfbaren Umfang.

## Technisches Zielbild

| Bereich | Technologie | Zweck |
| --- | --- | --- |
| Grundlagen | HTML, CSS, JavaScript | Struktur, Gestaltung und erste Funktionen verstehen |
| Frontend | React und TypeScript | Interaktive Oberfläche und wiederverwendbare Komponenten |
| Entwicklung und Build | Vite | Lokaler Entwicklungsserver und Erstellung der Frontend-Dateien |
| Gestaltung | Eigenes CSS, später CSS Modules | Layout mit Flexbox und Grid, responsive Anpassungen |
| Backend | Node.js, Express und TypeScript | HTTP-API, Eingabeprüfung und Verwaltung der Sessions |
| Datenbank | PostgreSQL | Dauerhafte Speicherung von Sessions, Projekten und Einstellungen |
| Datenbankbetrieb | Voraussichtlich Supabase | Verwaltete PostgreSQL-Datenbank |
| Authentifizierung | Supabase Auth | Registrierung, Login und Passwort-Zurücksetzen |
| Versionsverwaltung | Git und GitHub | Änderungen nachvollziehen und Lernfortschritt sichern |

Die konkrete Hosting-Lösung für Frontend und Backend wird später ausgewählt. Auch zusätzliche Bibliotheken werden erst eingeführt, wenn ein konkreter Bedarf besteht.

### Zusammenspiel der Anwendung

1. Das React-Frontend läuft im Browser und zeigt Timer, Historie und Einstellungen an.
2. Supabase Auth übernimmt die Authentifizierung.
3. Das Frontend sendet Anfragen mit dem erforderlichen Anmeldenachweis an die Express-API.
4. Das Backend prüft den Anmeldenachweis, die Eingaben und die Zugriffsberechtigung auf die angefragten Daten.
5. Das Backend speichert oder liest Daten in PostgreSQL.
6. Das Frontend stellt die Antwort dar.

Persönliche Daten müssen dem jeweiligen Benutzer zugeordnet sein. Die Berechtigung wird auf dem Server geprüft; eine Einschränkung allein in der Oberfläche genügt nicht. Datenbank-Zugangsdaten und privilegierte Schlüssel gehören ausschließlich auf die Serverseite.

Supabase könnte viele Funktionen auch ohne eigenes Express-Backend bereitstellen. Das eigene Backend ist hier bewusst Teil des Lernziels: Wir wollen HTTP, APIs, Validierung, Datenbankzugriffe und Berechtigungen selbst verstehen und implementieren. Die Passwortverwaltung übernimmt die etablierte Authentifizierungslösung.

## Lern- und Entwicklungsstufen

### 1. HTML und CSS

- Eine kleine erste Version und deren Ansichten festlegen.
- Statische Oberfläche für Timer, Anmeldung und Historie schreiben; zunächst kann nur die Timer-Ansicht entstehen.
- Semantisches HTML, Formulare, Box-Modell, Selektoren und Kaskade vertiefen.
- Flexbox, Grid und Media Queries praktisch anwenden.

Ergebnis: Eine verständliche, responsive Oberfläche ohne echte Anmeldung oder Timer-Logik.

### 2. JavaScript

- Variablen, Funktionen, Ereignisse und DOM-Manipulation lernen.
- Timer und Bedienung implementieren.
- Zustände wie bereit, laufend, pausiert, abgeschlossen und abgebrochen unterscheiden.
- Einstellungen und Session-Historie zunächst lokal im Browser speichern.

Ergebnis: Eine lokal nutzbare App ohne Server.

### 3. TypeScript

- Den vorhandenen JavaScript-Code schrittweise mit Typen versehen.
- Datenstrukturen für Sessions, Projekte und Einstellungen beschreiben.
- Verstehen, welche Fehler Typprüfung erkennt und welche Eingaben weiterhin zur Laufzeit geprüft werden müssen.

### 4. React

- Die bekannte Oberfläche bewusst nach React übertragen.
- Komponenten, Props, Zustand und Formularverarbeitung kennenlernen.
- Timer, Historie und Einstellungen in nachvollziehbare Komponenten aufteilen.
- Navigation zwischen Ansichten ergänzen, sobald sie benötigt wird.

Ergebnis: Die bereits verstandene App läuft als React-Anwendung mit TypeScript und Vite.

### 5. Backend und Datenbank

- Einen Node.js-/Express-Server schreiben.
- HTTP-Anfragen und Antworten sowie eine REST-API kennenlernen.
- Endpunkte zum Speichern und Laden von Sessions bauen.
- PostgreSQL, SQL, Tabellen, Beziehungen und Datenbankänderungen lernen.
- Lokale Speicherung schrittweise durch serverseitige Speicherung ergänzen oder ersetzen.

### 6. Benutzerkonten

- Supabase Auth integrieren.
- Registrierung, Login, Logout und Passwort-Zurücksetzen umsetzen.
- Sessions und Einstellungen eindeutig Benutzern zuordnen.
- Zugriffe im Backend absichern und die Trennung zwischen Benutzerdaten überprüfen.

### 7. Veröffentlichung und Weiterentwicklung

- Frontend, Backend und Datenbank online betreiben.
- Entwicklungs- und Produktionskonfiguration unterscheiden.
- Fehlerbehandlung, Protokollierung und passende Tests ergänzen.
- Danach zusätzliche Funktionen gezielt auswählen.

Die Reihenfolge ist ein Lernplan, kein starrer Ablauf. Backend, Datenbank und Authentifizierung können bei der späteren Integration in kleineren gemeinsamen Schritten entstehen. Persönliche Daten werden erst öffentlich bereitgestellt, wenn die Zugriffskontrolle funktioniert.

## Unsere Zusammenarbeit

- Der Lernende schreibt und speichert den Code selbst im Editor.
- Die KI verändert Übungsdateien nur auf ausdrückliche Bitte. Das gilt nicht für ausdrücklich beauftragte Dokumentation wie diesen Plan.
- Wir arbeiten langsam und in kleinen, nachvollziehbaren Schritten.
- Jeder neue Baustein wird mit Zweck, Standardverhalten und Begründung erklärt.
- Aufgaben nennen möglichst die benötigten Elemente, Attribute oder Eigenschaften, ohne die vollständige Lösung zum Abtippen vorzugeben.
- Geeignete Stellen enthalten Denkfragen und kleine Experimente.
- Nach „fertig“ prüft die KI die gespeicherte Datei, erklärt mögliche Fehler und gibt den nächsten überschaubaren Schritt.
- Code muss nicht zusätzlich in den Chat kopiert werden, wenn er in diesem Arbeitsverzeichnis liegt.
- Fertige Lösungsblöcke gibt es auf Wunsch oder als gezielte Hilfe beim Festhängen.
- Kleine eigene Ergänzungen und vorhandenes Vorwissen sind willkommen.
- Wir unterscheiden zwischen Aufgabenanforderung, üblicher Praxis und optionaler Erweiterung.

## Noch zu entscheiden

- GitHub-Link und Funktionsumfang der bisherigen App.
- Genauer Umfang und Gestaltung der ersten statischen Timer-Version.
- Gastmodus: Empfehlung ist ein Timer ohne Anmeldung, mit Konto für dauerhafte persönliche Historie und Synchronisierung. Das ist noch nicht abschließend entschieden.
- Details der Session-Erfassung: Wie werden Pausen, Abbrüche und tatsächliche Fokuszeit gezählt?
- Konkretes Hosting und ergänzende Werkzeuge für spätere Entwicklungsstufen.

## Nächster Einstieg

Zunächst wird das CSS-Skript aus dem Studium eigenständig weitergearbeitet. Wenn die Arbeit am Focus Timer beginnt, schauen wir uns die bisherige App an, begrenzen die erste Version und starten mit dem HTML-Grundgerüst. Wir richten noch nicht den gesamten späteren Stack auf einmal ein.

## Technische Referenzen

- [React: Eine App von Grund auf erstellen](https://react.dev/learn/build-a-react-app-from-scratch)
- [Node.js: Lernmaterial](https://nodejs.org/learn)
- [Express: Routing-Grundlagen](https://expressjs.com/en/starter/basic-routing/)
- [PostgreSQL: Überblick](https://www.postgresql.org/about/)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
