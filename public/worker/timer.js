let timer = null;

self.addEventListener("message", (e) => {
  if (e.data.status === "start") {
    const timerEnd = new Date(Date.now() + e.data.time * 1000).getTime();

    timer = setInterval(() => {
      const now = Date.now();
      if (Math.abs(Math.ceil((timerEnd - now) / 1000)) === 0)
        clearInterval(timer);

      self.postMessage({ time: Math.ceil((timerEnd - now) / 1000) });
    }, 1000);
  }
});

self.addEventListener("message", (e) => {
  if (e.data.status === "stop") clearInterval(timer);
});
