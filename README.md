# cartclient

### SASS Loader
1. `npm install sass-loader node-sass --save-dev`

### Showing products in categories
1. Now we got cors setup and categories we can filter by and grab product that
belongs to that category.
2. Now we implement in the front end to grab the correct products based on category.
3. Reason why http://localhost:3000/products/nike-air-max works is
4. because without having to introduce cors within nuxt it runs on nuxt.js
5. We were making request on node.js server which doesn't require cors.
6. However when we get to the point where we try to filter by category
7. When we load in product coffee this will go ahead and do an ajax request
8. To our endpoint that is where cors comes in.

### Showing product variations
1. products/_slug.vue
2. Create component <ProductVariation />
3. will be iterated over every single type of variation ex whole beans coffee
4. Will also trigger an event when user selects a variation
5. Then have separate for te quantity
6. Now when you select a different Coffee it will remove the past variation selection.