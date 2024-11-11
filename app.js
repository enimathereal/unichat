// Send message function
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const chatWindow = document.getElementById('chatWindow');
    
    // Retrieve the username from localStorage, or default to "Anonymous"
    const username = localStorage.getItem('username') || 'Anonymous';

    const message = messageInput.value.trim();
    if (message !== '') {
        // Create a new message container
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');

        // Create and append sender name
        const senderName = document.createElement('div');
        senderName.classList.add('sender-name');
        senderName.textContent = `${username} says:`;

        // Create and append the actual message
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message;

        // Create and append the timestamp
        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        const now = new Date();
        timestamp.textContent = `${now.getHours()}:${now.getMinutes()}`;

        // Append everything to the message container
        messageContainer.appendChild(senderName);
        messageContainer.appendChild(messageContent);
        messageContainer.appendChild(timestamp);

        // Append message container to chat window
        chatWindow.appendChild(messageContainer);

        // Clear the input field
        messageInput.value = '';

        // Scroll to the latest message
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

// Display username in profile section
window.onload = function () {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('userName').textContent = username;
    } else {
        document.getElementById('userName').textContent = 'Guest';
    }
    loadUploadedFiles();  // Ensure files are loaded when the page loads
};

// Function to edit the profile (name)
function editProfile() {
    // Show the input form to change name
    const profileSection = document.getElementById('profileSection');
    const editForm = document.getElementById('editProfileForm');
    editForm.style.display = 'block';
    profileSection.style.display = 'none';
}

// Function to save the edited profile
function saveProfile() {
    const newName = document.getElementById('newName').value;
    if (newName) {
        localStorage.setItem('fullName', newName);
        document.getElementById('userName').textContent = newName;
    }
    cancelEdit();
}

// Function to cancel profile editing
function cancelEdit() {
    document.getElementById('editProfileForm').style.display = 'none';
    document.getElementById('profileSection').style.display = 'block';
}

// Show and hide sections based on the navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active');
}

// Function to handle file upload and persistence
const uploadButton = document.getElementById('uploadButton');
const uploadFileInput = document.getElementById('uploadFile');
const libraryList = document.getElementById('libraryList');

// Function to load previously uploaded files from localStorage
function loadUploadedFiles() {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    uploadedFiles.forEach(file => {
        displayFile(file);
    });
}

// Function to handle file upload
uploadButton.addEventListener('click', function() {
    const file = uploadFileInput.files[0];

    if (file) {
        // Create a File Object to save information
        const fileObject = {
            name: file.name,
            type: file.type,
            size: file.size,
            url: URL.createObjectURL(file),  // Create a URL to preview the file
        };

        // Store the file information in localStorage
        let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
        uploadedFiles.push(fileObject);
        localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

        // Display the uploaded file
        displayFile(fileObject);

        // Clear the file input after upload
        uploadFileInput.value = '';
    }
});

// Function to display the uploaded file (image, PDF, etc.)
function displayFile(file) {
    const fileDiv = document.createElement('div');
    fileDiv.classList.add('file-item');

    const fileName = document.createElement('p');
    fileName.textContent = file.name;
    fileDiv.appendChild(fileName);

    // Check the file type to display correctly
    if (file.type.startsWith('image/')) {
        // Display image preview
        const imagePreview = document.createElement('img');
        imagePreview.src = file.url;
        imagePreview.alt = file.name;
        imagePreview.classList.add('file-preview');
        fileDiv.appendChild(imagePreview);
    } else if (file.type === 'application/pdf') {
        // Display PDF preview (link)
        const pdfLink = document.createElement('a');
        pdfLink.href = file.url;
        pdfLink.textContent = 'View PDF';
        pdfLink.target = '_blank';
        fileDiv.appendChild(pdfLink);
    }

    // Add a download link for the file
    const downloadButton = document.createElement('a');
    downloadButton.href = file.url;
    downloadButton.download = file.name;  // Set the download attribute with the file name
    downloadButton.textContent = 'Download';
    downloadButton.classList.add('download-button');
    fileDiv.appendChild(downloadButton);

    // Append the file div to the library list
    libraryList.appendChild(fileDiv);
}
