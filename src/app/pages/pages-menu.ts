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
    title: 'Twitter',
    icon: 'socicon-twitter',
    children: [
      {
        title: 'Standard Search',
        link: '/pages/twitter-analysis/standard-search',
      },
    ],
  },
];
