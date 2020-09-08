import { Ingredient } from '../shared/ingredient.model'
import { Subject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({providedIn: 'root'})
export class ShoppinglistsService {

  // newIngredientsAdded = new EventEmitter<Ingredient[]>()

  // Subject is related to observable which is better than eventemitter when sending data through cross component
  newIngredientsAdded = new Subject<Ingredient[]>()
  editIngredient = new Subject<Ingredient>()

  private list: Ingredient[] = [
    new Ingredient('Apple', 20),
    new Ingredient('Tomatoes', 120)

  ]

  getList() {
    return this.list.slice()
  }

  private checkIngredientExist(ingredient: Ingredient) : Ingredient | null {
    let igOfList = null
    this.list.find((ig) => {
      if (ig.name === ingredient.name) {
        igOfList = ig
        return true
      }
    })

    return igOfList
  }

  addToList(item: Ingredient) {
    const igOfList = this.checkIngredientExist(item)
    if (igOfList) {
      igOfList.amount += (+item.amount)
    }
    else {
      this.list.push(item)
      // this.newIngredientsAdded.emit(this.list.slice())
    }
    this.newIngredientsAdded.next(this.list.slice())

  }

  addMultipletoList(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient)=> {
      const igOfList = this.checkIngredientExist(ingredient)
      if (igOfList) {
        igOfList.amount += (+ingredient.amount)
      }
      else {
        this.list.push(ingredient)
      }
    })
    // this.list.push(...ingredients)
    // this.newIngredientsAdded.emit(this.list.slice())
    this.newIngredientsAdded.next(this.list.slice())
  }

  updateItem(ingredient: Ingredient) {
    const igOfList = this.checkIngredientExist(ingredient)
    if(igOfList) {
      igOfList.amount = +ingredient.amount
    }
    this.newIngredientsAdded.next(this.list.slice())
  }

  deleteItem(ingredient: Ingredient) {
    const index = this.list.indexOf(ingredient)
    this.list.splice(index, 1);
    this.newIngredientsAdded.next(this.list.slice())
  }
}
