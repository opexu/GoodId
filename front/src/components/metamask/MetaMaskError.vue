<template>
<div class="w-full h-fit p-16 rounded-3xl flex flex-row justify-start items-center bg-white space-x-16">
    <div class="w-fit h-fit">
        <MetaMaskLogo/>
    </div>
    <div class="w-full h-fit flex flex-col justify">
        <p class="w-full h-fit mb-4 text-[3rem] font-bold">Упс... Что-то пошло не так</p>
        <p class="w-full h-fit mt-4 text-[2rem] font-bold">{{title}}</p>
        <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">{{message}}</p>
    </div>
</div>
</template>

<script setup lang="ts">
import MetaMaskLogo from '@/components/misc/MetaMaskLogo.vue';
defineProps({
    title: String,
    message: String,
})
</script>