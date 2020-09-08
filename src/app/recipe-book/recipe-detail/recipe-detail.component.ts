import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from 'src/app/recipe-book/recipes.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id
  item: Recipe

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        this.getDataFromResolver()
      }
    )

  }

  private getDataFromResolver() {
    this.route.data.subscribe(
      (data: Data) => this.item = data['recipe']
    )
  }

  addMultipleIngredientsToShoppingList() {
    this.recipeService.addMultipleToShoppingList(this.item.ingredients)
  }

  onEdit() {
    // this.router.navigate(['/recipes', this.item.id, 'edit'])
    this.router.navigate(['../edit'], { relativeTo: this.route })
  }

  onDelete() {
    if (confirm('Are you sure you want to Delete?')) {
      this.recipeService.deleteRecipe(this.id)
      this.router.navigate(['/recipes'])
    }
  }

}
