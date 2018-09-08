import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RouterModule, Router } from '@angular/router';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { StackoverflowComponent } from './stackoverflow/stackoverflow.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookmarkComponent,
    StackoverflowComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'bookmarks',
        component: BookmarkComponent
      },
      {
        path: 'stackoverclue',
        component: StackoverflowComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
