<template>
<div class="w-full h-fit p-12 rounded-3xl flex flex-row justify-start items-center bg-white space-x-12">
    <div>
        <Second/>
    </div>
    <div class="w-full h-full flex flex-col space-y-4">
        <p class="font-bold text-2xl">Передача продукта</p>
        <p class="">Для передачи продукта следующему <b>потребителю</b> необходимо осуществить транзакцию, в которой указывается новый владелец и цена продажи продукта. Блокчейн создаст активную заявку на передачу прав, которую должен подтвердить <b>потребитель</b>. 
Владельцем токена на данном этапе является смартконтракт.</p>
    </div>
</div>
</template>

<script setup lang="ts">
import Second from '@/components/misc/Second.vue'
</script>