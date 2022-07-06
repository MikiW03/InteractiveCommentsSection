<template >
    <div class="wrapper">
        <button class="plus"><img src="images/icon-plus.svg" alt="plus"></button>
        <p class="score">{{ score }}</p>
        <button class="minus"><img src="images/icon-minus.svg" alt="minus"></button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    score: Number,
    style: String,
})

</script>

<style>
.wrapper {
    background-color: var(--very-light-gray);
    border-radius: 10px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
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