// One panel: focus -> automatic break -> manual restart.
const $ = (id) => document.getElementById(id);
const cycle = new FocusCycle();
let sessionGoal = '';
let alarmContext;

function enableAlarm() {
  try {
    const Audio = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!Audio) return;
    if (!alarmContext || alarmContext.state === 'closed') alarmContext = new Audio();
    // Unlock audio during the user's Play click, without delaying the timer.
    alarmContext.resume().catch(() => {});
  } catch {
    // Audio availability must never prevent a focus session from starting.
  }
}

function playAlarm() {
  if (!alarmContext || alarmContext.state !== 'running') return;
  try {
    const tone = alarmContext.createOscillator();
    const volume = alarmContext.createGain();
    const now = alarmContext.currentTime;
    tone.type = 'sine';
    tone.frequency.value = 880;
    volume.gain.setValueAtTime(0, now);
    volume.gain.linearRampToValueAtTime(0.08, now + 0.01);
    volume.gain.setValueAtTime(0.08, now + 0.04);
    volume.gain.linearRampToValueAtTime(0, now + 0.22);
    tone.connect(volume);
    volume.connect(alarmContext.destination);
    tone.onended = () => { tone.disconnect(); volume.disconnect(); };
    tone.start(now);
    tone.stop(now + 0.23);
  } catch {
    // A blocked or interrupted sound must not interrupt the cycle.
  }
}

function setGoalError(text = '') {
  $('goal-error').textContent = text;
  $('goal-error').hidden = !text;
  $('goal').setAttribute('aria-invalid', String(Boolean(text)));
}

