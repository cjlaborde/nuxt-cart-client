# cartclient

### SASS Loader
1. `npm install sass-loader node-sass --save-dev`

### Showing products in categories
1. Now we got cors setup and categories we can filter by and grab product that belongs to that category.
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

### Showing if a variation is out of stock
1. disable out of stock products
2. As well put notice item is out of stock

### Updating dropdown with stock count

### Authenticating on the client
1. https://auth.nuxtjs.org/
2. https://github.com/nuxt-community/auth-module
3. npm install @nuxtjs/auth

### Updating the navigation
1. you can access the store anywhere for auth using $auth
2. Now if you want to log out you can do so by going to Application and delete Local Storage and Cookies
   
### Getting the cart for every request
1. We create new store to keep all cart related in it.

### Building the cart page

### Deleting cart items


### Updating cart item quantities

### Disabling the checkout button

### Showing the cart subtotal

### Getting changed status on the client

### Showing the product variation type

### Adding items on the client

### Building the checkout page

### Showing the default address

### Switching the shipping address
1. alternative code: Better way instead is using addressSelected method instead
```js
  /*
  watch: {
    // will switch out from selecting address menu after you choose new address
    selectedAddress() {
      this.selecting = false;
    },
  },
  */
 ```

 ### Creating a new shipping address

 ### Country dropdown selector
1. Pass Id to 
```js
 <CountryDropdown v-model="form.country_id" />
 ```
 2. using a emit
```html
  <select @change="changed">
    <option :value="country.id" v-for="country in countries" :key="country.id">
        {{ country.name }}
    </option>
  </select>
```

### Using v-model with a shipping address
1. We can use v-model on a component itself
2. What we can do is in ShippingAddress watch for selectedAddress 
3. then emit the fact that we want to update and use that particular value
4. What this will archieve is allow us to use v-model within this component
5. You can do this creating a watch in ShippingAddress and watch selectedAddress
```php
  watch: {
    selectedAddress(address) {
      this.$emit("input", address.id);
    },
  },
```
6. Then v-model will be able to listen to it
```php
         <ShippingAddress 
                    :addresses="addresses"
                    v-model="form.address_id"
                />
```