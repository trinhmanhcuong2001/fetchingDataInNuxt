interface Post {
    id: number;
    title: string;
    body: string;
}
let posts = <Post[]>[];
export default defineEventHandler(async (e) => {
    const method = e.node.req.method;
    const query = getQuery(e);

    if (method === "GET") {
        if (!posts.length) {
            const response = await $fetch<Post[]>(
                "https://jsonplaceholder.typicode.com/posts"
            );
            posts = response.slice(0, 10);
        }
        return posts;
    }

    if (method === "GET" && query.id) {
        const post = posts.find((p) => p.id === Number(query.id));
        if (!post) {
            throw new Error("Post not found");
        }
        return post;
    }

    if (method === "POST") {
        const body = await readBody(e);
        const newPost = { id: Date.now(), ...body };
        posts.push(newPost);
        return newPost;
    }

    if (method === "PUT") {
        const body = await readBody(e);
        const index = posts.findIndex((post) => post.id === body.id);

        if (index !== -1) {
            posts[index] = { ...posts[index], ...body };
            return;
        }
    }

    if (method === "DELETE") {
        const body = await readBody(e);
        posts = posts.filter((post) => post.id !== body.id);
        return { message: "Deleted successfully" };
    }

    throw new Error("Method not allowed");
});
