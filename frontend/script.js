document.getElementById('convertBtn').addEventListener('click', function() {
  convertTextToSpeech();
});

document.getElementById('textInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    convertTextToSpeech();
  }
});

function showLoading(isLoading) {
  document.getElementById('loader').style.display = isLoading ? 'block' : 'none';
}

function showError(message) {
  const errorElement = document.getElementById('error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  setTimeout(() => { errorElement.style.display = 'none'; }, 4000);
}

function convertTextToSpeech() {
  const text = document.getElementById('textInput').value;
  if (!text.trim()) {
    showError('Please enter some text to convert.');
    return;
  }
  showLoading(true);
  fetch('http://localhost:5000/start-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.audio_url) {
        const audioUrl = data.audio_url;
        document.getElementById('audioResult').src = audioUrl;
      } else {
        showError('Failed to convert text to speech.');
      }
      showLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      showError(`Error: ${error.message}`);
      showLoading(false);
    });
}