// ===== GAMIFICATION SYSTEM =====

// Burg-Teile und deren Kosten
const CASTLE_UPGRADES = {
    wallLeft: { name: 'Linke Mauer', cost: 50, emoji: '🧱' },
    wallRight: { name: 'Rechte Mauer', cost: 50, emoji: '🧱' },
    towerLeft: { name: 'Linker Turm', cost: 100, emoji: '🗼' },
    towerRight: { name: 'Rechter Turm', cost: 100, emoji: '🗼' },
    keep: { name: 'Bergfried', cost: 200, emoji: '🏰' },
    flag: { name: 'Flagge', cost: 150, emoji: '🚩' }
};

// Shop-Items aktualisieren
function updateShop() {
    const shopItems = document.getElementById('shopItems');
    if (!shopItems || !currentUser) return;

    const parts = currentUser.progress.castleParts;
    let html = '';

    Object.entries(CASTLE_UPGRADES).forEach(([key, upgrade]) => {
        if (parts[key]) {
            // Bereits gekauft
            html += `
                <div class="shop-item purchased">
                    <span class="shop-icon">${upgrade.emoji}</span>
                    <span class="shop-name">${upgrade.name}</span>
                    <span class="shop-status">✓ Gekauft</span>
                </div>
            `;
        } else {
            const canAfford = currentUser.progress.coins >= upgrade.cost;
            html += `
                <div class="shop-item ${canAfford ? '' : 'disabled'}">
                    <span class="shop-icon">${upgrade.emoji}</span>
                    <span class="shop-name">${upgrade.name}</span>
                    <span class="shop-price">${upgrade.cost} 🐄</span>
                    <button class="btn btn-small" onclick="purchaseUpgrade('${key}')" ${canAfford ? '' : 'disabled'}>
                        Kaufen
                    </button>
                </div>
            `;
        }
    });

    shopItems.innerHTML = html;
}

// Upgrade kaufen
function purchaseUpgrade(partId) {
    if (!currentUser) return;

    const upgrade = CASTLE_UPGRADES[partId];
    if (!upgrade) return;

    if (currentUser.progress.coins < upgrade.cost) {
        showToast('Nicht genug Münzen!', 'error');
        return;
    }

    // Münzen abziehen
    currentUser.progress.coins -= upgrade.cost;

    // Teil freischalten
    currentUser.progress.castleParts[partId] = true;

    // Level berechnen
    const unlockedCount = Object.values(currentUser.progress.castleParts).filter(v => v).length;
    currentUser.progress.castleLevel = unlockedCount;

    // Speichern
    updateUserProgress({
        coins: currentUser.progress.coins,
        castleParts: currentUser.progress.castleParts,
        castleLevel: currentUser.progress.castleLevel
    });

    // Animation und Feedback
    showToast(`🏰 ${upgrade.name} wurde gebaut!`, 'success');
    addActivity('castle', `${upgrade.name} gebaut`);

    // UI aktualisieren
    updateCastleDisplay();
    updateShop();

    // Burg-Animation
    animateCastlePart(partId);
}

// Burg-Teil Animation
function animateCastlePart(partId) {
    const element = document.getElementById(partId);
    if (!element) return;

    element.classList.remove('locked');
    element.classList.add('unlocked', 'building');

    // Building Animation
    element.style.transform = 'scale(0)';
    element.style.opacity = '0';

    setTimeout(() => {
        element.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }, 100);

    // Partikel-Effekt
    createBuildingParticles(element);
}

// Bau-Partikel erstellen
function createBuildingParticles(element) {
    const rect = element.getBoundingClientRect();
    const container = document.querySelector('.castle-view');

    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'build-particle';
        particle.style.left = `${rect.left - container.getBoundingClientRect().left + rect.width / 2}px`;
        particle.style.top = `${rect.top - container.getBoundingClientRect().top + rect.height / 2}px`;
        particle.style.setProperty('--angle', `${Math.random() * 360}deg`);
        particle.style.setProperty('--distance', `${50 + Math.random() * 50}px`);
        particle.textContent = ['✨', '⭐', '💫', '🔨', '🧱'][Math.floor(Math.random() * 5)];

        container.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
    }
}

