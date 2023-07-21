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

interface ICollectionDto {
    name: string;
    ownerAddress: string;
    contractAddress?: string;
    description?: string;
    properties?: IObjectIterable;
}

interface ITokenDto {
    name: string;
    contractAddress: string;
    ownerAddress: string;
    tokenId?: number;
    description?: string;
    properties?: IObjectIterable;
}

export type {
    IObjectIterable,
    ICollectionParams,
    IField,
    ICollectionDto,
    ITokenDto,
}