# ITOON Backed

## Setup

    npm i
and check .env.example file if config finished remove .example 

database migration:

    npx prisma migrate dev


database generate client:

    npx prisma generate

run webhook for payment triger teminal in folder webhook:
if not login

    stripe login
and

    stripe listen --forward-to localhost:3000/webhook
