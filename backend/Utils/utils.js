const constants = require("../constant/constants");

const checkIfOriginAllow = (origin, callback) => {
	if (!origin || constants.allowedOrigins.includes(origin)) {
		callback(null, true);
	} else {
		callback(new Error("Not allowed by CORS"));
	}
}

module.exports = checkIfOriginAllow;