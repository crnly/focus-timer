# Fokus-Journal – Projektkonzept und bisherige Überlegungen

Stand: 29.10.2026

Dieses Dokument fasst die bisherigen Ideen und technischen Entscheidungen für die Weiterentwicklung des Fokus-Timers zusammen. Es beschreibt den geplanten Ausbau; die neuen Funktionen sind noch nicht implementiert.

## 1. Projektidee

Der bestehende Fokus-Timer wird zu einem lokalen Fokus- und Reflexionsprogramm weiterentwickelt.

Der zentrale Ablauf lautet:

**Ziel setzen → konzentriert arbeiten → kurz reflektieren → Fortschritt nachvollziehen → nächsten Schritt beginnen.**

Das Programm soll im eigenen Alltag helfen, Aufgaben konkret zu formulieren, Gedanken während der Arbeit festzuhalten und nach einer Unterbrechung leichter wieder einzusteigen.

Der Arbeitsname lautet **Fokus-Journal**. Das bestehende Repository `fokus-timer` dient als Ausgangspunkt.

## 2. Bestehender Ausgangspunkt

Der aktuelle Fokus-Timer besteht aus HTML, CSS und JavaScript.

Bereits vorhanden sind:

- Auswahl zwischen 5 und 25 Minuten
- Timer starten
- Timer pausieren und fortsetzen
- Timer zurücksetzen
- Verbleibende Zeit im Browser-Tab anzeigen

Der bisherige Aufbau:

- `index.html`: Oberfläche und Bedienelemente
- `style.css`: Gestaltung
- `script.js`: Timerlogik und Anzeige

Das Projekt entstand beim Lernen von VS Code, Git, GitHub und der Zusammenarbeit mit KI-Coding-Assistenten.

Der vorhandene Code wird beim Ausbau schrittweise weiterentwickelt.

## 3. Produktziel

Das Fokus-Journal soll mehr als die verbleibende Zeit anzeigen. Es verbindet eine Arbeitsphase mit einem konkreten Ziel, einem kurzen Ergebnis und einem nächsten Schritt.

Beispiel:

> **Projekt:** Agentic AI<br>
> **Ziel:** Drei Prüffälle ergänzen<br>
> **Ergebnis:** Zwei umgesetzt, einen Fehler bei Pflichtcodes gefunden<br>
> **Nächster Schritt:** Fehler mit einer kleinen Testdatenbank reproduzieren<br>
> **Bewertung:** Teilweise erreicht

Der nächste Schritt einer abgeschlossenen Sitzung kann beim nächsten Start als neues Ziel vorgeschlagen werden.

Der Schwerpunkt liegt auf einer ruhigen, verständlichen Anwendung mit wenigen gut verbundenen Funktionen.

## 4. Ablauf einer Fokusphase

### 4.1 Vor dem Start

Die Anwendung fragt:

**„Was möchte ich in dieser Fokusphase erreichen?“**

Mögliche Angaben:

- Ein kurzes, konkretes Ziel
- Optional ein zugehöriges Projekt
- Optional Tags
- Die gewünschte Fokusdauer

Beispielprojekte:

- Hochschule
- Bewerbung
- Eigene Projekte
- Persönliche Organisation

### 4.2 Während der Fokusphase

Sichtbar bleiben:

- Verbleibende Zeit
- Das aktuelle Ziel
- Start-, Pause- und Fortsetzen-Funktionen
- Ein kleines Notizfeld

Das Notizfeld dient dazu, Gedanken, offene Fragen oder Ablenkungen festzuhalten, ohne sofort die aktuelle Aufgabe zu wechseln.

### 4.3 Am Ende der Fokusphase

Die Anwendung bietet einen kurzen Rückblick:

- **Was habe ich geschafft?**
- **Was ist der nächste Schritt?**

Zusätzlich kann das Ziel bewertet werden:

- Erreicht
- Teilweise erreicht
- Offen

Die Reflexion soll kurz bleiben. Wenige eigene Worte reichen aus.

