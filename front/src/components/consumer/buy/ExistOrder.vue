<template>
<div class="w-full h-fit rounded-3xl px-10 py-10 flex flex-col bg-white space-y-4">
    <div class="w-fit h-fit flex flex-row justify-start items-center space-x-8">
        <Four/>
        <p class="w-full h-fit text-[2rem] font-bold">Выбор продукта</p>
    </div>
    <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Выберите один продукт из списка</p>
    <CollectionItem
    v-for="(order) in existOrderArr.slice().reverse()" :key="order.id"
    @exist-collection-click="selectOrder( order.id )"
    :id="parseInt( order.orderId )"
    :name="'Продукт: '+order.name"
    :description="'Описание:'+order.description"
    />
</div>
</template>

<script setup lang="ts">
import CollectionItem from '@/components/production/steps/3/CollectionItem.vue';
import Four from '@/components/misc/Four.vue';
import { onMounted, ref } from 'vue';
import { useMetaMask } from '@/store/MetaMaskStore';
import { API } from '@/back_api/API';
import type { IOrderItem } from '@/components/interfaces/common';
import { useMessageStore } from '@/store/MessageStore';
import { BuyState, State, useState } from '@/store/StateStore';

const existOrderArr = ref<IOrderItem[]>([]);
onMounted(async () => {
    try{
        const res = await fetch( API.ORDER + '/buyer' + '?buyer=' + MetaMaskStore.accounts[0] )
        const result = await res.json();
        console.log('result:', result)
        existOrderArr.value = result
    }catch(e){
        console.warn('Ошибка получения списка доступных коллекций', e)
    }
    
})

const MetaMaskStore = useMetaMask();

async function selectOrder( id: number ){
    const order = existOrderArr.value.find( order => order.id === id )
    if( order === undefined ) {
        console.warn('ордер не найден');
        return;
    }
    console.log('token:', order )
    
    useMessageStore().setMessage({ title: 'Продолжается процесс покупки товара', message: 'Не закрывайте страницу, дождитесь завершения транзакции'})
    try{
        useState().setState( State.WAIT );
        await MetaMaskStore.onConfirmSale( parseInt( order.orderId ));
        useState().setBuyState( BuyState.SUCCESSFULL );
        useState().setState( State.OK );
        useMessageStore().setMessage({ title: `Ордер на покупку '${MetaMaskStore.orderId}' успешно исполнен`, message: 'Теперь вы владеете товаром, информация записана в блокчейн' });

    }catch(e){
        useMessageStore().setMessage({ title: 'Ошибка подтверждения покупки', message: 'Обновите страницу и попробуйте еще раз'})
        useState().setState( State.ERROR );
    }
}
</script>