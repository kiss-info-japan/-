(() => {
  const video = document.getElementById("introVideo");
  const btn = document.querySelector(".sound-toggle");
  if (!video) return;

  const tryPlay = async () => {
    try {
      video.muted = true;        // autoplayのため必須
      video.playsInline = true;
      await video.play();
    } catch {
      // 自動再生が拒否されたらユーザー操作を待つ
    }
  };

  // 画面に入ったら再試行（モバイルで効く）
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) tryPlay();
  }, { threshold: 0.25 });
  io.observe(video);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tryPlay();
  });

  const sync = () => {
    const on = !video.muted;
    if (btn) {
      btn.textContent = on ? "Sound: On" : "Sound: Off";
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    }
  };

  // ボタンで音切替（ユーザー操作なので通る）
  if (btn) {
    btn.addEventListener("click", async () => {
      try {
        video.muted = !video.muted;
        if (!video.muted) video.volume = 1.0;
        await video.play();
      } catch {}
      sync();
    });
  }

  // 動画タップでも切替（スマホ向け）
  video.addEventListener("click", async () => {
    try {
      video.muted = !video.muted;
      if (!video.muted) video.volume = 1.0;
      await video.play();
    } catch {}
    sync();
  });

  sync();
  tryPlay();
})();
