import requests
from bs4 import BeautifulSoup
from newspaper import Article

def html_parser_beautiful_soup(url):
    html_download = requests.get(url)
    with open("documents/noah_beautiful_soup.txt", "w") as f:
        f.write(html_download.text)
    soup_object = BeautifulSoup(html_download.text, "html.parser")
    soup_text = soup_object.get_text()
    return soup_text

def html_parser_newspaper3k(url):
    article_object = Article(url) 
    article_object.download()   # downloading is not an object method: just call it, don't capture
    
    with open("documents/noah_newspaper3k.txt", "w") as f:
        f.write(article_object.html)
    
    article_object.parse()
    return article_object.text
    # article_object.top_image

if __name__ == "__main__":
    url = "https://www.noahpinion.blog/p/how-to-have-friends-past-age-30"
    # print(html_parser_beautiful_soup(url))
    print(html_parser_newspaper3k(url))