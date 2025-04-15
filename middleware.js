export { default } from "next-auth/middleware"

// The most simple usage is when you want to require authentication for your entire site. You can add a middleware.js file with the following:
// If you only want to secure certain pages, export a config object with a matcher:
// Now you will still be able to visit every page, but only these below pages will require authentication.
export const config = { matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"] }
