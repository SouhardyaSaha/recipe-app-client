import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipesService } from "../recipes.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = []
  subscription: Subscription
  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipesService.getRecipes().subscribe(
      recipes => {
        this.recipes = recipes
      }
    )


    // this.subscription = this.recipesService.newRecipesAdded.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes

    //   }
    // )
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe()
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

}
