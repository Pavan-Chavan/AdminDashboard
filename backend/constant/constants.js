const constants = {
	allowedOrigins : [
		process.env.ADMIN_FRONTEND_DOMAIN,
		process.env.KRUSHI_MAHA_FRONTEND_DOMAIN,
		process.env.ADMIN_FRONTEND_LOCAL_URL
	]
}

module.exports = constants;