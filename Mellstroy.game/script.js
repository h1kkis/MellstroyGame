// Константы
const CORRECT_PASSWORD = "Mellstroygame";

// Элементы страниц
const loginPage = document.getElementById('login-page');
const modeSelectPage = document.getElementById('mode-select-page');
const slotsPage = document.getElementById('slots-page');
const farmPage = document.getElementById('farm-page');
const chatPage = document.getElementById('chat-page');

// Элементы страницы входа
const passwordInput = document.getElementById('password-input');
const loginBtn = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');

// Элементы страницы выбора режима
const farmBtn = document.getElementById('farm-btn');
const slotsBtn = document.getElementById('slots-btn');
const chatBtn = document.getElementById('chat-btn');

// Кнопки возврата
const backFromFarm = document.getElementById('back-from-farm');
const backFromChat = document.getElementById('back-from-chat');
const backFromSlots = document.getElementById('back-from-slots');

// Элементы игровой страницы
const playBtn = document.getElementById('play-btn');
const character = document.getElementById('character');
const curtains = [
    document.getElementById('curtain1'),
    document.getElementById('curtain2'),
    document.getElementById('curtain3')
];
const slots = [
    document.getElementById('slot1'),
    document.getElementById('slot2'),
    document.getElementById('slot3')
];
const winMessage = document.getElementById('win-message');

// Функция переключения страниц
function switchPage(fromPage, toPage) {
    fromPage.classList.remove('active');
    toPage.classList.add('active');
}

// Проверка пароля
function checkPassword() {
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === CORRECT_PASSWORD) {
        // Правильный пароль - переход на страницу выбора режима
        errorMessage.textContent = '';
        switchPage(loginPage, modeSelectPage);
    } else {
        // Неправильный пароль
        errorMessage.textContent = 'Пароль неверный';
        passwordInput.value = '';
        passwordInput.focus();
        
        // Анимация тряски
        passwordInput.classList.add('shake');
        setTimeout(() => {
            passwordInput.classList.remove('shake');
        }, 500);
    }
}

// Обработчики событий для входа
loginBtn.addEventListener('click', checkPassword);

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Обработчики для выбора режима
farmBtn.addEventListener('click', () => {
    switchPage(modeSelectPage, farmPage);
});

slotsBtn.addEventListener('click', () => {
    switchPage(modeSelectPage, slotsPage);
});

// Обработчики кнопок возврата
backFromFarm.addEventListener('click', () => {
    switchPage(farmPage, modeSelectPage);
});

backFromChat.addEventListener('click', () => {
    switchPage(chatPage, modeSelectPage);
});

// === ЛОГИКА ЧАТА ===
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendButton = document.getElementById('chat-send');

let chatInitialized = false;

// Функция для получения текущего времени
function getCurrentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

// Функция для добавления сообщения
function addMessage(text, sender = 'mellstroy') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatarImg = document.createElement('img');
    avatarImg.src = 'mellstroy-chatting.PNG';
    avatarImg.className = 'message-avatar';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    const timeSpan = document.createElement('div');
    timeSpan.className = 'message-time';
    timeSpan.textContent = getCurrentTime();
    
    contentDiv.appendChild(bubbleDiv);
    contentDiv.appendChild(timeSpan);
    
    if (sender === 'mellstroy') {
        messageDiv.appendChild(avatarImg);
    }
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Функция для показа индикатора печати
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message mellstroy';
    typingDiv.id = 'typing-indicator';
    
    const avatarImg = document.createElement('img');
    avatarImg.src = 'mellstroy-chatting.PNG';
    avatarImg.className = 'message-avatar';
    
    const indicatorDiv = document.createElement('div');
    indicatorDiv.className = 'typing-indicator';
    indicatorDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    
    typingDiv.appendChild(avatarImg);
    typingDiv.appendChild(indicatorDiv);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Функция для удаления индикатора печати
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Функция для ответа Mellstroy
function mellstroyReply(userMessage) {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        
        if (lowerMessage === 'привет') {
            addMessage('Как дела?', 'mellstroy');
        } else if (lowerMessage.includes('хорошо') || lowerMessage.includes('отлично') || lowerMessage.includes('норм')) {
            addMessage('Рад слышать! 😎', 'mellstroy');
        } else if (lowerMessage.includes('плохо') || lowerMessage.includes('не очень')) {
            addMessage('Не грусти, Боров! Всё наладится! 💪', 'mellstroy');
        } else if (lowerMessage.includes('как дела') || lowerMessage.includes('как у тебя')) {
            addMessage('У меня всё отлично! Стримлю, играю в казино 🎰', 'mellstroy');
        } else if (lowerMessage.includes('пока') || lowerMessage.includes('до встречи')) {
            addMessage('Пока, Боров! Заходи ещё! 👋', 'mellstroy');
        } else {
            const randomReplies = [
                'Интересно, Боров! 🤔',
                'Ага, понял тебя!',
                'Круто сказано! 💯',
                'Хах, ты меня удивляешь!',
                'Слушай, это тема! 🔥'
            ];
            addMessage(randomReplies[Math.floor(Math.random() * randomReplies.length)], 'mellstroy');
        }
    }, 1000 + Math.random() * 1000);
}

