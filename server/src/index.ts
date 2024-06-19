import { createServer } from "http";
import app from "./app";

let server = createServer(app);

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});