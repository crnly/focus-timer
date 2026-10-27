// Gewählte Dauer in Sekunden (am Anfang 25 Minuten)
let selectedSeconds = 25 * 60;

// Zustand des Timers
let remainingSeconds = selectedSeconds;  // wie viele Sekunden noch übrig sind
let intervalId = null;                   // null = Timer läuft gerade nicht

// Elemente aus der HTML-Datei holen (über ihre id)
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
// Alle Buttons der Zeitwahl (über ihre Klasse)
const durationButtons = document.querySelectorAll('.duration');

// Wandelt die Sekunden in "MM:SS" um und aktualisiert Anzeige und Tab-Titel
function updateDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);  // ganze Minuten
  const seconds = remainingSeconds % 60;              // Rest = Sekunden
  // padStart(2, '0') macht aus "5" eine "05"
  const formattedTime =
    String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
  timeDisplay.textContent = formattedTime;
  document.title = formattedTime + ' – Fokus-Timer';
}

function startTimer() {
  // Läuft der Timer schon, nichts tun (sonst würde er doppelt so schnell zählen)
  // Ist die Zeit schon abgelaufen, ebenfalls nichts tun
  if (intervalId !== null || remainingSeconds <= 0) {
    return;
  }

  // setInterval führt die Funktion alle 1000 Millisekunden (= 1 Sekunde) aus
  intervalId = setInterval(function () {
    remainingSeconds = remainingSeconds - 1;
    updateDisplay();

    if (remainingSeconds <= 0) {
      pauseTimer();  // bei 00:00 anhalten
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(intervalId);  // stoppt das wiederholte Ausführen
  intervalId = null;
}

// Setzt auf die zuletzt gewählte Dauer zurück
function resetTimer() {
  pauseTimer();
  remainingSeconds = selectedSeconds;
  updateDisplay();
}

// Wird aufgerufen, wenn ein Zeitwahl-Button geklickt wird
function selectDuration(event) {
  const button = event.currentTarget;
  // data-minutes="5" steht in JavaScript als button.dataset.minutes bereit (als Text)
  selectedSeconds = Number(button.dataset.minutes) * 60;

  // Nur der geklickte Button gilt als gewählt
  durationButtons.forEach(function (b) {
    b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
  });

  // Laufenden Timer stoppen und die neue Zeit anzeigen
  resetTimer();
}

// Buttons mit den Funktionen verbinden
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
durationButtons.forEach(function (button) {
  button.addEventListener('click', selectDuration);
});

// Anzeige beim Laden einmal setzen
updateDisplay();
