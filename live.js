/**
 * Tanet - ライブ授業ロジチE��
 */

// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');
const questionInput = document.getElementById('question-input');
const questionSubmitBtn = document.getElementById('question-submit');
const focusModeToggle = document.getElementById('focus-mode');
const quizOverlay = document.getElementById('quiz-overlay');

// Mock data
let userPoints = 1250;
let todayPoints = 85;
let isFocusMode = false;

// タブ�Eり替ぁE
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;

        // アクチE��ブ状態を更新
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // パネルを�Eり替ぁE
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `${tabId}-panel`) {
                panel.classList.add('active');
            }
        });
    });
});

// チャチE��メチE��ージ送信
function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // メチE��ージを追加
    addChatMessage('あなぁE, message, '仁E);

    // 入力をクリア
    chatInput.value = '';

    // ポイント付与（集中モードでなぁE��合！E
    if (!isFocusMode) {
        addPoints(5, 'チャチE��発言');
    }

    // スクロールを最下部へ
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// チャチE��メチE��ージを追加
function addChatMessage(name, message, time) {
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message';
    messageEl.innerHTML = `
        <span class="chat-avatar">👤</span>
        <div class="chat-content">
            <span class="chat-name">${name}</span>
            <p>${escapeHtml(message)}</p>
        </div>
        <span class="chat-time">${time}</span>
    `;
    chatMessages.appendChild(messageEl);
}

// 質問投稿
function submitQuestion() {
    const question = questionInput.value.trim();
    if (!question) return;

    // 質問リストに追加
    const questionsList = document.querySelector('.questions-list');
    const questionEl = document.createElement('div');
    questionEl.className = 'question-item unresolved';
    questionEl.innerHTML = `
        <div class="question-header">
            <span class="question-user">あなぁE/span>
            <span class="question-status pending">未解決</span>
        </div>
        <p class="question-text">${escapeHtml(question)}</p>
        <div class="question-actions">
            <button class="action-btn upvote">
                <span>👍</span> 0
            </button>
            <button class="action-btn answer">回答すめE/button>
        </div>
    `;

    // 最初に挿入
    questionsList.insertBefore(questionEl, questionsList.firstChild);

    // 入力をクリア
    questionInput.value = '';

    // ポイント付丁E
    addPoints(10, '質問投稿');
}

// ポイント追加
function addPoints(points, action) {
    userPoints += points;
    todayPoints += points;

    // UI更新
    const pointsDisplay = document.querySelector('.status-value:first-of-type');
    const todayDisplay = document.querySelector('.status-value.highlight');

    if (pointsDisplay) {
        pointsDisplay.textContent = userPoints.toLocaleString();
        pointsDisplay.classList.add('point-added');
        setTimeout(() => pointsDisplay.classList.remove('point-added'), 500);
    }

    if (todayDisplay) {
        todayDisplay.textContent = `+${todayPoints}pt`;
    }

    // 通知表示
    showPointNotification(points, action);
}

// ポイント通知
function showPointNotification(points, action) {
    const notification = document.createElement('div');
    notification.className = 'point-notification';
    notification.innerHTML = `+${points}pt <small>${action}</small>`;
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        padding: 12px 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        border-radius: 8px;
        font-weight: 600;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2s forwards;
        z-index: 1000;
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 2500);
}

// HTMLエスケーチE
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 雁E��モード�Eり替ぁE
focusModeToggle?.addEventListener('change', (e) => {
    isFocusMode = e.target.checked;
    if (isFocusMode) {
        showNotification('雁E��モーチEON - チャチE��へのポイント付与が停止されまぁE);
    } else {
        showNotification('雁E��モーチEOFF');
    }
});

// 通知表示
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'system-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        color: var(--text-primary);
        animation: fadeIn 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// クイズ表示チE��
function showQuiz() {
    quizOverlay?.classList.remove('hidden');
}

function hideQuiz() {
    quizOverlay?.classList.add('hidden');
}

// クイズオプション選抁E
document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', () => {
        // 全てのオプションの選択状態をリセチE��
        document.querySelectorAll('.quiz-option').forEach(o => {
            o.classList.remove('selected', 'correct', 'incorrect');
        });

        // 選択状態を設宁E
        option.classList.add('selected');

        // 正解判定（デモ: 2番目が正解�E�E
        setTimeout(() => {
            const options = document.querySelectorAll('.quiz-option');
            options[1].classList.add('correct');

            if (option === options[1]) {
                addPoints(20, 'クイズ正解');
            } else {
                option.classList.add('incorrect');
            }

            // クイズを閉じる
            setTimeout(hideQuiz, 2000);
        }, 500);
    });
});

// イベントリスナ�E
chatSendBtn?.addEventListener('click', sendChatMessage);
chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

questionSubmitBtn?.addEventListener('click', submitQuestion);

// チE��用�E�E秒後にクイズを表示
// setTimeout(showQuiz, 5000);

// CSSアニメーション用のスタイルを追加
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    .point-added {
        animation: pointPulse 0.5s ease;
    }
    @keyframes pointPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); color: #10b981; }
    }
`;
document.head.appendChild(style);
