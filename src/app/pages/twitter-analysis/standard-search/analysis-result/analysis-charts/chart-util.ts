

export class ChartUtil  {

  constructor() {}

  public static getHexColor(sentiment: string) {
    let color = {
     'positive': '#40ff00',
     'negative': '#ff4000',
     'neutral': '#00bfff'
    }
    if(Object.keys(color).includes(sentiment)) {
      return color[sentiment];
    } else {
      let otherColors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']
      return otherColors[Math.floor(Math.random() * otherColors.length)];
    }
  }

}
