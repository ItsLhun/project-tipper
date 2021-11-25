## Client-side

1

### Views

| NAME | DESCRIPTION | AUTH | DONE |
| ---- | ----------- | ---- | ---- |
| xxx  | xxx         | xx   | xx   |

## WishList Items

## Known Issues

- The search query is performed for both artists and events no matter which one is selected, in order to get the document count.
  This could not be avoided as Mongo does not allow the usage of countDocuments with an index query such as $near.
