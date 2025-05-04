# Political RAG Agent Chrome Extension

A Chrome extension that provides AI-powered answers to political queries by leveraging a RAG (Retrieval-Augmented Generation) system. The system scrapes and indexes political content from your browsing history to build a knowledge base for answering questions.

## Features

- **Automated Content Collection**: Automatically fetches and indexes political content from your Chrome browsing history
- **Smart Document Processing**: Parses and processes HTML documents to extract relevant political information
- **RAG-based Querying**: Uses Retrieval-Augmented Generation to provide accurate, context-aware answers to political questions
- **Real-time Processing**: Processes queries in real-time through a FastAPI backend
- **Chrome Extension Interface**: Easy-to-use interface integrated directly into your Chrome browser

## Project Structure

```
rag-agent/
├── documents/           # Contains the library of parsed HTML documents
├── extension/          # Chrome extension files
├── faiss_index/        # FAISS vector index for document retrieval
├── fastapi_server.py   # Backend server for handling queries
├── example3.py         # Core RAG functionality and document processing
├── agent.py            # Main agent implementation
├── history_fetch.py    # Chrome history fetching utility
├── html_parser.py      # HTML parsing utilities
└── pyproject.toml      # Project dependencies
```

## Prerequisites

- Python 3.11 or higher
- Chrome browser
- Required Python packages (listed in pyproject.toml)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rag-agent
```

2. Install dependencies:
```bash
pip install -e .
```

3. Set up the Chrome extension:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `extension/` directory

4. Start the FastAPI server:
```bash
python fastapi_server.py
```

## Usage

1. The extension will automatically start collecting and indexing political content from your browsing history
2. To ask a political question:
   - Click the extension icon in your Chrome toolbar
   - Enter your question in the provided text field
   - The system will process your query and provide an answer based on the indexed content

## How It Works

1. **Content Collection**:
   - The system fetches URLs from your Chrome browsing history
   - HTML content is scraped and parsed from these URLs
   - Relevant political content is extracted and stored

2. **Document Processing**:
   - Documents are processed and indexed using FAISS
   - Content is vectorized for efficient retrieval

3. **Query Processing**:
   - When you ask a question, the system:
     - Retrieves relevant documents from the index
     - Uses RAG to generate a context-aware answer
     - Returns the answer through the Chrome extension interface

## Dependencies

- beautifulsoup4: HTML parsing
- faiss-cpu: Vector indexing
- fastapi: Backend server
- google-genai: AI model integration
- newspaper3k: Article extraction
- And other dependencies listed in pyproject.toml

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your license information here]

## Support

For support, please [add your contact information or issue tracker link].
