const { test } = require('node:test');
const assert = require('node:assert/strict');
const { FocusCycle, FOCUS_PROFILES } = require('../cycle.js');

function setup(profileId = '25-5') {
  let now = 0;
  return { cycle: new FocusCycle(profileId, () => now), advance: (ms) => { now += ms; } };
}

for (const profile of FOCUS_PROFILES) {
  test(`${profile.id}: automatic break followed by a manual focus start`, () => {
    const { cycle, advance } = setup(profile.id);
    assert.equal(cycle.start(), true);
    advance(profile.focusMinutes * 60_000);
    assert.equal(cycle.update(), 'break-started');
    assert.equal(cycle.phase, 'break');
    assert.equal(cycle.timer.state, 'running');
    assert.equal(cycle.timer.remainingMs, profile.breakMinutes * 60_000);
    assert.equal(cycle.breakSerial, 1);
    advance(profile.breakMinutes * 60_000);
    assert.equal(cycle.update(), 'cycle-ended');
    assert.equal(cycle.phase, 'focus');
    assert.equal(cycle.timer.state, 'ready');
    advance(999_000);
    assert.equal(cycle.timer.remainingMs, profile.focusMinutes * 60_000);
    assert.equal(cycle.update(), null);
    assert.equal(cycle.start(), true);
    assert.equal(cycle.timer.state, 'running');
  });
}

test('delayed updates account for break time already elapsed', () => {
  const { cycle, advance } = setup();
  cycle.start(); advance(25 * 60_000 + 12_345);
  assert.equal(cycle.update(), 'break-started');
  assert.equal(cycle.timer.remainingMs, 5 * 60_000 - 12_345);
});

test('a long interruption never starts another focus session automatically', () => {
  const { cycle, advance } = setup();
  cycle.start(); advance(3 * 60 * 60_000);
  assert.equal(cycle.update(), 'cycle-ended');
  assert.equal(cycle.phase, 'focus');
  assert.equal(cycle.timer.state, 'ready');
  assert.equal(cycle.timer.remainingMs, 25 * 60_000);
  assert.equal(cycle.breakSerial, 1);
  assert.equal(cycle.update(), null);
});

test('repeated Play during focus neither stops the timer nor changes its deadline', () => {
  const { cycle, advance } = setup();
  cycle.start(); const deadline = cycle.timer.deadline;
  advance(12_345);
  assert.equal(cycle.start(), false);
  assert.equal(cycle.timer.state, 'running');
  assert.equal(cycle.timer.deadline, deadline);
  assert.equal(cycle.timer.remainingMs, 25 * 60_000 - 12_345);
});

test('repeated Play during a break does not restart either phase', () => {
  const { cycle, advance } = setup();
  cycle.start(); advance(25 * 60_000); cycle.update();
  const deadline = cycle.timer.deadline;
  advance(12_345);
  assert.equal(cycle.start(), false);
  assert.equal(cycle.phase, 'break');
  assert.equal(cycle.timer.state, 'running');
  assert.equal(cycle.timer.deadline, deadline);
  assert.equal(cycle.breakSerial, 1);
});

test('display updates preserve the current break identifier', () => {
  const { cycle, advance } = setup();
  cycle.start(); advance(25 * 60_000); cycle.update();
  for (let i = 0; i < 10; i++) { advance(200); cycle.update(); }
  assert.equal(cycle.breakSerial, 1);
  assert.equal(cycle.timer.remainingMs, 5 * 60_000 - 2000);
});

test('only a new manually started cycle produces the next break', () => {
  const { cycle, advance } = setup();
  cycle.start(); advance(30 * 60_000); cycle.update();
  assert.equal(cycle.breakSerial, 1);
  advance(30 * 60_000); cycle.update();
  assert.equal(cycle.breakSerial, 1);
  cycle.start(); advance(25 * 60_000); cycle.update();
  assert.equal(cycle.breakSerial, 2);
});

test('profiles are locked during focus and break and become available afterward', () => {
  const { cycle, advance } = setup();
  cycle.start(); assert.equal(cycle.setProfile('50-10'), false);
  advance(25 * 60_000); cycle.update();
  assert.equal(cycle.setProfile('50-10'), false);
  advance(5 * 60_000); cycle.update();
  assert.equal(cycle.setProfile('50-10'), true);
  assert.equal(cycle.timer.remainingMs, 50 * 60_000);
  assert.throws(() => cycle.setProfile('99-1'), RangeError);
});

test('Play at the focus boundary does not start the break twice', () => {
  const { cycle, advance } = setup();
  cycle.start(); advance(25 * 60_000);
  assert.equal(cycle.start(), false);
  assert.equal(cycle.update(), 'break-started');
  assert.equal(cycle.breakSerial, 1);
  assert.equal(cycle.timer.state, 'running');
});
