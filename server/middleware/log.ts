export default defineEventHandler((event) => {
    const { method, url } = event.node.req;
    const timestamp = new Date().toISOString();

    // Ghi log thông tin của request
    console.log(`[${timestamp}] ${method} request to ${url}`);
});
