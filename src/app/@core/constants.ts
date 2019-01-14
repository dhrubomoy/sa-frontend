export const SENTIMENT_ANALYSIS_API = "http://127.0.0.1:8000/api/";

// List of Machine Learning Models used in the backend.
// Add/remove/change models in accordance with changes in backend
export const SENTIMENT_ANALYSIS_MODELS = [
    { name: 'Naive Bayes', key: 'naive_bayes' },
    { name: 'Pattern Analyzer', key: 'pattern_analyzer' },
    { name: 'RNN with word2vec', key: 'rnn_word2vec' },
    { name: 'RNN with GloVe', key: 'rnn_gloVe' }
];