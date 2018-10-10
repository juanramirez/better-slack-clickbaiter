import inquirer from 'inquirer';
import getArticle from './lib/get-article';
import ALL_SOURCES from "./lib/constants/sources";
import {getSourceUrl} from "./lib/mappers/sources-urls";
import sendSlackBait from "./lib/send-slack-bait";
import dotenv from 'dotenv';

const CHANNEL_QUESTION = 'channel';
const REAL_URL_QUESTION = 'real-url';
const NEWS_SOURCE_QUESTION = 'news-source';
const KEYWORDS_QUESTION = 'keywords';
const CONFIRM_QUESTION = 'confirm';

dotenv.config();

const run = () =>
    inquirer.prompt([
        {
            type: 'input',
            message: 'Select a channel (dont forget @ or #):',
            name: CHANNEL_QUESTION,
        },
        {
            type: 'input',
            message: 'Select a real url to link to:',
            name: REAL_URL_QUESTION,
        },
        {
            type: 'list',
            message: 'Select a source for links:',
            name: NEWS_SOURCE_QUESTION,
            choices: ALL_SOURCES,
        },
        {
            type: 'input',
            name: KEYWORDS_QUESTION,
            message: 'Please introduce keywords to search (separated by space):'
        }
    ])
        .then(answers => {
            const send = articleMetadata => sendSlackBait(
                process.env.SLACK_TOKEN,
                answers[CHANNEL_QUESTION],
                articleMetadata,
                answers[REAL_URL_QUESTION]
            );

            const getNextArticle = () =>
                getArticle(answers[KEYWORDS_QUESTION].split(" "), getSourceUrl(answers[NEWS_SOURCE_QUESTION]))
                    .then(metadata => {
                        console.log("Title:", metadata.title);
                        console.log("Description: ", metadata.description);
                        return inquirer.prompt([
                            {
                                type: 'confirm',
                                message: 'Are you happy with the selection?',
                                name: CONFIRM_QUESTION,
                            },
                        ]).then(answers => answers[CONFIRM_QUESTION] ? send(metadata) : getNextArticle())
                    });

            return getNextArticle();
        }
    )
        .catch(error => console.log("¡Error!", error));

run();
