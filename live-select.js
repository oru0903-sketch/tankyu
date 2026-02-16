// Live Select Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Archive cards click handler
    const archiveCards = document.querySelectorAll('.class-card.archive');
    archiveCards.forEach(card => {
        card.addEventListener('click', () => {
            alert('アーカイブ動画ペ�Eジへ移動します（デモ版！E);
        });
    });

    // Upcoming cards click handler
    const upcomingCards = document.querySelectorAll('.class-card.upcoming');
    upcomingCards.forEach(card => {
        card.addEventListener('click', () => {
            alert('こ�E授業はまだ開始されてぁE��せん。開始時刻になったら参加できます。（デモ版！E);
        });
    });
});
