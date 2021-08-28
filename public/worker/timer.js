let timer = null;

self.addEventListener("message", (e) => {
  if (e.data.status === "start") {
    const timerEnd = new Date(Date.now() + e.data.time * 1000).getTime();
    const startTime = new Date().getTime();
    self.postMessage({ startTime: startTime, time: e.data.time });

    timer = setInterval(async () => {
      const now = Date.now();
      if (Math.ceil((timerEnd - now) / 1000) <= 0) {
        clearInterval(timer);
        self.postMessage({
          status: "finish",
        });
      } else {
        self.postMessage({
          time: Math.abs(Math.ceil((timerEnd - now) / 1000)),
        });
      }
    }, 1000);
  }

  if (e.data.status === "countup") {
    const startTime = new Date().getTime();
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
