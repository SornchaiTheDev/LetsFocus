let count = 0;

self.addEventListener("message", (e) => {
  let timer = null;

  if (e.data.status === "start") {
    const timerEnd = new Date(Date.now() + e.data.time * 1000).getTime();

    timer = setInterval(() => {
      const now = Date.now();
      self.postMessage({ time: Math.ceil((timerEnd - now) / 1000) });
      if (Math.abs(Math.ceil((timerEnd - now) / 1000)) === 0)
        clearInterval(timer);
    }, 1000);
  }
});
