var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var SeqQueue = require('seq-queue');

var pagePath = "http://www.appledaily.com.tw/realtimenews/section/new/1";

var queue = SeqQueue.createQueue(1000);
var count = 0;



var appleDailyJsonArray = [
  {
    "category":"動物",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"FUN",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"瘋啥",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"搜奇",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"正妹",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"體育",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"臉團",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"娛樂",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"時尚",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"生活",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"社會",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"國際",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"財經",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"地產",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"政治",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },
  {
    "category":"論台",
    "news_count": 0,
    "news":[
      {
        "title":"新聞1標題",
        "url":"新聞1網址",
        "time":"新聞1刊登時間",
        "video": true
      }
    ]
  },

];


queue.push(function(){

    for(i=1;i<6;i++){

      request("http://www.appledaily.com.tw/realtimenews/section/new/" + i, function (error, response, html) {
        if (!error && response.statusCode == 200) {
          var $ = cheerio.load(html);
          $('li.rtddt').each(function(i, element){
            var a = $(this);
            var title = a.children().children().children('font').text();
            var url = "http://www.appledaily.com.tw" + a.children('a').attr('href');
            var time = a.children().children('time').text();
            var type = a.children().children('h2').text();
            var newsClass = a.attr('class');

            if(newsClass.match("hsv")){
              video = true;
            }else{
              video = false;
            }
            var appleNewsData = {
              "title": title,
              "url": url,
              "time": time,
              "video": video
            };

            count++;
            switch(type){
              case "動物":
                appleDailyJsonArray[0].news_count++;
                appleDailyJsonArray[0].news.push(appleNewsData);
                break;
              case "FUN":
                appleDailyJsonArray[1].news_count++;
                appleDailyJsonArray[1].news.push(appleNewsData);
                break;
              case "瘋啥":
                appleDailyJsonArray[2].news_count++;
                appleDailyJsonArray[2].news.push(appleNewsData);
                break;
              case "搜奇":
                appleDailyJsonArray[3].news_count++;
                appleDailyJsonArray[3].news.push(appleNewsData);
                break;
              case "正妹":
                appleDailyJsonArray[4].news_count++;
                appleDailyJsonArray[4].news.push(appleNewsData);
                break;
              case "體育":
                appleDailyJsonArray[5].news_count++;
                appleDailyJsonArray[5].news.push(appleNewsData);
                break;
              case "臉團":
                appleDailyJsonArray[6].news_count++;
                appleDailyJsonArray[6].news.push(appleNewsData);
                break;
              case "娛樂":
                appleDailyJsonArray[7].news_count++;
                appleDailyJsonArray[7].news.push(appleNewsData);
                break;
              case "時尚":
                appleDailyJsonArray[8].news_count++;
                appleDailyJsonArray[8].news.push(appleNewsData);
                break;
              case "生活":
                appleDailyJsonArray[9].news_count++;
                appleDailyJsonArray[9].news.push(appleNewsData);
                break;
              case "社會":
                appleDailyJsonArray[10].news_count++;
                appleDailyJsonArray[10].news.push(appleNewsData);
                break;
              case "國際":
                appleDailyJsonArray[11].news_count++;
                appleDailyJsonArray[11].news.push(appleNewsData);
                break;
              case "財經":
                appleDailyJsonArray[12].news_count++;
                appleDailyJsonArray[12].news.push(appleNewsData);
                break;
              case "地產":
                appleDailyJsonArray[13].news_count++;
                appleDailyJsonArray[13].news.push(appleNewsData);
                break;
              case "政治":
                appleDailyJsonArray[14].news_count++;
                appleDailyJsonArray[14].news.push(appleNewsData);
                break;
              case "論壇":
                appleDailyJsonArray[15].news_count++;
                appleDailyJsonArray[15].news.push(appleNewsData);
                break;

            }
          });
        }
      });
    };

});

queue.push(function(){
  var maxCount = 0;
  var maxIndex;
  var maxCategory;
  for(j=0;j<16;j++){

    if(maxCount < appleDailyJsonArray[j].news_count){
      maxCount = appleDailyJsonArray[j].news_count;
      maxIndex = j;
      maxCategory = appleDailyJsonArray[j].category;
    }

  }
  var nowDate = new Date();
  console.log(nowDate + "新聞數量最多的分類為為 [" + maxCategory + "]，共有 " + maxCount+ " 則新聞");
})


queue.push(function(){

    var JSONString = JSON.stringify(appleDailyJsonArray);

    fs.writeFile('./appledaily.json', JSONString, function (err) {
      if (err) throw err;
      console.log("Now you can check appledaily.json!");
    });
    console.log("Total is " + count);

});
