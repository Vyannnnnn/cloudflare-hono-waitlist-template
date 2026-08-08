import { Hono } from 'hono'
import { accessAuth } from './middleware/auth'

const app = new Hono()

app.use(accessAuth);
app.get('/', (c) => c.text('Hono!'))
app.get('/api/hello', (c) => c.json('Hello, everything is okay'))

export default app