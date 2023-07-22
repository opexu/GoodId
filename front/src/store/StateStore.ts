import { defineStore } from "pinia"
import { ref } from "vue"

export enum State { OK, ERROR, WAIT }
export enum SaleState { WAIT_COLLECTION, WAIT_TOKEN, WAIT_ORDER, SUCCESSFULL }
export enum BuyState { WAIT_ORDER, SUCCESSFULL }

export const useState = defineStore('StateStore', () => {

    const state = ref( State.OK )

    function setState( newState: State ){
        if( state.value === newState ) return;
        state.value = newState;
    }

    const saleState = ref( SaleState.WAIT_COLLECTION )
    function setSaleState( newState: SaleState ){
        saleState.value = newState
    }

    const buyState = ref( BuyState.WAIT_ORDER )
    function setBuyState( newState: BuyState ){
        buyState.value = newState;
    }
    return { state, saleState, buyState, setState, setSaleState, setBuyState }
})