import { BigNumber, BytesLike, ethers } from 'ethers'
import { IdNft, IdNft__factory, IdNftFactory, IdNftFactory__factory, IdNftMarket, IdNftMarket__factory } from '../typechain-types';

const PRIORITY_FEE = ethers.utils.parseUnits('5', 'gwei')

class BlockchainInstance {

	public idNftMarket: IdNftMarket

	public idNftFactory: IdNftFactory

	private idNft: IdNft

	private static instance: BlockchainInstance

	private constructor(
		idNftMarket: IdNftMarket,
		idNftFactory: IdNftFactory
	) {
		this.idNftFactory = idNftFactory
		this.idNftMarket = idNftMarket
	}
	static async getInstance(): Promise<BlockchainInstance> {
		try {
			if (BlockchainInstance.instance) {
				return BlockchainInstance.instance
			}

			const signer = await this.getSigner()
			const factory = IdNftFactory__factory.connect('factory address', signer!)
			const market = IdNftMarket__factory.connect('market address', signer!)

			BlockchainInstance.instance = new BlockchainInstance(
                market,
				factory
			)

			return BlockchainInstance.instance
		} catch (error: any) {
			throw new Error(error?.message)
		}
	}

	async getidNft(address: string): Promise<IdNft> {
		try {
			const signer = await BlockchainInstance.getSigner()
			const idNftContract = IdNft__factory.connect(address, signer!)

			return idNftContract
		} catch (error: any) {
			throw new Error(error?.message)
		}
	}
	static async getSigner() {
		try {
			const provider = await this.getProvider()
			return provider?.getSigner()
		} catch (error: any) {
			throw new Error(error?.message)
		}
	}

	static async getProvider() {
		try {
			const accounts = await window?.ethereum?.request({ method: 'eth_requestAccounts' })
			if (accounts) {
				const provider = new ethers.providers.Web3Provider(
					window.ethereum as ethers.providers.ExternalProvider,
				)

				return provider
			}

			return null
		} catch (error: any) {
			throw new Error(error?.message)
		}
	}

	async createSaleOrder(
		address: string,
		tokenId: number,
		buyer: `0x${string}` | undefined,
		orderPrice: string,
		TransactionStep?: any,
	) {
		try {
			if (!buyer) throw new Error('No offerer address')
			await this.approveToken(buyer, orderPrice)

			const price = ethers.utils.parseEther(orderPrice)
			const receipt = await this.idNftMarket.createSaleOrder( {
                nftAddress: address,
                tokenId: tokenId,
                price: price,
                buyer: buyer,
                endTime: 0
              })

			TransactionStep.hasStarted('process')

			return await receipt.wait(2)
		} catch (error: any) {
			console.log('Blockchain error: ', error)
			throw new Error(error.message)
		}
	}

	async approveToken(
		userAddress?: `0x${string}` | string,
		amount?: string | number,
	): Promise<ethers.ContractReceipt | {}> {
		if (!userAddress || !amount) throw new Error('No address or Amount or userBalance')

		try {
			const balance = await this.token.balanceOf(userAddress)
			const amountToWei = ethers.utils.parseUnits(amount.toString(), 'ether')
			const allowance = await this.getAllowance(userAddress)

			if (amountToWei.gt(balance)) {
				throw new Error('The amount exceeds the current balance')
			}

			if (allowance.gt(amountToWei)) return {}

			const res = await this.token.approve(this.idNftMarket.address, amountToWei)

			return await res.wait(2)
		} catch (error: any) {
			throw new Error(error?.message)
		}
	}

	async checkUserBalance(userAddress?: `0x${string}` | string, amount?: string | number) {
		try {
			if (!userAddress || !amount) throw new Error('No amount or address')

			const balance = await this.token.balanceOf(userAddress)
			const amountToWei = ethers.utils.parseUnits(amount.toString(), 'ether')

			if (balance.gt(amountToWei)) return true

			return false
		} catch (error: any) {
			throw new Error(error?.message)
		}
	}

	async getAllowance(userAddress: `0x${string}` | string): Promise<BigNumber> {
		return this.token.allowance(userAddress, this.idNftMarket.address)
	}

	async countGasLimit(Conctract: idNft, address: string, propertiesArray: string[]) {
		let gasLimit: BigNumber
		if (propertiesArray.length > 1) {
			gasLimit = await Conctract.estimateGas.bulkMint(address!, propertiesArray)
		} else {
			gasLimit = await Conctract.estimateGas.safeMint(address!, propertiesArray[0])
		}

		return gasLimit.mul(12).div(10)
	}

	async countGasPrice() {
		try {
			const provider = await BlockchainInstance.getProvider()
			const block = await provider!.getBlock('latest')

			const baseFeePerGas = block.baseFeePerGas?.mul(125).div(100)
			const maxPriorityFeePerGas = this.FIVE_GWEI
			const maxFeePerGas = baseFeePerGas?.add(maxPriorityFeePerGas!).sub(1)

			const adjustedPriority = {
				maxFeePerGas,
				maxPriorityFeePerGas,
			}

			return adjustedPriority
		} catch (error: any) {
			throw new Error('Count of gas price are failed')
		}
	}

	async getTimestamp() {
		try {
			const block = await this.getCurrentBlock()

			if (block?.timestamp) {
				// Timestamp + 2 mins (timestamp + 120 sec)
				return new Date(block?.timestamp + 2 * 60000)
			}

			return Date.now() / 1000
		} catch (error: any) {
			throw new Error(error?.message)
		}
	}

	async getCurrentBlock() {
		try {
			const provider = await BlockchainInstance.getProvider()
			if (!provider) return null

			const blockNumber = await provider.getBlockNumber()

			return await provider.getBlock(blockNumber)
		} catch (error: any) {
			throw new Error(error?.message)
		}
	}

	async createCollection(
		image: File,
		cover: File,
		name: string,
		externalLink: string,
		description: string,
		royaltyFee: number,
		royaltyRecipient: string,
		TransactionStep?: any,
		setTxHash?: any,
	) {
		try {
			TransactionStep.uploadToIpfs('process')
			const { url: imageUrl } = await ipfsInstance.upload(image)
			const { url: coverUrl } = await ipfsInstance.upload(cover)

			const properties = {
				name,
				symbol: 'idNft',
				description,
				image: imageUrl,
				wallpaper: coverUrl,
				external_link: externalLink,
			}

			const { url: propertyUrl } = await ipfsInstance.upload(JSON.stringify(properties))

			TransactionStep.uploadToIpfs('success')

			const _royaltyFee = ethers.BigNumber.from(royaltyFee)
			const _royaltyRecipient = royaltyRecipient

			TransactionStep.sentToNetwork('process')
			const res = await this.idNftFactory.createNFTCollection(
				properties.name,
				properties.symbol,
				propertyUrl,
				_royaltyFee,
				_royaltyRecipient,
			)

			if (res.hash) {
				TransactionStep.hasStarted('process')

				setTxHash(res.hash)
			}

			const receipt = await res.wait(2)

			if (res.hash) {
				TransactionStep.finalStatus('success')
			}

			return receipt
		} catch (error: any) {
			TransactionStep.finalStatus('reject')
			TransactionStep.resetTransactionStepsStatus()

			throw new Error(error?.message)
		}
	}
}

export const blockchainInstance = BlockchainInstance.getInstance()