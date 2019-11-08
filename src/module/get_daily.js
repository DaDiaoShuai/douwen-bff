const { YIWEN } = require("../config/api");

module.exports = () => {
	return {
		uri: `${YIWEN}/today`,
		json: true
	};
};
