<template>
<div class="w-full h-fit p-12 rounded-3xl flex flex-row justify-start items-center bg-white space-x-12">
    <div>
        <First/>
    </div>
    <div class="w-full h-full flex flex-col space-y-4">
        <p class="font-bold text-2xl">Создание продукта</p>
        <p class="">При производстве продукта <b>производитель</b> публикует в блокчейне уникальную информацию о продукте посредством выпуска NFT токена, содержащем информацию о продукте. 
            Владельцем токена на данном этапе является <b>производитель</b></p>
    </div>
</div>
</template>

<script setup lang="ts">
import First from '@/components/misc/First.vue'
</script>