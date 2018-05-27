class StaticFeedData {
	constructor(dataType, keys, data) {
		this.dataType = dataType;
		this.keys = keys;
		this.data = data || [];
	}

	addData(obj) {
		this.data.push(obj);
	}

	findDataByKey(key, value) {
		if (this.keys.includes(key)) {
			for (let i = 0; i < this.data.length; i++) {
				if (data[i].key === value) {
					return data[i];
				}
			}
			return null;
		}
		return null;
	}
}

module.exports = StaticFeedData;