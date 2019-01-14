export class SentimentPrediction {
    naive_bayes: string;
    pattern_analyzer: string;
    rnn_word2vec: string;
    rnn_gloVe: string;
}

export class Tweet {
    id: number;
    text: string;
    user_location: string;
    created_at: string;
    sentiment_prediction: SentimentPrediction;
}

export class SearchedTweet {
    id?: number;
    query: string;
    tweets?: Tweet[];
}

export class TextSentimentPrediction {
    text: string;
    sentiment_prediction?: SentimentPrediction;
}