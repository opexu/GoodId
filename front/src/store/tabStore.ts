import { defineStore } from "pinia";
import { ref } from "vue";
import { useProductionStore } from "./ProductionStore";
import { BuyState, SaleState, State, useState } from "./StateStore";
import { useMarketStore } from "./MarketStore";
import { MarketState } from "./MarketStore";

export enum Tab {
    Main, Consumer, Production, Info
}

export const useTabStore = defineStore('TabStore', () => {

    const activeTab = ref( Tab.Main )
    
    function setActiveTab( newTab: Tab ){
        activeTab.value = newTab;
        useProductionStore().set(0);
        useState().setState( State.OK );
        useState().setSaleState( SaleState.WAIT_COLLECTION );
        useState().setBuyState( BuyState.WAIT_ORDER );
        useMarketStore().SetState( MarketState.None );
    }

    return { activeTab, setActiveTab }
})