document.addEventListener("DOMContentLoaded", loadArticles);
document.addEventListener("DOMContentLoaded", () => {
    const image = document.querySelector(".fade-in");
    if (image) {
        image.classList.add("visible");
    }
});

async function loadArticles() {
    try {
        const response = await fetch('kiss.articles.json');
        const articles = await response.json();

        const articlesContainer = document.getElementById('articles');
        const modal = document.getElementById('myModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        const modalImage = document.getElementById('modalImage');  // 画像表示用のエレメント
        const closeBtn = document.querySelector('.close');

        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');

            // 記事のタイトル
            const titleElement = document.createElement('h2');
            titleElement.innerText = article.title;
            titleElement.style.cursor = 'pointer';  // クリックできるようにカーソルを設定

            // タイトルをクリックしたときにモーダルを表示
            titleElement.addEventListener('click', () => {
                modal.style.display = 'flex';  // モーダルを表示
                modalTitle.innerText = article.title; // モーダルに記事タイトルを設定
                modalContent.innerHTML = `<p>${article.content}</p>`; // モーダルに記事内容を設定
                modalImage.src = article.image;  // モーダル内に画像を表示
                modalImage.alt = `${article.title}の画像`;  // 画像の代替テキスト
            });

            // 記事を組み立てる
            articleElement.appendChild(titleElement);

            // 記事をコンテナに追加
            articlesContainer.appendChild(articleElement);
        });

        // モーダルを閉じるボタンの動作
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none'; // モーダルを非表示にする
        });

        // モーダルの外側をクリックしたときにモーダルを閉じる
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

    } catch (error) {
        console.error("記事データの読み込みに失敗しました:", error);
    }
}
window.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";  // ページ読み込み時にモーダルを非表示にする
});
