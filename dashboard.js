// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Profile Edit Modal
    const profileEditCard = document.getElementById('profile-edit-card');
    const profileModal = document.getElementById('profile-modal');
    const closeProfileModalBtn = document.getElementById('close-profile-modal');
    const cancelProfileModalBtn = document.getElementById('cancel-profile-modal');

    if (profileEditCard && profileModal) {
        profileEditCard.addEventListener('click', () => {
            profileModal.classList.remove('hidden');
        });

        closeProfileModalBtn.addEventListener('click', () => {
            profileModal.classList.add('hidden');
        });

        cancelProfileModalBtn.addEventListener('click', () => {
            profileModal.classList.add('hidden');
        });

        // Close on overlay click
        profileModal.querySelector('.modal-overlay').addEventListener('click', () => {
            profileModal.classList.add('hidden');
        });
    }

    // Avatar Selection
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', () => {
            avatarOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // Form submission
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('プロフィールを保存しました�E�デモ版！E);
            profileModal.classList.add('hidden');
        });
    }
});
