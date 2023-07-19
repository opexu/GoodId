import { defineStore } from "pinia";
import { MetaMaskSDK } from '@metamask/sdk';
import detectEthereumProvider from '@metamask/detect-provider';
import { computed } from "vue";
import { useProductionStore } from "./ProductionStore";
import type { ICollectionParams } from "@/components/interfaces/common";
import { BigNumber, ethers } from 'ethers'
import { type IdNft, IdNft__factory, type IdNftFactory, IdNftFactory__factory, type IdNftMarket, IdNftMarket__factory } from '../../typechain-types';

const ID_NFT_FACTORY = '0x6542AF3782Bc1c92Fb5611087ABE3fF169872Dff';
const ID_NFT_MARKET = '0x0686793372B0860690226664b9b4814CdDB916f2';

interface Window {
    ethereum: any;
}

export const useMetaMask = defineStore('MetaMaskStore', () => {

    const MMSDK = new MetaMaskSDK({
        injectProvider: true,
        forceRestartWalletConnect: true,
        enableDebug: true,
    });

    let siberium: any = null;
    let accounts: any = null;
    // const siberium = MMSDK.getProvider();
    // siberium.request({ method: 'eth_requestAccounts', params: [] });


    async function init(){
        siberium = new ethers.providers.Web3Provider(window.ethereum, "any");
        console.log('siberium', siberium)
        console.log(siberium.provider.isMetaMask)
        if( !siberium ){
            console.warn('Отсутствует провайдер')
        }
        // siberium = await detectEthereumProvider();
        // if ( siberium ) {
        //     // const newAccounts = await siberium.request({
        //     //     method: 'eth_accounts',
        //     // })
        //     // if( newAccounts.length > 0 ){
        //     //     accounts = newAccounts;
        //     // }else{
        //     //     console.warn('user disconnected')
        //     // }
        //     console.log('siberium: ', siberium)
        // }else{
        //     console.log('Please install MetaMask!');
        // }
    }

    const IsAvailable = computed(()=>{
        return siberium.provider ? siberium.provider.isMetaMask : false;
    })

    async function connect(){
        if( !siberium ) {
            console.warn('siberium undefined')
            return;
        }

        accounts = await siberium.provider.request({
            method: 'eth_requestAccounts',
        })
        console.log('accounts: ', accounts)
        if( accounts && accounts.length > 0 ){
            useProductionStore().next();
        }else{
            console.warn('Ошибка получения адресов')
        }
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
            const collectionAddress = receipt.events[0].address;
            console.log('collectionAddress', collectionAddress)

            const nft = IdNft__factory.connect( collectionAddress, signer )
            console.log('nft: ', nft)
            const txMint = await nft.connect( signer ).safeMint(
                accounts[0],
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

    return { init, IsAvailable, siberium, connect, onApplyCollection }
})