var normalize_race = function (req_query) {
    var params = {};
    if (req_query.raceid) {
        params.id = req_query.raceid;
    }
    return params;
}

var normalize_result = function (req_query) {
    var params = {};
    if (req_query.resultid) {
        params.id = req_query.resultid;
    }
    return params;
}

var normalize_person = function (req_query) {
    var params = {};
    if (req_query.personid) {
        params.id = req_query.personid;
    }
    return params;
}

module.exports = { normalize_race, normalize_result, normalize_person };

