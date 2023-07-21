<template>
<div class="w-full h-fit rounded-3xl px-10 py-10 flex flex-col bg-white space-y-4">
    <div class="w-fit h-fit flex flex-row justify-start items-center space-x-8">
            <Five/>
            <p class="w-full h-fit text-[2rem] font-bold">Создание продукта</p>
        </div>
        <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Теперь создадим уникальный токен для продукта. <br>В сети блокчейн эта процедура называется выпуск NFT токена. <br>Токен будет содержаться в родительской коллекции, иметь уникальный идентификатор и свойства. <br>Введите название продукта, описание и укажите при необходимости дополнительные аттрибуты в формате ключ-значение. <br>Указанная информация будет храниться в открытом доступе в блокчейне</p>
    <EditFields ref="editFields"
    placeholder1="Omni Pro Ultra"
    placeholder2="Ультимативный дизайн доступный каждому"
    buttonText="Выпустить продукт"
    @create-collection="onCreateToken"
    />
</div>
</template>

<script setup lang="ts">
import EditFields from '@/components/production/EditFields.vue';
import Five from '@/components/misc/Five.vue';
import { useMetaMask } from '@/store/MetaMaskStore';
import type { ICollectionParams } from '@/components/interfaces/common';
import { useProductionStore } from '@/store/ProductionStore';
import { useMessageStore } from '@/store/MessageStore';
import { useState, State } from '@/store/StateStore';

async function onCreateToken( params: ICollectionParams ){
    useMessageStore().setMessage({ title: 'Продолжается процесс создания токена', message: 'Не закрывайте страницу, дождитесь завершения транзакции'})
    try{
        useState().setState( State.WAIT );
        await useMetaMask().onCreateToken( params )
        useState().setState( State.OK );
        useProductionStore().set(6)
    }catch(e){
        useMessageStore().setMessage({ title: 'Ошибка создания токена', message: 'Обновите страницу и попробуйте еще раз'})
        useState().setState( State.ERROR );
    }
}
</script>