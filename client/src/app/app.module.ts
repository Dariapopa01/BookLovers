import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';

// import { AddbooksComponent } from './books/addbooks/addbooks.component';
 import { BookCardComponent } from './books/book-card/book-card.component';


import { ModalModule } from 'ngb-modal';
//import { BookPhotoEditorComponent } from './books/book-photo-editor/book-photo-editor.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
//import { RatingComponent } from './books/rating/rating.component';
import { MultipleSelectorComponent } from './utilities/multiple-selector/multiple-selector.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BooksDetailComponent } from './books/books-detail/books-detail.component';
import { RatingsComponent } from './books/ratings/ratings.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { FavoritesComponent } from './books/favorites/favorites.component';
import { BooksLikedComponent } from './books/books-liked/books-liked.component';
import { ReviewsComponent } from './books/reviews/reviews.component';
import { MemberReviewComponent } from './books/member-review/member-review.component';
//import { BookCardComponent } from './_books/book-card/book-card.component';
import { NgxStarsModule } from 'ngx-stars';
import { BooksReadComponent } from './books/books-read/books-read.component';
import { ThreadComponent } from './books/thread/thread.component';
import { ReviewThreadComponent } from './books/review-thread/review-thread.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { CommentsComponent } from './books/comments/comments.component';
import { CommentThreadComponent } from './books/comment-thread/comment-thread.component';
import { ShowComponent } from './books/show/show.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DatePickerComponent,

    MemberMessagesComponent,
    GenericListComponent,

    MultipleSelectorComponent,
     BookListComponent,
     BooksDetailComponent,
     BookCardComponent,
     RatingsComponent,
     AdminPanelComponent,
     HasRoleDirective,
     UserManagementComponent,
     PhotoManagementComponent,
     RolesModalComponent,
     FavoritesComponent,
     BooksLikedComponent,
     ReviewsComponent,
     MemberReviewComponent,
     BooksReadComponent,
     ThreadComponent,
     ReviewThreadComponent,
     ConfirmDialogComponent,
     CommentsComponent,
     CommentThreadComponent,
     ShowComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalModule,
    NgxStarsModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
