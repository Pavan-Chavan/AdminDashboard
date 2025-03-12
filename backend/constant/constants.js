const constants = {
	allowedOrigins : [
		process.env.ADMIN_FRONTEND_DOMAIN,
		process.env.KRUSHI_MAHA_FRONTEND_DOMAIN,
		process.env.ADMIN_FRONTEND_LOCAL_URL,
		process.env.LOCAL_JIO_KHETI_FRONTEND_DOMAIN
	]
}

module.exports = constants;