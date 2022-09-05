import scrapy


class SingerSpider(scrapy.Spider):
    name = "singer_spider"
    

    start_urls = ['https://www.1ting.com/group/group0_2.html',
            "https://www.1ting.com/group/group0_1.html",
            "https://www.1ting.com/group/group0_3.html",
            "https://www.1ting.com/group/group3_15.html",
            "https://www.1ting.com/group/group3_14.html",
            "https://www.1ting.com/group/group3_16.html"

            ]
        

            


    def parse(self,response):
        PAGETITLE_SELECTOR = '.pageTitle'
        SINGERLIST_SELECTOR = '.singerList'
        for singer in response.css(SINGERLIST_SELECTOR):
            TITLE_SELECTOR = 'h2 ::text'
            ALPHABET_SELECTOR = 'h3 ::text'
            NAME_SELECTOR = 'li ::text'
            yield {
                'title': response.css(PAGETITLE_SELECTOR).css(TITLE_SELECTOR).extract_first(),
                'alphabet': singer.css(ALPHABET_SELECTOR).get(),
                'names': singer.css(NAME_SELECTOR).getall(),
            }
        
        page = response.css(PAGETITLE_SELECTOR).css(TITLE_SELECTOR).extract_first()
        filename = f'{page}.html'
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log(f'Saved file {filename}')

        