// Rang-System aktualisieren
function updateRankDisplay() {
    if (!currentUser) return;

    const currentRank = RANKS[currentUser.progress.rank];
    const nextRank = RANKS[currentUser.progress.rank + 1];

    // Rang-Liste in der Burg-Seite aktualisieren
    const ranksList = document.querySelector('.ranks-list');
    if (ranksList) {
        ranksList.innerHTML = RANKS.map((rank, index) => {
            let className = '';
            if (index < currentUser.progress.rank) {
                className = 'achieved';
            } else if (index === currentUser.progress.rank) {
                className = 'current';
            }
            return `
                <div class="rank-item ${className}">
                    ${rank.icon} ${rank.name}
                    ${index === currentUser.progress.rank ? '<span class="current-badge">← Du</span>' : ''}
                </div>
            `;
        }).join('');
    }
}

// Achievements-System
function showAllAchievements() {
    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    if (!currentUser) return;

    content.innerHTML = `
        <h2>🏆 Alle Auszeichnungen</h2>
        <div class="all-achievements">
            ${ACHIEVEMENTS.map(achievement => {
                const unlocked = currentUser.achievements.includes(achievement.id);
                return `
                    <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
                        <div class="achievement-icon-large">${unlocked ? achievement.icon : '🔒'}</div>
                        <div class="achievement-info">
                            <h4>${achievement.name}</h4>
                            <p>${achievement.description}</p>
                        </div>
                        ${unlocked ? '<span class="achievement-check">✓</span>' : ''}
                    </div>
                `;
            }).join('')}
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <button class="btn btn-secondary" onclick="closeExerciseModal()">Schließen</button>
        </div>
    `;

    modal.classList.add('active');
}

// Münzen-Übersicht
function showCoinsHistory() {
    // Könnte eine Historie der verdienten/ausgegebenen Münzen zeigen
    showToast('Münzen-Historie kommt bald!', 'info');
}

// Tägliche Belohnung
function checkDailyReward() {
    if (!currentUser) return;

    const today = new Date().toDateString();
    const lastReward = localStorage.getItem(`lastDailyReward_${currentUser.id}`);

    if (lastReward !== today) {
        // Tägliche Belohnung geben
        const reward = 5 + Math.floor(Math.random() * 10); // 5-15 Münzen

        setTimeout(() => {
            showDailyRewardModal(reward);
        }, 1000);
    }
}

function showDailyRewardModal(amount) {
    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    content.innerHTML = `
        <div class="daily-reward">
            <div class="reward-glow"></div>
            <h2>🎁 Tägliche Belohnung!</h2>
            <div class="reward-chest">📦</div>
            <div class="reward-amount">
                <span class="coin-icon-big">🐄</span>
                <span class="amount">+${amount}</span>
            </div>
            <p>Komm morgen wieder für mehr!</p>
            <button class="btn btn-primary" onclick="claimDailyReward(${amount})">Einsammeln!</button>
        </div>
    `;

    modal.classList.add('active');
}

function claimDailyReward(amount) {
    addCoins(amount, 'Tägliche Belohnung');
    localStorage.setItem(`lastDailyReward_${currentUser.id}`, new Date().toDateString());
    closeExerciseModal();
}

// Streak-System (Tage in Folge)
function updateStreak() {
    if (!currentUser) return;

    const today = new Date().toDateString();
    const lastActive = currentUser.progress.lastActive;

    if (!lastActive) {
        currentUser.progress.streak = 1;
    } else {
        const lastDate = new Date(lastActive).toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (lastDate === yesterday) {
            currentUser.progress.streak = (currentUser.progress.streak || 0) + 1;

            // Streak-Bonus
            if (currentUser.progress.streak % 7 === 0) {
                addCoins(50, `7-Tage-Streak!`);
                showToast(`🔥 ${currentUser.progress.streak} Tage in Folge! Bonus: 50 Münzen!`, 'success');
            }
        } else if (lastDate !== today) {
            currentUser.progress.streak = 1;
        }
    }

    updateUserProgress({ streak: currentUser.progress.streak });
}

