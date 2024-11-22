export default defineEventHandler(async (event) => {
    // setHeader(event, "Content-Type", "application/json");
    event.context.auth = "123";
    const header = getHeader(event, "Accept-Encoding");
    console.log(header);
});
