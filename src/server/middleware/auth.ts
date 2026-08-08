import { createMiddleware } from "hono/factory";
import { jwtVerify, createRemoteJWKSet } from "jose";

export const accessAuth = createMiddleware(async (c, next) => {
 if (c.env.ENVIRONMENT === "development") {
    // Skip authentication in development environment
    await next();
    return;
  }

  // Verify the POLICY_AUD environment variable is set
  if (!c.env.POLICY_AUD) {
  return c.json("Missing required POLICY_AUD environment variable", 403);
  }

  // Get the JWT from the request headers
  const token = c.req.header("cf-access-jwt-assertion");

  // Check if token exists
  if (!token) {
    return c.json("Missing required CF Access JWT", 403);
    
  }

  try {
    // Create JWKS from your team domain
    const JWKS = createRemoteJWKSet(
      new URL(`${c.env.CF_ACCESS_DOMAIN}/cdn-cgi/access/certs`),
    );

    // Verify the JWT
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: c.env.CF_ACCESS_DOMAIN,
      audience: c.env.POLICY_AUD,
    });

 await next(); // Proceed to the next middleware or route handler if verification is successful
  } catch (err) {
    // Token verification failed
    const error = err as Error; // Type assertion to ensure error is treated as an Error object
    return c.json(`Invalid token: ${error.message}`, 403);
  }
});