// Функция отправки сообщения
function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    chatInput.value = '';
    
    // Mellstroy отвечает
    mellstroyReply(text);
}

// Обработчики для чата
chatSendButton.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Инициализация чата при открытии страницы
chatBtn.addEventListener('click', () => {
    switchPage(modeSelectPage, chatPage);
    
    // Первое сообщение от Mellstroy
    if (!chatInitialized) {
        setTimeout(() => {
            addMessage('Привет, Боров', 'mellstroy');
        }, 500);
        chatInitialized = true;
    }
});

backFromSlots.addEventListener('click', () => {
    switchPage(slotsPage, modeSelectPage);
});

// Игровая логика
let isPlaying = false;

// Возможные символы для слотов
const slotSymbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '7'];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Функция для получения случайного символа
function getRandomSymbol() {
    return slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
}

async function playGame() {
    if (isPlaying) return;
    
    isPlaying = true;
    playBtn.disabled = true;
    playBtn.style.opacity = '0.5';
    winMessage.classList.remove('show');
    
    // Сброс слотов
    curtains.forEach(curtain => {
        curtain.classList.remove('open');
        curtain.style.transform = 'scaleY(1)';
    });
    
    slots.forEach(slot => {
        const number = slot.querySelector('.slot-number');
        number.classList.remove('revealed');
        number.style.opacity = '0';
    });
    
    // Генерация случайных символов
    const symbols = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    
    // Анимация персонажа
    character.classList.add('moving');
    
    await sleep(500);
    
    // Открытие занавесов по очереди
    for (let i = 0; i < curtains.length; i++) {
        await sleep(800);
        
        // Персонаж открывает занавес
        curtains[i].classList.add('open');
        
        await sleep(300);
        
        // Показ символа
        const number = slots[i].querySelector('.slot-number');
        number.textContent = symbols[i];
        number.classList.add('revealed');
    }
    
    await sleep(500);
    
    // Возврат персонажа
    character.classList.remove('moving');
    
    await sleep(500);
    
    // Проверка выигрыша (все символы одинаковые)
    if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
        // Показ полноэкранного сообщения ДЖЕКПОТ
        const jackpotOverlay = document.getElementById('jackpot-overlay');
        jackpotOverlay.classList.add('show');
        
        // Создание салютов
        createFireworks();
        
        // Скрытие сообщения через 5 секунд
        setTimeout(() => {
            jackpotOverlay.classList.remove('show');
        }, 5000);
    }
    
    await sleep(1000);
    
    // Включение кнопки снова
    playBtn.disabled = false;
    playBtn.style.opacity = '1';
    isPlaying = false;
}

// Создание эффекта конфетти
function createConfetti() {
    const colors = ['#ffd700', '#ffeb3b', '#d4af37', '#fff176', '#f9a825'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = '0s';
            
            document.body.appendChild(confetti);
            
            // Удаление конфетти после анимации
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Создание салютов (фейерверков)
function createFireworks() {
    const colors = ['#ffd700', '#ffeb3b', '#ff6b6b', '#4ecdc4', '#95e1d3', '#f38181', '#aa96da', '#fcbad3', '#ffffd2'];
    
    // Создаем 15 салютов в течение 5 секунд
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            // Случайная позиция для запуска салюта
            const startX = Math.random() * 80 + 10; // от 10% до 90%
            const startY = Math.random() * 40 + 50; // от 50% до 90%
            
            // Создаем взрыв из 30 частиц
            for (let j = 0; j < 30; j++) {
                const firework = document.createElement('div');
                firework.className = 'firework';
                
                // Случайный угол и скорость
                const angle = (Math.PI * 2 * j) / 30;
                const velocity = Math.random() * 100 + 50;
                
                firework.style.left = startX + '%';
                firework.style.top = startY + '%';
                firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                document.body.appendChild(firework);
                
                // Анимация частицы
                let x = 0;
                let y = 0;
                let opacity = 1;
                const gravity = 0.5;
                let velocityX = Math.cos(angle) * velocity;
                let velocityY = Math.sin(angle) * velocity;
                
                const animate = () => {
                    x += velocityX * 0.05;
                    y += velocityY * 0.05;
                    velocityY += gravity;
                    opacity -= 0.02;
                    
                    firework.style.transform = `translate(${x}px, ${y}px)`;
                    firework.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        firework.remove();
                    }
                };
                
                requestAnimationFrame(animate);
            }
        }, i * 300);
    }
}

