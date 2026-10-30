// Pure countdown logic with an injectable clock for tests; no rendering.
class CountdownTimer {
  constructor(durationMs, clock = Date.now) {
    this.clock = clock;
    this.reset(durationMs);
  }

  get remainingMs() {
    return this.state === 'running'
      ? Math.max(0, this.deadline - this.clock())
      : this.savedRemainingMs;
  }

  get spentMs() {
    return this.durationMs - this.remainingMs;
  }

  start(startedAt = this.clock()) {
    if (!['ready', 'paused'].includes(this.state)) return false;
    if (!Number.isFinite(startedAt)) throw new RangeError('Invalid start time.');
    this.deadline = startedAt + this.savedRemainingMs;
    this.state = 'running';
    return true;
  }

  pause() {
    if (this.state !== 'running') return;
    if (this.update()) return;
    this.savedRemainingMs = this.remainingMs;
    this.deadline = null;
    this.state = 'paused';
  }

  finish() {
    this.savedRemainingMs = this.remainingMs;
    this.deadline = null;
    this.state = 'finished';
  }

  update() {
    if (this.state !== 'running' || this.remainingMs > 0) return false;
    this.finish();
    return true;
  }

  reset(durationMs = this.durationMs) {
    if (!Number.isFinite(durationMs) || durationMs <= 0) {
      throw new RangeError('Duration must be a positive number.');
    }
    this.durationMs = durationMs;
    this.savedRemainingMs = durationMs;
    this.deadline = null;
    this.state = 'ready';
  }
}

// Export for Node tests; the next script uses this class directly in the browser.
if (typeof module !== 'undefined') module.exports = { CountdownTimer };
