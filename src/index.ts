import express from "express"
import config from "./config"
import { formDataRouter } from "./routes"

const { PORT } = config

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", formDataRouter)

app.use((_, res) => {
  res.status(404).send("Not Found 🤷‍♂")
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
