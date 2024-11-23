<script setup lang="ts">
interface Post {
    id: number;
    name: string;
    body: string;
}

const {
    data: posts,
    refresh,
} = await useFetch<Post[]>("/api/posts");

const deletePost = async (id: number) => {
    await $fetch(`/api/posts?id=${id}`, {
        method: "DELETE",
    });
    refresh(); // Làm mới danh sách bài viết sau khi xóa
};

// refresh();
</script>

<template>
    <div>
        <h1>Danh sách bài viết</h1>
        <div v-if="!posts">Đang tải...</div>
        <table v-else>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Nội dung</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td>{{ post.id }}</td>
                    <td>{{ post.name }}</td>
                    <td>{{ post.body }}</td>
                    <td>
                        <button @click="deletePost(post.id)">Xóa</button>
                        <nuxt-link :to="`/admin/posts/edit-${post.id}`">Sửa</nuxt-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
