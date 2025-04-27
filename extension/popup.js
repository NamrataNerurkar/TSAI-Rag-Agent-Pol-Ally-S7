document.addEventListener('DOMContentLoaded', () => {
  const indexFilesBtn = document.getElementById('indexFilesBtn');
  const askQueryBtn = document.getElementById('askQueryBtn');
  const querySection = document.getElementById('querySection');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const queryInput = document.getElementById('queryInput');
  const responseDiv = document.getElementById('response');
  const statusDiv = document.getElementById('status');

  console.log('Extension popup opened');

  // Handle Index Files button click
  indexFilesBtn.addEventListener('click', async () => {
    try {
      loadingIndicator.style.display = 'block';
      statusDiv.textContent = 'Indexing files...';
      indexFilesBtn.disabled = true;

      console.log('Attempting to index files...');
      const response = await fetch('http://localhost:8000/index-files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Indexing response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Indexing failed:', errorText);
        throw new Error('Failed to index files: ' + errorText);
      }

      const result = await response.json();
      console.log('Indexing result:', result);

      statusDiv.textContent = 'Files indexed successfully!';
      askQueryBtn.disabled = false;
      querySection.style.display = 'block';
    } catch (error) {
      console.error('Error during indexing:', error);
      statusDiv.textContent = 'Error: ' + error.message;
    } finally {
      loadingIndicator.style.display = 'none';
      indexFilesBtn.disabled = false;
    }
  });

  // Handle Ask Query button click
  askQueryBtn.addEventListener('click', async () => {
    const query = queryInput.value.trim();
    if (!query) {
      statusDiv.textContent = 'Please enter a query first';
      return;
    }

    try {
      loadingIndicator.style.display = 'block';
      statusDiv.textContent = 'Processing query...';
      askQueryBtn.disabled = true;

      console.log('Sending query:', query);
      const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: query })
      });

      console.log('Query response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Query failed:', errorText);
        throw new Error('Failed to get response: ' + errorText);
      }

      const data = await response.json();
      console.log('Query response:', data);
      responseDiv.textContent = data.response;
      statusDiv.textContent = 'Query processed successfully!';
    } catch (error) {
      console.error('Error during query:', error);
      statusDiv.textContent = 'Error: ' + error.message;
    } finally {
      loadingIndicator.style.display = 'none';
      askQueryBtn.disabled = false;
    }
  });

  // Allow Enter key to submit query
  queryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      askQueryBtn.click();
    }
  });
}); 