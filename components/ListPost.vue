<script setup lang="ts">
interface Post {
    id: number;
    title: string;
    body: string;
}
const isEditPost = ref<number | null>(null);

const props = defineProps<{
    posts: Post[];
}>();

const emit = defineEmits<{
    (event: "delete-post", id: number): void;
    (event: "refresh"): void;
}>();

const handleDelete = (id: number) => {
    emit("delete-post", id);
};

const dataEdit = reactive<Post>({
    id: 1,
    title: "",
    body: "",
});

const startUpdate = (data: Post) => {
    isEditPost.value = data.id;
    dataEdit.id = data.id;
    dataEdit.title = data.title;
    dataEdit.body = data.body;
};

const handleUpdate = async () => {
    await $fetch("/api/posts", {
        method: "PUT",
        body: dataEdit,
    });
    emit("refresh");
    isEditPost.value = null;
};

const stopEdit = () => {
    isEditPost.value = null;
    dataEdit.id = 0;
    dataEdit.title = "";
    dataEdit.body = "";
};
</script>
<template>
    <div>
        <h1>Danh sách bài đăng</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Feature</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="post in props.posts">
                    <tr v-if="post.id !== isEditPost">
                        <td>{{ post.id }}</td>
                        <td>{{ post.title }}</td>
                        <td>{{ post.body }}</td>
                        <td>
                            <button @click="startUpdate(post)">Cập nhật</button>
                            <button @click="handleDelete(post.id)">Xóa</button>
                        </td>
                    </tr>
                    <tr v-else>
                        <td>{{ post.id }}</td>
                        <td><input type="text" v-model="dataEdit.title" /></td>
                        <td><input type="text" v-model="dataEdit.body" /></td>
                        <td>
                            <button @click="handleUpdate">Sửa</button>
                            <button @click="stopEdit">Dừng</button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
