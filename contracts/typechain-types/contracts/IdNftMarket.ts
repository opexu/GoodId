/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export declare namespace IdNftMarket {
  export type SaleOrderParamsStruct = {
    nftAddress: string;
    tokenId: BigNumberish;
    price: BigNumberish;
    buyer: string;
    endTime: BigNumberish;
  };

  export type SaleOrderParamsStructOutput = [
    string,
    BigNumber,
    BigNumber,
    string,
    BigNumber
  ] & {
    nftAddress: string;
    tokenId: BigNumber;
    price: BigNumber;
    buyer: string;
    endTime: BigNumber;
  };
}

export interface IdNftMarketInterface extends utils.Interface {
  functions: {
    "buy(uint256)": FunctionFragment;
    "cancelSaleOrder(uint256)": FunctionFragment;
    "createSaleOrder((address,uint256,uint256,address,uint256))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "buy" | "cancelSaleOrder" | "createSaleOrder"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "buy", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "cancelSaleOrder",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createSaleOrder",
    values: [IdNftMarket.SaleOrderParamsStruct]
  ): string;

  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelSaleOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createSaleOrder",
    data: BytesLike
  ): Result;

  events: {
    "BoughtItem(address,uint256,uint256,address,address)": EventFragment;
    "CanceledSaleOrder(uint256,address,uint256,uint256,address,address)": EventFragment;
    "CreatedSaleOrder(uint256,address,uint256,uint256,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BoughtItem"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CanceledSaleOrder"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreatedSaleOrder"): EventFragment;
}

export interface BoughtItemEventObject {
  nftAddress: string;
  tokenId: BigNumber;
  price: BigNumber;
  buyer: string;
  seller: string;
}
export type BoughtItemEvent = TypedEvent<
  [string, BigNumber, BigNumber, string, string],
  BoughtItemEventObject
>;

export type BoughtItemEventFilter = TypedEventFilter<BoughtItemEvent>;

export interface CanceledSaleOrderEventObject {
  id: BigNumber;
  nftAddress: string;
  tokenId: BigNumber;
  price: BigNumber;
  buyer: string;
  seller: string;
}
export type CanceledSaleOrderEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber, string, string],
  CanceledSaleOrderEventObject
>;

export type CanceledSaleOrderEventFilter =
  TypedEventFilter<CanceledSaleOrderEvent>;

export interface CreatedSaleOrderEventObject {
  id: BigNumber;
  nftAddress: string;
  tokenId: BigNumber;
  price: BigNumber;
  buyer: string;
  seller: string;
  endTime: BigNumber;
}
export type CreatedSaleOrderEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber, string, string, BigNumber],
  CreatedSaleOrderEventObject
>;

export type CreatedSaleOrderEventFilter =
  TypedEventFilter<CreatedSaleOrderEvent>;

export interface IdNftMarket extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IdNftMarketInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    buy(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    cancelSaleOrder(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    createSaleOrder(
      params: IdNftMarket.SaleOrderParamsStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  buy(
    orderId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  cancelSaleOrder(
    orderId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  createSaleOrder(
    params: IdNftMarket.SaleOrderParamsStruct,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    buy(orderId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    cancelSaleOrder(
      orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createSaleOrder(
      params: IdNftMarket.SaleOrderParamsStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "BoughtItem(address,uint256,uint256,address,address)"(
      nftAddress?: null,
      tokenId?: null,
      price?: null,
      buyer?: null,
      seller?: null
    ): BoughtItemEventFilter;
    BoughtItem(
      nftAddress?: null,
      tokenId?: null,
      price?: null,
      buyer?: null,
      seller?: null
    ): BoughtItemEventFilter;

    "CanceledSaleOrder(uint256,address,uint256,uint256,address,address)"(
      id?: null,
      nftAddress?: null,
      tokenId?: null,
      price?: null,
      buyer?: null,
      seller?: null
    ): CanceledSaleOrderEventFilter;
    CanceledSaleOrder(
      id?: null,
      nftAddress?: null,
      tokenId?: null,
      price?: null,
      buyer?: null,
      seller?: null
    ): CanceledSaleOrderEventFilter;

    "CreatedSaleOrder(uint256,address,uint256,uint256,address,address,uint256)"(
      id?: null,
      nftAddress?: null,
      tokenId?: null,
      price?: null,
      buyer?: null,
      seller?: null,
      endTime?: null
    ): CreatedSaleOrderEventFilter;
    CreatedSaleOrder(
      id?: null,
      nftAddress?: null,
      tokenId?: null,
      price?: null,
      buyer?: null,
      seller?: null,
      endTime?: null
    ): CreatedSaleOrderEventFilter;
  };

  estimateGas: {
    buy(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    cancelSaleOrder(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    createSaleOrder(
      params: IdNftMarket.SaleOrderParamsStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    buy(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    cancelSaleOrder(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    createSaleOrder(
      params: IdNftMarket.SaleOrderParamsStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
