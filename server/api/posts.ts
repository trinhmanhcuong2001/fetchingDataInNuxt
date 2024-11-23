let posts = [
    { id: 1, name: "Đây là post 1", body: "Đây là body của post 1" },
    { id: 2, name: "Đây là post 2", body: "Đây là body của post 2" },
    { id: 3, name: "Đây là post 3", body: "Đây là body của post 3" },
    { id: 4, name: "Đây là post 4", body: "Đây là body của post 4" },
];

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    const query = getQuery(event);
    
    if (method === "GET") {
        const id = Number(query.id);
        if(id){
            return posts.find(p => p.id === id)
        }
        return posts;
    }
    
    if (method === "POST") {
        const body = await readBody(event);
        const newPost = { id: Date.now(), ...body };
        posts.push(newPost);
        return newPost;
    }

    if (method === "PUT") {
        const body = await readBody(event);
        const id = Number(query.id);
        const index = posts.findIndex((post) => post.id === id);
        if (index === -1) {
            throw new Error("Post not found");
        }
        posts[index] = { ...posts[index], ...body };
        return posts[index];
    }

    if (method === "DELETE") {
        const id = Number(query.id);
        posts = posts.filter((post) => post.id !== id);
        return { message: "Deleted successfully" };
    }

    throw new Error("Method not allowed");
});
