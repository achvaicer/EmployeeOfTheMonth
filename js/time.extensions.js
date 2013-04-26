Date.prototype.addHours = function(h){
	var date = new Date(this);
    date.setHours(date.getHours()+h);
    return new Date(date);
}

Date.prototype.addMinutes = function(m){
	var date = new Date(this);
    date.setMinutes(date.getMinutes()+m);
    return new Date(date);
};