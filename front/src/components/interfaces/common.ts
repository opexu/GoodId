type IObjectIterable = { [key:string]:string }

interface ICollectionParams {
    name: string;
    description: string;
    attributes: IObjectIterable;
}


interface IField {
    id: number;
    key: string;
    value: string;
    error: boolean;
}

export type {
    IObjectIterable,
    ICollectionParams,
    IField
}