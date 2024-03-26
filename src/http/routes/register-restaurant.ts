import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import { restaurants, users } from '../../db/schema'

export const registerRestaurant = new Elysia()

registerRestaurant.post(
  '/restaurants',
  async ({ body, set }) => {
    const { restaurantName, managerName, email, phone } = body
    const [manager] = await db
      .insert(users)
      .values({
        name: managerName,
        email,
        phone,
        role: 'customer',
      })
      .returning({
        id: users.id,
      })
    await db.insert(restaurants).values({
      name: restaurantName,
      managerId: manager.id,
    })

    set.status = 204
  },
  {
    body: t.Object({
      managerName: t.String(),
      email: t.String({ format: 'email' }),
      phone: t.String(),
      restaurantName: t.String(),
    }),
  },
)
