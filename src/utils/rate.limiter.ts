import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit'

export const apiLimiter: RateLimitRequestHandler = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 120,
	message:
    'Too many request from this IP, please try again after a ten minutes.',
})