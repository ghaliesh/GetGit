import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GithubItem } from '../shared/models/github.response';
import { GithubService } from '../shared/services/github.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('star')
  star: ElementRef;
  formGroup: FormGroup;
  items: GithubItem[];

  constructor(private github: GithubService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      query: this.formBuilder.control('', Validators.required)
    });
  }

  ngOnInit() {}

  handleQuery(e) {
    if (e.keyCode == 13) {
      this.github
        .getRepos(this.formGroup.value.query, '')
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
        .getRepos(this.formGroup.get('query'), e.target['value'])
        .subscribe(res => (this.items = res.items));
    }
  }

  bookMark(git: GithubItem, e) {
    const star: HTMLElement = e.target;
    star.classList.replace('far', 'fas');
    star.classList.add('yellow');
    const payload = {
      name: git.name || '',
      git_url: git.git_url,
      license: git.license.name,
      issues: git.open_issues,
      language: git.language || 'Unkown lang'
    };
    console.log(payload);
    this.github.bookMark(payload).subscribe(res => console.log(res));
  }

  get query() {
    return this.formGroup.get('query');
  }
}
