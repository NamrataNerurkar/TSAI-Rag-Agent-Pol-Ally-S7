
import sqlite3

def main():
    # Path to the History database file (replace <your_path> with the correct path)
    history_db_path = r'/Users/namratan/Library/Application Support/Google/Chrome/Profile 2/History'

    # Connect to the SQLite database
    conn = sqlite3.connect(history_db_path)
    cursor = conn.cursor()

    # Query to select URLs from the history table
    query = "SELECT url FROM urls"

    # Execute the query
    cursor.execute(query)

    # Fetch all URLs
    urls = cursor.fetchall()

    # Print the URLs
    for url in urls:    
        print(url[0])

    # Close the connection
    conn.close()

    return urls

if __name__ == "__main__":
    main()