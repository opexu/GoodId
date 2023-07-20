<template>
<div class="w-full h-fit px-16 py-8 rounded-3xl flex flex-row justify-start items-center bg-white space-x-16">
    <div class="w-fit h-fit flex flex-row justify-start items-center">
        <MetaMaskLogo/>
    </div>
    <div class="w-full h-fit flex flex-col justify">
        <div class="w-fit h-fit flex flex-row justify-start items-center space-x-8">
            <First/>
            <p class="w-full h-fit text-[2rem] font-bold">MetaMask</p>
        </div>
        <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Для продолжения работы необходимо подключить кошелек MetaMask</p>
        <button class="w-fit h-fit mt-4 px-6 py-2 border rounded-md hover:border-orange-700 hover:text-orange-700"
        @click="onConnectMetamask"
        >
            Подключить
        </button>
    </div>
</div>
</template>

<script setup lang="ts">
import MetaMaskLogo from '@/components/misc/MetaMaskLogo.vue';
import First from '@/components/misc/First.vue';
import { useMetaMask } from '@/store/MetaMaskStore';

function onConnectMetamask(){
    useMetaMask().connect();
}
</script>