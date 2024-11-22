<script setup lang="ts">
interface Post {
    id: number;
    title: string;
    body: string;
    addInfo: string;
}
const { data, status, error, refresh } = await useFetch<Post[]>("/api/posts");
</script>

<template>
    <div>
        <h1>Danh sách bài viết</h1>
        <ul v-if="data">
            <li v-for="post in data" :key="post.id">
                <h3>{{ post.title }}</h3>
                <p>{{ post.body }}</p>
                <b>{{ post.addInfo }}</b>
            </li>
        </ul>
        <div v-else-if="error">Lỗi khi tải dữ liệu</div>
    </div>
</template>
