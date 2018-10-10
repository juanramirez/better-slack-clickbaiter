import request from 'request-promise-native';
import querystring from 'querystring';

const sendSlackBait = (slackToken, channel, articleMetadata, url) => {
    const slackOptions = querystring.stringify({
        token: slackToken,
        as_user: true,
        channel: channel,
        //text: "Norl",
        attachments: JSON.stringify([
            {
                fallback: articleMetadata.description,
                //"color": "#c3c8c7",
                //"author_name": authorname,
                //"author_icon": authorpic,
                title: articleMetadata.title,
                title_link: url,
                text: articleMetadata.description,
                image_url: articleMetadata.image,
                thumb_url: articleMetadata.favicon,
            }
        ])
    });
    const options = {
        method: 'POST',
        uri: 'https://slack.com/api/chat.postMessage?' + slackOptions,
        resolveWithFullResponse: true,
        post: slackOptions,
    };

    request(options)
        .then(response => {
            if (JSON.parse(response.body).ok)
                console.log('Succeed!');
            else throw new Error(JSON.parse(response.body).error);
        })
        .catch(error => console.log('Error :', error));
};

export default sendSlackBait;