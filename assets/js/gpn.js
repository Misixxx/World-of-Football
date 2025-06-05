// assets/js/gpn.js - Логіка виключно для калькулятора гіпотенузи

document.addEventListener('DOMContentLoaded', function() {
    
    // --- ЕЛЕМЕНТИ КАЛЬКУЛЯТОРА ---
    const calcModal = document.getElementById('calcModal');
    const openCalcBtn = document.getElementById('openCalcBtn');
    const closeCalcButton = document.querySelector('#calcModal .close-button');
    
    const k1_input = document.getElementById('k1');
    const k2_input = document.getElementById('k2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('calcResult');
    
    // --- ФУНКЦІЇ ДЛЯ КЕРУВАННЯ ВІКНОМ КАЛЬКУЛЯТОРА ---
    
    // Перевірка, чи існують елементи, перш ніж додавати слухачі
    if (openCalcBtn) {
        openCalcBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if (calcModal) calcModal.style.display = 'block';
        });
    }

    if (closeCalcButton) {
        closeCalcButton.addEventListener('click', function() {
            if (calcModal) calcModal.style.display = 'none';
        });
    }
    
    // Закриття вікна по кліку на фон
    window.addEventListener('click', function(event) {
        if (event.target === calcModal) {
            if (calcModal) calcModal.style.display = 'none';
        }
    });

    // Закриття вікна по Esc
     window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && calcModal && calcModal.style.display === 'block') {
            calcModal.style.display = 'none';
        }
    });


    // --- ЛОГІКА ОБЧИСЛЕНЬ ---

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            // Очищуємо попередній результат
            resultDiv.innerHTML = '';
            resultDiv.className = '';
    
            const k1 = parseFloat(k1_input.value);
            const k2 = parseFloat(k2_input.value);
    
            if (isNaN(k1) || isNaN(k2) || k1 <= 0 || k2 <= 0) {
                resultDiv.textContent = 'Будь ласка, введіть додатні числа.';
                resultDiv.classList.add('error');
                return;
            }
    
            const result = Math.sqrt(k1 * k1 + k2 * k2);
            resultDiv.textContent = `Довжина гіпотенузи: ${result.toFixed(2)} см.`;
            resultDiv.classList.add('success');
        });
    }

});