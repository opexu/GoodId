<template>
<div class="w-full h-full">
    <div v-if="MetaMaskStore.IsAvailable" class="w-full h-full flex flex-col justify-start items-center space-y-4">
        <Transition name="fade" mode="out-in">
        <div class="w-full h-fit py-8 rounded-3xl flex flex-col justify-start items-start">
            <p class="w-full h-fit mt-4 items-center text-[2rem] font-bold">Информация о продуктах</p>
            <p class="w-full h-fit mt-4 items-center text-[1rem]">В этом разделе вы можете просмотреь информацию о ваших продуктах. 
                <br>Данные хранятся в блокчейне в виде NFT токенов, принадлежащих вашему аккаунту. 
                <br> Для отображения информации мы используем сервис Siberium, на основе которого работает наше приложение
                <br> Вы также можете перейти по ссылке ниже на страницу Siberium для просмотра и поиска более детальной информации о совершенных транзакциях
            </p>
            <div class="w-full h-fit flex flex-row justify-start items-center space-x-4">
                <a href="https://explorer.test.siberium.net/" class="w-fit h-fit mt-4 px-8 py-3 border rounded-md border-blue-700 text-blue-700 hover:border-orange-700 hover:text-orange-700">
                    Перейти на сайт Siberium
                </a>
                <button class="w-fit h-fit mt-4 px-8 py-3 border rounded-md border-blue-700 text-blue-700 hover:border-orange-700 hover:text-orange-700"
                v-if="SiberiumExplorerRef"
                @click="reloadSiberiumPage"
                >Обновить список токенов</button>
            </div>
            
        </div>
        </Transition>
        <Transition name="fade" mode="out-in">
        <SiberiumExplorer ref="SiberiumExplorerRef"
        :owner-address="MetaMaskStore.accounts[0]"
        v-if="MetaMaskStore.IsConnected"
        />
        <MetaMaskConnect
        v-else
        />
        <!-- <MetaMaskError
        v-else
        :title="message.title"
        :message="message.message"
        /> -->
        </Transition>
    </div>
    <MetaMaskNotFound v-else/>
</div>
</template>
<script setup lang="ts">
import { onMounted, ref, toRef, type PropType } from 'vue';
import { useMetaMask } from '@/store/MetaMaskStore';
import MetaMaskNotFound from '@/components/metamask/MetaMaskNotFound.vue';
import MetaMaskError from '../metamask/MetaMaskError.vue';
import { State, useState } from '@/store/StateStore';
import { storeToRefs } from 'pinia';
import { useMessageStore } from '@/store/MessageStore';
import SiberiumExplorer from './SiberiumExplorer.vue';
import MetaMaskConnect from '../production/steps/0/MetaMaskConnect.vue';
const { state } = storeToRefs( useState() )
const MetaMaskStore = useMetaMask();
const { message } = storeToRefs( useMessageStore() );

const SiberiumExplorerRef = ref<typeof SiberiumExplorer | null>(null)

function reloadSiberiumPage(){
    if( !SiberiumExplorerRef.value ) return;
        SiberiumExplorerRef.value?.reload()
}
</script>