// JavaScript for our fun and games will go here! 

document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration ---
    const ANNIVERSARY_DATE = '2025-01-28T05:55:00'; // SET YOUR DATE HERE: YYYY-MM-DDTHH:MM:SS
    const GALLERY_IMAGES = [
        { src: 'images/hermynee1.jpg', caption: 'My Rockstar, you light up every night with your style and charm.' },
        { src: 'images/hermynee2.jpg', caption: 'My Cutiepie, even a simple mirror can\'t capture all your beauty.' },
        { src: 'images/hermynee3.jpg', caption: 'My Dreamgirl, every city shines brighter when you\'re in it.' },
        { src: 'images/hermynee4.jpg', caption: 'My Muse, your beauty is timeless—like a classic love song.' },
        { src: 'images/hermynee5.jpg', caption: 'My Pasandida Aurat, your elegance and grace make every moment magical.' },
        { src: 'images/hermynee6.jpg', caption: 'My Moonlight, your beauty outshines the stars and brings magic to my world.' }
    ];
    const MEMORY_QUIZ_QUESTIONS = [
        { q: "Where did we first meet?", o: ["At a cafe", "In college", "Online", "A Party"], a: "Online" },
        { q: "What was our first movie?", o: ["A comedy", "A romance", "A horror movie", "An action movie"], a: "A romance" },
    ];
    const KNOW_ME_QUIZ_QUESTIONS = [
        { q: "What's my favorite color?", o: ["Blue", "Black", "Red", "Green"], a: "Black" },
        { q: "What's my dream destination?", o: ["Paris", "Switzerland", "New York", "Tokyo"], a: "Switzerland" },
    ];
    const SWIPE_CARDS = [
        { question: "Who said I love you first?", answer: "I did! ❤️" },
        { question: "What's our dream honeymoon location?", answer: "Bali! 🏔️" },
        { question: "One word to describe our love?", answer: "Magical ✨" }
    ];
    const VIRTUAL_GIFTS = ["A virtual kiss 😘", "A big warm hug 🤗", "A promise to always make you smile 😊"];
    const GIFT_IMAGES = [
        "images/proposal.png",  // Add your gift images here
        "images/gift2.jpg",  // You can add more images
        "images/gift3.jpg"   // or leave some empty strings for text-only gifts
    ];

    // --- Element Cache ---
    const elements = {
        musicToggle: document.getElementById('music-toggle'),
        backgroundMusic: document.getElementById('background-music'),
        giftMusic: document.getElementById('gift-music'),
        yesMusic: document.getElementById('yes-music'),
        timerContainer: document.getElementById('love-timer-container'),
        carouselContainer: document.querySelector('.carousel-container'),
        carouselPrevBtn: document.querySelector('.carousel.prev'),
        carouselNextBtn: document.querySelector('.carousel.next'),
        gameCards: document.querySelectorAll('.game-card'),
        giftBox: document.querySelector('.gift-box'),
        proposalBtn: document.querySelector('.yes-btn'),
        modalOverlay: document.getElementById('modal-overlay'),
        modalContent: document.getElementById('modal-content'),
    };

    // --- Initialization ---
    initAnimations();
    initMusicPlayer();
    initTimer();
    initCarousel();
    initGames();
    initGiftBox();
    initProposal();
    initFunFactBalloon();
    initRomanticClock();
    initFloatingHearts();
    initSparkles();
    initHeartPopping();
    initEnhancedInteractions();

    // --- Functions ---
    function initAnimations() {
        gsap.from("#hero .main-title", { duration: 1, y: -50, opacity: 0, ease: "bounce" });
        gsap.from(".sparkle-text", { duration: 1.5, y: 50, opacity: 0, delay: 0.5, ease: "power2.out" });
    }

    function initMusicPlayer() {
        elements.musicToggle.addEventListener('click', () => {
            // Pause any special music if playing
            if (!elements.giftMusic.paused) elements.giftMusic.pause();
            if (!elements.yesMusic.paused) elements.yesMusic.pause();
            const isPlaying = elements.backgroundMusic.paused;
            elements.backgroundMusic[isPlaying ? 'play' : 'pause']();
            elements.musicToggle.innerHTML = `<i class="fas ${isPlaying ? 'fa-pause' : 'fa-music'}"></i>`;
        });
    }

    function initTimer() {
        const startDate = new Date(ANNIVERSARY_DATE);
        setInterval(() => {
            const now = new Date();
            let years = now.getFullYear() - startDate.getFullYear();
            let months = now.getMonth() - startDate.getMonth();
            let days = now.getDate() - startDate.getDate();
            let hours = now.getHours() - startDate.getHours();
            let minutes = now.getMinutes() - startDate.getMinutes();
            let seconds = now.getSeconds() - startDate.getSeconds();

            if (seconds < 0) { seconds += 60; minutes--; }
            if (minutes < 0) { minutes += 60; hours--; }
            if (hours < 0) { hours += 24; days--; }
            if (days < 0) {
                months--;
                // Get days in previous month
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += prevMonth.getDate();
            }
            if (months < 0) { months += 12; years--; }

            let romantic = '';
            if (years > 0) romantic += years + (years === 1 ? ' year, ' : ' years, ');
            romantic += months + (months === 1 ? ' month, ' : ' months, ');
            romantic += days + (days === 1 ? ' day, ' : ' days, ');
            romantic += hours + 'h ' + minutes + 'm ' + seconds + 's';

            elements.timerContainer.innerHTML = romantic;
        }, 1000);
    }

    function initCarousel() {
        let currentSlide = 0;
        elements.carouselContainer.innerHTML = '';
        GALLERY_IMAGES.forEach(imgData => {
            elements.carouselContainer.innerHTML += `
                <div class="carousel-slide">
                    <img src="${imgData.src}" alt="Memory">
                    <p>${imgData.caption}</p>
                </div>`;
        });
        const slides = document.querySelectorAll('.carousel-slide');
        
        const update = () => elements.carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelector('.carousel .next').addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            update();
        });
        document.querySelector('.carousel .prev').addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            update();
        });
        update();
    }

    function initGames() {
        elements.gameCards.forEach(card => {
            card.addEventListener('click', () => {
                const gameType = card.dataset.game;
                if (gameType === "memory-quiz") showQuiz(MEMORY_QUIZ_QUESTIONS);
                if (gameType === "know-me-quiz") showQuiz(KNOW_ME_QUIZ_QUESTIONS);
                if (gameType === "love-meter") showLoveMeter();
                if (gameType === "swipe-reveal") showSwipeGame();
            });
        });
    }

    function showQuiz(questions) {
        let currentQ = 0;
        const showQuestion = () => {
            const { q, o, a } = questions[currentQ];
            const content = `
                <h3>${q}</h3>
                <div class="options-grid">
                    ${o.map(opt => `<button class="option-btn" data-answer="${a}">${opt}</button>`).join('')}
                </div>`;
            showModal(content);
            document.querySelectorAll('.option-btn').forEach(btn => btn.addEventListener('click', e => {
                alert(e.target.textContent === a ? "You got it right! ❤️" : "Oops, wrong answer! 😉");
                currentQ++;
                questions[currentQ] ? showQuestion() : hideModal();
            }));
        };
        showQuestion();
    }

    function showLoveMeter() {
        const content = `
            <h3>Our Love Meter</h3>
            <div class="love-meter-heart"><i class="fas fa-heart"></i></div>
            <p>Our love is 100% and beyond!</p>
            <button class="option-btn" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>
        `;
        showModal(content);
    }

    function showSwipeGame() {
        const content = `
            <h3>Swipe to Reveal Love Secrets</h3>
            <div class="swipe-cards-container">
                ${SWIPE_CARDS.map((card, index) => `
                    <div class="swipe-card" data-index="${index}">
                        <div class="card-face card-front">${card.question}</div>
                        <div class="card-face card-back">${card.answer}</div>
                    </div>
                `).join('')}
            </div>
            <div class="swipe-instructions">
                Swipe left/right to reveal the answer
            </div>
            <button class="option-btn" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>
        `;
        showModal(content);
        
        // Swipe-to-flip logic only
        const cards = document.querySelectorAll('.swipe-card');
        cards.forEach(card => {
            let startX = 0, startY = 0, startTime = 0;
            let isDragging = false;

            // Touch events
            card.addEventListener('touchstart', e => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                startTime = Date.now();
                isDragging = false;
            });
            card.addEventListener('touchmove', e => {
                const dx = e.touches[0].clientX - startX;
                if (Math.abs(dx) > 10) {
                    isDragging = true;
                    card.style.transform = `translateX(${dx}px) rotate(${dx * 0.1}deg)`;
                }
            });
            card.addEventListener('touchend', e => {
                const dx = e.changedTouches[0].clientX - startX;
                if (isDragging && Math.abs(dx) > 20) {
                    // Swipe flips the card
                    card.classList.add('flipped');
                    createHeartPop(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
                }
                card.style.transform = '';
                isDragging = false;
            });

            // Mouse events
            card.addEventListener('mousedown', e => {
                startX = e.clientX;
                startY = e.clientY;
                startTime = Date.now();
                isDragging = false;
                document.onmousemove = mouseMove;
                document.onmouseup = mouseUp;
            });
            function mouseMove(e) {
                const dx = e.clientX - startX;
                if (Math.abs(dx) > 5) {
                    isDragging = true;
                    card.style.transform = `translateX(${dx}px) rotate(${dx * 0.1}deg)`;
                }
            }
            function mouseUp(e) {
                const dx = e.clientX - startX;
                if (isDragging && Math.abs(dx) > 20) {
                    // Swipe flips the card
                    card.classList.add('flipped');
                    createHeartPop(e.clientX, e.clientY);
                }
                card.style.transform = '';
                isDragging = false;
                document.onmousemove = null;
                document.onmouseup = null;
            }
        });
    }

    function initGiftBox() {
        let giftIndex = 0;
        const giftImageContainer = document.querySelector('.gift-image-container');
        const giftImage = document.getElementById('gift-image');
        const proposalPopup = document.getElementById('proposal-popup');
        
        elements.giftBox.addEventListener('click', () => {
            // Pause background music and play gift music
            elements.backgroundMusic.pause();
            elements.giftMusic.currentTime = 0;
            elements.giftMusic.play();
            // Show the proposal pop-up
            proposalPopup.style.display = 'block';
            proposalPopup.classList.add('pop-in');
            // Hide after 7 seconds or on click outside
            setTimeout(() => {
                proposalPopup.style.display = 'none';
                proposalPopup.classList.remove('pop-in');
            }, 7000);
        });
        // Resume background music when gift music ends
        elements.giftMusic.addEventListener('ended', () => {
            elements.backgroundMusic.play();
        });
        // Hide proposal popup on click outside
        document.addEventListener('click', function hideProposal(e) {
            if (proposalPopup.style.display === 'block' && !proposalPopup.contains(e.target) && !elements.giftBox.contains(e.target)) {
                proposalPopup.style.display = 'none';
                proposalPopup.classList.remove('pop-in');
            }
        });
    }

    function initProposal() {
        elements.proposalBtn.addEventListener('click', () => {
            // Pause background music and play yes music
            elements.backgroundMusic.pause();
            elements.yesMusic.currentTime = 0;
            elements.yesMusic.play();
            showModal(`
                <div style="text-align: center; color: #d90429;">
                    <h1>I Love You! ❤️</h1>
                    <p>Thank you for making me the happiest person alive!</p>
                </div>
            `);
            runCelebration();
        });
        // Resume background music when yes music ends
        elements.yesMusic.addEventListener('ended', () => {
            elements.backgroundMusic.play();
        });
    }

    function showModal(content) {
        elements.modalContent.innerHTML = content;
        elements.modalOverlay.classList.remove('hidden');
    }

    function hideModal() {
        elements.modalOverlay.classList.add('hidden');
    }

    function runCelebration() {
        const end = Date.now() + 3 * 1000;
        const colors = ['#d90429', '#ffffff'];
        (function frame() {
            confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors });
            confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }
    
    // Close modal on overlay click
    elements.modalOverlay.addEventListener('click', (e) => {
        if(e.target === elements.modalOverlay) hideModal();
    });

    // Fun Fact Balloon
    function initFunFactBalloon() {
        const balloon = document.querySelector('.heart-balloon');
        const message = document.querySelector('.fun-fact-message');
        let triggered = false;
        function popBalloon() {
            if (triggered) return;
            triggered = true;
            balloon.classList.add('pop');
            setTimeout(() => {
                message.classList.add('show');
            }, 500);
        }
        balloon.addEventListener('click', popBalloon);
        balloon.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') popBalloon();
        });
    }

    function initRomanticClock() {
        const hourHand = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const secondHand = document.querySelector('.second-hand');
        
        function updateClock() {
            const now = new Date();
            const hours = now.getHours() % 12;
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            
            const hourDegrees = (hours * 30) + (minutes * 0.5);
            const minuteDegrees = minutes * 6;
            const secondDegrees = seconds * 6;
            
            hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDegrees}deg)`;
            minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteDegrees}deg)`;
            secondHand.style.transform = `translate(-50%, -100%) rotate(${secondDegrees}deg)`;
        }
        
        updateClock();
        setInterval(updateClock, 1000);
    }
    
    function initFloatingHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'floating-hearts';
        document.body.appendChild(heartsContainer);
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 6 + 's';
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }
        
        // Create hearts periodically
        setInterval(createHeart, 2000);
        createHeart(); // Create first heart immediately
    }
    
    function initSparkles() {
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
        
        // Create sparkles periodically
        setInterval(createSparkle, 1000);
        createSparkle(); // Create first sparkle immediately
    }

    function initHeartPopping() {
        // Add heart popping to various interactions
        const interactiveElements = document.querySelectorAll('.game-card, .reason-card, .gift-box, .yes-btn, .heart-balloon');
        
        interactiveElements.forEach(element => {
            element.addEventListener('click', (e) => {
                createHeartPop(e.clientX, e.clientY);
            });
        });
        
        // Add heart popping to scroll
        let lastScrollTime = 0;
        window.addEventListener('scroll', () => {
            const now = Date.now();
            if (now - lastScrollTime > 1000) { // Limit to once per second
                createHeartPop(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
                lastScrollTime = now;
            }
        });
    }
    
    function createHeartPop(x, y) {
        const heart = document.createElement('div');
        heart.className = 'heart-pop';
        heart.innerHTML = '💖';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.position = 'fixed';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
    
    function initEnhancedInteractions() {
        // Add shimmer effect to cards
        const cards = document.querySelectorAll('.game-card, .reason-card');
        cards.forEach(card => {
            card.classList.add('shimmer');
        });
        
        // Add pulse glow to important elements
        const importantElements = document.querySelectorAll('.proposal-text, .sparkle-text');
        importantElements.forEach(element => {
            element.classList.add('pulse-glow');
        });
    }
}); 