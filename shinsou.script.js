(() => {
  const video = document.getElementById("introVideo");
  const btn = document.querySelector(".sound-toggle");

  // ===== Video sound toggle =====
  const tryPlay = async () => {
    if (!video) return;
    try {
      video.muted = true;        // autoplay対策
      video.playsInline = true;
      await video.play();
    } catch {
      // 自動再生拒否は無視（ユーザー操作待ち）
    }
  };

  const syncSoundUI = () => {
    if (!video || !btn) return;
    const on = !video.muted;
    btn.textContent = on ? "Sound: On" : "Sound: Off";
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.dataset.on = on ? "true" : "false";
  };

  if (video) {
    // 画面に入ったら再試行
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) tryPlay();
    }, { threshold: 0.25 });
    io.observe(video);

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) tryPlay();
    });

    // 動画タップでも切替（スマホ向け）
    video.addEventListener("click", async () => {
      try {
        video.muted = !video.muted;
        if (!video.muted) video.volume = 1.0;
        await video.play();
      } catch {}
      syncSoundUI();
    });

    tryPlay();
  }

  if (btn && video) {
    btn.addEventListener("click", async () => {
      try {
        video.muted = !video.muted;
        if (!video.muted) video.volume = 1.0;
        await video.play();
      } catch {}
      syncSoundUI();
    });
    syncSoundUI();
  }

  // ===== Nav current section highlight =====
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setCurrent = (id) => {
    navLinks.forEach(a => {
      const active = a.getAttribute("href") === `#${id}`;
      if (active) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };

  if (sections.length) {
    const obs = new IntersectionObserver((entries) => {
      // 一番画面内にいるやつを採用
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setCurrent(visible.target.id);
    }, { threshold: [0.2, 0.35, 0.5] });

    sections.forEach(s => obs.observe(s));
  }
})();
