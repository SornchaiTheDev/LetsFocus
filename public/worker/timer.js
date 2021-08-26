let timer = null;

self.addEventListener("message", (e) => {
  if (e.data.status === "start") {
    const timerEnd = new Date(Date.now() + e.data.time * 1000).getTime();
    // const timerEnd = new Date(Date.now() + 500).getTime();

    timer = setInterval(async () => {
      const now = Date.now();
      if (Math.ceil((timerEnd - now) / 1000) <= 0) {
        self.postMessage({
          time: 0,
          status: "finish",
        });
        clearInterval(timer);
      } else {
        self.postMessage({
          time: Math.abs(Math.ceil((timerEnd - now) / 1000)),
        });
      }
    }, 1000);
  }

  if (e.data.status === "stop") {
    clearInterval(timer);
  }
});
