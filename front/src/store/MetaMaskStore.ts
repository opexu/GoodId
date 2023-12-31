import { defineStore } from "pinia";
import { MetaMaskSDK } from '@metamask/sdk';
import { computed, ref } from "vue";
import type { ICollectionDto, ICollectionParams, IOrderDto, ITokenDto } from "@/components/interfaces/common";
import { BigNumber, ethers } from 'ethers'
import { type IdNft, IdNft__factory, type IdNftFactory, IdNftFactory__factory, type IdNftMarket, IdNftMarket__factory, ERC20__factory } from '@/typechain-types';
import { API } from "@/back_api/API";

const ID_NFT_FACTORY = '0x6542AF3782Bc1c92Fb5611087ABE3fF169872Dff';
const ID_NFT_MARKET = '0x4e2177e1dC5F49F441aBff77880c0247279d2c1a';
const ID_PAYABLE_TOKEN = '0x0790c2d13FdC6F453627C39a46F819720D8D856E';

export const useMetaMask = defineStore('MetaMaskStore', () => {

    const MMSDK = new MetaMaskSDK({
        injectProvider: true,
        forceRestartWalletConnect: true,
        enableDebug: true,
    });

    let siberium: any = null;
    const accounts: any = ref();
    // const siberium = MMSDK.getProvider();
    // siberium.request({ method: 'eth_requestAccounts', params: [] });


    async function init(){
        if( window.ethereum === undefined ){
            siberium = undefined;
            return;
        }
        siberium = new ethers.providers.Web3Provider( window.ethereum, "any" );
        console.log('siberium', siberium)
        console.log(siberium.provider.isMetaMask)
        if( !siberium ){
            console.warn('Отсутствует провайдер')
        }
    }

    const IsAvailable = computed(()=>{
        return siberium.provider ? siberium.provider.isMetaMask : false;
    })

    const IsConnected = ref(false);
    async function connect(): Promise<boolean>{
        if( !siberium ) {
            console.warn('siberium undefined')
            IsConnected.value = false;
            return false;
        }

        accounts.value = await siberium.provider.request({
            method: 'eth_requestAccounts',
        })
        console.log('accounts: ', accounts.value)
        if( accounts && accounts.value.length > 0 ){
            IsConnected.value = true;
            return true;
        }else{
            console.warn('Ошибка получения адресов')
            IsConnected.value = false;
            return false;
        }
    }

    const contractAddress = ref('');
    function SetContractAddress( address: string ){
        contractAddress.value = address;
    }

    async function onApplyCollection( params: ICollectionParams ){
        // TODO database save
        console.log('params', params)
        console.log('siberium', siberium)
        const signer = await siberium.getSigner();
        console.log('signer', signer)
        const factory = IdNftFactory__factory.connect( ID_NFT_FACTORY, signer );

        try{
            const txHash = await factory.connect( signer ).createIdNftCollection(
                params.name,
                params.description,
                'ссылка_на_объект_пропертиес'
            )
            console.log('txHash: ', txHash)
            const receipt = await txHash.wait();
            console.log('receipt: ', receipt)
            SetContractAddress( receipt.events[0].address.toLowerCase() );
            console.log('contractAddress', contractAddress.value)

            const nft = IdNft__factory.connect( contractAddress.value, signer )
            console.log('nft: ', nft)
            const txMint = await nft.connect( signer ).safeMint(
                accounts.value[0],
                'ссылка_на_объект_пропертиес',
            )
            console.log('txMint', txMint)
            const nftReceipt = await txMint.wait();
            console.log('nftReceipt', nftReceipt)
            const properties = await nft.connect( signer ).tokenURI( nftReceipt.events[0].args.tokenId )
            console.log('properties', properties)
            // useProductionStore().next();
        }catch(e){
            console.error('ERROR', e)
        }
        
    }

    const contractUri = ref('');
    async function onCreateCollection( params: ICollectionParams ): Promise<void> {

        const collectionDto: ICollectionDto = {
            name: params.name,
            ownerAddress: accounts.value[0]
        }
        if( params.description ) collectionDto.description = params.description;
        if( params.attributes ) collectionDto.properties = params.attributes;

        try{
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const response: any = await fetch( API.COLLECTION, {
                method: 'POST',
                body: JSON.stringify( collectionDto ),
                headers: headers
            })
            const collectionEntity = await response.json();
            console.log('collectionEntity', collectionEntity)
            contractUri.value = API.COLLECTION + '/properties' + '/?id=' + collectionEntity.id;

            const signer = await siberium.getSigner();
            const factory = IdNftFactory__factory.connect( ID_NFT_FACTORY, signer );
            const txHash = await factory.connect( signer ).createIdNftCollection(
                params.name,
                params.description,
                contractUri.value
            )
            console.log('txHash: ', txHash)
            const receipt = await txHash.wait();
            if( receipt.events === undefined || receipt.events.length === 0 ) throw new Error('Ошибка в Receipt');
            SetContractAddress( receipt.events[0].address.toLowerCase() )
            collectionEntity.contractAddress = contractAddress.value;
            const response2: any = await fetch( API.COLLECTION, {
                method: 'POST',
                body: JSON.stringify( collectionEntity ),
                headers: headers
            })
            const updateCollectionEntity = await response2.json();
            console.log('updateCollectionEntity', updateCollectionEntity)
            
            
            // TODO удалить из базы
        }catch(e){
            console.log('error', e)
            throw null;
        }
    }

    const tokenUri = ref('');
    async function onCreateToken( params: ICollectionParams ){
        console.log('params', params)
        const tokenDto: ITokenDto = {
            name: params.name,
            contractAddress: contractAddress.value,
            ownerAddress: accounts.value[0]
        }

        if( params.description ) tokenDto.description = params.description;
        if( params.attributes ) tokenDto.properties = params.attributes;

        try{
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const response: any = await fetch( API.TOKEN, {
                method: 'POST',
                body: JSON.stringify( tokenDto ),
                headers: headers,
            })
            const tokenEntity = await response.json();
            console.log('tokenEntity: ', tokenEntity);
            tokenUri.value = API.TOKEN + '/properties' + '/?id=' + tokenEntity.id;

            const signer = await siberium.getSigner();
            const nft = IdNft__factory.connect( contractAddress.value, signer )
            const txMint = await nft.connect( signer ).safeMint(
                accounts.value[0],
                tokenUri.value,
            )
            const nftReceipt = await txMint.wait();
            console.log('nftReceipt', nftReceipt);
            if( nftReceipt.events === undefined || nftReceipt.events.length === 0 ) throw new Error('Ошибка в Receipt');
            const properties = await nft.connect( signer ).tokenURI( nftReceipt.events[0].args.tokenId )
            console.log('properties', properties)
            tokenEntity.tokenId = nftReceipt.events[0].args.tokenId.toString();
            const response2: any = await fetch( API.TOKEN, {
                method: 'POST',
                body: JSON.stringify( tokenEntity ),
                headers: headers
            })
            const updateTokenEntity = await response2.json();
            console.log('updateTokenEntity', updateTokenEntity)
        }catch(e){
            console.log('error', e)
            throw null;
        }
        
    }

    const tokenId = ref(-1);
    function SetTokenId( id: number ){
        tokenId.value = id;
    }

    const orderId = ref('');
    async function onCreateSaleOrder( buyerAddress: string, price: number ){
        try{
            const signer = await siberium.getSigner();
            const market = IdNftMarket__factory.connect( ID_NFT_MARKET, signer );
            const token = ERC20__factory.connect( ID_PAYABLE_TOKEN, signer );

            // количество комиссии, за выставление продажного ордера
            const opts = { value: ethers.utils.parseEther( '0.1' ) }
            
            const nft = IdNft__factory.connect( contractAddress.value, signer )
            await nft.connect( signer ).approve( market.address, tokenId.value )
            await token.connect( signer ).approve( market.address, ethers.utils.parseEther(( ( price + 0.1 ) * 2 ).toString()) )

            const tx = await market.connect( signer ).createSaleOrder(
            {
                nftAddress: contractAddress.value,
                tokenId: tokenId.value,
                price: ethers.utils.parseEther( price.toString() ),
                buyer: buyerAddress.toLowerCase(),
            }, opts );
            console.log('tx: ', tx)
            const orderReceipt = await tx.wait();
            console.log('orderReceipt', orderReceipt)
            if( orderReceipt.events === undefined || orderReceipt.events.length === 0 ) throw new Error('Ошибка в Receipt');
            const events = orderReceipt.events.filter( e => e.event === 'CreatedSaleOrder' );
            if( events.length === 0 ) throw new Error('Ошибка в Events');
            if( events[0].args === undefined ) throw new Error('Ошибка в args');
            orderId.value = events[0].args.id.toString()
            console.log('orderId.value', orderId.value)
            const orderDto: IOrderDto = {
                tokenId: tokenId.value.toString(),
                orderId: orderId.value,
                contractAddress: contractAddress.value,
                ownerAddress: accounts.value[0],
                buyerAddress: buyerAddress.toLowerCase(),
                status: "ACTIVE_ORDER"
            }

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const response: any = await fetch( API.ORDER, {
                method: 'POST',
                body: JSON.stringify( orderDto ),
                headers: headers,
            })
            const orderEntity = await response.json();
            console.log('orderEntity', orderEntity)

            const response2: any = await fetch( API.TOKEN + '/one' + '?owner=' + accounts.value[0] + '&contract=' + contractAddress.value + '&tokenId=' + tokenId.value, {
                method: 'GET'
            });
            const tokenEntity = await response2.json();
            tokenEntity.ownerAddress = ID_NFT_MARKET;
            const response3: any = await fetch( API.TOKEN, {
                method: 'POST',
                body: JSON.stringify( tokenEntity ),
                headers: headers
            })
            const updateTokenEntity = await response3.json();
            console.log('updateTokenEntity', updateTokenEntity)
        }catch(e){
            console.log('error', e)
            throw null;
        }
    }

    async function onConfirmSale( orderId: number ) {
        console.log('orderId', orderId)
        console.log('typeof orderId', typeof orderId)
        try{
            const signer = await siberium.getSigner();
            const market = IdNftMarket__factory.connect( ID_NFT_MARKET, signer );
            const token = ERC20__factory.connect( ID_PAYABLE_TOKEN, signer );

            const price = await market.connect( signer ).getOrderPrice( BigNumber.from( orderId ))
            console.log('price', price)
            await token.connect( signer ).approve( market.address, price.mul( 2 ) )
            console.log('token approve ok')
            // количество комиссии, за выставление продажного ордера
            const opts = { value: price }
            const tx = await market.connect( signer ).buy( BigNumber.from( orderId ), opts )
            console.log('tx: ', tx)
            const buyReceipt = await tx.wait();
            console.log('buyReceipt', buyReceipt)
            if( buyReceipt.events === undefined || buyReceipt.events.length === 0 ) throw new Error('Ошибка в Receipt');
            const events = buyReceipt.events.filter( e => e.event === 'BoughtItem' );
            if( events.length === 0 ) throw new Error('Ошибка в Events');
            if( events[0].args === undefined ) throw new Error('Ошибка в args');
            console.log('Поздравляем с успешной покупкой!!!')

            const response2: any = await fetch( API.TOKEN + '/one' + '?owner=' + ID_NFT_MARKET + '&contract=' + contractAddress.value + '&tokenId=' + tokenId.value, {
                method: 'GET'
            });
            const tokenEntity = await response2.json();
            console.log('tokenEntity', tokenEntity)
            tokenEntity.ownerAddress = accounts.value[0];
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const response3: any = await fetch( API.TOKEN, {
                method: 'POST',
                body: JSON.stringify( tokenEntity ),
                headers: headers
            })
            const updateTokenEntity = await response3.json();
            console.log('updateTokenEntity', updateTokenEntity)

            const response4: any = await fetch( API.ORDER + '/one' + '?buyer=' + accounts.value[0] + '&orderId=' + orderId )
            const orderEntity = await response4.json();
            orderEntity.status = "INACTIVE_ORDER";
            const response5: any = await fetch( API.ORDER, {
                method: 'POST',
                body: JSON.stringify( orderEntity ),
                headers: headers
            })
            const updateOrderEntity = await response5.json();
            console.log('updateOrderEntity', updateOrderEntity)
        }catch(e){
            console.log('error', e)
            throw null;
        }
    }

    return { 
        init, 
        IsAvailable, 
        IsConnected,
        siberium, 
        accounts,
        contractAddress,
        contractUri,
        tokenUri,
        orderId,
        connect, 
        onApplyCollection, 
        SetContractAddress,
        onCreateCollection,
        SetTokenId,
        onCreateToken,
        onCreateSaleOrder,
        onConfirmSale
    }
})