export interface IItem {
    isRed: boolean;
    text: string;
}

export interface ITemplateBindings {
}

export interface IListState extends ITemplateBindings {
    items: IItem[];
}

export type TemplateBuilder = (bindings: ITemplateBindings) => string;