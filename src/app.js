import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN, credentials: true
}));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())


///import routes
import userRoutes from "../routes/user.routes.js"
import managerRoutes from "../routes/manager.routes.js"


app.use("/api/v1/user", userRoutes)
app.use("/api/v1/manager", managerRoutes)


export { app }