import { defineStore } from "pinia"
import { ref } from "vue"

export enum State {
    OK, ERROR, WAIT
}

export const useState = defineStore('StateStore', () => {

    const state = ref( State.OK )

    function setState( newState: State ){
        if( state.value === newState ) return;
        state.value = newState;
    }
    return { state, setState }
})