Eine KI-generierte Zusammenfassung ist dafür nicht erforderlich.

### 4.4 In der Pause

Mögliche Funktionen:

- Pausentimer
- Kurze oder lange Pause
- Dezente Pausenimpulse
- Eigene Zitate
- Hinweise wie aufstehen, etwas trinken oder kurz bewegen

Ob die Pause automatisch beginnt oder bewusst gestartet wird, ist noch festzulegen.

### 4.5 Beim nächsten Einstieg

Der letzte nächste Schritt soll leicht wiederzufinden sein.

Möglich ist eine Funktion:

**„Mit diesem nächsten Schritt fortsetzen.“**

Dadurch entsteht eine Verbindung zwischen einzelnen Fokusphasen.

## 5. Empfohlene Funktionen

### 5.1 Kernumfang der ersten vollständigen Version

1. Fokus- und Pausentimer
2. Ein Ziel pro Fokusphase
3. Kleines Notizfeld
4. Kurzer Rückblick
5. Bewertung der Zielerreichung
6. Nächster Schritt
7. Dauerhafte Speicherung
8. Einfacher Sitzungsverlauf

Damit entsteht bereits ein vollständiger, im Alltag nutzbarer Ablauf.

### 5.2 Anschließende Erweiterungen

| Funktion | Nutzen |
|---|---|
| Projekte und Tags | Arbeitsbereiche unterscheiden |
| Verlauf filtern | Frühere Sitzungen gezielt wiederfinden |
| Tagesübersicht | Fokusphasen und Ergebnisse des Tages sehen |
| Wochenübersicht | Entwicklung über mehrere Tage nachvollziehen |
| Eigene Zeitprofile | Fokusdauer und Pausen anpassen |
| Ablenkungsnotizen | Gedanken für später festhalten |
| Export und Import | Daten sichern und übertragen |
| Einzelne Einträge löschen | Eigene Daten verwalten |
| Eigene Zitate | Persönliche Pausenimpulse hinterlegen |
| Tastaturbedienung | Wiederkehrende Aktionen schnell ausführen |
| Ruhiges Design | Konzentration und Übersicht unterstützen |

### 5.3 Statistiken

Sinnvolle Auswertungen sind beispielsweise:

- Tatsächlich erfasste Fokuszeit pro Tag und Woche
- Anzahl abgeschlossener Fokusphasen
- Zeit nach Projekt
- Erreichte, teilweise erreichte und offene Ziele
- Übersicht über Ergebnisse und nächste Schritte

Gestartete Timer und abgeschlossene Sitzungen müssen unterschieden werden.

Geplante Dauer und tatsächlich erfasste Fokuszeit dürfen nicht miteinander verwechselt werden.

Die Auswertung soll Orientierung bieten. Eine hohe Anzahl gestarteter Timer ist für sich genommen noch kein sinnvoller Fortschrittsnachweis.

## 6. Technische Grundentscheidung

Die Anwendung besteht aus:

1. Einer Browseroberfläche
2. Einem lokalen Python-Backend
3. Einer SQLite-Datenbank

Die Oberfläche kommuniziert mit dem eigenen Python-Dienst über eine lokale Schnittstelle.

Dafür sind weder ein externer API-Anbieter noch ein API-Key notwendig.

Für den vorgesehenen Funktionsumfang benötigen wir kein Sprachmodell.

## 7. Geplanter Techstack

