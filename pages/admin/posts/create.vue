<script setup lang="ts">
const router = useRouter();

const dataCreate = reactive({
    name: "",
    body: "",
});

const handleCreate = async () => {
    await useFetch("/api/posts", {
        method: "POST",
        body: dataCreate,
    });
    router.push("/admin/posts"); // Quay lại trang danh sách
};
</script>

<template>
    <div>
        <h1>Thêm bài viết</h1>
        <input v-model="dataCreate.name" placeholder="Tên bài viết" />
        <textarea v-model="dataCreate.body" placeholder="Nội dung"></textarea>
        <button @click="handleCreate">Thêm</button>
    </div>
</template>
