const { YIWEN } = require("../config/api");

module.exports = (data=null) => {
    return {
		uri: `${YIWEN}/day`,
		json: true,
		qs: data
	};
}