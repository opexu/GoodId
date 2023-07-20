import { defineStore } from "pinia";
import { ref } from "vue";

export interface IMessage {
    title: string;
    message: string;
}

export const useMessageStore = defineStore('MessageStore', () => {

    const message = ref<IMessage>({ title: '', message: '' })

    function setMessage( newMessage: IMessage ){
        message.value = newMessage
    }

    return { message, setMessage }
})