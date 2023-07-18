import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductionStore = defineStore('ProductionStore', () => {

    const step = ref( 0 )

    function next( value?: number ){
        if( value === 0 || value === undefined ){
            step.value += 1;
        }else{
            step.value += value;
        }
    }

    function set( value: number ){
        step.value = value;
    }

    return { step, next, set }
})