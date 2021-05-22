# project vinted back end

## User

### /user/signup (POST)

Create a new user

| Body        | Type   | Required |
| ----------- | ------ | -------- |
| `email`     | string | Yes      |
| `password`  | string | Yes      |
| `username`  | string | Yes      |
| `phone`     | string | Yes      |
| `pictureup` | object | Yes      |

<br>
<br>

### /user/login (POST)

Log a user

| Body       | Type   | Required |
| ---------- | ------ | -------- |
| `email`    | string | Yes      |
| `password` | string | Yes      |

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

| Body        | Type   | required |
| ----------- | ------ | -------- |
| picture     | object | no       |
| description | string | no       |

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

| Body                  | Type          | Required |
| --------------------- | ------------- | -------- |
| `_id`                 | string        | Yes      |
| `product_details`     | string        | Yes      |
| `product_picture`     | array         | Yes      |
| `product_image`       | object        | Yes      |
| `owner`               | object/srting | Yes      |
| `product_name`        | string        | Yes      |
| `product_description` | string        | Yes      |
| `product_price`       | number        | Yes      |

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

| FormData  | Type   | Required |
| --------- | ------ | -------- |
| `offerId` | string | Yes      |
| `picture` | object | Yes      |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/picture-add (POST)

add picture to a offer

| FormData  | Type   | Required |
| --------- | ------ | -------- |
| `offerId` | string | Yes      |
| `picture` | object | Yes      |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /offer/picture-delete (POST)

delete picture to a offer

| FormData   | Type   | Required |
| ---------- | ------ | -------- |
| `assetId`  | string | Yes      |
| `publicId` | string | Yes      |
| `offerId`  | string | Yes      |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

## Payment

### /payment (POST)

buy a offer

| Body          | Type   | Required |
| ------------- | ------ | -------- |
| `stripeToken` | String | Yes      |
| `price`       | number | Yes      |
| `description` | string | Yes      |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

## /payment/donation (POST)

donation to the web site

| Body    | Type   | Required |
| ------- | ------ | -------- |
| `price` | number | Yes      |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>
