<template>
<div class="w-full h-fit p-12 rounded-3xl flex flex-row justify-start items-center bg-white space-x-12">
    <div>
        <Third/>
    </div>
    <div class="w-full h-full flex flex-col space-y-4">
        <p class="font-bold text-2xl">Получение продукта</p>
        <p class="">Для подтверждения сделки <b>потребитель</b> совершает транзакцию по активной заявке, после чего права владения продуктом переходят к <b>потребителю</b>.
Владельцем токена на данном этапе является новый <b>потребитель</b>.</p>
    </div>
</div>
</template>

<script setup lang="ts">
import Third from '@/components/misc/Third.vue'
</script>