| Bereich | Technologie | Aufgabe |
|---|---|---|
| Struktur der Oberfläche | HTML | Ansichten und Bedienelemente |
| Gestaltung | CSS | Layout, Farben und responsive Darstellung |
| Frontend-Logik | TypeScript | Timer, Zustände, Formulare und Datenverarbeitung |
| Frontend-Werkzeuge | Vite | Entwicklungsserver und Build |
| Frontend-Paketverwaltung | npm | JavaScript-/TypeScript-Abhängigkeiten verwalten |
| Frontend-Werkzeuglaufzeit | Node.js | npm, Vite und TypeScript-Werkzeuge ausführen |
| Backend | Python mit FastAPI | Sitzungen verwalten und Auswertungen bereitstellen |
| Python-Projektverwaltung | uv | Python-Version, Umgebung und Abhängigkeiten verwalten |
| Datenhaltung | SQLite | Sitzungen, Projekte und Einstellungen speichern |
| Backend-Tests | pytest | Fachlogik, Eingabeprüfung und Speicherung testen |
| Browser-Tests | Playwright | Vollständige Bedienabläufe prüfen |
| Bereitstellung | Docker | Anwendung in einer definierten Linux-Umgebung ausführen |
| Infrastruktur | Terraform | Lokale Docker-Ressourcen verwalten |
| Automatische Prüfungen | GitHub Actions | Typprüfung, Tests und Build ausführen |
| Versionsverwaltung | Git und GitHub | Änderungen und Entwicklungsschritte nachvollziehen |

### 7.1 TypeScript

TypeScript wird direkt beim Ausbau eingesetzt.

Es hilft besonders bei:

- Timerzuständen
- Sitzungsdaten
- Einstellungen
- Backend-Anfragen und -Antworten
- Änderungen an gemeinsamen Datenstrukturen

Ein mögliches Datenmodell:

```ts
type SessionResult = "completed" | "partial" | "open";

interface FocusSession {
  id: string;
  goal: string;
  durationSeconds: number;
  recap: string;
  nextStep: string;
  result: SessionResult;
}
```

Das ist ein erster Entwurf. Zeitangaben, Projektzuordnung und weitere Felder werden bei der konkreten Modellierung ergänzt.

Mögliche Timerzustände:

- Bereit
- Läuft
- Pausiert
- Abgeschlossen

Fokusphase und Pause müssen ebenfalls eindeutig unterschieden werden.

TypeScript prüft Typen während der Entwicklung. Es ersetzt keine Prüfung von Daten zur Laufzeit.

Backend-Antworten und importierte Dateien müssen deshalb zusätzlich validiert werden.

### 7.2 Vite und Typprüfung

Vite stellt den Entwicklungsserver und den Frontend-Build bereit.

Da Vite TypeScript verarbeitet, aber selbst keine vollständige Typprüfung ausführt, wird diese ausdrücklich ergänzt:

```text
tsc --noEmit
```

Die Typprüfung wird auch in die automatischen GitHub-Prüfungen aufgenommen.

### 7.3 React

React ist für den geplanten Anfangsumfang nicht erforderlich.

Die bestehende Oberfläche kann mit HTML, CSS und TypeScript weiterentwickelt werden. Die Logik wird in verständliche Module aufgeteilt.

Ein späterer Framework-Wechsel müsste durch konkrete Anforderungen begründet sein.

### 7.4 uv

uv bleibt für den gesamten Python-Teil erhalten.

Aufgaben:

- Python-Version verwalten
- Virtuelle Umgebung erstellen
- Abhängigkeiten installieren
- Backend starten
- Tests ausführen
- Abhängigkeiten reproduzierbar festhalten

Zentrale Dateien:

- `pyproject.toml`
- `uv.lock`

Die Aufteilung lautet:

**uv für Python, npm für das Frontend.**

### 7.5 FastAPI

FastAPI bildet das lokale Backend.

Vorgesehene Aufgaben:

- Sitzungen anlegen und speichern
- Verlauf laden
- Projekte verwalten
- Eingaben validieren
- Auswertungen bereitstellen
- Export und Import unterstützen

Das Backend verarbeitet die Daten unabhängig davon, wie die Oberfläche sie anzeigt.

### 7.6 SQLite

SQLite speichert die Daten lokal und benötigt keinen separaten Datenbankserver.

Vorgesehene Datenbereiche:

- Fokusphasen
- Ziele
- Notizen
- Rückblicke
- Nächste Schritte
- Projekte
- Tags
- Einstellungen

