import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeBookComponent } from './recipe-book.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeHomeComponent } from './recipe-home/recipe-home.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeLoadResolver } from './recipe-load-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeBookComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RecipeHomeComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id/detail',
        resolve: {
          recipe: RecipeLoadResolver
        },
        component: RecipeDetailComponent
      },
      {
        path: ':id/edit',
        resolve: {
          recipe: RecipeLoadResolver
        },
        component: RecipeEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeBookRoutingModule { }
