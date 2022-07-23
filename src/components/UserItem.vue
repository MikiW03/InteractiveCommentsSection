<template>
    <div class="user" :class="user.username == currentUser.username ? 'current' : ''" @click="$emit('setUser', user)">
        <img class="avatar" :src="user.image.png" :alt="'avatar of ' + user.username">
        <p>{{ user.username }}</p>
    </div>
</template>

<script setup>
defineProps({
    user: Object,
    currentUser: Object
})
</script>

<style scoped>
.user {
    display: flex;
    align-items: center;
    gap: 1em;
    font-weight: 700;

    padding: 1em 1em;
}

.user:hover {
    background-color: var(--very-light-gray);
}

.user.current {
    background-color: var(--light-gray);
}

.avatar {
    max-width: 50px;
    aspect-ratio: 1;
}
</style>