import { Elysia } from 'elysia'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'
import { getProfile } from './routes/get-profile'
import { getManagedRestaurant } from './routes/get-managed-restaurant'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurant)
  .onError(({ code, set }) => {
    switch (code) {
      case 'UNAUTHORIZED': {
        set.status = 401
        return new Response()
      }
      default: {
        set.status = 500
        return new Response(null, { status: 500 })
      }
    }
  })

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000')
})
