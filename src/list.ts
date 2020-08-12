import { IItem, IListState, TemplateBuilder } from '../models/list';

class ListComponent {
    private state: IListState;
    private htmlElement: HTMLElement;
    private template: TemplateBuilder;

    constructor(htmlElement: HTMLElement, template: TemplateBuilder, items?: IItem[]) {
        this.htmlElement = htmlElement;
        this.template = template;
        this.state = {items};
        this.render();
    }

    public add(itemText: string): void {
        this.state = {
            ...this.state,
            items: [...this.state.items, this.createItem(itemText, this.state.items.length)]};
        this.render();
    }

    private createItem(itemText: string, itemIndex: number): IItem {
        const itemPosition = itemIndex + 1;
        return {text: itemText, isRed: itemPosition % 3 === 0 && itemPosition !== 0};
    }

    private render(): void {
        this.htmlElement.innerHTML = this.template(this.state);
    }
}

const root = document.getElementById('root');
const listTemplate: TemplateBuilder = ({items}: IListState) =>
    items.map(({isRed, text}: IItem) => `<li class="list-item ${isRed ? 'red' : 'black'}">${text}</li>`).join('');
const listItems: IItem[] = Array.from(
    {length: 9},
    (_, i) => ({text: String(i + 1), isRed: (i + 1) % 3 === 0 && i !== 0})
);

const list = new ListComponent(root, listTemplate, listItems);

const button = document.getElementById('btn');
const input = document.getElementById('input') as HTMLInputElement;
const onAdd = () => {
    const value = input.value.trim();

    if (value) {
        list.add(value);
        input.value = '';
    }

    input.focus();
};

input.addEventListener('keypress', (event): KeyboardEvent => {
    if (event.key === 'Enter') {
        button.click();
        event.preventDefault();
    }

    return event;
});
button.addEventListener('click', onAdd);

