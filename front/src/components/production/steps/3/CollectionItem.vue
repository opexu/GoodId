<template>
<button class="w-full h-fit p-16 border rounded-md flex flex-row justify-center items-center space-x-8 hover:bg-orange-100"
@click="$emit('exist-collection-click')"
>
    <p class="w-fit h-fit p-8 font-bold text-2xl">{{ id }}</p>
    <div class="w-full h-fit flex flex-col justify-start space-y-4">
        <p class="w-full h-fit font-bold text-lg">{{ title }}</p>
        <p class="w-full h-fit">{{ description }}</p>
    </div>
</button>
</template>

<script setup lang="ts">
defineEmits([ 'exist-collection-click' ])
defineProps({
    id: Number,
    title: String,
    description: String,
    address: String,
})
</script>