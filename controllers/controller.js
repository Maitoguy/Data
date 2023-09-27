const https = require('https');
const Data = require('../models/users_data');
const path = require('path');
const Post = require('../models/post');

module.exports.fetchApi = function (req, res) {
  const headers = {
    'app-id': '65145b8264575f79634037e3',
  };

  const options = {
    hostname: 'dummyapi.io',
    path: '/data/v1/user',
    method: 'GET',
    headers: headers,
  };

  const request = https.get(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const jsonData = JSON.parse(data);
      const users = jsonData.data;

      for (const user of users) {
        const dataInstance = new Data({
          id: user.id,
          title: user.title,
          firstName: user.firstName,
          lastName: user.lastName,
          picture: user.picture,
        });

        dataInstance.save();
      }

      // Send a response only once when all data is saved
      res.render('home', {
        title: "Post",
        datas: Data,
      });
    });
  });

  request.on('error', (error) => {
    console.error('Request error:', error);
    res.status(500).send('Internal Server Error');
  });

  request.end();
};

module.exports.fetchPost = async function (req, res) {

  const datas = await Data.find();

  datas.forEach((data) => {
    const userId = data.id;
    const headers = {
      'app-id': '65145b8264575f79634037e3',
    };

    const options = {
      hostname: 'dummyapi.io',
      path: `/data/v1/user/${userId}/post`,
      method: 'GET',
      headers: headers,
    };

    const request = https.get(options, (response) => {
      let postData = '';

      response.on('data', (chunk) => {
        postData += chunk;
      });

      response.on('end', () => {
        const post = JSON.parse(postData);

        const posts = post.data;

        for ( let i = 0 ; i < 1 ; i++){
          
          const postInstance = new Post({
            id: posts[i].id,
            image: posts[i].image,
            likes: posts[i].likes,
            tags: posts[i].tags,
            text: posts[i].text,
            publishDate: posts[i].publishDate,
            owner: {
              id: posts[i].owner.id,
              title: posts[i].owner.title,
              firstName: posts[i].owner.firstName,
              lastName: posts[i].owner.lastName,
              picture: posts[i].owner.picture,
            },

          });

          postInstance.save();

        }


        request.end();
      });
    });

    request.end();
  });
};
