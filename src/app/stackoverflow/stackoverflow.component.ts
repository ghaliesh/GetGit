import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StackService } from '../shared/services/stack.service';

@Component({
  selector: 'app-stackoverflow',
  templateUrl: './stackoverflow.component.html',
  styleUrls: ['./stackoverflow.component.css']
})
export class StackoverflowComponent implements OnInit {
  stacks: StackItem[];
  formGroup: FormGroup;
  constructor(
    private stackService: StackService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      query: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      filter: this.formBuilder.control('', [Validators.required]),
      answered: this.formBuilder.control('')
    });
  }

  handleQuery(e) {
    console.log(this.formGroup.value);
    if (e.keyCode == 13) {
      this.stackService
        .getQuestion(this.formGroup.value.query, this.formGroup.value.filter)
        .subscribe(res => this.handleSuccess(res));
    }
  }

  filterQuery(e) {
    console.log(this.formGroup.value);

    if (e.keyCode == 13 || e.target.id == 'checkbox') {
      console.log(e.target.id);
      this.stackService
        .getQuestion(this.formGroup.value.query, this.formGroup.value.filter)
        .subscribe(res => this.handleSuccess(res));
    }
  }

  handleSuccess(res: StackResponse) {
    if (this.formGroup.value.answered) {
      const result = res.items.filter(e => e.is_answered);
      this.stacks = result;
    } else {
      this.stacks = res.items;
    }
  }

  ngOnInit() {}
  get query() {
    return this.formGroup.get('name');
  }
  get filter() {
    return this.formGroup.get('filter');
  }
  get answered() {
    return this.formGroup.get('filter');
  }
}
