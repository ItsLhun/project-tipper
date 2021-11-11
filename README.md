# Project Tipper

## Server-side

### Models

User:

- name: String
- email: String
- passwordHashAndSalt: String
- role: enum
- avatar: img ?
- bio: String ?
- genre: enum ?
- instruments: enum ?
- backgroundImg: img ?
- paymentInfo: String, provided by Stripe (payout button) <->
  Follow:
- follower: ref: ObjectID, user
- followed: ref: ObjectID, user
  Rating:
- ref: ObjectID, user
- ref: ObjectID, artist
  score: number
  Event:
  dateEvent: Date
  timeBegin: Time
  timeEnd: Time
  Location: String manually or by Google API when LIVE
  Price: provided by Ticketprovider
  Charge:
  ref: ObjectID, user.
  amount.
  date.
  customerId: String, provided by Stripe
  successful: Boolean

### Controllers (rest API endpoint)

| METHOD | PATH              | DESCRIPTION                  | AUTHENTICATION | DONE |
| ------ | ----------------- | ---------------------------- | -------------- | ---- |
| GET    | /profile/edit     | get user or artist info      | xx             | xx   |
| POST   | /profile/edit     | change user or artist info   | xx             | xx   |
| GET    | /events/:location | get all events on a location | xx             | xx   |
| GET    | /events/:id       | get specific event           | xx             | xx   |

## Client-side

1

### Views

| NAME | DESCRIPTION | AUTH | DONE |
| ---- | ----------- | ---- | ---- |
| xxx  | xxx         | xx   | xx   |

## WishList Items
