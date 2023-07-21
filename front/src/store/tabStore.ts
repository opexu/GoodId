import { defineStore } from "pinia";
import { ref } from "vue";

export enum Tab {
    Main, Consumer, Production, Info
}

export const useTabStore = defineStore('TabStore', () => {

    const activeTab = ref( Tab.Main )
    
    function setActiveTab( newTab: Tab ){
        if( activeTab.value === newTab ) return;
        activeTab.value = newTab;
    }

    return { activeTab, setActiveTab }
})