import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from "../shared/ingredient.model";

import { ShoppinglistsService } from './shoppinglists.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  Ingredients: Ingredient[] = []
  private igChangedSubcription: Subscription

  constructor(private shoppinglistService: ShoppinglistsService) { }
  ngOnInit() {
    this.Ingredients = this.shoppinglistService.getList()
    this.igChangedSubcription = this.shoppinglistService.newIngredientsAdded.subscribe(
      (ingredients: Ingredient[]) => this.Ingredients = ingredients
    )
  }

  ngOnDestroy() {
    this.igChangedSubcription.unsubscribe()
  }

  onNewAddedItem(ingredient: Ingredient) {
    this.shoppinglistService.addToList(ingredient)
  }

  onEditItem(ingredient: Ingredient) {
    this.shoppinglistService.editIngredient.next(ingredient)
  }

}
