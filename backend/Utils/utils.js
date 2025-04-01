const constants = require("../constant/constants");

const checkIfOriginAllow = (origin, callback) => {
	if (!origin || constants.allowedOrigins.some(allowedOrigin => {
		const originDomain = new URL(origin).hostname.replace(/^www\./, '');
		const allowedDomain = new URL(allowedOrigin).hostname.replace(/^www\./, '');
		return originDomain === allowedDomain;
	})) {
		callback(null, true);
	} else {
		callback(new Error("Not allowed by CORS"));
	}
}

module.exports = checkIfOriginAllow;