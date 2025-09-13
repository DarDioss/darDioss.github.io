document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const startScreen = document.getElementById('startScreen');
    const startBtn = document.getElementById('startBtn');
    const playIcon = playPauseBtn.querySelector('i');
    const muteIcon = muteBtn.querySelector('i');
    const avatar = document.querySelector('.profile-avatar');
    const avatarBorder = document.querySelector('.avatar-border');

    let isPlaying = false;

    // Настройка громкости
    audio.volume = 0.7;
    volumeSlider.value = 0.7;

    // Функция переключения музыки
    function togglePlayback() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    function playMusic() {
        audio.play().then(() => {
            isPlaying = true;
            playIcon.className = 'fas fa-pause';
            avatarBorder.style.animation = 'rotateBorder 4s linear infinite';
            console.log('Музыка запущена! :loud_sound:');
        }).catch(error => {
            console.log('Ошибка воспроизведения:', error);
            isPlaying = false;
            playIcon.className = 'fas fa-play';
        });
    }

    function pauseMusic() {
        audio.pause();
        isPlaying = false;
        playIcon.className = 'fas fa-play';
        avatarBorder.style.animation = 'rotateBorder 8s linear infinite';
        console.log('Музыка на паузе! :mute:');
    }

    // Запуск при клике на стартовую кнопку
    startBtn.addEventListener('click', function() {
        startScreen.style.display = 'none';
        playMusic();
    });

    // Обработчики событий для кнопок плеера
    playPauseBtn.addEventListener('click', function() {
        console.log('Клик по кнопке play/pause');
        togglePlayback();
    });

    muteBtn.addEventListener('click', function() {
        audio.muted = !audio.muted;
        muteIcon.className = audio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        console.log(audio.muted ? 'Звук выключен' : 'Звук включен');
    });

    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value;
        if (audio.volume == 0) {
            muteIcon.className = 'fas fa-volume-mute';
        } else {
            muteIcon.className = 'fas fa-volume-up';
        }
        console.log('Громкость:', Math.round(audio.volume * 100) + '%');
    });

    // Анимация аватарки под музыку
    audio.addEventListener('timeupdate', function() {
        if (isPlaying) {
            const pulse = Math.sin(audio.currentTime * 2) * 0.03 + 1;
            avatar.style.transform = `scale(${pulse})`;
        }
    });

    // Обработка ошибок аудио
    audio.addEventListener('error', function(e) {
        console.error('Ошибка загрузки аудио:', e);
        alert('Ошибка загрузки музыки! Проверь файл music.mp3');
    });

    // Проверка готовности аудио
    audio.addEventListener('canplay', function() {
        console.log('Аудио готово к воспроизведению');
    });

    // Автопауза при скрытии вкладки
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            pauseMusic();
        }
    });

    // Быстрая проверка кнопки в консоли
    console.log(':musical_note: Музыкальный плеер инициализирован');
    console.log(':dart: Кнопка playPauseBtn найдена:', !!playPauseBtn);
    console.log(':loud_sound: Кнопка muteBtn найдена:', !!muteBtn);
});

// Простая проверка работы кнопок
console.log(':rocket: Скрипт загружен успешно!');