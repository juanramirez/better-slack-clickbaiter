import {
    DZONE,
    HACKER_NEWS,
    REDDIT_PROGRAMMING,
    SLASHDOT,
    STACK_OVERFLOW,
    TECHCRUNCH
} from "../constants/sources";

import {
    DZONE_URL,
    HACKER_NEWS_URL,
    REDDIT_PROGRAMMING_URL,
    SLASHDOT_URL,
    STACK_OVERFLOW_URL,
    TECHCRUNCH_URL
} from "../constants/sources-urls";

const SOURCE_URL_MAP = {
    [HACKER_NEWS]: HACKER_NEWS_URL,
    [STACK_OVERFLOW]: STACK_OVERFLOW_URL,
    [REDDIT_PROGRAMMING]: REDDIT_PROGRAMMING_URL,
    [TECHCRUNCH]: TECHCRUNCH_URL,
    [SLASHDOT]: SLASHDOT_URL,
    [DZONE]: DZONE_URL,
};

export const getSourceUrl = news_source => SOURCE_URL_MAP[news_source] || new Error('wrong source ' + news_source);
