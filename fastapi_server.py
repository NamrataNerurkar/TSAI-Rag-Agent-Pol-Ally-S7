from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from agent import main as Agent
import subprocess
import logging
import os
import multiprocessing
import time
import asyncio

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS for the Chrome extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=["chrome-extension://*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    text: str

def run_indexing():
    """Function to run example3.py in a separate process"""
    try:
        result = subprocess.run(
            ["python", "example3.py"],
            check=True,
            capture_output=True,
            text=True
        )
        logger.info(f"Indexing output: {result.stdout}")
        if result.stderr:
            logger.warning(f"Indexing warnings/errors: {result.stderr}")
    except Exception as e:
        logger.error(f"Error in indexing process: {str(e)}")

@app.post("/index-files")
async def index_files():
    try:
        logger.info("Starting file indexing...")
        # Check if example3.py exists
        if not os.path.exists("example3.py"):
            raise FileNotFoundError("example3.py not found in the current directory")
            
        # Start indexing in a separate process
        process = multiprocessing.Process(target=run_indexing)
        process.start()
        
        # Return immediately while indexing continues in background
        return {"status": "success", "message": "Indexing started in background"}
        
    except FileNotFoundError as e:
        logger.error(f"File not found: {str(e)}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error during indexing: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query")
async def process_query(query: Query):
    try:
        logger.info(f"Processing query: {query.text}")
        # Run the agent's main function with the query text and capture the result
        result = await Agent(query.text)
        return {"status": "success", "message": "Query processed successfully", "response": result}
    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    logger.info("Starting FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000) 