<template>
    <div>
        <textarea class="comment-adding-input" v-model="content" type="text" placeholder="Add a comment..."></textarea>
        <img class="comment-adding-img" :src="currentUser?.image.png" alt="image of current user" width="35"
            height="35">
        <button class="comment-adding-btn" @click="comment($event, content)">send</button>
    </div>
</template>

<script setup>
import { defineProps, inject, ref } from 'vue'
import useComments from '../composables/comments'

defineProps({
    currentUser: Object,
})

const content = ref(null)

const data = inject('data')
const { comment } = useComments(data)

</script>

<style>
.comment-adding {
    background-color: var(--white);
    padding: 1em;
    margin: 1em 1em 2em 1em;
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
    .comment-adding {
        align-items: flex-start;
        gap: 1em;
        grid-template-columns: .5fr 5fr 1fr;
        grid-template-areas:
            "img input btn"
        ;
    }
}

.comment-adding-input {
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

.comment-adding-img {
    max-width: 35px;

    grid-area: img;
}

.comment-adding-btn {
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