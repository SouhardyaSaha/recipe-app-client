import { Ingredient } from '../shared/ingredient.model'

export class Recipe {
    public name: string
    public description: string
    public imagePath: string
    public ingredients: Ingredient[]
    public _id?: string

    constructor(name: string, desc: string, imgPath: string, ingridients: Ingredient[], id?: string) {
        this.name = name
        this.description = desc
        this.imagePath = imgPath
        this.ingredients = ingridients
        this._id = id
    }
}
