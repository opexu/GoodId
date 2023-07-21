import { defineStore } from "pinia";
import { ref } from "vue";

export enum MarketState { None, Buy, Sale }

export const useMarketStore = defineStore('MarketStore', () => {

    const state = ref( MarketState.None )

    function SetState( newState: MarketState ){
        if( state.value === newState ) return;
        state.value = newState;
    }

    return { state, SetState }
})