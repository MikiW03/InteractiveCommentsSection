<template >
    <div class="wrapper" data-dislike-active data-like-active>
        <button class="plus" @click="incrementScore(comment, ogId)"><img src="images/icon-plus.svg" alt="plus"
                width="11" height="11"></button>
        <p class="score">{{ comment.score }}</p>
        <button class="minus" @click="decrementScore(comment, ogId)"> <img src=" images/icon-minus.svg" alt="minus"
                width="11" height="3"></button>
    </div>
</template>

<script setup>
import { defineProps, inject } from 'vue'
import useComments from '../composables/comments'

defineProps({
    comment: Object,
    ogId: Number
})

const data = inject('data')
const { incrementScore, decrementScore } = useComments(data)

</script>

<style>
.wrapper {
    background-color: var(--very-light-gray);
    border-radius: 10px;
    min-width: 35px;
    max-width: 100px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
}

@media screen and (min-width: 750px) {
    .wrapper {
        flex-direction: column;
    }
}

.wrapper>* {
    padding: .6em;
}

.plus,
.minus {
    border: none;
    background-color: inherit;

    display: flex;
    align-items: center;
}

.score {
    font-weight: 500;
    color: var(--moderate-blue)
}
</style>