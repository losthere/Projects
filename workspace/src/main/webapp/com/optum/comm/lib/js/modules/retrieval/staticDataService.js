// Can be used throughout the application
angular.module("staticDataService", []).factory("staticDataService", function() {

	function queryStaticData(filterCondition, staticData, callback) {

		var recordsPerPage = filterCondition.recordsPerPage;
		var pageNumber = filterCondition.pageNumber;
		var filteredData = staticData.slice();

		// sort
		if (typeof filterCondition.sortBy === 'object') {
			filterCondition.sortOrder = _.map(filterCondition.sortOrder, function(element) {
				return (element === -1) ? 'desc' : 'asc';
			});
			filteredData = _.sortByOrder(filteredData, filterCondition.sortBy, filterCondition.sortOrder);
		} else if (filterCondition.sortBy && filterCondition.sortBy.length > 0) {
			filterCondition.sortBy.forEach(function(sortByField, index) {
				var sortOrder = filterCondition.sortOrder[index];
				if (sortByField && sortOrder) {
					filteredData = _.sortBy(filteredData, sortByField);
					filteredData = sortOrder === -1 ? filteredData.reverse() : filteredData;
				}
			});
		}

		var totalRecordsCount = filteredData.length;
		// paginate
		if (pageNumber && recordsPerPage) {
			filteredData = filteredData.splice(pageNumber > 1 ? ((pageNumber - 1) * recordsPerPage) : 0, recordsPerPage);
		}

		callback({
			totalRecordsCount : totalRecordsCount,
			records : filteredData
		});
	};

	return {
		query : queryStaticData
	}

});