<script setup lang="ts">
interface Post {
    id: number;
    title: string;
    body: string;
}
const { data, refresh } = useFetch<Post[]>("/api/posts");
const posts = computed(() => data.value ?? []);
const isShowCreate = ref<boolean>(false);
const toggleCreateForm = () => {
    isShowCreate.value = !isShowCreate.value;
};

const handlerRefreshData = () => {
    refresh();
};

const handleDeletePost = async (id: number) => {
    const { data } = await $fetch("/api/posts", {
        method: "DELETE",
        body: { id: id },
    });
    handlerRefreshData();
};
</script>
<template>
    <div>
        <button @click="toggleCreateForm">Tạo</button>
        <template v-if="isShowCreate">
            <CreatePost @refresh="handlerRefreshData" />
        </template>
        <ListPost
            :posts="posts"
            @delete-post="handleDeletePost"
            @refresh="handlerRefreshData"
        />
    </div>
</template>
