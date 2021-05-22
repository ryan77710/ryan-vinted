# project vinted back end

## User

### /user/signup (POST)

Create a new user

| Body        | Type   | Required | Description   |
| ----------- | ------ | -------- | ------------- |
| `email`     | string | Yes      | user email    |
| `password`  | string | Yes      | user password |
| `username`  | string | Yes      | user username |
| `phone`     | string | Yes      | user phone    |
| `pictureup` | object | Yes      | user picture  |

<br>
<br>

### /user/login (POST)

Log a user

| Body       | Type   | Required | Description   |
| ---------- | ------ | -------- | ------------- |
| `email`    | string | Yes      | user email    |
| `password` | string | Yes      | user password |

<br>
<br>

### /user/profile (POST)

Get all annonce and profile data of user

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /user/update (Post)

Update profile user

| Body        | Type   | required | Description      |
| ----------- | ------ | -------- | ---------------- |
| picture     | object | no       | user picture     |
| description | string | no       | user description |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

## Offer

### /offers/ (GET)

Receive a list of offers.
Possibility to filter the results.

| Query      | Required | Description                                                                                                                                                                                                                                                 |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`    | No       | get a list of offers that contain `title`                                                                                                                                                                                                                   |
| `priceMin` | No       | get offers above `priceMin`                                                                                                                                                                                                                                 |
| `priceMax` | No       | get offers below `priceMax`                                                                                                                                                                                                                                 |
| `sort`     | No       | `date-asc` : get a list of offers sort by ascending dates <br> `date-desc`: get a list of offers sort by descending dates <br> `price-asc`: get a list of offers sort by ascending prices <br> `price-desc`: get a list of offers sort by descending prices |
| `page`     | No       | set the results page                                                                                                                                                                                                                                        |
| `limit`    | No       | set the limit of results                                                                                                                                                                                                                                    |

<br>
<br>

### /offers-auth (GET)

Receive a list of offers.
Possibility to filter the results.

| Query      | Required | Description                                                                                                                                                                                                                                                 |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`    | No       | get a list of offers that contain `title`                                                                                                                                                                                                                   |
| `priceMin` | No       | get offers above `priceMin`                                                                                                                                                                                                                                 |
| `priceMax` | No       | get offers below `priceMax`                                                                                                                                                                                                                                 |
| `sort`     | No       | `date-asc` : get a list of offers sort by ascending dates <br> `date-desc`: get a list of offers sort by descending dates <br> `price-asc`: get a list of offers sort by ascending prices <br> `price-desc`: get a list of offers sort by descending prices |
| `page`     | No       | set the results page                                                                                                                                                                                                                                        |
| `limit`    | No       | set the limit of results                                                                                                                                                                                                                                    |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/:id (GET)

Get an offer

| Param | Required | Description |
| ----- | -------- | ----------- |
| `id`  | Yes      | offer id    |

<br>
<br>

### /offer-auth/:id (GET)

Get an offer

| Param | Required | Description |
| ----- | -------- | ----------- |
| `id`  | Yes      | offer id    |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/publish (POST)

Create a new offer
| formData | Required | Description|
| ------------- | -------- | -----------|
| `title` | Yes | offer title|
| `description` | Yes | product description|
| `price` | Yes | product price|
| `brand` | Yes | product brand|
| `size` | Yes | product size|
| `condition` | Yes | product condition|
| `color` | Yes | offer color|
| `city` | Yes | the city in which the offer is located|
| `picture` | Yes | product picture|

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/update (POST)

Update an offer

| body | Required | Description |
| ---- | -------- | ----------- |
| `id` | Yes      | offer id    |

<br>

| formData      | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| `title`       | No       | offer title                            |
| `description` | No       | product description                    |
| `price`       | No       | product price                          |
| `brand`       | No       | product brand                          |
| `size`        | No       | product size                           |
| `condition`   | No       | product condition                      |
| `color`       | No       | offer color                            |
| `city`        | No       | the city in which the offer is located |
| `picture`     | No       | product picture                        |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/delete/:id (POST)

Delete an offer

| Body | Required | Description |
| ---- | -------- | ----------- |
| `id` | Yes      | offer id    |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/my-offers (POST)

all offer of user

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/favorite (POST)

add favorite offer of a user

| Body                  | Type          | Required | Description                                                                           |
| --------------------- | ------------- | -------- | ------------------------------------------------------------------------------------- |
| `_id`                 | string        | Yes      | offer id                                                                              |
| `product_details`     | array         | Yes      | has 5 childen element (type string) : -0`brand`-1`size`-2`condition`-3`color`-4`city` |
| `product_picture`     | array         | Yes      | array of object picture                                                               |
| `product_image`       | object        | Yes      | object picture                                                                        |
| `owner`               | object/string | Yes      | user                                                                                  |
| `product_name`        | string        | Yes      | offer name                                                                            |
| `product_description` | string        | Yes      | offer description                                                                     |
| `product_price`       | number        | Yes      | offer price                                                                           |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/delete-favorite (POST)

delete a favorite offer of a user

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/picture-profile-change (POST)

change the picture profile of a offer

| FormData  | Type   | Required | Desciption        |
| --------- | ------ | -------- | ----------------- |
| `offerId` | string | Yes      | offer id          |
| `picture` | object | Yes      | picture to change |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/picture-add (POST)

add picture to a offer

| FormData  | Type   | Required | Desciption     |
| --------- | ------ | -------- | -------------- |
| `offerId` | string | Yes      | offer id       |
| `picture` | object | Yes      | picture to add |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/picture-delete (POST)

delete picture to a offer

| FormData   | Type   | Required | Description                 |
| ---------- | ------ | -------- | --------------------------- |
| `assetId`  | string | Yes      | picture asset to delete     |
| `publicId` | string | Yes      | picture public id to delete |
| `offerId`  | string | Yes      | offer id                    |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

## Payment

### /payment (POST)

buy a offer

| Body          | Type   | Required | Description       |
| ------------- | ------ | -------- | ----------------- |
| `stripeToken` | String | Yes      | stripe token      |
| `price`       | number | Yes      | offer price       |
| `description` | string | Yes      | offer description |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /payment/donation (POST)

donation to the web site

| Body    | Type   | Required | Description    |
| ------- | ------ | -------- | -------------- |
| `price` | number | Yes      | donation price |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>
