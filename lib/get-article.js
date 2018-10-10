import {getMetaData} from 'metagetter';
import GoogleSearch from 'google-searcher';

let article_counter = 0;

const buildUrl = (keywords, site) =>
    new GoogleSearch()
        .host('www.google.com')
        .lang('en')
        .query(keywords.join(' ') + " site:" + site)
        .exec()
        .then(urls => urls[article_counter]);

const getArticle = (keywords, site) =>
    buildUrl(keywords, site, article_counter)
        .then(url => {
            article_counter++;
            return getMetaData(url)
        });

export default getArticle;