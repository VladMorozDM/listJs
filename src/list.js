"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListComponent {
    constructor(htmlElement, template, items) {
        this.htmlElement = htmlElement;
        this.template = template;
        this.state = { items };
        this.render();
    }
    add(itemText) {
        this.state = Object.assign(Object.assign({}, this.state), { items: [...this.state.items, this.createItem(itemText, this.state.items.length)] });
        this.render();
    }
    createItem(itemText, itemIndex) {
        const itemPosition = itemIndex + 1;
        return { text: itemText, isRed: itemPosition % 3 === 0 && itemPosition !== 0 };
    }
    render() {
        this.htmlElement.innerHTML = this.template(this.state);
    }
}
const root = document.getElementById('root');
const listTemplate = ({ items }) => items.map(({ isRed, text }) => `<li class="list-item ${isRed ? 'red' : 'black'}">${text}</li>`).join('');
const listItems = Array.from({ length: 9 }, (_, i) => ({ text: String(i + 1), isRed: (i + 1) % 3 === 0 && i !== 0 }));
const list = new ListComponent(root, listTemplate, listItems);
const button = document.getElementById('btn');
const input = document.getElementById('input');
const onAdd = () => {
    const value = input.value.trim();
    if (value) {
        list.add(value);
        input.value = '';
    }
    input.focus();
};
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        button.click();
        event.preventDefault();
    }
    return event;
});
button.addEventListener('click', onAdd);
//# sourceMappingURL=list.js.map