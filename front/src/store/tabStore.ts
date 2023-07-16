import { defineStore } from "pinia";
import { ref } from "vue";

export enum Tab {
    Info, Consumer, Production
}

export const useTabStore = defineStore('TabStore', () => {

    const activeTab = ref( Tab.Info )
    
    function setActiveTab( newTab: Tab ){
        if( activeTab.value === newTab ) return;
        activeTab.value = newTab;
    }

    return { activeTab, setActiveTab }
})