<template>
    <div class="selectBar">
        <div class="currentUser" @click="menuVisible = !menuVisible">
            <img class="avatar" :src="data.currentUser.image.png" alt="current user avatar">
            <p class="name">{{ data.currentUser.username }}</p>
        </div>
    </div>
    <SelectMenu @closeMenu="menuVisible = false" v-if="menuVisible"></SelectMenu>
</template>

<script setup>
import SelectMenu from './SelectMenu.vue'

import { inject, onMounted, ref, watch } from "vue";

const data = inject('data')

const body = ref(null)
onMounted(() => {
    body.value = document.querySelector("body")
})

const menuVisible = ref(false)
watch(
    () => menuVisible.value,
    () => {
        body?.value?.classList.toggle('menuActive')
    },
    { immediate: true }
)

</script>

<style scoped>
.selectBar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-block: 1em;

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: 0 0 5px 1px black;
    background-color: var(--moderate-blue);

    z-index: 1000;
}

.currentUser {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;

    cursor: pointer;
}

.avatar {
    max-width: 35px;
    aspect-ratio: 1;
}

.name {
    font-weight: 700;
    color: var(--light-gray)
}
</style>