import { Component, OnInit } from '@angular/core';
import { StandardSearchAPIService } from './standard-search-api.service'
import { SearchedTweet, Tweet } from './types'

@Component({
  selector: 'twitter-standard-search',
  styleUrls: ['./standard-search.component.scss'],
  templateUrl: './standard-search.component.html',
})

export class StandardSearchComponent implements OnInit {
  searchedTweets: SearchedTweet[] = [];
  selectedSearchedTweetId: number;
  selectedTweetData: Tweet[] = [];
  searchedTweetQuery: string = '';

  constructor(private standardSearchAPIService: StandardSearchAPIService) {}

  ngOnInit() {
    this.standardSearchAPIService.getSearchedTweets().subscribe(st => {
      this.searchedTweets = st;
      this.setInitialSelectedSearchedTweetId();
    })
  }

  addSearchedTweet() {
    let st: SearchedTweet = { query: this.searchedTweetQuery };
    this.standardSearchAPIService.addSearchedTweet(st).subscribe(s => {
      this.searchedTweets.push(s);
      this.selectSearchedTweet(s.id);
      console.log(s);
    });
  }

  setSelectedTweetData() {
    this.selectedTweetData = this.searchedTweets.find(st => {
      return st.id === this.selectedSearchedTweetId;
    }).tweets;
  }

  setInitialSelectedSearchedTweetId() {
    if(this.searchedTweets.length > 0) {
      this.selectedSearchedTweetId = this.searchedTweets[0].id;
      this.setSelectedTweetData();
    }
  }

  deleteSearchedTweet(id: number) {
    let stId: number = this.searchedTweets.findIndex(st => {
      return st.id === id;
    });
    let sTweet = this.searchedTweets[stId];
    this.searchedTweets.splice(stId, 1);
    if(sTweet.id === this.selectedSearchedTweetId) {
      this.setInitialSelectedSearchedTweetId();
    }
    this.standardSearchAPIService.deleteSearchedTweet(id).subscribe();
  }

  selectSearchedTweet(id: number) {
    this.selectedSearchedTweetId = id;
    this.setSelectedTweetData();
  }

  getSearchedTweetSelectedColor(id: number) {
    if(this.selectedSearchedTweetId === id) {
      return 'cyan';
    }
  }
}
