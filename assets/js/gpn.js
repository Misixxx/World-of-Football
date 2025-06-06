document.addEventListener('DOMContentLoaded', function() {
    
    const calcModal = document.getElementById('calcModal');
    const openCalcBtn = document.getElementById('openCalcBtn');
    const closeCalcButton = document.querySelector('#calcModal .close-button');
    
    const k1_input = document.getElementById('k1');
    const k2_input = document.getElementById('k2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('calcResult');

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
    
    window.addEventListener('click', function(event) {
        if (event.target === calcModal) {
            if (calcModal) calcModal.style.display = 'none';
        }
    });

     window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && calcModal && calcModal.style.display === 'block') {
            calcModal.style.display = 'none';
        }
    });

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
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