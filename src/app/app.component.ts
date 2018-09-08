import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { GithubService } from './shared/services/github.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { GithubItem } from './shared/models/github.response';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$;
  formGroup: FormGroup;
  @ViewChild('registerModel')
  registerModel: ElementRef;
  @ViewChild('registerModelContent')
  registerModelContent: ElementRef;
  @ViewChild('loginModel')
  loginModel: ElementRef;
  @ViewChild('loginModelContent')
  loginModelContent: ElementRef;
  query;
  items: GithubItem[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.userService.isLoggedIn();
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control('', [
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      email: this.formBuilder.control('', [
        Validators.email,
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(200),
        Validators.email
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1024)
      ])
    });
  }

  ngOnInit() {}

  openModel(e) {
    if (e.target.id === 'register-btn') {
      this.formGroup.get('name').setValidators(Validators.required);
      this.formGroup.get('name').setValidators(Validators.minLength(2));
      const loginModel: HTMLElement = this.registerModel.nativeElement;
      loginModel.style.transform = 'scale(1, 1)';
      const content: HTMLElement = this.registerModelContent.nativeElement;
      content.style.height = '600px';
      content.style.transform = 'scale(1, 1)';
    } else {
      const loginModel: HTMLElement = this.loginModel.nativeElement;
      loginModel.style.transform = 'scale(1, 1)';
      const content: HTMLElement = this.loginModelContent.nativeElement;
      content.style.height = '500px';
      content.style.transform = 'scale(1, 1)';
    }
  }

  closeModel(e) {
    this.formGroup.reset();
    if (e.target.id === 'close-register') {
      const registerModel: HTMLElement = this.registerModel.nativeElement;
      registerModel.style.transform = 'scale(1, 0)';
      const content: HTMLElement = this.registerModelContent.nativeElement;
      content.style.transform = 'scale(1, 0)';
    } else if (e.target.id == 'close-login') {
      const loginModel: HTMLElement = this.loginModel.nativeElement;
      loginModel.style.transform = 'scale(1, 0)';
      const content: HTMLElement = this.loginModelContent.nativeElement;
      content.style.transform = 'scale(1, 0)';
    }
  }

  register() {
    this.userService
      .register(this.formGroup.value)
      .subscribe(res => this.handleSuccess(res, 'close-register'));
  }

  handleSuccess(res, modelToClose) {
    console.log(res);
    localStorage.setItem('x-token', res.token);
    this.userService.isLoggedInSubject.next(true);
    this.closeModel({ target: { id: modelToClose } });
  }

  login() {
    const user = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password
    };
    console.log(user);
    this.userService
      .login(user)
      .subscribe(res => this.handleSuccess(res, 'close-login'));
  }

  logout() {
    this.userService.logOut();
    this.router.navigate(['/']);
  }

  get name() {
    return this.formGroup.get('name');
  }
  get password() {
    return this.formGroup.get('password');
  }
  get email() {
    return this.formGroup.get('email');
  }
}
