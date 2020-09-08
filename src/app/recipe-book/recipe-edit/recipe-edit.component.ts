import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: string
  recipe: Recipe
  editModule: boolean = false

  recipeEditForm: FormGroup
  constructor(private route: ActivatedRoute, private recipesService: RecipesService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.editModule = params['id'] != null
        if (this.editModule) {
          this.id = params['id']
          this.getDataFromResolver()
          // this.recipesService.getRecipe(this.id).subscribe(
          //   recipe => this.recipe = recipe
          // )
        }
        this.formInit()
        console.log(this.recipeEditForm);

      }
    )
  }

  private getDataFromResolver() {
    this.route.data.subscribe(
      (data: Data) => this.recipe = data['recipe']
    )
  }

  private formInit() {

    let recipeName = ''
    let recipedescription = ''
    let recipeImagepath = ''
    let recipeIngredients = new FormArray([])

    if (this.editModule) {
      recipeName = this.recipe.name
      recipedescription = this.recipe.description
      recipeImagepath = this.recipe.imagePath
      if (this.recipe.ingredients) {
        this.recipe.ingredients.forEach((ingredient) => {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
          }))
        })
      }
    }

    this.recipeEditForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(recipeImagepath, [Validators.required]),
      description: new FormControl(recipedescription, [Validators.required]),
      ingredients: recipeIngredients
    })
  }

  onSubmit() {
    if (this.editModule) {
      this.recipesService.updateRecipe(this.id, this.recipeEditForm.value)
    } else {
      this.recipesService.addRecipe(this.recipeEditForm.value)
    }
    this.router.navigate(['/recipes'])
  }

  onCancel() {
    this.router.navigate(['/recipes'])
  }

  onAddIngredient() {
    (<FormArray>this.recipeEditForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)])
    }))
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(+index)
  }

}
