export class SentimentPrediction {
    naive_bayes: string;
    pattern_analyzer: string;
    rnn_word2vec: string;
    rnn_gloVe: string;
}

export class SentimentPredictionModel {
    modelName: String;
    sentiment: String;
}

export class Tweet {
    id: number;
    text: string;
    user_location: string;
    created_at: string;
    source: string;
    sentiment_prediction: SentimentPrediction;
}

export class TansformedTweet extends Tweet {
    created_at_timestamp?: number;
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