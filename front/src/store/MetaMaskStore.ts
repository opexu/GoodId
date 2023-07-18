import { defineStore } from "pinia";
import { MetaMaskSDK } from '@metamask/sdk';
import detectEthereumProvider from '@metamask/detect-provider';
import { computed } from "vue";
import { useProductionStore } from "./ProductionStore";

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
        siberium = await detectEthereumProvider();
        if ( siberium ) {
            // const newAccounts = await siberium.request({
            //     method: 'eth_accounts',
            // })
            // if( newAccounts.length > 0 ){
            //     accounts = newAccounts;
            // }else{
            //     console.warn('user disconnected')
            // }
            console.log('siberium: ', siberium)
        }else{
            console.log('Please install MetaMask!');
        }
    }

    const IsAvailable = computed(()=>{
        return siberium && 'isMetaMask' in siberium ? siberium.isMetaMask : false;
    })

    async function connect(){
        if( !siberium ) {
            console.warn('siberium undefined')
            return;
        }

        accounts = await siberium.request({
            method: 'eth_requestAccounts',
        })
        console.log('accounts: ', accounts)
        if( accounts && accounts.length > 0 ){
            useProductionStore().next();
        }else{
            console.warn('Ошибка получения адресов')
        }
    }

    return { init, IsAvailable, siberium, connect }
})