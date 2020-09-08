import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistsService } from '../shoppinglists.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput') nameInputRef: ElementRef
  // @ViewChild('amountInput') amountInputRef: ElementRef

  editMode: boolean = false
  addToListForm: FormGroup

  constructor(private shoppinglistService: ShoppinglistsService) { }

  ngOnInit(): void {
    this.addToListForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)])
    })

    this.shoppinglistService.editIngredient.subscribe(
      (ingredient: Ingredient) => {
        this.editMode = true
        this.addToListForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        })
      }
    )
  }

  private getSelectedIngredient() : Ingredient {
    const { name, amount } = this.addToListForm.value
    const ingredient: Ingredient = new Ingredient(name, amount)

    return ingredient
  }

  onSubmit() {
    // const name: string = this.nameInputRef.nativeElement.value
    // const amount: number = this.amountInputRef.nativeElement.value
    // const ingredient: Ingredient = new Ingredient(name, amount)
    // this.shoppinglistService.addToList(ingredient)
    // console.log(this.addToListForm.get('amount').getError('min'))

    const ingredient = this.getSelectedIngredient()
    if(this.editMode) {
      this.shoppinglistService.updateItem(ingredient)
    } else {
      this.shoppinglistService.addToList(ingredient)
    }

    this.onClear()
  }

  onClear() {
    this.addToListForm.reset()
    this.editMode = false
  }

  onDelete() {
    const ingredient = this.getSelectedIngredient()
    this.shoppinglistService.deleteItem(ingredient)
    this.onClear()
  }

}
