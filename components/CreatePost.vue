<script setup lang="ts">
const dataCreate = reactive({
    title: "",
    body: "",
});

const emit = defineEmits(["refresh"]);
const handleCreate = async () => {
    const { data, refresh } = await $fetch("/api/posts", {
        method: "POST",
        body: dataCreate,
    });
    emit("refresh");
};
</script>
<template>
    <div>
        <h1>Tạo bài đăng</h1>
        <input type="text" v-model="dataCreate.title" />
        <input type="text" v-model="dataCreate.body" />
        <button @click="handleCreate">Tạo</button>
    </div>
</template>
