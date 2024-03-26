/* eslint-disable drizzle/enforce-delete-with-where */

import { faker } from '@faker-js/faker'
import { restaurants, users } from './schema'
import { db } from './connection'

/**
 * Reset the database
 */

await db.delete(restaurants)
await db.delete(users)

/**
 * Create users
 */

await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: 'customer',
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: 'customer',
  },
])

/**
 * Create managers
 */

const [manager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      role: 'manager',
    },
  ])
  .returning({
    id: users.id,
  })

/**
 * Create restaurants
 */

await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: manager.id,
  },
])

process.exit()
