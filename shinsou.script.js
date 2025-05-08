document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-section");

    const handleScroll = () => {
        fadeElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight - 100) {
                element.classList.add("fade-in");
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初回に実行して、画面読み込み時にも要素が表示されるようにする
});

// スクロールイベントで背景色と文字色を変更
window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;  // 現在のスクロール位置
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight; // ページ全体の高さ
    let scrollPercent = scrollPosition / maxScroll;  // スクロール位置の割合

    // 背景色を変更（最上部は白、下部は黒）
    let colorValue = Math.min(scrollPercent, 1); // scrollPercent は 0 ~ 1 の範囲
    let redGreenBlue = Math.floor((1 - colorValue) * 255); // スクロール位置に応じて値が変化

    // 背景色を変更
    document.body.style.backgroundColor = `rgb(${redGreenBlue}, ${redGreenBlue}, ${redGreenBlue})`; 

    // 文字色を逆に変更（背景が白の場合文字は黒、背景が黒の場合文字は白）
    let textColorValue = Math.floor(colorValue * 255); // 文字の色は背景と反対の色に
    document.body.style.color = `rgb(${textColorValue}, ${textColorValue}, ${textColorValue})`;
});
