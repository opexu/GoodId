<template>
<div class="w-full h-fit p-16 rounded-3xl flex flex-row justify-start items-center bg-white space-x-16">
    <div class="w-fit h-fit">
        <MetaMaskLogo/>
    </div>
    <div class="w-full h-fit flex flex-col justify">
        <p class="w-full h-fit mb-4 text-[3rem] font-bold">Успешная транзакция</p>
        <p class="w-full h-fit mt-4 text-[2rem] font-bold">{{ MessageStore.message.title }}</p>
        <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">{{ MessageStore.message.message }}</p>
    </div>
</div>
</template>

<script setup lang="ts">
import MetaMaskLogo from '@/components/misc/MetaMaskLogo.vue';
import { useMessageStore } from '@/store/MessageStore';

const MessageStore = useMessageStore();
</script>