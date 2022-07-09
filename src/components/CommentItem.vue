<template>
    <div>
        <div class="comment-card">
            <div class="comment-header">
                <img class="comment-img" :src="user.image.png" :alt="'avatar of ' + user.username">
                <span class="comment-username">
                    {{ user.username }}
                    <span class="you" v-if="isUserCurrent(user, currentUser)">
                        you
                    </span>
                </span>
                <span class="comment-date">{{ createdAt }}
                </span>
            </div>
            <div class="comment-content" v-if="!editing">
                <span class="comment-reply-tag" v-if="replyingTo">
                    @{{ replyingTo }}
                </span>
                {{ content }}
            </div>
            <div v-else class="editing-field">
                <textarea type="text" class="editing-input" v-model="newContent"></textarea>
                <button class="editing-button" @click="edit(id, newContent); editing = !editing">update</button>
            </div>
            <ScoreItem class="comment-score" :score="score" :replyingTo="replyingTo" :id="id" />
            <button class="comment-delete" v-if="isUserCurrent(user, currentUser)" @click="remove(id)"><img src="
                images/icon-delete.svg" alt="delete icon">Delete</button>
            <button class="comment-reply-edit" v-if="isUserCurrent(user, currentUser)" @click="editing = !editing"><img
                    src="images/icon-edit.svg" alt="edit icon">Edit</button>
            <button class="comment-reply-edit" v-else @click="replying = !replying"><img src="images/icon-reply.svg"
                    alt="reply icon">
                Reply</button>

        </div>
        <ReplyItem v-if="replying" @replied="replying = false" :id="id" :replyingTo="user.username"
            :currentUser="currentUser"></ReplyItem>
        <div class="comment-replies">
            <CommentItem class="comment" v-for="comment, index in replies" :key="index" v-bind="comment"
                :currentUser="currentUser" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, inject, ref } from 'vue'
import ScoreItem from './ScoreItem'
import ReplyItem from './ReplyItem'
import useComments from '../composables/comments'


const props = defineProps({
    content: String,
    createdAt: String,
    id: String,
    replies: Array,
    score: Number,
    user: Object,
    replyingTo: String,

    currentUser: Object,
})

const replying = ref(false)
const editing = ref(false)

const newContent = ref(props.content)

function isUserCurrent(user, currentUser) {
    return user.username == currentUser.username
}

const data = inject('data')
const { remove, edit } = useComments(data)

</script>

<style>
.comment {
    margin-top: 1em;
    width: 100%;
}

.comment-replies .comment {
    width: calc(100% - var(--reply-indentation));
}



.comment-card {
    background-color: var(--white);
    padding: 1em;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px var(--light-gray);

    display: grid;
    row-gap: 1em;
    align-items: center;
    grid-template-columns: 1.3fr .7fr 1fr 1fr;
    grid-template-areas:
        "header header header header"
        "content content content content"
        "score . delete reply-edit"
    ;
}

.comment-header {
    display: flex;
    align-items: center;
    gap: 1em;
}

.comment-img {
    max-width: 35px;
}

.comment-username {
    font-weight: 700;

    display: flex;
    align-items: center;
    gap: .4em
}

.you {
    background-color: var(--moderate-blue);
    color: var(--white);
    padding: .2em .4em;
    border-radius: 5px;
    font-size: 12px;
}

.comment-card>button {
    background-color: inherit;
    border: none;
    font-weight: 700;
    font-size: 16px;

    display: flex;
    align-items: center;
    justify-content: right;
    gap: .5em;
}

.comment-reply-tag {
    font-weight: 500;
    color: var(--moderate-blue);
}

.comment-reply-edit {
    color: var(--moderate-blue);
}

.comment-delete {
    color: var(--soft-red);
}

.comment-replies {
    border-left: 3px solid var(--light-gray);
    margin-top: 1em;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.comment-replies div:first-of-type {
    margin-top: 0;
}

.comment-replies:empty {
    margin: 0;
}

@media screen and (min-width: 750px) {
    .comment-card {
        padding: 1.3em;

        grid-template-columns: .2fr 3fr .2fr .2fr;
        grid-template-areas:
            "score header delete reply-edit"
            "score content content content"
        ;
        grid-gap: 1.2em;
    }

    .comment-score {
        align-self: start;
    }

    .comment-replies {
        margin-left: 2em;

    }
}

.editing-field {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: .5em;
}

.editing-input {
    width: 100%;
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

.editing-button {
    text-transform: uppercase;
    padding: 1em 1em;
    background-color: var(--moderate-blue);
    border: none;
    border-radius: 10px;
    color: var(--white);
    font-weight: 700;
}

/* DEFINING GRID TEMPLATES */
.comment-header {
    grid-area: header;
}

.comment-content,
.editing-field {
    grid-area: content;
}

.comment-score {
    grid-area: score;
}

.comment-delete {
    grid-area: delete;
}

.comment-reply-edit {
    grid-area: reply-edit;
}
</style>