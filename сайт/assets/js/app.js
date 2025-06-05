document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо елементи модального вікна
    const mapModal = document.getElementById('mapModal');
    const openMapBtn = document.getElementById('openMapBtn');
    const closeButton = document.querySelector('.modal .close-button');

    // Функція для відкриття модального вікна
    function openModal() {
        if (mapModal) mapModal.style.display = 'block';
    }

    // Функція для закриття модального вікна
    function closeModal() {
        if (mapModal) mapModal.style.display = 'none';
    }

    // Відкрити модальне вікно при кліку на кнопку "Карта команд"
    if (openMapBtn) {
        openMapBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Запобігаємо переходу за посиланням '#'
            openModal();
        });
    }

    // Закрити модальне вікно при кліку на хрестик
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Закрити модальне вікно при кліку поза його контентом
    window.addEventListener('click', function(event) {
        if (event.target === mapModal) {
            closeModal();
        }
    });

    // Закрити модальне вікно при натисканні клавіші Escape
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mapModal && mapModal.style.display === 'block') {
            closeModal();
        }
    });
});