// Обработчик кнопки игры
playBtn.addEventListener('click', playGame);

// Создание падающих купюр MELLCOIN
function createFallingDollars() {
    setInterval(() => {
        const dollar = document.createElement('div');
        dollar.className = 'falling-dollar';
        
        // Добавляем содержимое купюры
        dollar.innerHTML = `
            <div class="mellcoin-text">MELLCOIN</div>
            <div class="mellcoin-small-value">100</div>
        `;
        
        // Абсолютно случайная позиция по всей ширине экрана
        dollar.style.left = Math.random() * 88 + 'vw';
        
        // Более быстрая скорость падения
        const duration = Math.random() * 2 + 5; // от 5 до 7 секунд
        dollar.style.animationDuration = duration + 's';
        
        // Случайная начальная ротация
        const initialRotation = Math.random() * 30 - 15; // от -15 до 15 градусов
        dollar.style.setProperty('--initial-rotation', initialRotation + 'deg');
        
        // Случайное направление вращения
        const rotationDirection = Math.random() > 0.5 ? 1 : -1;
        dollar.style.setProperty('--rotation-direction', rotationDirection);
        
        document.body.appendChild(dollar);
        
        // Удаление купюры только после полного падения за край экрана
        setTimeout(() => {
            dollar.remove();
        }, duration * 1000);
    }, 800); // Реже - каждые 800мс для меньших лагов
}

// Фокус на поле ввода при загрузке
window.addEventListener('load', () => {
    passwordInput.focus();
    createFallingDollars();
});

// Дополнительные эффекты при наведении на слоты
slots.forEach(slot => {
    slot.addEventListener('mouseenter', () => {
        if (!isPlaying) {
            slot.style.transform = 'scale(1.05)';
            slot.style.transition = 'transform 0.2s';
        }
    });
    
    slot.addEventListener('mouseleave', () => {
        slot.style.transform = 'scale(1)';
    });
});

// Пасхалка: двойной клик по заголовку BOROV
const borovTitle = document.querySelector('.borov-title');
let clickCount = 0;

borovTitle.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 3) {
        borovTitle.style.animation = 'none';
        borovTitle.style.transform = 'rotate(360deg)';
        borovTitle.style.transition = 'transform 1s';
        
        setTimeout(() => {
            borovTitle.style.animation = 'pulse 2s ease-in-out infinite';
            borovTitle.style.transform = 'rotate(0deg)';
            clickCount = 0;
        }, 1000);
    }
});

// Звуковые эффекты (опционально, можно добавить позже)
// Для полноценной реализации нужны аудио-файлы

// ========================
// ФЕРМА
// ========================

// Система баланса
let balance = 0;
const balanceDisplay = document.getElementById('balance-amount');
const farmCharacter = document.getElementById('farm-character');
const moneyPopup = document.getElementById('money-popup');

// Загрузить баланс из localStorage
function loadBalance() {
    const savedBalance = localStorage.getItem('mellstroy_balance');
    if (savedBalance) {
        balance = parseInt(savedBalance);
        updateBalanceDisplay();
    }
}

// Сохранить баланс в localStorage
function saveBalance() {
    localStorage.setItem('mellstroy_balance', balance.toString());
}

// Обновить отображение баланса
function updateBalanceDisplay() {
    if (balanceDisplay) {
        balanceDisplay.textContent = '$' + balance;
    }
}

// Клик по персонажу на ферме
farmCharacter.addEventListener('click', (e) => {
    // Увеличить баланс
    balance += 1;
    updateBalanceDisplay();
    saveBalance();
    
    // Анимация персонажа
    farmCharacter.classList.add('clicked');
    setTimeout(() => {
        farmCharacter.classList.remove('clicked');
    }, 300);
    
    // Показать всплывающую подсказку +$1
    const rect = farmCharacter.getBoundingClientRect();
    const popup = moneyPopup.cloneNode(true);
    popup.style.left = rect.left + rect.width / 2 + 'px';
    popup.style.top = rect.top + 'px';
    popup.classList.add('show');
    document.body.appendChild(popup);
    
    // Удалить подсказку после анимации
    setTimeout(() => {
        popup.remove();
    }, 1000);
});

// Загрузить баланс при запуске
window.addEventListener('DOMContentLoaded', loadBalance);

