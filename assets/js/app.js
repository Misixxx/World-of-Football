/* ==============================================
   Головний файл скриптів: assets/js/app.js
   Відповідає за Карту та Опитування
   ============================================== */

  // Переходимо на jQuery-синтаксис для надійності
$(document).ready(function() {

    // --- ЛОГІКА ДЛЯ КАРТИ ---
    const mapModal = $('#mapModal');
    const modalContent = $('#mapModal .modal-content'); // Знаходимо вміст вікна
    const modalHeader = $('#mapModal .modal-content h2'); // Знаходимо заголовок

    // Відкриття вікна
    $('#openMapBtn').on('click', function(e) {
        e.preventDefault();
        
        // ==========================================
        //         "ЯДЕРНИЙ ВАРІАНТ" ТУТ:
        // Примусово застосовуємо стилі при відкритті
        // ==========================================
        modalContent.css('background-color', '#4A6B5D'); 
        modalContent.css('color', '#f0f3f4');
        modalHeader.css('color', '#E9D298');

        mapModal.show();
    });

    // Закриття вікна по кнопці "х"
    $('#mapModal .close-button').on('click', function() {
        mapModal.hide();
    });
    
    // Ініціалізація КЛІКАБЕЛЬНОЇ карти
    try {
        $('img[usemap]').mapster({
            fillColor: '4a6b5d', fillOpacity: 0.6,
            stroke: true, strokeColor: 'f0f3f4', strokeWidth: 2,
            singleSelect: true, clickNavigate: true, showToolTip: true
        });
    } catch(e) {
        console.error("Помилка ініціалізації карти ImageMapster:", e);
    }
    
    // --- ЛОГІКА ДЛЯ ОПИТУВАННЯ ---
    const surveyButton = document.getElementById('startSurveyBtn');
    if (surveyButton) {
        surveyButton.addEventListener('click', function (event) {
            event.preventDefault();
            startModernSurvey();
        });
    }

    async function startModernSurvey() {
        const swalCustomClasses = {
            popup: 'themed-swal-popup', title: 'themed-swal-title', htmlContainer: 'themed-swal-html-container',
            actions: 'themed-swal-actions', confirmButton: 'themed-swal-confirm-button', cancelButton: 'themed-swal-cancel-button',
            input: 'themed-swal-input', image: 'themed-swal-image',
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
                title: step.title, input: 'text', inputValue: step.inputValue, showCancelButton: true,
                confirmButtonText: 'Далі →', cancelButtonText: 'Скасувати', allowOutsideClick: false,
                customClass: swalCustomClasses,
                inputValidator: (value) => !value || value.trim() === '' ? 'Будь ласка, заповніть це поле!' : null
            });
            if (!result.isConfirmed) {
                Swal.fire({ title: 'Дія була відмінена', icon: 'info', customClass: swalCustomClasses });
                return;
            }
            if (i === 0) surveyData.firstName = result.value;
            if (i === 1) surveyData.lastName = result.value;
            if (i === 2) surveyData.patronymic = result.value;
        }

        Swal.fire({
            title: 'Вітаємо!', text: `Привіт, ${surveyData.lastName} ${surveyData.firstName} ${surveyData.patronymic}! Радий тебе бачити!`,
            confirmButtonText: 'Чудово!', customClass: swalCustomClasses
        });
    }

});