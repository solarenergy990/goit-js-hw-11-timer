const refs = {
  daysContainer: document.querySelector('.value[data-value="days"]'),
  hoursContainer: document.querySelector('.value[data-value="hours"]'),
  minutesContainer: document.querySelector('.value[data-value="mins"]'),
  secondsContainer: document.querySelector('.value[data-value="secs"]'),
};

// function init() {
//   const time = this.getTimeComponents(0);
//   this.onTick(time);
// }
class CountdownTimer {
  constructor({ onTick, targetDate }) {
    this.intervalId = null;
    this.onTick = onTick;
    this.targetDate = targetDate;
  }
  start() {
    const targetDate = this.targetDate;
    this.intervalId = setInterval(() => {
      const startDate = Date.now();
      const deltaTime = targetDate - startDate;
      const timeLeft = this.getTimeComponents(deltaTime);

      this.onTick(timeLeft);
    }, 1000);
  }

  stop() {
    if (this.startDate === this.targetDate) {
      clearInterval(this.intervalId);
      const time = this.getTimeComponents(0);
      this.onTick(time);
    }
    return;
  }

  getTimeComponents(time) {
    const secs = this.pad(Math.floor((time / 1000) % 60));
    const mins = this.pad(Math.floor((time / 1000 / 60) % 60));
    const hours = this.pad(Math.floor((time / (1000 * 60 * 60)) % 24));
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    return {
      days,
      hours,
      mins,
      secs,
    };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

function updateClockface({ days, hours, mins, secs }) {
  refs.daysContainer.textContent = `${days}`;
  refs.hoursContainer.textContent = `${hours}`;
  refs.minutesContainer.textContent = `${mins}`;
  refs.secondsContainer.textContent = `${secs}`;
}

const countDownTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2021"),
  onTick: updateClockface,
});
countDownTimer.start();
countDownTimer.stop();
