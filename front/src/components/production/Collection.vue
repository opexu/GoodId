<template>
<div class="w-full h-fit rounded-3xl px-10 py-10 flex flex-col bg-white space-y-4">
    <div class="w-fit h-fit flex flex-row justify-start items-center space-x-8">
            <Third/>
            <p class="w-full h-fit text-[2rem] font-bold">Создание коллекции</p>
        </div>
        <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Для начала создайте новую коллекцию, в которой будут храниться уникальные токены продуктов. <br>Введите название коллекции, описание и укажите при необходимости дополнительные аттрибуты в формате ключ-значение. <br>Указанная информация будет храниться в открытом доступе в блокчейне</p>
    <EditFields ref="editFields"
    placeholder1="Сотовые телефоны"
    placeholder2="Надежные средства связи для комфортного общения"
    buttonText="Создать коллекцию"
    />
</div>
</template>

<script setup lang="ts">
import EditFields from './EditFields.vue';
import Third from '@/components/misc/Third.vue';
</script>