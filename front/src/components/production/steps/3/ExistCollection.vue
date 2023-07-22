<template>
<div class="w-full h-fit rounded-3xl px-10 py-10 flex flex-col bg-white space-y-4">
    <div class="w-fit h-fit flex flex-row justify-start items-center space-x-8">
        <Third/>
        <p class="w-full h-fit text-[2rem] font-bold">Выбор коллекции</p>
    </div>
    <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Выберите одну коллекцию из списка</p>
    <CollectionItem
    v-for="(collection) in existCollectionArr.slice().reverse()" :key="collection.id"
    @exist-collection-click="selectCollection( collection.id )"
    :id="collection.id"
    :name="collection.name"
    :description="collection.description"
    />
</div>
</template>

<script setup lang="ts">
import CollectionItem from '@/components/production/steps/3/CollectionItem.vue';
import Third from '@/components/misc/Third.vue';
import { onMounted, ref } from 'vue';
import { useMetaMask } from '@/store/MetaMaskStore';
import { API } from '@/back_api/API';
import type { ICollectionItem } from '@/components/interfaces/common';

const emit = defineEmits([ 'collection-selected' ])
const existCollectionArr = ref<ICollectionItem[]>([]);
onMounted(async () => {
    try{
        const res = await fetch( API.COLLECTION + '?owner=' + MetaMaskStore.accounts[0] )
        const result = await res.json();
        console.log('result:', result)
        existCollectionArr.value = result
    }catch(e){
        console.warn('Ошибка получения списка доступных коллекций', e)
    }
    
})

const MetaMaskStore = useMetaMask();

function selectCollection( id: number ){
    const collection = existCollectionArr.value.find( col => col.id === id )
    if( collection === undefined ) {
        console.warn('коллекция не найдена');
        return;
    }
    console.log('collection:', collection )
    MetaMaskStore.SetContractAddress( collection.contractAddress );
    emit('collection-selected', collection)
}
</script>