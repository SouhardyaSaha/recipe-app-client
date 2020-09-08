import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from './recipe.model'
import { RecipesService } from './recipes.service'

@Injectable({ providedIn: 'root' })
export class RecipeLoadResolver implements Resolve<Recipe> {

  constructor(private recipeService:RecipesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    return this.recipeService.getRecipe(route.params['id'])
  }
}
