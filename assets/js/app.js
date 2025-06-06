window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        const mapModal = document.getElementById('mapModal');
        const calcModal = document.getElementById('calcModal');
        if (mapModal) mapModal.style.display = 'none';
        if (calcModal) calcModal.style.display = 'none';
    }
});

$(document).ready(function() {

    const mapModal = $('#mapModal');

    $('#openMapBtn').on('click', function(e) {
        e.preventDefault();
        mapModal.show();
    });

    $('#mapModal .close-button').on('click', function() {
        mapModal.hide();
    });

    try {
        $('img[usemap]').mapster({
            fillColor: '4a6b5d', fillOpacity: 0.6,
            stroke: true, strokeColor: 'f0f3f4', strokeWidth: 2,
            singleSelect: true, clickNavigate: true, showToolTip: true
        });
    } catch(e) {
        console.error("Помилка ініціалізації карти ImageMapster:", e);
    }
    
    $('#startSurveyBtn').on('click', function(e) {
        e.preventDefault();
        startModernSurvey();
    });
    
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

    $(window).on('click', function(event) {
        if ($(event.target).is(mapModal)) mapModal.hide();
    });
    $(window).on('keydown', function(event) {
        if (event.key === 'Escape' && mapModal.is(':visible')) {
            mapModal.hide();
        }
    });
});