Das genaue Schema wird vor der Implementierung festgelegt.

### 7.7 Docker und Linux

Docker stellt eine reproduzierbare Linux-Umgebung für die Anwendung bereit.

Ziele:

- Definierte Laufzeit
- Nachvollziehbare Installation
- Reproduzierbarer Start
- Persistente Speicherung außerhalb des austauschbaren Containers

Die SQLite-Datei soll beim Austausch eines Containers erhalten bleiben.

Der Aufbau wird auf dem M1 mit 8 GB RAM praktisch geprüft. Da kein Sprachmodell benötigt wird, entfällt dessen zusätzlicher Speicherbedarf.

### 7.8 Terraform

Terraform wird von Beginn an im Projekt vorgesehen und integriert, sobald eine erste ausführbare Backend-Version vorhanden ist.

Konkrete Aufgaben:

- Lokalen Anwendungscontainer verwalten
- Persistenten Speicher einrichten
- Gegebenenfalls ein eigenes Docker-Netzwerk verwalten
- Konfiguration über Variablen nachvollziehbar machen
- Umgebung reproduzierbar erstellen und entfernen

Lernfelder:

- Ressourcen
- Variablen
- Outputs
- State
- `plan`
- `apply`
- `destroy`

Dafür ist kein Cloud-Konto notwendig.

Die lokale Bereitstellung vermittelt Infrastructure-as-Code-Grundlagen. Ein tatsächliches Cloud-Deployment wäre eine spätere, zusätzliche Ausbaustufe.

## 8. Zuverlässigkeit des Timers

Der bisherige Timer reduziert seine Restzeit bei jedem Intervall um eine Sekunde.

Beim Ausbau soll die Restzeit anhand von Zeitstempeln berechnet werden. Das Aktualisierungsintervall dient dann hauptsächlich der Anzeige.

Folgende Situationen müssen ausdrücklich behandelt werden:

- Starten
- Pausieren
- Fortsetzen
- Zurücksetzen
- Ablauf einer Fokusphase
- Wechsel zur Pause
- Neuladen der Seite
- Schließen und erneutes Öffnen
- Hintergrundtab
- Rechner im Standby
- Unterbrochene Sitzung

Noch festzulegen ist insbesondere:

- Zählt Standby-Zeit als Fokuszeit?
- Wird eine unterbrochene Sitzung fortgesetzt oder zur Prüfung angeboten?
- Was geschieht bei einem Reset mit bereits erfasster Zeit?
- Wie werden abgebrochene Sitzungen gespeichert?
- Wird eine Fokusphase automatisch abgeschlossen oder erst nach Bestätigung?

Diese Entscheidungen müssen in Oberfläche, Datenmodell und Tests übereinstimmen.

## 9. Datenhaltung und Datenschutz

Die erste Ausbaustufe ist als lokale Anwendung für die eigene Nutzung gedacht.

Wichtige Eigenschaften:

- Daten lokal speichern
- Notizen sicher als Text darstellen
- Eingaben auf gültige Inhalte und sinnvolle Grenzen prüfen
- Datenbankabfragen parametrisieren
- Importdateien vor der Übernahme prüfen
- Daten exportieren können
- Einträge und Daten löschen können
- Backups und Wiederherstellung nachvollziehbar gestalten

Eine Fokusphase darf bei mehrfachen Klicks oder wiederholten Speicheranfragen nicht mehrfach angelegt werden.

Die erste Version benötigt keine Benutzerkonten oder Synchronisation zwischen Geräten. Bei einer späteren Mehrbenutzer- oder Onlineversion müssten Zugriffsschutz und Bereitstellung neu betrachtet werden.

## 10. Teststrategie

Tests werden mit jeder Ausbaustufe ergänzt.

### 10.1 Timer und Zustände

Beispiele:

