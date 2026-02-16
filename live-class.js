// Live Class Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    let sessionPoints = 85;

    // ==========================================
    // Quiz Functionality
    // ==========================================
    const quizSection = document.getElementById('quiz-section');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizResult = document.getElementById('quiz-result');
    const quizContent = document.querySelector('.quiz-content');
    const quizTimer = document.getElementById('quiz-timer');

    let timeLeft = 15;
    let quizAnswered = false;
    const correctAnswer = 'b'; // 熱や音、変形のエネルギーに変わる

    // Quiz timer
    const timerInterval = setInterval(() => {
        if (!quizAnswered) {
            timeLeft--;
            quizTimer.textContent = `残り ${timeLeft}秒`;

            if (timeLeft <= 5) {
                quizTimer.style.background = 'rgba(239, 68, 68, 0.5)';
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showQuizResult(false);
            }
        }
    }, 1000);

    // Quiz option click handlers
    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (quizAnswered) return;

            quizAnswered = true;
            clearInterval(timerInterval);

            const selected = option.dataset.answer;
            option.classList.add('selected');

            // Show correct/incorrect
            quizOptions.forEach(opt => {
                if (opt.dataset.answer === correctAnswer) {
                    opt.classList.add('correct');
                } else if (opt.classList.contains('selected') && opt.dataset.answer !== correctAnswer) {
                    opt.classList.add('incorrect');
                }
                opt.disabled = true;
            });

            const isCorrect = selected === correctAnswer;
            showQuizResult(isCorrect);
        });
    });

    function showQuizResult(isCorrect) {
        setTimeout(() => {
            quizContent.style.display = 'none';
            quizResult.classList.remove('hidden');

            const resultIcon = document.getElementById('result-icon');
            const resultText = document.getElementById('result-text');

            if (isCorrect) {
                resultIcon.textContent = '🎉';
                resultText.textContent = '正解！+20ポイント獲得！';
                sessionPoints += 20;
                // Points display removed from logic as element removed from HTML
                // updateSessionPoints(); 
            } else {
                resultIcon.textContent = '😢';
                resultText.textContent = '残念…正解は「熱や音、変形のエネルギーに変わる」でした';
            }
        }, 1000);
    }

    // ==========================================
    // Teacher Question Functionality
    // ==========================================
    const teacherQuestionInput = document.getElementById('teacher-question-input');
    const sendTeacherQuestion = document.getElementById('send-teacher-question');
    const teacherQuestionList = document.getElementById('teacher-question-list');

    if (sendTeacherQuestion) {
        sendTeacherQuestion.addEventListener('click', () => {
            const question = teacherQuestionInput.value.trim();
            if (!question) return;

            const questionItem = document.createElement('div');
            questionItem.className = 'question-item sent';
            questionItem.innerHTML = `
                <div class="question-text">${escapeHtml(question)}</div>
                <div class="question-status">送信済み</div>
            `;

            teacherQuestionList.appendChild(questionItem);
            teacherQuestionList.scrollTop = teacherQuestionList.scrollHeight;
            teacherQuestionInput.value = '';
        });
    }

    if (teacherQuestionInput) {
        teacherQuestionInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendTeacherQuestion.click();
            }
        });
    }

    // ==========================================
    // AI Assistant Functionality
    // ==========================================
    const aiInput = document.getElementById('ai-input');
    const sendAiQuestion = document.getElementById('send-ai-question');
    const aiChatContainer = document.getElementById('ai-chat-container');

    // Sample AI responses
    const aiResponses = {
        'エネルギー': 'エネルギー保存の法則によると、エネルギーは消滅したり生まれたりしません。運動エネルギーは、衝突の際に熱エネルギー、音エネルギー、物体を変形させるエネルギーなどに変換されます。',
        'クラッシャブル': 'クラッシャブルゾーンは、衝突時に意図的につぶれることで衝撃を吸収する部分です。これにより、乗員室への衝撃が軽減され、命を守ることができます。',
        '安全': '現代の車は様々な安全技術を搭載しています。クラッシャブルゾーン、エアバッグ、シートベルトプリテンショナーなどが連携して乗員を守ります。',
        default: 'なるほど、良い質問です！この授業では衝突安全について学んでいます。具体的にどの部分についてもっと知りたいですか？'
    };

    function getAiResponse(question) {
        for (const [keyword, response] of Object.entries(aiResponses)) {
            if (keyword !== 'default' && question.includes(keyword)) {
                return response;
            }
        }
        return aiResponses.default;
    }

    function sendAiMessage(input, container) {
        const question = input.value.trim();
        if (!question) return;

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'ai-message user';
        userMessage.innerHTML = `
            <div class="ai-avatar">👤</div>
            <div class="ai-bubble">${escapeHtml(question)}</div>
        `;
        container.appendChild(userMessage);
        input.value = '';
        container.scrollTop = container.scrollHeight;

        // Simulate AI thinking
        setTimeout(() => {
            const response = getAiResponse(question);
            const aiMessage = document.createElement('div');
            aiMessage.className = 'ai-message assistant';
            aiMessage.innerHTML = `
                <div class="ai-avatar">🤖</div>
                <div class="ai-bubble">${response}</div>
            `;
            container.appendChild(aiMessage);
            container.scrollTop = container.scrollHeight;
        }, 1000);
    }

    if (sendAiQuestion) {
        sendAiQuestion.addEventListener('click', () => {
            sendAiMessage(aiInput, aiChatContainer);
        });
    }

    if (aiInput) {
        aiInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendAiMessage(aiInput, aiChatContainer);
            }
        });
    }

    // ==========================================
    // Mobile AI Modal
    // ==========================================
    const aiFab = document.getElementById('ai-fab');
    const aiModal = document.getElementById('ai-modal');
    const closeAiModal = document.getElementById('close-ai-modal');
    const aiModalChat = document.getElementById('ai-modal-chat');
    const aiModalInput = document.getElementById('ai-modal-input');
    const sendAiModal = document.getElementById('send-ai-modal');

    if (aiFab) {
        aiFab.addEventListener('click', () => {
            aiModal.classList.remove('hidden');
        });
    }

    if (closeAiModal) {
        closeAiModal.addEventListener('click', () => {
            aiModal.classList.add('hidden');
        });
    }

    if (aiModal) {
        aiModal.querySelector('.modal-overlay').addEventListener('click', () => {
            aiModal.classList.add('hidden');
        });
    }

    if (sendAiModal) {
        sendAiModal.addEventListener('click', () => {
            sendAiMessage(aiModalInput, aiModalChat);
        });
    }

    if (aiModalInput) {
        aiModalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendAiMessage(aiModalInput, aiModalChat);
            }
        });
    }

    // Helper function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ==========================================
    // Chat Functionality (General Chat)
    // ==========================================
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const chatItem = document.createElement('div');
        chatItem.className = 'chat-message';
        chatItem.innerHTML = `
            <span class="chat-avatar">👤</span>
            <div class="chat-content">
                <span class="chat-name">ゲストユーザー</span>
                <p>${escapeHtml(message)}</p>
            </div>
            <span class="chat-time">${timeString}</span>
        `;

        chatMessages.appendChild(chatItem);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatInput.value = '';
    }

    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendChatMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
});
