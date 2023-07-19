import FormData from 'form-data'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const ipfsConfig = {
	gateway: process.env.IPFS_GATEWAY || 'https://ipfs.io/ipfs',
	authorization: 'Basic ' + Buffer.from(`${process.env.IPFS_PROJECT_ID || ''}:${process.env.IPFS_PROJECT_SECRET || ''}`).toString('base64'),
	apiEndpoint: process.env.IPFS_API || 'https://ipfs.infura.io:5001/api/v0/',
}

export class IpfsService {
	baseURL: string

	constructor() {
		this.baseURL = ipfsConfig.apiEndpoint
	}
	extractCIDFromURL(input: string) {
		if (input.startsWith('ipfs://')) {
			return input.replace('ipfs://', '')
		}
		return null
	}

	async add(file: Buffer, options: Record<string, string> = {}): Promise<string> {
		const formData = new FormData()
		formData.append('file', file, { contentType: options.type })
		const response = await fetch(`${this.baseURL}add`, {
			headers: {
				'Authorization': ipfsConfig.authorization,
				...formData.getHeaders()
			},
			method: 'POST',
			body: formData
		})
		const { Hash } = (await response.json()) as { Hash: string }
		return Hash
	}

	async get(hash: string): Promise<string> {
		const response = await fetch(`${this.baseURL}get?arg=${hash}`, {
			headers: {
				'Authorization': ipfsConfig.authorization,
			},
			method: 'POST',
		})
		return await response.text()
	}
}
