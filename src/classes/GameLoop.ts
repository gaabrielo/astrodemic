export class GameLoop {
  refCallback: number;
  onStep: () => void;

  constructor(onStep: () => void) {
    this.onStep = onStep;
    this.refCallback = 0;
    this.start();
  }

  start() {
    let previousMs: number | undefined;
    const step = 1 / 60;
    const tick = (timestampMs: number) => {
      if (previousMs === undefined) {
        previousMs = timestampMs;
      }
      let delta = (timestampMs - previousMs!) / 1000;
      while (delta >= step) {
        this.onStep();
        delta -= step;
      }
      previousMs = timestampMs - delta * 1000;
      // recapture the callback to be able to shut it off
      this.refCallback = requestAnimationFrame(tick);
    };

    // initial kickoff
    this.refCallback = requestAnimationFrame(tick);
  }

  stop() {
    cancelAnimationFrame(this.refCallback);
  }
}
