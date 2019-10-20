var Twitter = require('twitter');
var config = require('./config.js');
var Tweet = new Twitter(config);


    var params = {
      q: '#battlestation OR #pcbuild OR #cooltech OR #cooltechoftheday',
      count: 10,
      result_type: 'recent',
      lang: 'en'    
    } 

Tweet.get('search/tweets', params, function(err, data, response) {
    if(!err){
        for(let i = 0; i < data.statuses.length; i++){
            let id = { id: data.statuses[i].id_str }
            Tweet.post('statuses/retweet', id, function(err, response){
              if(err){
                console.log(err[0].message);
              }
              else{
                let username = response.user.screen_name;
                let tweetId = response.id_str;
                console.log('Retweeted: ', `https://twitter.com/${username}/status/${tweetId}`)
              }
            });
          }
    } else {
      console.log(err);
    }
  })
