# Authentication

SCB Open API platform allows partners to access the resources of SCB, you need to follow the authentication process before make request on the API.

This process uses the international OAuth 2.0 standard protocol for user authentication and authorization. There are two authentication mechanisms which are Server token (2­ legged OAuth) and User access token (3­legged OAuth) for accessing the resource of SCB so that you can follow along with authenticating and making request on the API in guides linked below.

## 1.Server token authentication

When you create an application on your account, the APIKey and SecretKey are automatically generated for you. You will need these to make calls from your application to the SCB Open API endpoint.

## API Explorer

## 2. User access token authentication

The SCB Open API uses OAuth2.0 to allow partners to get a user access token to access a single user's data that allow partner to make requests on behalf of a user without accessing passwords and other sensitive information.

## Step 1 ­- User authorize
The SCB customer has to grant your application permission to access their data or do actions on their behalf. SCB Open API provides an authorization deeplink to open SCB Easy application authorization page where users can securely sign in with their SCB Easy PIN and give a consent to grant permission to your application. This authorization page is accessed through the authorization deeplink. To ensure that the SCB customer grants permissions to your application properly, supply query parameters to that URL as described below.

## API Explorer

<div class="swagger" id="swagger1"  data-swagger-file="authentication.json"></div>

## Step 2 ­- Receive authorization code
Once the SCB customer authenticated and authorized your application, SCB Easy application will redirect to your application with user authorization code which will expire in 1 minute.

## Step 3 ­- Get access token
Use the generate token API to exchange the authorization code for an access token which will expire in 30 minutes. The access token will allow you to make requests on behalf of the user or sensitive SCB customer information.

## Step 4 ­- Refresh access token
When you requested the access token, the response will include a refresh token which can be used to renew the access token. Refreshing the user access token means that you do not need to ask the user to authorize your application for the same permissions again.