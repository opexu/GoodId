<template>
<div class="w-full h-fit px-16 py-8 rounded-3xl flex flex-row justify-start items-center bg-white space-x-16">
    <div class="w-fit h-fit flex flex-row justify-start items-center">
        <CollectionLogo/>
    </div>
    <div class="w-full h-fit flex flex-col justify">
        <div class="w-fit h-fit flex flex-row justify-start items-center space-x-8">
            <Second/>
            <p class="w-full h-fit text-[2rem] font-bold">Создание коллекции</p>
        </div>
        <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Для регистрации продукта в блокчейне необходимо создать новую пустую коллекцию, либо ввести адрес существующей коллекции, принадлежащей вашей компании. <br>Внутри коллекции хранятся уникальные токены продуктов.</p>
        <div class="w-full h-fit flex flex-row justify-start space-x-8">
            <button class="w-full h-fit mt-4 px-6 py-2 border rounded-md hover:border-orange-700 hover:text-orange-700"
            @click="onCreateNewCollection"
            >
                Создать новую коллекцию
            </button>
            <button class="w-full h-fit mt-4 px-6 py-2 border rounded-md hover:border-orange-700 hover:text-orange-700"
            @click="onSetExistsCollection"
            >
                Выбрать коллекцию
            </button>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import Second from '@/components/misc/Second.vue';
import CollectionLogo from '@/components/misc/CollectionLogo.vue';
import { useProductionStore } from '@/store/ProductionStore';

function onCreateNewCollection(){
    useProductionStore().set( 2 );
}

function onSetExistsCollection(){
    useProductionStore().set( 3 );
}
</script>