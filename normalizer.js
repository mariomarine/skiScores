var normalize_race = function (query) {
    var race_query = {};
    if (query.raceid) {
        race_query.id = query.raceid;
    }
    return race_query;
}

module.exports = { normalize_race };

