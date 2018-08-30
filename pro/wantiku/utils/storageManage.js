require("../config.js");

module.exports = {
    headerStorageFilter: function(e, r) {
        e.VersionNumber != r.VersionNumber && (e.VersionNumber = r.VersionNumber);
    }
};