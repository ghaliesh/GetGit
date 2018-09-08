import { GithubItem } from './../shared/models/github.response';
import { GithubService } from './../shared/services/github.service';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  bookmarks;
  constructor(private github: GithubService) {}

  ngOnInit() {
    this.github.getMyGits().subscribe(res => (this.bookmarks = res));
  }
}
