<template>
    <div class="shadow" @click="$emit('closeMenu')"></div>
    <div class="selectMenu">
        <UserItem @setUser="data.currentUser = user; $emit('closeMenu')" v-for="user in data.users" :key="user.id"
            :user="user" :currentUser="data.currentUser"></UserItem>
    </div>
</template>

<script setup>
import { inject } from 'vue';
import UserItem from './UserItem'

const data = inject('data')
</script>

<style>
.shadow {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;

    background-color: rgba(0, 0, 0, 0.5);
}

.selectMenu {
    position: fixed;
    top: 100px;
    width: 300px;
    padding: 1em 0;
    border-radius: 10px;

    display: flex;
    flex-direction: column;

    background-color: var(--white);
}
</style>