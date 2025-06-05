document.addEventListener('DOMContentLoaded', function() {
    const mapModal = document.getElementById('mapModal');
    const openMapBtn = document.getElementById('openMapBtn');
    const closeButton = document.querySelector('.modal .close-button');

    function openModal() {
        if (mapModal) mapModal.style.display = 'block';
    }

    function closeModal() {
        if (mapModal) mapModal.style.display = 'none';
    }

    if (openMapBtn) {
        openMapBtn.addEventListener('click', function(event) {
            event.preventDefault();
            openModal();
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    window.addEventListener('click', function(event) {
        if (event.target === mapModal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mapModal && mapModal.style.display === 'block') {
            closeModal();
        }
    });
});