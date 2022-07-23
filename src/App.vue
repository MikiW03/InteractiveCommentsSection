<template>
    <UserSelect></UserSelect>
    <div class="content">
        <div class="comments">
            <CommentItem class="comment" v-for="comment in commentsInOrder" :key="comment.id" :ogId="comment.id"
                :comment="comment" :currentUser="data.currentUser" @showModal="showModal"></CommentItem>
        </div>
        <CommentAdding class="comment-adding" :currentUser="data?.currentUser" />
    </div>
    <DeleteModal @wheel.prevent @touchmove.prevent @scroll.prevent v-show="removing" :comment="comment" :ogId="ogId"
        @hideModal="hideModal" />
</template>

<script setup>
import CommentItem from './components/CommentItem.vue'
import CommentAdding from './components/CommentAdding.vue'
import DeleteModal from './components/DeleteModal.vue'
import UserSelect from './components/UserSelect.vue'
import useFetch from './composables/fetch'
import syncDate from './composables/syncDate'
import { provide, watch, ref, computed, onMounted } from 'vue'

const { data, error } = window.localStorage.getItem("data") ?
    { "data": ref(JSON.parse(window.localStorage.getItem("data"))), "error": ref(null) } :
    useFetch("data.json")

console.log(error)

provide('data', data)

watch(
    () => data.value,
    (newValue) => {
        window.localStorage.setItem("data", JSON.stringify(newValue))
    },
    { deep: true }
)

onMounted(() => {
    syncDate(data)
})

const commentsInOrder = computed(() => {
    let sortedData = data?.value.comments
    sortedData.sort((a, b) => {
        return b.score - a.score
    })
    return sortedData
})

const removing = ref(false)
var comment = ref(null)
var ogId = ref(null)
function showModal(commentObj, id) {
    comment.value = commentObj
    ogId.value = id
    removing.value = true
}

function hideModal() {
    removing.value = false
}
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.content {
    max-width: 700px;
    margin-top: 50px;
}

.comments {

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 1em 1em;
}

@media screen and (min-width: 750px) {
    :root {
        --reply-indentation: 2.5em;
    }
}
</style>