import axios from 'axios';
import moment from 'moment';
// const TICKERS = ["OIS", "RES", "OII", "VVV", "DMLP", "SLCA", "CRK", "WTI", "ENLC", "PAA", "OXY", "HESM", "LNG", "DTM", "SLB", "MTDR", "CVX", "PDCE"];
const TICKERS = ["OIS", "RES", "OII", "VVV", "DMLP"];

// SCRAP NEWS FROM YAHOO FINANCE
// export const scrapNews = async () => {
//     var response = {};
//     var promises = [];
//     const url = "https://query1.finance.yahoo.com/v8/finance/chart/TLRY?symbol=TLRY&period1=1645556400&period2=1691522369&useYfid=true&interval=1d&includePrePost=true&events=div%7Csplit%7Cearn&lang=en-US&region=US&crumb=9Ok.uM9YLoj&corsDomain=finance.yahoo.com";
//     TICKERS.forEach(ticker => {
//         promises.push(postRequest(url, ticker));
//         }
//     );
//     response = await Promise.all(promises)
//     console.log("NEWS SCRAPING DONE");
//     return response;
// }

export const polygonNews = async () => {
  var response = {};
  var promises = [];
  TICKERS.forEach(ticker => {
    const url = "https://api.polygon.io/v2/reference/news?ticker=" + ticker + "&order=desc&limit=5&sort=published_utc&apiKey=R7U1ToH6UilHmnJg4uzBe2pZ8I104z7H";
    promises.push(getRequest(url));
  });
  response = await Promise.all(promises);
  console.log("NEWS SCRAPING DONE");
  return response;
};

//SCRAP DATA FROM YAHOO FINANCE
export const scrapChartData = async () => {
  var response = {};
  var promises = [];
  var currentTs = moment().unix();
  var lastSevenDay = moment().subtract(7, 'd').unix();
  TICKERS.forEach(ticker => {
    // LAST 6 MONTHS OF DATA
    const url = "https://query2.finance.yahoo.com/v8/finance/chart/" + ticker + "?period1=" + lastSevenDay + "&period2=" + currentTs + "&interval=1d&lang=en-US&region=US";
    promises.push(getRequest(url));
  });
  response = await Promise.all(promises);
  console.log("CHART DATA SCRAPING DONE");
  return response;
};

// export const polygonChart = async () => {
//     var response = {};
//     var promises = [];
//     TICKERS.forEach((ticker) => {
//         // LAST 6 MONTHS OF DATA
//         const url = "https://api.polygon.io/v2/aggs/ticker/"+ticker+"/range/1/day/2023-08-01/2023-08-10?adjusted=true&sort=desc&limit=10&apiKey=R7U1ToH6UilHmnJg4uzBe2pZ8I104z7H";
//         promises.push(getRequest(url));
//     });
//     response = await Promise.all(promises)
//     return response
// } 

// SCRAP DATA FROM YAHOO FINANCE
export const scrapTickers = async () => {
  // SCRAP YAHOO FINANCE
  const url = `https://query2.finance.yahoo.com/v7/finance/quote?formatted=true
    &crumb=9Ok.uM9YLoj
    &lang=en-US
    &region=US
    &symbols=` + TICKERS.toString() + ``;
  const resp = await getRequest(url);
  console.log("TICKERS SCRAPING DONE");
  if (resp.quoteResponse) {
    return resp.quoteResponse.result;
  }
  return [];
};

// MAKING GET REQUEST
const getRequest = url => {
  // Make a request for a user with a given ID
  return axios.get(url, {
    headers: {
      Cookie: "A1=d=AQABBDkj0WQCEDc4TwT7PrlJKCV9znkjxhQFEgEBAQF00mTbZJICziMA_eMAAA&S=AQAAAjRy_PHP23S3MsXt7GNye7c; A3=d=AQABBDkj0WQCEDc4TwT7PrlJKCV9znkjxhQFEgEBAQF00mTbZJICziMA_eMAAA&S=AQAAAjRy_PHP23S3MsXt7GNye7c;"
    }
  }).then(function (response) {
    // handle success
    return response.data;
  }).catch(function (error) {
    // handle error
    console.log("ERROR OCCURED");
    console.log(error);
  });
};

// POST REQUEST
const postRequest = async (url, ticker) => {
  const params = {
    "requests": {
      "g0": {
        "resource": "StreamService",
        "operation": "read",
        "params": {
          "ui": {
            "image_quality_override": true,
            "link_out_allowed": true,
            "needtoknow_template": "filmstrip",
            "ntk_bypassA3c": true,
            "pubtime_maxage": 0,
            "relative_links": true,
            "smart_crop": true,
            "storyline_count": 2,
            "storyline_enabled": true,
            "storyline_min": 2,
            "summary": true,
            "thumbnail_size": 100,
            "view": "mega",
            "editorial_content_count": 6,
            "enable_lead_fallback_image": true,
            "finance_upsell_threshold": 4
          },
          "forceJpg": true,
          "releasesParams": {
            "limit": 20,
            "offset": 0
          },
          "ncpParams": {
            "query": {
              "id": "tickers-news-stream",
              "version": "v1",
              "namespace": "finance",
              "listAlias": "finance-US-en-US-ticker-news"
            }
          },
          "offnet": {
            "include_lcp": true,
            "use_preview": true,
            "url_scheme": "domain"
          },
          "useNCP": true,
          "batches": {
            "pagination": true,
            "size": 10,
            "timeout": 1500,
            "total": 170
          },
          "editors_picks": {
            "show_label": false
          },
          "enableAuthorBio": true,
          "max_exclude": 0,
          "min_count": 0,
          "min_count_error": true,
          "qsp_views": "news,ttext",
          "service": {
            "specRetry": {
              "enabled": false
            }
          },
          "category": "YFINANCE:" + ticker,
          "pageContext": {
            "pageType": "utility",
            "subscribed": "0",
            "enablePremium": "0",
            "eventName": "",
            "topicName": "",
            "category": "news",
            "quoteType": "EQUITY",
            "calendarType": "",
            "screenerType": "",
            "inTrial": "0",
            "cryptoUser": "",
            "enableTrading": "0",
            "hubName": ""
          },
          "content_type": "qsp",
          "content_site": "finance"
        }
      }
    }
  };

  // Make a request for a user with a given ID
  return axios.post(url, params).then(function (response) {
    // handle success
    return response.data;
  }).catch(function (error) {
    // handle error
    console.log("ERROR OCCURED");
    console.log(error);
  });
};