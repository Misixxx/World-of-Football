// Цей слухач подій гарантує, що весь JavaScript-код виконається
// тільки після того, як вся HTML-структура сторінки буде завантажена.
// Це найкраща практика для уникнення помилок "елемент не знайдено".
document.addEventListener('DOMContentLoaded', function() {

    // --- ЛОГІКА ДЛЯ МОДАЛЬНОГО ВІКНА З КАРТОЮ ---
    
    const mapModal = document.getElementById('mapModal');
    const openMapBtn = document.getElementById('openMapBtn');
    // Використовуємо більш точний селектор, щоб уникнути конфліктів
    const closeMapButton = document.querySelector('#mapModal .close-button');

    function openModal() {
        if (mapModal) mapModal.style.display = 'block';
    }

    function closeModal() {
        if (mapModal) mapModal.style.display = 'none';
    }

    // Відкриття вікна при кліку на кнопку "Карта команд"
    if (openMapBtn) {
        openMapBtn.addEventListener('click', function(event) {
            event.preventDefault();
            openModal();
        });
    }

    // Закриття вікна при кліку на "хрестик"
    if (closeMapButton) {
        closeMapButton.addEventListener('click', closeModal);
    }

    // Закриття вікна при кліку поза його межами
    window.addEventListener('click', function(event) {
        if (event.target === mapModal) {
            closeModal();
        }
    });

    // Закриття вікна при натисканні клавіші Escape
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mapModal && mapModal.style.display === 'block') {
            closeModal();
        }
    });


    // --- ЛОГІКА ДЛЯ ІНТЕРАКТИВНОГО ОПИТУВАННЯ ---

    const surveyButton = document.getElementById('startSurveyBtn');

    if (surveyButton) {
        surveyButton.addEventListener('click', function (event) {
            event.preventDefault();
            startModernSurvey();
        });
    }

    async function startModernSurvey() {

        const swalCustomClasses = {
            popup: 'themed-swal-popup',
            title: 'themed-swal-title',
            htmlContainer: 'themed-swal-html-container',
            actions: 'themed-swal-actions',
            confirmButton: 'themed-swal-confirm-button',
            cancelButton: 'themed-swal-cancel-button',
            input: 'themed-swal-input',
            image: 'themed-swal-image',
        };

        const surveySteps = [
            { title: "Введіть своє ім'я", inputValue: 'Максим' },
            { title: 'Введіть своє прізвище', inputValue: 'Гузовець' },
            { title: 'Як Вас по батькові?', inputValue: 'Миколайович' }
        ];

        const surveyData = {};

        for (let i = 0; i < surveySteps.length; i++) {
            const step = surveySteps[i];
            
            const result = await Swal.fire({
                title: step.title,
                input: 'text',
                inputValue: step.inputValue,
                showCancelButton: true,
                confirmButtonText: 'Далі →',
                cancelButtonText: 'Скасувати',
                allowOutsideClick: false,
                customClass: swalCustomClasses,
                inputValidator: (value) => {
                    if (!value || value.trim() === '') {
                        return 'Будь ласка, заповніть це поле!'
                    }
                }
            });

            if (!result.isConfirmed) {
                Swal.fire({
                    title: 'Дія була відмінена',
                    icon: 'info',
                    customClass: swalCustomClasses
                });
                return;
            }
            
            if (i === 0) surveyData.firstName = result.value;
            if (i === 1) surveyData.lastName = result.value;
            if (i === 2) surveyData.patronymic = result.value;
        }

        Swal.fire({
            title: 'Вітаємо!',
            text: `Привіт, ${surveyData.lastName} ${surveyData.firstName} ${surveyData.patronymic}! Радий тебе бачити!`,
            confirmButtonText: 'Чудово!',
            customClass: swalCustomClasses
        });
    }
    
});