/* ==============================================
   Головний файл скриптів: assets/js/app.js
   Відповідає за Карту та Опитування
   ============================================== */

   document.addEventListener('DOMContentLoaded', function() {

    // --- ЛОГІКА ДЛЯ КАРТИ ---
    const mapModal = document.getElementById('mapModal');
    const openMapBtn = document.getElementById('openMapBtn');
    const closeMapButton = document.querySelector('#mapModal .close-button');

    if (openMapBtn) {
        openMapBtn.addEventListener('click', (e) => { e.preventDefault(); if (mapModal) mapModal.style.display = 'block'; });
    }
    if (closeMapButton) {
        closeMapButton.addEventListener('click', () => { if (mapModal) mapModal.style.display = 'none'; });
    }
    window.addEventListener('click', (event) => { if (event.target === mapModal) mapModal.style.display = 'none'; });
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && mapModal && mapModal.style.display === 'block') mapModal.style.display = 'none'; });
    
    // Ініціалізація карти (без затримок, бо скрипт вже гарантовано завантажено)
    if (typeof jQuery !== 'undefined' && jQuery.fn.mapster) {
        try {
            $('img[usemap]').mapster({
                fillColor: '4a6b5d',
                fillOpacity: 0.6,
                stroke: true,
                strokeColor: 'f0f3f4',
                strokeWidth: 2,
                singleSelect: true,
                clickNavigate: true,
                showToolTip: true
            });
        } catch(e) { console.error("Помилка ініціалізації ImageMapster:", e); }
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