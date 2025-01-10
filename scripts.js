document.addEventListener('DOMContentLoaded', () => {
    const imageUrlInput = document.getElementById('imageUrl');
    const addUrlImageButton = document.getElementById('addUrlImage');
    const imageFileInput = document.getElementById('imageFile');
    const uploadImageButton = document.getElementById('uploadImage');
    const imageContainer = document.getElementById('image-container');

    // Load images from localStorage on page load
    const savedImages = JSON.parse(localStorage.getItem('imageUrls')) || [];
    savedImages.forEach(url => addImageToPage(url));

    // Add image by URL
    addUrlImageButton.addEventListener('click', () => {
        const imageUrl = imageUrlInput.value.trim();
        if (imageUrl) {
            addImageToPage(imageUrl);

            // Save the URL to localStorage
            savedImages.push(imageUrl);
            localStorage.setItem('imageUrls', JSON.stringify(savedImages));

            // Clear the input field
            imageUrlInput.value = '';
        } else {
            alert('Please enter a valid image URL!');
        }
    });

    // Add image by uploading
    uploadImageButton.addEventListener('click', () => {
        const file = imageFileInput.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;
                addImageToPage(imageUrl);

                // Save the URL (base64) to localStorage
                savedImages.push(imageUrl);
                localStorage.setItem('imageUrls', JSON.stringify(savedImages));
            };
            reader.readAsDataURL(file);

            // Clear the file input
            imageFileInput.value = '';
        } else {
            alert('Please upload a valid image file!');
        }
    });

    function addImageToPage(url) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Image';
        imageContainer.appendChild(img);
    }
});
