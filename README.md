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

### Outputting available shipping methods

### Displaying shipping price and total at checkout
1. We going to store our shipping method that we choosen inside of our store, so we can send it accross
2. We using computed property in checkout/index.vue is because to update your store as if it was a peace of data of your component hook up with the model, you need to use computed property for this.
3. `npm install query-string`
4. Now it will grab shipping method and pass it down when you select new address


### Fixing shipping error on checkout 

### Placing orders from the checkout
1. We going to use  submitting: false in checkout/index.vue to not allow user to send submit button more than once
2. Even through we already have protection via the if statement in store method in the backend since the cart would be empty.

### lesson 96: Alerting on checkout changes
1. We going to test if alert message works by going to stocks table and turning quantity to 0 of the product we have on cart
2. add a console log to see message that api give up when it shows the error
```js
   } catch (e) {
     console.log(e.response);
   }
```
3. There is bug that cart doesn't refresh propery that we will fix later. That the quantity of available items in cart is not selected
4. We can also change stock from 2 to 1 to test what happens as well.
 
### Fixing the quantity UI bug
1. The causes the value of quantity does not be selected in the checkout when the stock quanity changed to less than available stock.
2. You can now inspect the element in the browser to see what is causing the problem
3. The issue seem to be in CartOverviewProduct.vue component where quantity is been updated, but data is not refreshing to reflect that
4. What we can do is take the data and use a computed property instead that has a get and set
5. which will always be updated when that value changes
6. The set( will have the data, while the set() will take the place of the watcher which we will remove. 
7. Now test it by changing stock quantity to 0 from 1 and 2 to 1 to see that now works properly.

### Order index setup


### Listing through orders
1. We going to slice products so we can limit amount show using a computed products property
2. A way yo refactor
```js
   <span 
   class="tag is-medium" 
   :class="{
       'is-success': this.order.status === 'complete',
       'is-info': this.order.status === 'processing' || this.order.status === 'pending',
       'is-danger': this.order.status === 'payment_failed',
   }"
   >
       {{ order.status }}
   </span>
```
3. Into data() property instead
```js
  data() {
    return {
      maxProducts: 1,
      statusClasses: {
        "is-success": this.order.status === "complete",
        "is-info":
          this.order.status === "processing" || this.order.status === "pending",
        "is-danger": this.order.status === "payment_failed",
      },
    };
  },
  ```
4. then just use  statusClasses
```js
<span class="tag is-medium" :class="statusClasses">
```

### Updating product variations in orders
1. This is how we have it set up now
```html
   <div v-for="product in products" :key="product.id">
     {{ product }}
       <a href="">Product 1</a>
   </div>
```
2. We get back from {{ product }}
```js
{ "id": 3, "name": "250g", "price": "$0.10", "price_varies": false, "stock_count": 0, "type": "whole bean", "in_stock": false, "product": { "id": 1, "name": "coffee", "slug": "coffee", "description": "delicious coffee", "price": "$0.10", "stock_count": 18, "in_stock": true } } Product 1
```
3. We make some changes to also display the product variation we do this by
```html
   <div v-for="variation in products" :key="variation.id">
     {{ variation.product }}
       <a href="">Product 1</a>
   </div>
```
4. Result we get is that now we have the coffee we also have the type as well.
```js
{ "id": 1, "name": "coffee", "slug": "coffee", "description": "delicious coffee", "price": "$0.10", "stock_count": 18, "in_stock": true }
```
### Refactoring statuses to dynamic components
1. Currently is very static
```html
      statusClasses: {
        "is-success": this.order.status === "complete",
        "is-info":
          this.order.status === "processing" || this.order.status === "pending",
        "is-danger": this.order.status === "payment_failed",
      },
```
2. Instead we going to use dynamic components that are rendered base on the name of the component matching the status we have in orders database

3. create folder named statuses in order folder in components 
4. Add file names `OrderStatus-payment_failed.vue` matching the status name.
5. We have to name them with same structure `OrderStatus-pending.vue`
6. Replace
```html
   <span 
   class="tag is-medium" 
   :class="statusClasses"
   >
       {{ order.status }}
   </span>
```
7. with 
```js
   <component :is="order.status" />
```
```js
export default {
  components: {
    payment_failed: OrderStatusPaymentFailed,
    pending: OrderStatusPending,
    // processing: OrderStatusProcessing,
    // completed: OrderStatusCompleted,
  },
```
8. Now the component change dynamically.
9. This give you a lot more control and you can even pass props with them.

### Showing and switching payment methods
1. Been able to switch between Payment methods is very similar to changing address
2. So we going to copy and reuse a lot of code from Address switching components
3. Go to browser console on Network then choose XHR and look in Headers for Respond Payload to verify the payment_method_id

### Storing a new card with Stripe
1. Added https://js.stripe.com/v3/ to Nuxt.config.js
2. Clear out all payment_methods we have in database. Left click table > tools > truncate.
3. Select Restart Identity and Cascade
4. Go to user table and delete gateway_customer_id
5. Hide change payment method when there is no one added as default

### Client authentication middleware
1. Nuxt comes with is on middleware `nuxt-cart-client/node_modules/@nuxtjs/auth/lib/core/middleware.js`
2. When you try to access `http://localhost:3000/orders` you get error unless you loggin.
3. To fix this you can add `middleware: ["auth"]` to the component.
4. So that when you try to access `http://localhost:3000/orders` you get redirected to login page `http://localhost:3000/login`
5. Problem is we have our login page in `http://localhost:3000/auth/signin`
6. So we going to create our own custom middleware
7. `nuxt-cart-client/middleware` and create middleware for `middleware: ["redirectIfGuest"]`
8. Now if you try to access `http://localhost:3000/orders` which has middleware  
9. You will be redirected to login page with 
10. the query `http://localhost:3000/auth/signin?redirect=%2Forders`
11. %2F = /
12. Now after sign in we want to modify the singin.vue so that it redirect back to the page in query above.
13. Now we add `middleware: ["redirectIfGuest"]` every place we want authenticated to be required.
14. Create middleware called redirectIfAuthenticated.js
15. When user tries to go to http://localhost:3000/auth/signin 
16. and they already logged in, redirect them to index page

### Tweaking order status components









