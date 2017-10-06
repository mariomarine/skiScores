// Controller to display Races
module.exports = {
    index(req,res,next) {
        // localhost:8000/api/races
        return res.post('Woohoo!');
    },
    getRaces(req,res,next) {
        // do some database work...
    }

};
