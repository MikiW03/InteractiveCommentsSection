<template>
    <div class="reply">
        <img class="reply-img" :src="currentUser?.image.png" alt="image of current user">
        <textarea class="reply-input" v-model="content" placeholder="Add a comment..."></textarea>
        <button class="reply-btn"
            @click="reply($event, content, replyingTo, comment.id); $emit('replied')">reply</button>
    </div>
</template>

<script setup>
import { defineProps, inject, ref } from 'vue'
import useComments from '../composables/comments'

defineProps({
    comment: Object,
    currentUser: Object,

    replyingTo: String
})

const content = ref("")

const data = inject('data')
const { reply } = useComments(data)

</script>

<style>
.reply {
    background-color: var(--white);
    margin: 1em 0 0 0;
    padding: 1em;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px var(--light-gray);
    display: grid;
    row-gap: 1em;
    align-items: center;
    grid-template-areas:
        "input input input"
        "img . btn"
    ;
}

@media screen and (min-width: 750px) {
    .reply {
        align-items: flex-start;
        gap: 1em;
        grid-template-columns: .5fr 5fr 1fr;
        grid-template-areas:
            "img input btn"
        ;
    }
}

.reply-input {
    font-family: inherit;

    resize: none;
    padding: 1em 1.5em;
    word-wrap: break-word;
    word-break: break-all;
    min-height: 100px;
    border: 1px solid var(--light-gray);
    border-radius: 10px;

    grid-area: input;
}

.reply-img {
    max-width: 35px;

    grid-area: img;
}

.reply-btn {
    text-transform: uppercase;
    padding: 1em 1em;
    background-color: var(--moderate-blue);
    border: none;
    border-radius: 10px;
    color: var(--white);
    font-weight: 700;

    grid-area: btn;
}
</style>