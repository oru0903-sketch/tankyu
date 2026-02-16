// Contest Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Get all detail buttons and modals
    const detailButtons = document.querySelectorAll('.contest-detail-btn');
    const modals = document.querySelectorAll('.modal');

    // Open modal when clicking detail button
    detailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const contestId = btn.dataset.contest;
            const modal = document.getElementById(`modal-${contestId}`);
            if (modal) {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functionality
    modals.forEach(modal => {
        // Close button
        const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                closeModal(modal);
            });
        });

        // Click overlay to close
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                closeModal(modal);
            });
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    closeModal(modal);
                }
            });
        }
    });

    function closeModal(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Apply button functionality (demo)
    const applyButtons = document.querySelectorAll('.modal-footer .btn-primary');
    applyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('応募ペ�Eジへ移動します（デモ版！E);
        });
    });
});