- Ein Timer kann nicht mehrfach gleichzeitig gestartet werden.
- Pause und Fortsetzen erhalten die korrekte Restzeit.
- Der Timer endet bei null.
- Ein Reset führt in den vorgesehenen Zustand.
- Die Anzeige entspricht den gespeicherten Zeitangaben.
- Unterbrechungen werden nach den festgelegten Regeln behandelt.

### 10.2 Datenhaltung

Beispiele:

- Eine Sitzung wird korrekt gespeichert.
- Ein erneuter Speicherversuch erzeugt kein Duplikat.
- Gespeicherte Daten sind nach einem Neustart vorhanden.
- Ungültige Daten werden abgewiesen.
- Löschen entfernt die vorgesehenen Daten.
- Export und erneuter Import erhalten die relevanten Angaben.

### 10.3 Sicherheit

Beispiele:

- HTML- oder Skripttext in einer Notiz wird nicht ausgeführt.
- Ungültige Importdateien werden erkannt.
- Zu große oder falsch aufgebaute Eingaben werden behandelt.
- Manipulierte Werte führen nicht zu unerlaubten Datenbankoperationen.

### 10.4 Browserabläufe

Playwright prüft zentrale Bedienabläufe, beispielsweise:

1. Ziel eingeben
2. Fokusphase starten
3. Pausieren und fortsetzen
4. Fokusphase abschließen
5. Rückblick speichern
6. Sitzung im Verlauf wiederfinden

Zeitabhängige Tests sollen möglichst mit einer kontrollierten Testuhr arbeiten.

### 10.5 GitHub Actions

Geplante automatische Prüfungen:

- TypeScript-Typprüfung
- Frontend-Build
- Python-Tests
- Ausgewählte Browser-Tests
- Prüfung des Container-Builds

Die genaue Aufteilung wird passend zum tatsächlichen Projektumfang festgelegt.

## 11. Gestaltung und Bedienung

Die Anwendung soll ruhig und übersichtlich bleiben.

Leitgedanken:

- Das aktuelle Ziel bleibt sichtbar.
- Die wichtigste Aktion ist leicht erkennbar.
- Notizen und Reflexion sind schnell erreichbar.
- Der Rückblick bleibt kurz und freiwillig handhabbar.
- Verlauf und Statistiken sind vom laufenden Fokusbereich getrennt.
- Tastaturbedienung wird berücksichtigt.
- Die Oberfläche funktioniert auf unterschiedlichen Fenstergrößen.
- Zitate und Pausenimpulse bleiben dezent.

Ein konkretes visuelles Design wurde bisher noch nicht festgelegt.

## 12. Spätere Installation als Programm

Als spätere Ausbaustufe kommt eine installierbare Web-App infrage.

Mögliche Eigenschaften:

- Eigenes App-Symbol
- Eigenes Fenster
- Start über die installierte Anwendung
- Weiterverwendung der bestehenden Weboberfläche

Bei unserem vorgesehenen Aufbau müsste der lokale Python-Dienst weiterhin laufen.

Die Installation der Oberfläche allein macht die Anwendung daher noch nicht zu einem vollständig eigenständigen Desktopprogramm. Wie der Dienst bequem gestartet wird, ist Teil dieser späteren Ausbaustufe.

## 13. KI und zusätzliche Frameworks

Für die derzeit geplanten Funktionen sind nicht erforderlich:

- Ein externes Sprachmodell
- Ein API-Key
- Ollama
- Qwen
- Google ADK
- LangChain
- LangGraph
- n8n

Rückblicke werden zunächst selbst in wenigen Worten geschrieben.

Eine spätere KI- oder Workflow-Erweiterung wäre möglich, wird aber nur ergänzt, wenn sie eine konkrete nützliche Aufgabe erfüllt.

Die Anwendung soll ohne diese Erweiterungen vollständig nutzbar sein.

## 14. Empfohlene Umsetzungsreihenfolge

### Stufe 1: Technische Grundlage und vollständiger Fokusablauf

