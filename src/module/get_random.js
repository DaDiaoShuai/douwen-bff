const { YIWEN } = require("../config/api");

module.exports = () => {
	return {
		uri: `${YIWEN}/random`,
		json: true
	};
};
