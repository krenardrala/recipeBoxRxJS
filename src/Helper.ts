import { fromEvent } from 'rxjs';
import UpdateRecipe from './UpdateRecipe';

class Helper {
    private modal: HTMLElement;
    private modalDescription: HTMLElement;
    private modalEditBody: HTMLElement;

    constructor() {
        this.modal = document.querySelector('#exampleModalLong');
        this.modalDescription = document.querySelector('#modalDescription');
        this.modalEditBody = document.querySelector('.modal-edit');
    }

    updateRecipeView = (id: number, currentRecipe: any) : void => {
        const editButton = document.querySelector('.edit-recipe');
        editButton.removeEventListener('click', () => this.updateRecipeView(id, currentRecipe));
        const updateRecipe = new UpdateRecipe();
        const saveButton = document.querySelector('.save-recipe');
        document.querySelector('.edit-recipe').classList.add('hidden');
        saveButton.classList.remove('hidden');
        fromEvent(saveButton, 'click').subscribe(() => updateRecipe.saveRecipe(id));

        const modalEditBody = document.querySelector('.modal-edit');
        modalEditBody.classList.remove('hidden');
        const nameInput : HTMLInputElement = document.querySelector('.recipe-name-edit');
        const descriptionInput : HTMLInputElement = document.querySelector('.recipe-description-edit');
        nameInput.value = currentRecipe.name;
        descriptionInput.value = currentRecipe.description;
        this.modalDescription.style.display = "none";
    };


    closeModal = () : void => {
        const modalBackDrop: HTMLElement = document.querySelector('.modal-backdrop');
        this.modalDescription.style.display = "block";
        this.modalEditBody.classList.add('hidden');
        document.querySelector('.save-recipe').classList.add('hidden');
        document.querySelector('.edit-recipe').classList.remove('hidden');
        this.modal.classList.remove('show');
        this.modal.style.display = 'none';
        document.body.removeChild(modalBackDrop);
        document.body.classList.remove('modal-open');
    }
}

export default Helper;
