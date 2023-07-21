<template>
<div class="w-full h-fit rounded-3xl px-10 py-10 flex flex-col bg-white space-y-4">
    <div class="w-fit h-fit flex flex-row justify-start items-center space-x-8">
            <Third/>
            <p class="w-full h-fit text-[2rem] font-bold">Подтверждение покупки</p>
        </div>
        <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Для подтверждения покупки продукта введите номер заявки
            <br>Номер заявки необходимо получить у <b>продавца</b>
            <br>После подтверждения транзакции на экране появится купленный токен продукта
            <br>Информацию о товаре, записанную в токене возможно получить на странице информации в обозревателе.
        </p>
        <div class="w-full h-fit flex flex-col justify-start items-center space-y-4">
        
        <div class="w-full h-fit flex flex-col justify-center items-start space-y-2">
            <label for="item-name" class="font-bold">Номер заявки на покупку</label>
            <input id="item-name" type="number" class="w-full h-fit p-4 border rounded-md focus:bg-blue-50"
            placeholder="2567"
            v-model="orderId"
            />
        </div>

        <button class="w-full h-fit mt-4 px-6 py-4 border rounded-md [&:not([disabled])]hover:border-orange-700 [&:not([disabled])]hover:text-orange-700 disabled:border-slate-300 disabled:text-slate-300"
        @click="onConfirmSale"
        :disabled="IsDisabled"
        >Подтвердить покупку</button>
    </div>
</div>
</template>

<script setup lang="ts">
import { useMetaMask } from '@/store/MetaMaskStore';
import { computed, ref } from 'vue';
import Third from '@/components/misc/Third.vue';
import { State, useState } from '@/store/StateStore';
import { useMessageStore } from '@/store/MessageStore';

const MetaMaskStore = useMetaMask();

const orderId = ref();

const IsDisabled = computed(()=>{
    if( !isNaN( orderId.value ) && orderId.value >= 0 ) return false
    else return true;
})

async function onConfirmSale(){
    useMessageStore().setMessage({ title: 'Продолжается процесс создания заявки', message: 'Не закрывайте страницу, дождитесь завершения транзакции'})
    try{
        useState().setState( State.WAIT );
        await MetaMaskStore.onConfirmSale( orderId.value );
    }catch(e){
        useMessageStore().setMessage({ title: 'Ошибка подтверждения покупки', message: 'Обновите страницу и попробуйте еще раз'})
        useState().setState( State.ERROR );
    }
}
</script>