/**
 * Forum Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const newQuestionBtn = document.getElementById('new-question-btn');
    const modal = document.getElementById('new-question-modal');
    const modalCloseBtn = modal?.querySelector('.modal-close');
    const modalCloseBtnFooter = modal?.querySelector('.modal-close-btn');
    const modalOverlay = modal?.querySelector('.modal-overlay');
    const submitQuestionBtn = document.getElementById('submit-question-btn');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const questionCards = document.querySelectorAll('.question-card');
    const searchInput = document.querySelector('.search-input');

    // Open modal
    newQuestionBtn?.addEventListener('click', () => {
        modal?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    const closeModal = () => {
        modal?.classList.add('hidden');
        document.body.style.overflow = '';
    };

    modalCloseBtn?.addEventListener('click', closeModal);
    modalCloseBtnFooter?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Submit question
    submitQuestionBtn?.addEventListener('click', () => {
        const category = document.getElementById('question-category')?.value;
        const title = document.getElementById('question-title')?.value;
        const body = document.getElementById('question-body')?.value;

        if (!title || !body) {
            alert('タイトルと質問内容を入力してください');
            return;
        }

        // In a real app, this would send data to a server
        alert('質問を投稿しました!(デモ版)');
        closeModal();

        // Clear form
        document.getElementById('question-title').value = '';
        document.getElementById('question-body').value = '';
    });

    // Filter functionality
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter questions
            const filter = tab.dataset.filter;
            questionCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        questionCards.forEach(card => {
            const title = card.querySelector('.question-title')?.textContent.toLowerCase();
            const body = card.querySelector('.question-body')?.textContent.toLowerCase();

            if (title?.includes(searchTerm) || body?.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Action buttons (like, bookmark)
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const btnText = btn.textContent.trim();

            if (btnText.includes('保存')) {
                btn.style.background = '#dbeafe';
                btn.style.color = '#1e40af';
                btn.querySelector('span:first-child').textContent = '✓';
                setTimeout(() => {
                    btn.querySelector('span:first-child').textContent = '🔖';
                }, 1000);
            }
        });
    });

    // View all answers button
    document.querySelectorAll('.view-all-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert('回答詳細ページへ移動します(デモ版)');
        });
    });

    // Question card click
    questionCards.forEach(card => {
        card.addEventListener('click', () => {
            alert('質問詳細ページへ移動します(デモ版)');
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
