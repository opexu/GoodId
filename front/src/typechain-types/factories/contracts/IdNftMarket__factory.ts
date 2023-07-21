/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, type Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  IdNftMarket,
  IdNftMarketInterface,
} from "../../contracts/IdNftMarket";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "BoughtItem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "CanceledSaleOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "CreatedSaleOrder",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "cancelSaleOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "nftAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
        ],
        internalType: "struct idNftMarket.saleOrderParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createSaleOrder",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fixedPlatformFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526000805567016345785d8a000060015534801561002057600080fd5b506108ea806100306000396000f3fe60806040526004361061003f5760003560e01c80630f41988314610044578063b17c6ab814610069578063d96a094a1461008b578063f83916751461009e575b600080fd5b610057610052366004610803565b6100b4565b60405190815260200160405180910390f35b34801561007557600080fd5b5061008961008436600461081b565b6103b7565b005b61008961009936600461081b565b6105b2565b3480156100aa57600080fd5b5061005760015481565b600060015434146101025760405162461bcd60e51b8152602060048201526013602482015272706c6174666f726d2066656520697320302e3160681b60448201526064015b60405180910390fd5b6000610111602084018461084c565b6040516331a9108f60e11b81526020850135600482015290915033906001600160a01b03831690636352211e90602401602060405180830381865afa15801561015e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101829190610870565b6001600160a01b0316146101c85760405162461bcd60e51b815260206004820152600d60248201526c3737ba1037333a1037bbb732b960991b60448201526064016100f9565b6040516323b872dd60e01b8152336004820152306024820152602084013560448201526001600160a01b038216906323b872dd90606401600060405180830381600087803b15801561021957600080fd5b505af115801561022d573d6000803e3d6000fd5b50506000546040805160c0810190915281815290925090506020808201906102579087018761084c565b6001600160a01b03168152602001856020013581526020018560400135815260200185606001602081019061028c919061084c565b6001600160a01b0390811682523360209283015260008481526002808452604080832086518155948601516001860180549186166001600160a01b0319928316179055908601519185019190915560608501516003850155608085015160048501805491851691831691909117905560a090940151600590930180549390921692909316919091179055805490806103238361088d565b909155507f4d9a90d549f6156d5456cfaa47446d278a4c3831656f4255f9f03e6614e50bd8905081610358602087018761084c565b602087013560408801353361037360808b0160608c0161084c565b604080519687526001600160a01b0395861660208801528601939093526060850191909152821660808401521660a082015260c00160405180910390a19392505050565b600081815260026020818152604092839020835160c0810185528154815260018201546001600160a01b039081169382019390935292810154938301939093526003830154606083015260048301548116608083015260059092015490911660a0820181905233146104585760405162461bcd60e51b815260206004820152600a6024820152693737ba1039b2b63632b960b11b60448201526064016100f9565b60008281526002602081905260409182902060018101549101549151632142170760e11b8152306004820152336024820152604481018390526001600160a01b03909116919082906342842e0e90606401600060405180830381600087803b1580156104c357600080fd5b505af11580156104d7573d6000803e3d6000fd5b505050507f65cf1ab150a7a4ceec66d508472b4c73adc7abec952019b20512892f4b63c02e848460200151856040015186606001518760a001518860800151604051610559969594939291909586526001600160a01b03948516602087015260408601939093526060850191909152821660808401521660a082015260c00190565b60405180910390a1505050600090815260026020819052604082208281556001810180546001600160a01b0319908116909155918101839055600381019290925560048201805482169055600590910180549091169055565b600081815260026020818152604092839020835160c0810185528154815260018201546001600160a01b039081169382019390935292810154938301939093526003830154606083015260048301548116608083018190526005909301541660a08201529033146106575760405162461bcd60e51b815260206004820152600f60248201526e34b731b7b93932b1ba10313abcb2b960891b60448201526064016100f9565b348160600151106106985760405162461bcd60e51b815260206004820152600b60248201526a6c6f772062616c616e636560a81b60448201526064016100f9565b60208082015160408084015160a085015160008781526002958690528381208181556001810180546001600160a01b031990811690915596810182905560038101829055600481018054881690556005018054909616909555606086015192519394919390926001600160a01b0384169281156108fc029290818181858888f1935050505015801561072e573d6000803e3d6000fd5b50604051632142170760e11b8152306004820152336024820152604481018390526001600160a01b038416906342842e0e90606401600060405180830381600087803b15801561077d57600080fd5b505af1158015610791573d6000803e3d6000fd5b50505060608086015160a080880151604080516001600160a01b03808b168252602082018a90529181019490945233948401949094529290921660808201527f27630153b5dc007a7ed93cedf46932117c03b3f68431be642a18b1b76f5a814492500160405180910390a15050505050565b60006080828403121561081557600080fd5b50919050565b60006020828403121561082d57600080fd5b5035919050565b6001600160a01b038116811461084957600080fd5b50565b60006020828403121561085e57600080fd5b813561086981610834565b9392505050565b60006020828403121561088257600080fd5b815161086981610834565b6000600182016108ad57634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212208d5d201ea0cb12d229af7688380d448251cb2cc4c7217bad6ac88e54abb665a864736f6c63430008120033";

type IdNftMarketConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: IdNftMarketConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class IdNftMarket__factory extends ContractFactory {
  constructor(...args: IdNftMarketConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string }
  ): Promise<IdNftMarket> {
    return super.deploy(overrides || {}) as Promise<IdNftMarket>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): IdNftMarket {
    return super.attach(address) as IdNftMarket;
  }
  override connect(signer: Signer): IdNftMarket__factory {
    return super.connect(signer) as IdNftMarket__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IdNftMarketInterface {
    return new utils.Interface(_abi) as IdNftMarketInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IdNftMarket {
    return new Contract(address, _abi, signerOrProvider) as IdNftMarket;
  }
}