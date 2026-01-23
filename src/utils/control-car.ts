import { drive, handleEngine } from '@/services/engine-service';

export class CarController {
  private id: number;
  private car: HTMLSpanElement;
  private road: HTMLDivElement;
  private isAnimating = false;
  private animationId = 0;
  private abortController = new AbortController();

  constructor(id: number, car: HTMLSpanElement, road: HTMLDivElement) {
    this.id = id;
    this.car = car;
    this.road = road;
  }

  async startEngineAndDrive() {
    const result = await handleEngine(this.id, 'started');
    if (!result) return;

    const time = result.distance / result.velocity;
    this.abortController = new AbortController();
    this.animationId = 0;
    this.isAnimating = false;

    try {
      this.animateDriving(time);
      await drive(this.id, this.abortController.signal);
      await this.stopCar(false);
      return { id: this.id, time };
    } catch (error) {
      if (
        error instanceof Error &&
        (error.name === 'AbortError' || error.name === 'EngineError')
      ) {
        await this.stopCar(false);
      }
    }
  }

  async stopCar(intentional: boolean) {
    this.isAnimating = false;
    cancelAnimationFrame(this.animationId);

    if (intentional) {
      this.abortController.abort();
      this.reset();
    }
    await handleEngine(this.id, 'stopped');
  }

  private animateDriving(time: number) {
    this.isAnimating = true;
    const distance = this.road.clientWidth - this.car.clientWidth;
    const start = performance.now();

    const frame = (timestamp: number) => {
      if (!this.isAnimating) return;
      const elapsed = timestamp - start;
      const shift = Math.min(elapsed / time, 1);

      this.car.style.setProperty('--car-x', `${shift * distance}px`);
      if (shift < 1) {
        this.animationId = requestAnimationFrame(frame);
      } else {
        this.isAnimating = false;
      }
    };
    this.animationId = requestAnimationFrame(frame);
  }

  reset() {
    this.car.style.removeProperty('--car-x');
  }
}