- Bestehendes Projekt auf TypeScript und Vite umstellen
- Timerlogik strukturieren
- Fokusziel ergänzen
- Notizfeld ergänzen
- Fokus- und Pausenzustände einführen
- Rückblick und nächsten Schritt ergänzen
- Python-Backend und SQLite anbinden
- Erste sinnvolle Tests erstellen

Ergebnis: Eine vollständige Fokusphase lässt sich durchführen und speichern.

### Stufe 2: Verlauf und Auswertungen

- Sitzungsverlauf
- Projekte und Tags
- Filtermöglichkeiten
- Tages- und Wochenübersichten
- Nächsten Schritt wiederaufnehmen

Ergebnis: Die Anwendung unterstützt die Arbeit über einzelne Sitzungen hinaus.

### Stufe 3: Reproduzierbare Bereitstellung

- Docker-Build
- Persistente Speicherung
- Terraform-Konfiguration
- Automatische GitHub-Prüfungen
- Verständliche Einrichtungsanleitung

Diese Arbeiten können teilweise bereits parallel zu den früheren Stufen erfolgen.

Ergebnis: Andere können das Projekt nachvollziehbar starten und prüfen.

### Stufe 4: Datenverwaltung und Komfort

- Export und Import
- Backup und Wiederherstellung
- Zeitprofile
- Tastaturkürzel
- Eigene Zitate und Pausenimpulse

Ergebnis: Die Anwendung wird für die regelmäßige Nutzung angenehmer.

### Stufe 5: Installierbare Anwendung

- Installation als Web-App prüfen
- App-Symbol und eigenes Fenster
- Bequemer Start des lokalen Backends
- Bedienung und Installation dokumentieren

Ergebnis: Die Nutzung nähert sich einem eigenständigen Programm an.

## 15. Bedeutung für das Portfolio und die Bewerbung

Das Fokus-Journal kann nachvollziehbare Praxis in folgenden Bereichen zeigen:

- TypeScript und strukturierte Frontend-Entwicklung
- Python und Backend-Entwicklung
- SQL und lokale Datenhaltung
- Zustandsmodellierung
- Testautomatisierung
- Linux und Container
- Infrastructure as Code mit Terraform
- GitHub Actions
- Eingabevalidierung und sicherer Umgang mit Nutzerdaten
- Dokumentation und schrittweise Produktentwicklung

Für die AI-Cybersecurity-Stelle zeigt das Projekt insbesondere Softwareentwicklung, Testing und technische Sorgfalt.

Es ist für sich genommen kein Nachweis praktischer AI-Security-Evaluation. Den direkten Bezug zu Agentic AI liefert ergänzend das bestehende Hochschulprojekt.

Die Unterstützung durch KI-Coding-Assistenten soll weiterhin transparent dokumentiert werden. Eigene Entscheidungen, nachvollziehbare Tests und der tatsächliche Funktionsumfang stehen im Vordergrund.

## 16. Noch offene Entscheidungen

- Endgültiger Projektname
- Konkretes visuelles Design
- Verhalten bei Standby und Unterbrechungen
- Automatischer oder manueller Pausenstart
- Umgang mit abgebrochenen Sitzungen
- Genaue Berechnung der tatsächlichen Fokuszeit
- Pflichtfelder und freiwillige Reflexionsfelder
- Datenbankschema
- Export- und Importformat
- Konkrete Tastaturkürzel
- Vorgehen bei der Installation als Anwendung

Diese Punkte sind noch keine abgeschlossenen Entscheidungen und werden bei der jeweiligen Umsetzung konkretisiert.

## 17. Technische Referenzen

- TypeScript: https://www.typescriptlang.org/docs/handbook/intro.html
- Vite und TypeScript: https://vite.dev/guide/features.html
- FastAPI: https://fastapi.tiangolo.com/
- SQLite in Python: https://docs.python.org/3/library/sqlite3.html
- Playwright: https://playwright.dev/docs/intro
- Terraform mit Docker: https://developer.hashicorp.com/terraform/tutorials/docker-get-started
- Installierbare Web-Apps: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
