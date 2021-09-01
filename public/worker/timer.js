let timer = null;

self.addEventListener("message", (e) => {
  if (e.data.status === "start") {
    const timerEnd = e.data.timerEnd;
    const startTime = new Date().getTime();
    const now = Date.now();

    self.postMessage({
      startTime: startTime,
      time: Math.abs(Math.ceil((timerEnd - now) / 1000)),
    });

    timer = setInterval(() => {
      const now = Date.now();
      if (Math.ceil((timerEnd - now) / 1000) <= 0) {
        clearInterval(timer);
        self.postMessage({
          status: "finish",
        });
      } else {
        self.postMessage({
          time: Math.abs(Math.ceil((timerEnd - now) / 1000)),
          timerEnd: timerEnd,
        });
      }
    }, 1000);
  }

  if (e.data.status === "countup") {
    const startTime =
      e.data.startTime !== 0
        ? new Date(e.data.startTime).getTime()
        : new Date().getTime();
    self.postMessage({ startTime: startTime });

    timer = setInterval(() => {
      self.postMessage({
        time: parseInt((Date.now() - startTime) / 1000),
      });
    }, 1000);
  }

  if (e.data.status === "stop") {
    clearInterval(timer);
  }
});
