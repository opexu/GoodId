type IObjectIterable = { [key:string]:string }

interface ICollectionParams {
    name: string;
    description: string;
    attributes: IObjectIterable;
}

interface ICollectionItem {
    id: number;
    name: string;
    description: string;
    properties: IObjectIterable;
    contractAddress: string;
}

interface ITokenItem {
    id: number;
    tokenId: string;
    name: string;
    description: string;
}

interface IOrderItem {
    id: number;
    orderId: string;
    tokenId: string;
    name: string;
    description: string;
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

interface IOrderDto {
    tokenId: string;
    orderId: string;
    contractAddress: string;
    buyerAddress: string;
    ownerAddress: string;
    status: string;
}

export type {
    IObjectIterable,
    ICollectionParams,
    ICollectionItem,
    ITokenItem,
    IOrderItem,
    IField,
    ICollectionDto,
    ITokenDto,
    IOrderDto,
}