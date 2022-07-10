<template>
    <div class="popup-background">
        <div class="popup-window">
            <h2 class="popup-title">Delete comment</h2>
            <p class="popup-content">Are you sure you want to delete this comment? This will remove the comment and
                can't be
                undone.</p>
            <button class="popup-btn popup-cancel" @click="$emit('hideModal')">No, cancel</button>
            <button class="popup-btn popup-delete" @click="remove(id); $emit('hideModal')">Yes, delete</button>
        </div>
    </div>
</template>
    
<script setup>
import useComments from '@/composables/comments';
import { inject, defineProps } from 'vue'

defineProps({
    id: String
})

const data = inject('data')
const { remove } = useComments(data)

</script>

<style>
.popup-background {
    background-color: rgba(0, 0, 0, .6);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-window {
    background-color: var(--white);
    position: fixed;
    max-width: 400px;
    margin: 1em;
    padding: 2em;
    border-radius: 10px;

    display: grid;
    grid-template-areas:
        "title title"
        "content content"
        "cancel delete"
    ;
    gap: 1em;
}

.popup-title {
    grid-area: title;
}

.popup-content {
    grid-area: content;
    line-height: 1.5;
}

.popup-btn {
    padding: 1em 0;
    text-transform: uppercase;
    color: var(--white);
    font-weight: 700;
    font-size: 16px;
    border: none;
    border-radius: 10px;
}

.popup-cancel {
    grid-area: cancel;
    background-color: var(--grayish-blue);
}

.popup-delete {
    grid-area: delete;
    background-color: var(--soft-red);
}
</style>