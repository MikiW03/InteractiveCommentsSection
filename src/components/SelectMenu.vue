<template>
    <div class="menu-background" @click="$emit('closeMenu')">
        <div class="selectMenu">
            <UserItem @setUser="data.currentUser = user; $emit('closeMenu')" v-for="user in data.users" :key="user.id"
                :user="user" :currentUser="data.currentUser"></UserItem>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue';
import UserItem from './UserItem'

const data = inject('data')
</script>

<style>
.menu-background {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1000000vmax;
    top: 0;

    display: flex;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.5);

    z-index: 999;
}

.selectMenu {
    position: fixed;
    top: 100px;
    width: 300px;
    max-height: 60vh;
    padding: 1em 0;
    border-radius: 10px;

    display: flex;
    flex-direction: column;

    background-color: var(--white);

    overflow: auto;

    z-index: 1000;
}
</style>