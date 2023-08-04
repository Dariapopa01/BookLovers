import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventsUnsavedChangesGuard } from './_guards/prevents-unsaved-changes.guard';
import { BookListComponent } from './books/book-list/book-list.component';
 import { BooksDetailComponent } from './books/books-detail/books-detail.component';
// import { BookEditComponent } from './books/book-edit/book-edit.component';
import { MemberDetailedResolver } from './_resolver/member-detailed.resolver';
import { BookDetailResolverService } from './books/books-detail/book-detail-resolver.service';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';
import { BooksLikedComponent } from './books/books-liked/books-liked.component';
import { BooksReadComponent } from './books/books-read/books-read.component';
import { FavoritesComponent } from './books/favorites/favorites.component';
import { ReviewsComponent } from './books/reviews/reviews.component';
import { ShowComponent } from './books/show/show.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: '',
    runGuardsAndResolvers:'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'admin', component:AdminPanelComponent, canActivate: [AdminGuard]},
      {path: 'members', component:MemberListComponent, canActivate: [AuthGuard]},
      {path: 'members/:username', component:MemberDetailComponent, resolve: {member: MemberDetailedResolver}},
      {path: 'member/edit', component:MemberEditComponent, canDeactivate: [PreventsUnsavedChangesGuard]},
      {path: 'lists', component:ListsComponent},
       {path: 'books', component:BookListComponent},
      {path: 'books/detail/:title', component:BooksDetailComponent, resolve:{prp: BookDetailResolverService}},
      // {path: 'book/edit', component:BookEditComponent, canDeactivate: [PreventsUnsavedChangesGuard]},

      {path: 'messages', component:MessagesComponent},
      {path: 'review', component:ShowComponent},

      {path: 'books/favorite', component:FavoritesComponent},
      {path: 'books/favorites', component:BooksReadComponent},
    ]
  },
  {path: 'errors', component: TestErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},

  {path: '**', component:NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
