// Handle tab switching
const tabs = document.querySelectorAll('.tab-item');
const tanggalSections = document.querySelectorAll('.tanggal');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');

        // Remove active class from all tabs
        tabs.forEach(item => item.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all tanggal sections
        tanggalSections.forEach(section => section.classList.remove('active'));

        // Show the selected section
        const selectedSection = document.getElementById(targetTab);
        selectedSection.classList.add('active');
    });
});
