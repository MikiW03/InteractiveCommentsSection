<template>
    <div class="content">
        <div class="comments">
            <CommentItem class="comment" v-for="comment, index in data?.comments" :key="index" v-bind="comment"
                :currentUser="data.currentUser" />
        </div>
        <CommentAdding class="comment-adding" :currentUser="data?.currentUser" />
    </div>
    <DeleteModal v-show="false" />
</template>

<script setup>
import CommentItem from './components/CommentItem.vue'
import CommentAdding from './components/CommentAdding.vue'
import DeleteModal from './components/DeleteModal.vue'
import useFetch from './composables/fetch'
import { provide, watch, ref } from 'vue'

const data = ref(null)
if (window.localStorage.getItem("data")) {
    data.value = JSON.parse(window.localStorage.getItem("data"))
} else {
    ({ data: data.value } = useFetch("data.json"))
}

provide('data', data)

watch(
    () => data.value,
    (newValue) => {
        window.localStorage.setItem("data", JSON.stringify(newValue))
    },
    { deep: true }
)

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');

:root {

    --reply-indentation: 1em;

    /* Primary */
    --moderate-blue: hsl(238, 40%, 52%);
    --soft-red: hsl(358, 79%, 66%);
    --light-grayish-blue: hsl(239, 57%, 85%);
    --pale-red: hsl(357, 100%, 86%);

    /* Neutral */
    --dark-blue: hsl(212, 24%, 26%);
    --grayish-blue: hsl(211, 10%, 45%);
    --light-gray: hsl(223, 19%, 93%);
    --very-light-gray: hsl(228, 33%, 97%);
    --white: hsl(0, 0%, 100%);
}

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--very-light-gray);
    font-family: Rubik, sans-serif;
    font-size: 16px;
}

button,
input,
textarea {
    cursor: pointer;
}

button:hover {
    opacity: 0.5;
}

#app {
    display: flex;
    justify-content: center;
}

.content {
    max-width: 700px;
}

.comments {
    padding: 1em 1em 1em 1em;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

@media screen and (min-width: 750px) {
    :root {
        --reply-indentation: 2.5em;
    }
}
</style>