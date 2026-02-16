// Points Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    let currentPoints = 1250;

    // Tab switching
    const tabs = document.querySelectorAll('.points-tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding panel
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${targetTab}-panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // Exchange category filtering
    const categories = document.querySelectorAll('.exchange-category');
    const exchangeCards = document.querySelectorAll('.exchange-card');

    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            const category = cat.dataset.category;

            // Update active category
            categories.forEach(c => c.classList.remove('active'));
            cat.classList.add('active');

            // Filter cards
            exchangeCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modals
    const exchangeModal = document.getElementById('exchange-modal');
    const kitModal = document.getElementById('kit-modal');
    const completeModal = document.getElementById('complete-modal');

    let selectedItem = null;
    let selectedPrice = 0;
    let selectedKit = null;

    // Exchange Buttons (not experiment kit)
    const exchangeButtons = document.querySelectorAll('.exchange-card .btn-primary:not([disabled]):not(#experiment-kit-btn)');

    exchangeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedItem = btn.dataset.item;
            selectedPrice = parseInt(btn.dataset.price);
            const isLottery = btn.dataset.lottery === 'true';

            document.getElementById('exchange-item-name').textContent = selectedItem + (isLottery ? '（抽選）' : '');
            document.getElementById('exchange-item-price').textContent = `-${selectedPrice}pt`;
            document.getElementById('exchange-remaining').textContent = `${(currentPoints - selectedPrice).toLocaleString()}pt`;

            exchangeModal.classList.remove('hidden');
        });
    });

    // Exchange Modal Close
    if (exchangeModal) {
        document.getElementById('close-exchange-modal').addEventListener('click', () => closeModal(exchangeModal));
        document.getElementById('cancel-exchange').addEventListener('click', () => closeModal(exchangeModal));
        exchangeModal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(exchangeModal));
    }

    // Confirm Exchange
    const confirmExchangeBtn = document.getElementById('confirm-exchange');
    if (confirmExchangeBtn) {
        confirmExchangeBtn.addEventListener('click', () => {
            if (selectedItem && selectedPrice > 0) {
                // Store values in local variables before closing modal clears them
                const item = selectedItem;
                const price = selectedPrice;

                currentPoints -= price;
                updatePointsDisplay();
                closeModal(exchangeModal);

                // Show complete modal
                const isLottery = item.includes('見学会');
                if (isLottery) {
                    document.getElementById('complete-message').textContent = '抽選への申し込みが完了しました！';
                    document.getElementById('complete-details').innerHTML = `
                        <p><span class="detail-label">申し込み特典：</span><span class="detail-value">${item}</span></p>
                        <p><span class="detail-label">使用ポイント：</span><span class="detail-value">${price}pt</span></p>
                        <p><span class="detail-label">抽選結果：</span><span class="detail-value">登録メールアドレスに通知されます</span></p>
                    `;
                } else {
                    document.getElementById('complete-message').textContent = '交換が完了しました！';
                    document.getElementById('complete-details').innerHTML = `
                        <p><span class="detail-label">交換特典：</span><span class="detail-value">${item}</span></p>
                        <p><span class="detail-label">使用ポイント：</span><span class="detail-value">${price}pt</span></p>
                    `;
                }
                completeModal.classList.remove('hidden');
            }
        });
    }

    // Experiment Kit Button
    const kitBtn = document.getElementById('experiment-kit-btn');
    if (kitBtn) {
        kitBtn.addEventListener('click', () => {
            selectedKit = null;
            document.querySelectorAll('.kit-option').forEach(opt => opt.classList.remove('selected'));
            document.getElementById('confirm-kit').disabled = true;
            kitModal.classList.remove('hidden');
        });
    }

    // Kit Selection
    document.querySelectorAll('.kit-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.kit-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedKit = option.dataset.kit;
            document.getElementById('confirm-kit').disabled = false;
        });
    });

    // Kit Modal Close
    if (kitModal) {
        document.getElementById('close-kit-modal').addEventListener('click', () => closeModal(kitModal));
        document.getElementById('cancel-kit').addEventListener('click', () => closeModal(kitModal));
        kitModal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(kitModal));
    }

    // Confirm Kit Selection
    const confirmKitBtn = document.getElementById('confirm-kit');
    if (confirmKitBtn) {
        confirmKitBtn.addEventListener('click', () => {
            if (selectedKit && currentPoints >= 500) {
                // Store kit selection before closing modal
                const kit = selectedKit;

                currentPoints -= 500;
                updatePointsDisplay();
                closeModal(kitModal);

                const kitNames = {
                    crystal: '結晶成長ラボ「クリスタル・タワー作成キット」',
                    solar: '太陽光で作る！「ソーラー・クッキング・パラボラ」',
                    saltcar: '自動走行！「塩水パワー・バギー」'
                };

                document.getElementById('complete-message').textContent = '実験キットの申し込みが完了しました！';
                document.getElementById('complete-details').innerHTML = `
                    <p><span class="detail-label">選択キット：</span><span class="detail-value">${kitNames[kit]}</span></p>
                    <p><span class="detail-label">使用ポイント：</span><span class="detail-value">500pt</span></p>
                    <p><span class="detail-label">発送予定：</span><span class="detail-value">2〜3週間以内にお届けします</span></p>
                `;
                completeModal.classList.remove('hidden');
            }
        });
    }

    // Complete Modal Close
    if (completeModal) {
        document.getElementById('close-complete').addEventListener('click', () => closeModal(completeModal));
        completeModal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(completeModal));
    }

    // Helper Functions
    function closeModal(modal) {
        if (modal) {
            modal.classList.add('hidden');
        }
        selectedItem = null;
        selectedPrice = 0;
    }

    function updatePointsDisplay() {
        const pointsValue = document.querySelector('.points-value');
        if (pointsValue) {
            pointsValue.innerHTML = `${currentPoints.toLocaleString()}<span class="points-unit">pt</span>`;
        }
    }

    // History filter
    const historyFilter = document.querySelector('.history-filter-select');
    const historyItems = document.querySelectorAll('.history-item');

    if (historyFilter) {
        historyFilter.addEventListener('change', (e) => {
            const filter = e.target.value;

            historyItems.forEach(item => {
                const icon = item.querySelector('.history-icon');
                const isPositive = icon.classList.contains('positive');

                if (filter === 'all') {
                    item.style.display = 'flex';
                } else if (filter === 'earned' && isPositive) {
                    item.style.display = 'flex';
                } else if (filter === 'used' && !isPositive) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Handle URL tab parameter
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('tab');
    if (activeTab) {
        setTimeout(() => {
            const tabBtn = document.querySelector(`.points-tab[data-tab="${activeTab}"]`);
            if (tabBtn) {
                tabBtn.click();
            }
        }, 100);
    }
});
