document.addEventListener('DOMContentLoaded', () => {
  const archiveTable = document.querySelector('#archiveTable tbody');
  const uploadButton = document.getElementById('uploadButton');
  const searchInput = document.getElementById('searchInput');
  let archiveCounter = 0;

  function addFileRow(fileName, fileType, fileURL) {
    archiveCounter++;
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${archiveCounter}</td>
      <td>${fileName}</td>
      <td>${fileType}</td>
      <td>
        <a href="${fileURL}" target="_blank" rel="noopener noreferrer">View/Download</a>
      </td>
      <td>
        <button class="delete-button">Delete</button>
      </td>
    `;

    // Add delete functionality
    row.querySelector('.delete-button').addEventListener('click', () => {
      row.remove();
      updateRowNumbers();
    });

    archiveTable.appendChild(row);
  }

  function updateRowNumbers() {
    const rows = archiveTable.querySelectorAll('tr');
    archiveCounter = 0;
    rows.forEach((row, index) => {
      row.children[0].textContent = index + 1;
      archiveCounter++;
    });
  }

  // Handle file upload
  uploadButton.addEventListener('click', () => {
    const archiveName = document.getElementById('archiveName').value.trim();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (archiveName && file) {
      const fileType = file.type || file.name.split('.').pop();
      const fileURL = URL.createObjectURL(file);

      addFileRow(archiveName, fileType, fileURL);

      // Reset fields
      document.getElementById('archiveName').value = '';
      fileInput.value = '';
    } else {
      alert('Please enter a name and select a file.');
    }
  });

  // Search functionality
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const rows = archiveTable.querySelectorAll('tr');

    rows.forEach(row => {
      const name = row.children[1].textContent.toLowerCase();
      const type = row.children[2].textContent.toLowerCase();

      if (name.includes(searchTerm) || type.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
});
