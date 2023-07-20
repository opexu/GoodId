<template>
<div class="w-full h-fit rounded-3xl px-10 py-10 flex flex-col bg-white space-y-4">
    <div class="w-fit h-fit flex flex-row justify-start items-center space-x-8">
            <Third/>
            <p class="w-full h-fit text-[2rem] font-bold">Выбор коллекции</p>
        </div>
        <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Выберите одну коллекцию из списка</p>
</div>
</template>

<script setup lang="ts">
import CollectionItem from '@/components/production/steps/3/CollectionItem.vue';
import Third from '@/components/misc/Third.vue';
import { onMounted, ref } from 'vue';
import { useMetaMask } from '@/store/MetaMaskStore';
import { useProductionStore } from '@/store/ProductionStore';

interface ICollectionItem {
    title: string;
    description: string;
    address: string;
}


</script>