/**
 * Tanet - 診断ロジック
 */

// 状態管理
let currentQuestion = 0;
let answers = [];
let isStarted = false;

// DOM要素
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const currentQDisplay = document.getElementById('current-q');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const answerContainer = document.getElementById('answer-container');

// セッションストレージキー
const STORAGE_KEY = 'learning_style_diagnosis';

// 初期化
function init() {
    // 保存された回答を読み込む
    loadProgress();

    // イベントリスナー設定
    startBtn.addEventListener('click', startDiagnosis);
    prevBtn.addEventListener('click', goToPrevQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
}

// 進捗の読み込み
function loadProgress() {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            answers = data.answers || [];
            currentQuestion = data.currentQuestion || 0;
            if (answers.length > 0) {
                isStarted = true;
            }
        } catch (e) {
            console.error('Failed to load saved progress:', e);
        }
    }
}

// 進捗の保存
function saveProgress() {
    const data = {
        answers: answers,
        currentQuestion: currentQuestion,
        timestamp: Date.now()
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 診断開始
function startDiagnosis() {
    // 診断開始時は常に最初からスタート
    currentQuestion = 0;
    answers = [];
    isStarted = true;

    startScreen.style.display = 'none';
    questionScreen.style.display = 'block';

    // 常に1問目から開始
    showQuestion(0);
}

// 質問を表示
function showQuestion(index) {
    currentQuestion = index;
    const question = QUESTIONS[index];

    // アニメーションのためのクラス追加
    const questionCard = document.querySelector('.question-card');
    questionCard.classList.remove('slide-in');
    void questionCard.offsetWidth; // リフロー
    questionCard.classList.add('slide-in');

    // カテゴリーと質問テキストを更新
    questionCategory.innerHTML = `${question.categoryIcon} ${question.category}`;
    questionText.textContent = question.text;

    // 進捗バーを更新
    const progress = ((index + 1) / QUESTIONS.length) * 100;
    progressFill.style.width = `${progress}%`;
    currentQDisplay.textContent = index + 1;

    // 選択肢を生成
    renderOptions(question);

    // ナビゲーションボタンの状態を更新
    updateNavButtons();

    // 進捗を保存
    saveProgress();
}

// 選択肢をレンダリング
function renderOptions(question) {
    answerContainer.innerHTML = '';

    if (question.type === 'choice') {
        answerContainer.className = 'answer-options';
        question.options.forEach((option, idx) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'answer-option';
            if (answers[currentQuestion] === option.id) {
                optionEl.classList.add('selected');
            }
            optionEl.innerHTML = `
                <div class="answer-radio"></div>
                <span class="answer-text">${option.text}</span>
            `;
            optionEl.addEventListener('click', () => selectOption(option.id));
            answerContainer.appendChild(optionEl);
        });
    } else if (question.type === 'scale') {
        answerContainer.className = 'scale-options';
        const scaleLabels = ['全くない', 'あまりない', '普通', 'ややある', 'とてもある'];
        for (let i = 1; i <= 5; i++) {
            const scaleEl = document.createElement('div');
            scaleEl.className = 'scale-option';
            if (answers[currentQuestion] === i) {
                scaleEl.classList.add('selected');
            }
            scaleEl.innerHTML = `
                <span class="scale-number">${i}</span>
                <span class="scale-label">${scaleLabels[i - 1]}</span>
            `;
            scaleEl.addEventListener('click', () => selectOption(i));
            answerContainer.appendChild(scaleEl);
        }
    }
}

// 選択肢を選択
function selectOption(optionId) {
    answers[currentQuestion] = optionId;

    // UIを更新
    const options = answerContainer.querySelectorAll('.answer-option, .scale-option');
    options.forEach(opt => opt.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    // 次へボタンを有効化
    nextBtn.disabled = false;

    // 進捗を保存
    saveProgress();

    // 自動で次の質問へ（短いディレイ後）
    setTimeout(() => {
        if (currentQuestion < QUESTIONS.length - 1) {
            goToNextQuestion();
        }
    }, 300);
}

// 前の質問へ
function goToPrevQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

// 次の質問へ
function goToNextQuestion() {
    if (answers[currentQuestion] === undefined) {
        return;
    }

    if (currentQuestion < QUESTIONS.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        // 最後の質問なら結果計算へ
        calculateResult();
    }
}

// ナビゲーションボタンの状態を更新
function updateNavButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = answers[currentQuestion] === undefined;

    // 最後の質問の場合のボタンテキストを変更
    if (currentQuestion === QUESTIONS.length - 1) {
        nextBtn.innerHTML = `
            <span>結果を見る</span>
            <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        `;
    } else {
        nextBtn.innerHTML = `
            <span>次へ</span>
            <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        `;
    }
}

// 結果を計算
function calculateResult() {
    // スコアを集計
    const scores = {};
    Object.keys(LEARNING_TYPES).forEach(type => {
        scores[type] = 0;
    });

    // 各質問の回答からスコアを計算
    QUESTIONS.forEach((question, idx) => {
        const answerId = answers[idx];
        if (answerId && question.options) {
            const selectedOption = question.options.find(opt => opt.id === answerId);
            if (selectedOption && selectedOption.scores) {
                Object.entries(selectedOption.scores).forEach(([type, score]) => {
                    scores[type] = (scores[type] || 0) + score;
                });
            }
        }
    });

    // 最高スコアのタイプを判定
    let maxScore = 0;
    let resultType = 'experimenter';

    Object.entries(scores).forEach(([type, score]) => {
        if (score > maxScore) {
            maxScore = score;
            resultType = type;
        }
    });

    // 上位タイプを取得
    const sortedTypes = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([type]) => type);

    // 結果をセッションストレージに保存
    const result = {
        type: resultType,
        scores: scores,
        top3: sortedTypes,
        answers: answers,
        timestamp: Date.now()
    };
    sessionStorage.setItem('learning_style_result', JSON.stringify(result));

    // 結果ページへ遷移
    window.location.href = 'result.html';
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', init);
