<template>
    <div class="comments">
        <CommentItem class="comment" v-for="comment, index in data?.comments" :key="index" v-bind="comment"
            :currentUser="data.currentUser" />
    </div>
    <CommentAdding class="comment-adding" :currentUser="data?.currentUser" />
    <DeleteComment v-show="false" />
    {{ error }}
</template>

<script setup>
import CommentItem from './components/CommentItem.vue'
import CommentAdding from './components/CommentAdding.vue'
import DeleteComment from './components/DeleteComment.vue'
import useFetch from './composables/fetch'

const { data, error } = useFetch("data.json")


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

.comments {
    padding: 1em 1em 1em 0;
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: right;
}
</style>