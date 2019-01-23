import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'SENTIMENT ANALYSIS',
    group: true,
  },
  {
    title: 'Predict Sentiment',
    icon: 'nb-shuffle',
    link: '/pages/predict-sentiment',
    home: true,
  },
  {
    title: 'Twitter Search',
    icon: 'socicon-twitter',
    link: '/pages/twitter-analysis/standard-search',
  },
];
