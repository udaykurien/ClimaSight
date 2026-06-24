import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'ClimaSight API is running' })
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
