export interface FormField {
    name: string;
    label: string;
    type: string;
    value: any;
    validators?: string[];
}

export interface FormSchema {
    fields: FormField[];
}