<template>
    <div>
        <textarea class="comment-adding-input" type="text" placeholder="Add a comment..."></textarea>
        <img class="comment-adding-img" :src="currentUser?.image.png" alt="image of current user">
        <button class="comment-adding-btn">send</button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    currentUser: Object,
})

</script>

<style>
.comment-adding {
    background-color: var(--white);
    margin: 0 1em 2em 1em;
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