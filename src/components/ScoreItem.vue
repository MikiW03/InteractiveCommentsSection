<template >
    <div class="wrapper" data-dislike-active data-like-active>
        <button class="plus"><img src="images/icon-plus.svg" alt="plus"></button>
        <p class="score">{{ comment.score }}</p>
        <button class="minus"> <img src=" images/icon-minus.svg" alt="minus"></button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    comment: Object
})

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