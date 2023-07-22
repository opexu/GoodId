<template>
<div class="w-full h-fit rounded-3xl px-10 py-10 flex flex-col bg-white space-y-4">
    <div class="w-fit h-fit flex flex-row justify-start items-center space-x-8">
        <Four/>
        <p class="w-full h-fit text-[2rem] font-bold">Выбор продукта</p>
    </div>
    <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Выберите один продукт из списка</p>
    <CollectionItem
    v-for="(token) in existTokenArr.slice().reverse()" :key="token.id"
    @exist-collection-click="selectToken( token.id )"
    :id="parseInt( token.tokenId )"
    :name="token.name"
    :description="token.description"
    />
</div>
</template>

<script setup lang="ts">
import CollectionItem from '@/components/production/steps/3/CollectionItem.vue';
import Four from '@/components/misc/Four.vue';
import { onMounted, ref } from 'vue';
import { useMetaMask } from '@/store/MetaMaskStore';
import { API } from '@/back_api/API';
import type { ITokenItem } from '@/components/interfaces/common';

const emit = defineEmits([ 'token-selected' ])
const existTokenArr = ref<ITokenItem[]>([]);
onMounted(async () => {
    try{
        const res = await fetch( API.TOKEN + '/contract' + '?owner=' + MetaMaskStore.accounts[0] + '&contract=' + MetaMaskStore.contractAddress )
        const result = await res.json();
        console.log('result:', result)
        existTokenArr.value = result
    }catch(e){
        console.warn('Ошибка получения списка доступных коллекций', e)
    }
    
})

const MetaMaskStore = useMetaMask();

function selectToken( id: number ){
    const token = existTokenArr.value.find( token => token.id === id )
    if( token === undefined ) {
        console.warn('токен не найден');
        return;
    }
    console.log('token:', token )
    MetaMaskStore.SetTokenId( parseInt( token.tokenId ));
    emit('token-selected', token)
}
</script>