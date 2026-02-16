/**
 * Tanet - 結果表示
 */

// 結果を表示
function displayResult() {
    // セッションストレージから結果を取得
    const resultData = sessionStorage.getItem('learning_style_result');

    if (!resultData) {
        // 結果がない場合は診断ページへリダイレクト
        window.location.href = 'diagnosis.html';
        return;
    }

    const result = JSON.parse(resultData);
    const typeData = LEARNING_TYPES[result.type];

    if (!typeData) {
        window.location.href = 'diagnosis.html';
        return;
    }

    // 結果を表示
    document.getElementById('result-icon').textContent = typeData.icon;
    document.getElementById('result-name').textContent = `${typeData.name} - ${typeData.subtitle}`;
    document.getElementById('result-subtitle').textContent = 'あなたの学習スタイルが判明しました';
    document.getElementById('result-description').textContent = typeData.description;

    // 特徴を表示
    const traitsList = document.getElementById('traits-list');
    traitsList.innerHTML = typeData.traits
        .map(trait => `<span class="trait-tag">${trait}</span>`)
        .join('');

    // 学習戦略を表示
    const strategiesList = document.getElementById('strategies-list');
    strategiesList.innerHTML = typeData.strategies
        .map(strategy => `<li>${strategy}</li>`)
        .join('');

    // ハッシュタグを表示
    const hashtags = document.getElementById('hashtags');
    hashtags.innerHTML = typeData.hashtags
        .map(tag => `<span class="hashtag">${tag}</span>`)
        .join('');

    // おすすめ授業を表示
    const lessonsContainer = document.getElementById('recommended-lessons');
    const lessons = RECOMMENDED_LESSONS[result.type] || [];
    lessonsContainer.innerHTML = lessons
        .map(lesson => `
            <a href="live.html" class="lesson-card">
                <div class="lesson-thumb">${lesson.icon}</div>
                <div class="lesson-info">
                    <h4>${lesson.title}</h4>
                    <p>${lesson.instructor}</p>
                </div>
            </a>
        `)
        .join('');

    // ページタイトルを更新
    document.title = `${typeData.name} - 診断結果 | Tanet`;

    // アニメーション効果を追加
    addAnimations();
}

// アニメーション効果を追加
function addAnimations() {
    // 結果セクションに順次フェードイン
    const sections = document.querySelectorAll('.result-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
}

// SNSシェア機能（デモ実装）
function shareResult(platform) {
    const resultData = sessionStorage.getItem('learning_style_result');
    if (!resultData) return;

    const result = JSON.parse(resultData);
    const typeData = LEARNING_TYPES[result.type];

    const shareText = `私の学習スタイルは「${typeData.name} - ${typeData.subtitle}」でした！ ${typeData.hashtags.slice(0, 3).join(' ')}`;
    const shareUrl = window.location.origin;

    let shareLink = '';
    switch (platform) {
        case 'twitter':
            shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
            break;
        case 'line':
            shareLink = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
            break;
    }

    if (shareLink) {
        window.open(shareLink, '_blank', 'width=600,height=400');
    }
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', displayResult);
