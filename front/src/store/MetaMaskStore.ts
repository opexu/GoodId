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
        console.log('params', params)
        const factory = IdNftFactory__factory.connect( ID_NFT_FACTORY, siberium.value );
        console.log('siberium.value', siberium.value)
        const signer = await siberium.getSigner();
        console.log('signer', signer)
        try{
            const txHash = await factory.connect( signer ).createIdNftCollection(
                params.name,
                params.description,
                JSON.stringify( params.attributes )
            )
            console.log('txHash: ', txHash)
        }catch(e){
            console.error('ERROR', e)
        }
        
    }

    return { init, IsAvailable, siberium, connect, onApplyCollection }
})