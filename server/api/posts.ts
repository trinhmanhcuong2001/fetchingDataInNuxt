// import addInfo from "../middleware/add-info";
interface Post {
    id: number;
    title: string;
    body: string;
    addInfo: string;
}
export default defineEventHandler(async (event) => {
    // Gọi API gốc để lấy dữ liệu
    console.log(event.context.auth);
    const posts = await $fetch<Post[]>(
        "https://jsonplaceholder.typicode.com/posts"
    );
    return posts;
});
