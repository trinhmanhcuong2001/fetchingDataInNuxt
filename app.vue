<script setup lang="ts">
interface Post {
    id: number;
    title: string;
    body: string;
}
const { data, pending, error, refresh } = await useFetch<Post[]>("/api/posts");
</script>

<template>
    <div>
        <h1>Danh sách bài viết</h1>
        <ul v-if="data">
            <li v-for="post in data" :key="post.id">
                <h3>{{ post.title }}</h3>
                <p>{{ post.body }}</p>
            </li>
        </ul>
        <div v-else-if="pending">Đang tải dữ liệu...</div>
        <div v-else>Có lỗi xảy ra khi tải dữ liệu.</div>
    </div>
</template>
