const { test } = require('node:test');
const assert = require('node:assert/strict');
const { CountdownTimer } = require('../timer.js');

function setup() {
  let now = 0;
  return { timer: new CountdownTimer(1500_000, () => now), advance: (ms) => { now += ms; } };
}

test('delayed updates calculate remaining time from the deadline', () => {
  const { timer, advance } = setup();
  timer.start();
  advance(137_650);
  assert.equal(timer.remainingMs, 1362_350);
  assert.equal(timer.spentMs, 137_650);
});

test('internal pause and resume preserve fractional seconds without counting stopped time', () => {
  const { timer, advance } = setup();
  timer.start(); advance(375); timer.pause();
  advance(900_000);
  assert.equal(timer.remainingMs, 1499_625);
  timer.start(); advance(125);
  assert.equal(timer.remainingMs, 1499_500);
});

test('repeated starts do not change the active deadline', () => {
  const { timer, advance } = setup();
  timer.start(); advance(1000);
  assert.equal(timer.start(), false);
  advance(1000);
  assert.equal(timer.remainingMs, 1498_000);
});

test('expiry stops at zero and is reported once', () => {
  const { timer, advance } = setup();
  timer.start(); advance(1700_000);
  assert.equal(timer.update(), true);
  assert.equal(timer.remainingMs, 0);
  assert.equal(timer.spentMs, 1500_000);
  assert.equal(timer.state, 'finished');
  assert.equal(timer.update(), false);
  assert.equal(timer.start(), false);
});

test('internal finish preserves elapsed time', () => {
  const { timer, advance } = setup();
  timer.start(); advance(12_345); timer.finish(); advance(1000);
  assert.equal(timer.remainingMs, 1487_655);
  assert.equal(timer.spentMs, 12_345);
  assert.equal(timer.state, 'finished');
});

test('internal pause after expiry cannot resume an expired countdown', () => {
  const { timer, advance } = setup();
  timer.start(); advance(1500_000); timer.pause();
  assert.equal(timer.state, 'finished');
  assert.equal(timer.start(), false);
});

test('internal reset clears elapsed time and applies a new duration', () => {
  const { timer, advance } = setup();
  timer.start(); advance(1000); timer.reset(300_000);
  assert.equal(timer.state, 'ready');
  assert.equal(timer.remainingMs, 300_000);
  assert.equal(timer.spentMs, 0);
  assert.throws(() => timer.reset(0), RangeError);
  assert.throws(() => timer.reset(NaN), RangeError);
});
