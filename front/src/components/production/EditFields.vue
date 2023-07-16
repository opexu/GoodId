<template>
<div class="w-full h-fit flex flex-col justify-start items-center space-y-4">
    
    <div class="w-full h-fit flex flex-col justify-center items-start space-y-2">
        <label for="item-name" class="font-bold">Название</label>
        <input id="item-name" class="w-full h-fit p-4 border rounded-md focus:bg-blue-50"
        placeholder="Сотовый телефон"
        v-model="itemName"
        />
    </div>

    <div class="w-full h-fit flex flex-col justify-center items-star space-y-2">
        <label for="item-name" class="font-bold">Описание</label>
        <input id="item-name" class="w-full h-fit p-4 border rounded-md focus:bg-blue-50"
        placeholder="Средство связи"
        v-model="itemDescription"
        />
    </div>

    <div class="w-full h-fit flex flex-col space-y-4">
        <p class="font-bold">Аттрибуты</p>
        <Field
        v-for="( id, i ) in idArr" :key="i"
        :id="id"
        />
        <button class="w-full h-fit p-4 border rounded-md flex flex-row justify-center items-center hover:bg-blue-100 active:bg-blue-200"
        @click="onAddField"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
            </svg>
        </button>
    </div>
</div>
</template>

<script setup lang="ts">
import Field from './Field.vue';
import { ref } from 'vue';


const itemName = ref('')
const itemDescription = ref('')

const idArr = ref<number[]>([]);
function onAddField(){
    idArr.value.push( idArr.value.length )
}
function removeField(){

}
</script>