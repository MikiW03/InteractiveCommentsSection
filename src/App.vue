<template>
    <template v-if="data">
        <UserSelect></UserSelect>
        <div class="content">
            <TransitionGroup tag="div" class="comments" name="comments-list">
                <CommentItem class="comment" v-for="comment in commentsInOrder" :key="comment.id" :ogId="comment.id"
                    :comment="comment" :currentUser="data.currentUser" @showModal="showModal"></CommentItem>
            </TransitionGroup>
            <CommentAdding class="comment-adding" :currentUser="data.currentUser" />
        </div>
        <Transition name="modal">
            <DeleteModal @wheel.prevent @touchmove.prevent @scroll.prevent v-show="removing" :comment="comment"
                :ogId="ogId" @hideModal="hideModal" />
        </Transition>
    </template>
    <template v-else-if="error">
        {{ error }}
    </template>
</template>

<script setup>
import originalData from '../public/data'
import CommentItem from './components/CommentItem.vue'
import CommentAdding from './components/CommentAdding.vue'
import DeleteModal from './components/DeleteModal.vue'
import UserSelect from './components/UserSelect.vue'
import syncDate from './composables/syncDate'
import { provide, watch, ref, computed, onMounted } from 'vue'

const data = ref(null)
watch(
    () => data.value,
    (newValue) => {
        window.localStorage.setItem("data", JSON.stringify(newValue))
    },
    { deep: true }
)

if (window.localStorage.getItem("data")) {
    data.value = JSON.parse(window.localStorage.getItem("data"))
    if (!data.value.users) {
        data.value = originalData
    }
} else {
    data.value = originalData
}

provide('data', data)


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

body.menuActive {
    overflow: hidden
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
    position: relative;
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

/* TRANSITIONS */

.comments-list-move,
.comments-list-enter-active,
.comments-list-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.comments-list-enter-from,
.comments-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}


.modal-enter-active,
.modal-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}


.reply-enter-active,
.reply-leave-active {
    transition: all 0.5s ease;
}

.reply-enter-from,
.reply-leave-to {
    transform: scaleY(0);
    transform-origin: top;
}
</style>