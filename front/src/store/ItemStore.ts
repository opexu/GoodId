import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface IItem {
    name: string;
    description: string;
    attributes: IAttribute[];
}

export interface IAttribute {
    key: string;
    value: string;
}

export const useItemStore = defineStore('ItemStore', () => {

    const itemName = ref('');
    const itemDescription = ref('');

    const itemAttributes = ref<IAttribute[]>([])

    const GetItem = computed(() => {
        return {
            name: itemName.value,
            description: itemDescription.value,
            attributes: itemAttributes.value
        } as IItem
    })
    
    function addAttribute( key: string, value: string ): boolean {
        const index = itemAttributes.value.findIndex( ia => ia.key === key );
        if( index !== -1 ) return false;
        itemAttributes.value.push({ key, value });
        return true;
    }

    function removeAttribute( key: string ): boolean {
        const index = itemAttributes.value.findIndex( ia => ia.key === key );
        if( index === -1 ) return false;
        itemAttributes.value.splice( index, 1 );
        return true;
    }

    function dispose(){
        itemName.value = '';
        itemDescription.value = '';
        itemAttributes.value = [];
    }

    return { itemName, itemDescription, itemAttributes, GetItem, addAttribute, removeAttribute, dispose }
})