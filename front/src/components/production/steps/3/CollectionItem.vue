<template>
<button class="w-full h-fit px-8 py-4 border rounded-md flex flex-row justify-center items-center space-x-8 hover:bg-orange-100"
@click="$emit('exist-collection-click')"
>
    <p class="w-fit h-fit p-8 font-bold text-black text-3xl">{{ id }}</p>
    <div class="w-full h-fit flex flex-col justify-start items-start space-y-2">
        <p class="w-full h-fit font-bold text-lg text-left">{{ name }}</p>
        <p class="w-full h-fit text-gray-500 text-left">{{ description }}</p>
    </div>
</button>
</template>

<script setup lang="ts">
defineEmits([ 'exist-collection-click' ])
defineProps({
    id: Number,
    name: String,
    description: String,
})
</script>