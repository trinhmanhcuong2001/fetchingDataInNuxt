<script setup lang="ts">
interface Post {
    id: number;
    name: string;
    body: string;
}

const route = useRoute();
const router = useRouter();

const id = Number(route.params.id)

const { data: post } = await useFetch<Post>(`/api/posts?id=${id}`);

const dataEdit = reactive<Post>({
    id: id,
    name: "",
    body: "",
});

watchEffect(() => {
    if (post.value) {
        dataEdit.name = post.value.name;
        dataEdit.body = post.value.body;
    }
});



const handleUpdate = async () => {
    await $fetch(`/api/posts?id=${dataEdit.id}`, {
        method: "PUT",
        body: dataEdit,
    });
    router.push("/admin/posts");
};
</script>

<template>
    <div>
        <h1>Sửa bài viết</h1>
        <input v-model="dataEdit.name" placeholder="Tên bài viết" />
        <textarea v-model="dataEdit.body" placeholder="Nội dung"></textarea>
        <button @click="handleUpdate">Cập nhật</button>
    </div>
</template>
