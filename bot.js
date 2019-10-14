var Twitter = require('twitter');
var config = require('./config.js');
var Tweet = new Twitter(config);

    var params = {
      q: '#pcbuild, #battlestations, #cooltech',
      count: 10,
      result_type: 'recent',
      lang: 'en'    
    } 

Tweet.get('search/tweets', params, function(err, data, response) {
    if(!err){
        for(let i = 0; i < data.statuses.length; i++){
            // Get the tweet Id from the returned data
            let id = { id: data.statuses[i].id_str }
            // Try to Favorite the selected Tweet
            Tweet.post('statuses/retweet', id, function(err, response){
              // If the favorite fails, log the error message
              if(err){
                console.log(err[0].message);
              }
              // If the favorite is successful, log the url of the tweet
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