function formatTime(ms) {
  const seconds = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function renderClock() {
  if (!cycle.active) {
    $('time').textContent = '';
    $('time').setAttribute('aria-label', 'Remaining focus time');
    document.title = 'Focus Timer';
    return;
  }
  const remaining = cycle.timer.remainingMs;
  const label = cycle.phase === 'focus' ? 'Focus' : 'Break';
  const time = formatTime(remaining);
  $('time').textContent = time;
  $('time').setAttribute('aria-label', `Remaining ${label.toLowerCase()} time: ${time}`);
  document.title = `${time} · ${label} · Focus Timer`;
}

function renderControls() {
  const isBreak = cycle.phase === 'break';
  if (!cycle.active) sessionGoal = '';
  $('timer-card').classList.toggle('break-card', isBreak);
  $('timer-card').dataset.stage = cycle.active ? 'running' : 'ready';
  $('timer-card').setAttribute('aria-label', isBreak ? 'Break timer' : 'Focus timer');
  $('setup').hidden = cycle.active;
  $('break-goals').hidden = !isBreak;
  $('break-goal-text').textContent = isBreak ? sessionGoal : '';
  $('clock-row').hidden = !cycle.active;
  $('timer-actions').hidden = cycle.active;
  $('goal').disabled = cycle.active;
  $('goal-input').dataset.empty = String($('goal').value.length === 0);
  $('profile').disabled = cycle.active;
  $('profile-trigger').disabled = cycle.active;
  syncProfilePicker();
  if (cycle.active) closeProfilePicker();
  $('play').disabled = cycle.active || !$('goal').value.trim();
  $('play').title = cycle.active ? (isBreak ? 'Break in progress' : 'Focus in progress') : 'Start focus';
  $('phase-status').textContent = cycle.notice;
  renderClock();
}

function handleTransition(transition) {
  setGoalError();
  renderControls();
  playAlarm();
  if (transition === 'cycle-ended') $('goal').focus({ preventScroll: true });
}

function tick() {
  const transition = cycle.update();
  if (transition) handleTransition(transition);
  else renderClock();
}

$('play').addEventListener('click', () => {
  // A click at the phase boundary must not start another focus session.
  const transition = cycle.update();
  if (transition) {
    handleTransition(transition);
    return;
  }
  if (cycle.active) return;
  if (cycle.phase === 'focus' && cycle.timer.state === 'ready' && !$('goal').value.trim()) {
    setGoalError('Please enter a short goal.');
    $('goal').focus();
    return;
  }
  setGoalError();
  enableAlarm();
  if (cycle.start()) {
    sessionGoal = $('goal').value;
    $('goal').value = '';
  }
  renderControls();
});

$('profile').addEventListener('change', () => {
  if (cycle.active) { $('profile').value = cycle.profile.id; return; }
  if (!FOCUS_PROFILES.some((profile) => profile.id === $('profile').value)) {
    $('profile').value = cycle.profile.id;
    return;
  }
  cycle.setProfile($('profile').value);
  setGoalError();
  renderControls();
});

// Keep the native select as the source of truth for the styled picker.
const profileSelect = $('profile');
const profileTrigger = $('profile-trigger');
const profileOptions = $('profile-options');
const profileItems = Array.from(profileSelect.options, (option) => {
  const item = document.createElement('button');
  item.type = 'button';
  item.className = 'profile-option';
  item.id = `profile-option-${option.value}`;
  item.setAttribute('role', 'option');
  item.tabIndex = -1;
  item.dataset.value = option.value;
  item.textContent = option.textContent;
  item.addEventListener('click', () => {
    if (cycle.active) return;
    profileSelect.value = option.value;
    profileSelect.dispatchEvent(new Event('change'));
    closeProfilePicker(true);
  });
  profileOptions.append(item);
  return item;
});

function syncProfilePicker() {
  const selected = profileSelect.selectedOptions[0];
  $('profile-value').textContent = selected.textContent;
  profileTrigger.setAttribute('aria-label', `Focus and break duration: ${selected.textContent} minutes`);
  profileItems.forEach((item) => item.setAttribute('aria-selected', String(item.dataset.value === selected.value)));
}

function openProfilePicker(index = profileSelect.selectedIndex) {
  if (cycle.active) return;
  profileOptions.hidden = false;
  profileTrigger.setAttribute('aria-expanded', 'true');
  profileItems[index].focus({ preventScroll: true });
}

function closeProfilePicker(restoreFocus = false) {
  profileOptions.hidden = true;
  profileTrigger.setAttribute('aria-expanded', 'false');
  if (restoreFocus) profileTrigger.focus({ preventScroll: true });
}

profileTrigger.addEventListener('click', () => {
  if (profileOptions.hidden) openProfilePicker();
  else closeProfilePicker();
});
profileTrigger.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    openProfilePicker();
  }
});
profileOptions.addEventListener('keydown', (event) => {
  const index = profileItems.indexOf(document.activeElement);
  let next = index;
  if (event.key === 'ArrowDown') next = (index + 1) % profileItems.length;
  else if (event.key === 'ArrowUp') next = (index - 1 + profileItems.length) % profileItems.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = profileItems.length - 1;
  else if (event.key === 'Escape') {
    event.preventDefault();
    closeProfilePicker(true);
    return;
  } else if (event.key === 'Tab') {
    // Return to the trigger so Tab continues to the goal input in DOM order.
    closeProfilePicker(true);
    return;
  } else return;
  event.preventDefault();
  profileItems[next].focus({ preventScroll: true });
});
document.addEventListener('pointerdown', (event) => {
  if (!$('profile-choice').contains(event.target)) closeProfilePicker();
});
$('profile-choice').addEventListener('focusout', (event) => {
  if (!$('profile-choice').contains(event.relatedTarget)) closeProfilePicker();
});
profileSelect.hidden = true;
profileTrigger.hidden = false;

const goalInput = $('goal');
let previousGoal = { value: '', start: 0, end: 0 };

function rememberGoal() {
  previousGoal = { value: goalInput.value, start: goalInput.selectionStart, end: goalInput.selectionEnd };
}

function constrainGoal(event) {
  if (event.isComposing) return;
  if (goalInput.scrollHeight > goalInput.clientHeight + 1) {
    goalInput.value = previousGoal.value;
    goalInput.setSelectionRange(previousGoal.start, previousGoal.end);
    goalInput.scrollTop = 0;
    setGoalError();
  } else {
    rememberGoal();
    setGoalError();
  }
  $('goal-input').dataset.empty = String(goalInput.value.length === 0);
  $('play').disabled = cycle.active || !goalInput.value.trim();
}

goalInput.addEventListener('beforeinput', (event) => {
  if (!event.isComposing) rememberGoal();
});
goalInput.addEventListener('compositionstart', rememberGoal);
goalInput.addEventListener('compositionend', constrainGoal);
goalInput.addEventListener('input', constrainGoal);

document.addEventListener('visibilitychange', tick);
setInterval(tick, 200);
renderControls();
$('goal').focus({ preventScroll: true });
