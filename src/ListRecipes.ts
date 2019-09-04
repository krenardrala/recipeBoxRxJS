import {from, fromEvent, Observable, of, Subject} from 'rxjs';
import AddRecipe from './AddRecipe';
import DeleteRecipe from './DeleteRecipe';
import Helper from './Helper';
import UpdateRecipe from './UpdateRecipe';
import { Recipe } from './Recipe';

class ListRecipes {
    private addRecipe: HTMLButtonElement;
    private italianFilter: HTMLButtonElement;
    private indianFilter: HTMLButtonElement;
    private list: HTMLElement;
    private modalClose: NodeListOf<HTMLElement>;
    private addRecipeClass: AddRecipe;
    private deleteRecipe: DeleteRecipe;
    private helper: Helper;
    private updateRecipe: UpdateRecipe;
    stream$ = new Subject();
    private recipes: any = JSON.parse(localStorage.getItem('recipes') || "[]");

    constructor() {
        this.addRecipe = document.querySelector('#addRecipe');
        this.italianFilter = document.querySelector('#italian');
        this.indianFilter = document.querySelector('#indian');
        this.list = document.querySelector('.list-group');
        this.modalClose = document.querySelectorAll('.closeModal');
        this.addRecipeClass = new AddRecipe();
        this.deleteRecipe = new DeleteRecipe();
        this.helper = new Helper();
        this.updateRecipe = new UpdateRecipe();

        this.stream$
            .pipe()
            .subscribe(
                (item: object | any | string | boolean) : void => {
                    switch (typeof item) {
                        case "object":
                            this.recipes.push(item);
                            localStorage.setItem('recipes', JSON.stringify(this.recipes));
                            this.listRecipes();
                            break;
                        case "boolean":
                            break;
                        case "string":
                            const newRecipesList = this.recipes.filter((recipe: any) => {
                                return recipe.id != item;
                            });

                            localStorage.setItem('recipes', JSON.stringify(newRecipesList));
                            this.listRecipes();
                            break;
                    }
                }
            );

        this.listRecipes();
        this.addEventListeners();
    }

    private addEventListeners = () : void => {
        fromEvent(this.addRecipe, 'click').subscribe(() => this.addRecipeClass.addNewRecipe());
        fromEvent(this.modalClose, 'click').subscribe(() => this.helper.closeModal());
    };

    addItem = (recipe: object) => {
        this.stream$.next(recipe);
    };

    deleteItem = (id: string) => {
        this.stream$.next(id);
    };

    listRecipes = () : void => {
        this.list.innerText = '';
        let recipes: any = JSON.parse(localStorage.getItem('recipes') || "[]");
        recipes.forEach((recipe: any, index: number) => {
            let listItem = `<div><p href="#" data-id="` + index + `" class="list-group-item list-group-item-action">` + recipe.name + `</p><span class="delete" data-id="` + recipe.id + `">Delete</span></div>`;
            this.list.insertAdjacentHTML('afterbegin', listItem);
        });
        let listItem = document.querySelectorAll('.list-group-item');
        let deleteItem = document.querySelectorAll('.delete');

        listItem.forEach((item) => {
            fromEvent(item, 'click').subscribe((event) => this.updateRecipe.editRecipe(event));
        });

        deleteItem.forEach((item) => {
            fromEvent(item, 'click').subscribe((event) => this.deleteRecipe.deleteRecipe(event));
        });
    };
}

export default ListRecipes;
