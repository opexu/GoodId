<template>
<div class="w-full h-fit p-16 rounded-3xl flex flex-row justify-start items-center bg-white space-x-16">
    <div class="w-fit h-fit flex flex-col space-y-2 justify-center items-center">
        <QR :link="MetaMaskStore.contractUri"/>
        <a :href="MetaMaskStore.contractUri">Быстрая ссылка</a>
    </div>
    <div class="w-full h-fit flex flex-col justify">
        <div class="w-full h-fit flex flex-row justify-center items-center space-x-4">
            <Four/>
            <p class="w-full h-fit text-[2rem] font-bold">QR код коллекции</p>
        </div>
        
        <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Сохраните QR код или ссылку для просмотра информации о коллекции</p>
        <button class="w-fit h-fit mt-4 px-6 py-2 border rounded-md hover:border-orange-700 hover:text-orange-700"
        @click="onContinue"
        >
            Продолжить
        </button>
    </div>
</div>
</template>

<script setup lang="ts">
import Four from '@/components/misc/Four.vue';
import QR from './QR.vue';
import { useMetaMask } from '@/store/MetaMaskStore';
import { useProductionStore } from '@/store/ProductionStore';

const MetaMaskStore = useMetaMask();

function onContinue(){
    useProductionStore().next();
}
</script>