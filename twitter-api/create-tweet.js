const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

console.log("Consumer Key:", process.env.TWITTER_CONSUMER_KEY);
console.log("Consumer Secret:", process.env.TWITTER_CONSUMER_SECRET);
console.log("Access Token:", process.env.TWITTER_ACCESS_TOKEN);
console.log("Access Token Secret:", process.env.TWITTER_ACCESS_TOKEN_SECRET);

// Initialize the Twitter client with OAuth 1.0a (User Context)
const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Function to post a tweet
async function postTweet(tweetText) {
  try {
    const tweet = await client.v2.tweet(tweetText);
    console.log(`Tweet posted with ID ${tweet.data.id}`);
  } catch (error) {
    console.error(`Failed to post tweet: ${error}`);
  }
}

postTweet("Tweet test");
