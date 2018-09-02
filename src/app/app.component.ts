import { GithubService } from './shared/services/github.service';
import { Component } from '@angular/core';
import { GithubItem } from './shared/models/github.response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  query;
  items: GithubItem[];

  constructor(private github: GithubService) {}

  ngOnInit() {}

  handleQuery(e) {
    if (e.keyCode == 13) {
      this.github
        .getRepos(this.query, '')
        .subscribe(res => (this.items = res.items));
    }
  }

  copy(url) {
    const txt = document.createElement('textarea');
    document.body.appendChild(txt);
    txt.value = `git pull ${url}`; // chrome uses this
    txt.textContent = `git pull ${url}`; // FF uses this
    var sel = getSelection();
    var range = document.createRange();
    range.selectNode(txt);
    sel.removeAllRanges();
    sel.addRange(range);
    if (document.execCommand('copy')) {
      console.log('copied');
    }
    document.body.removeChild(txt);
  }

  filterQuery(e: KeyboardEvent) {
    console.log(e.target['value']);
    if (e.keyCode == 13) {
      this.github
        .getRepos(this.query, e.target['value'])
        .subscribe(res => (this.items = res.items));
    }
  }
}