// CSS für Gamification
const gamificationStyles = document.createElement('style');
gamificationStyles.textContent = `
    /* Shop Styles */
    .shop-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 15px;
        background: var(--bg-tertiary);
        border-radius: 10px;
        margin-bottom: 10px;
        transition: all 0.3s ease;
    }
    .shop-item:hover:not(.purchased):not(.disabled) {
        transform: translateX(5px);
        background: var(--bg-secondary);
    }
    .shop-item.purchased {
        opacity: 0.7;
    }
    .shop-item.disabled {
        opacity: 0.5;
    }
    .shop-icon {
        font-size: 1.8em;
    }
    .shop-name {
        flex: 1;
        font-weight: 500;
    }
    .shop-price {
        font-weight: bold;
        color: var(--warning);
    }
    .shop-status {
        color: var(--success);
        font-weight: 500;
    }

    /* Castle Parts Animation */
    .castle-part {
        transition: all 0.5s ease;
    }
    .castle-part.locked {
        filter: grayscale(1) brightness(0.5);
        opacity: 0.4;
    }
    .castle-part.unlocked {
        filter: none;
        opacity: 1;
    }
    .castle-part.building {
        animation: buildPulse 1s ease;
    }
    @keyframes buildPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    /* Build Particles */
    .build-particle {
        position: absolute;
        font-size: 1.5em;
        pointer-events: none;
        animation: particleFly 1s ease-out forwards;
    }
    @keyframes particleFly {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(
                calc(cos(var(--angle)) * var(--distance)),
                calc(sin(var(--angle)) * var(--distance))
            ) scale(0);
        }
    }

    /* Rank Item */
    .rank-item {
        position: relative;
        padding: 12px 15px;
        background: var(--bg-tertiary);
        border-radius: 8px;
        margin-bottom: 8px;
        opacity: 0.5;
        transition: all 0.3s ease;
    }
    .rank-item.achieved {
        opacity: 1;
        background: linear-gradient(135deg, var(--success), #2ecc71);
        color: white;
    }
    .rank-item.current {
        opacity: 1;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    .current-badge {
        position: absolute;
        right: 15px;
        font-size: 0.8em;
        opacity: 0.8;
    }

    /* Achievement Cards */
    .all-achievements {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
        margin-top: 20px;
    }
    .achievement-card {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: var(--bg-tertiary);
        border-radius: 12px;
        position: relative;
    }
    .achievement-card.unlocked {
        background: linear-gradient(135deg, #ffd700, #ffec8b);
    }
    .achievement-card.locked {
        opacity: 0.6;
    }
    .achievement-icon-large {
        font-size: 2.5em;
    }
    .achievement-info h4 {
        margin-bottom: 5px;
    }
    .achievement-info p {
        font-size: 0.85em;
        color: var(--text-secondary);
    }
    .achievement-card.unlocked .achievement-info p {
        color: #8b6914;
    }
    .achievement-check {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 25px;
        height: 25px;
        background: var(--success);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    /* Daily Reward Modal */
    .daily-reward {
        text-align: center;
        padding: 40px 20px;
        position: relative;
        overflow: hidden;
    }
    .reward-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(255,215,0,0.3), transparent);
        transform: translate(-50%, -50%);
        animation: glowPulse 2s ease infinite;
    }
    @keyframes glowPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
    }
    .reward-chest {
        font-size: 5em;
        margin: 20px 0;
        animation: chestBounce 0.5s ease;
        position: relative;
    }
    @keyframes chestBounce {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    .reward-amount {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin: 20px 0;
    }
    .coin-icon-big {
        font-size: 3em;
    }
    .reward-amount .amount {
        font-size: 3em;
        font-weight: bold;
        color: var(--warning);
    }
`;
document.head.appendChild(gamificationStyles);

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    // Nach Login prüfen
    if (currentUser) {
        updateShop();
        updateRankDisplay();
        checkDailyReward();
        updateStreak();
    }
});

// Event Listener für User-Updates
window.addEventListener('userUpdated', function() {
    updateShop();
    updateRankDisplay();
});
