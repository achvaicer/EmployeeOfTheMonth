function WorkHour(day) {

	var self = this;

	var year = parseInt($("#year").val());
	var month = parseInt($("#month").val()) + 1;
	

	var date = new Date(year, month, day);
	var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	// Contants

	this.MinimumEntrance = 9;
	this.MinimumHoursBetweenEntranceAndLunchStart = 3;
	this.MinimumLunchHours = 1;
	this.TotalWorkHours = 8;

	this.getRandomMinutes = function() { return Math.floor(Math.random() * 22); };

	this.TotalLunch = function() { return (new Date(this.EndLunch) - new Date(this.StartLunch)) / 60000; };

	this.padLeftMinutes = function(minutes) { 
		if (!minutes || minutes.toString().length == 0) return "00"; 
		if (minutes.toString().length == 1) return "0" + minutes;
		return minutes;
	}

	this.Entrance = date.addHours(this.MinimumEntrance).addMinutes(this.getRandomMinutes()); 
	this.StartLunch = new Date(this.Entrance).addHours(this.MinimumHoursBetweenEntranceAndLunchStart).addMinutes(this.getRandomMinutes()); 
	this.EndLunch = new Date(this.StartLunch).addHours(this.MinimumLunchHours).addMinutes(this.getRandomMinutes()); 
	this.Exit = new Date(this.Entrance).addHours(this.TotalWorkHours).addMinutes(this.TotalLunch());

	if (!$("#exact8").hasClass("btn-success"))
		if (day % 2 == 0)
			this.Exit = new Date(this.Exit).addMinutes(this.getRandomMinutes() * -1);
		else
			this.Exit = new Date(this.Exit).addMinutes(this.getRandomMinutes());

	function renderWeekend(weekday) {
		var tr = $("<tr />");
		var td = $("<td />");

		tr
			.append(td.clone().text((day) + "/" + month))
			.append(td.clone().text(week[weekday]))
			.append(td.clone().text("**:**"))
			.append(td.clone().text("**:**"))
			.append(td.clone().text("**:**"))
			.append(td.clone().text("**:**"));
			
		return tr;
	}

	this.RenderAsRow = function() {
		var tr = $("<tr />");
		var td = $("<td />");

		var weekday = new Date(year, month - 1, day).getDay();
		if (weekday == 0 || weekday == 6) return renderWeekend(weekday);

		tr
			.append(td.clone().text((day) + "/" + month))
			.append(td.clone().text(week[weekday]))
			.append(td.clone().text(new Date(self.Entrance).getHours() + ":" + self.padLeftMinutes(new Date(self.Entrance).getMinutes())))
			.append(td.clone().text(new Date(self.StartLunch).getHours() + ":" + self.padLeftMinutes(new Date(self.StartLunch).getMinutes())))
			.append(td.clone().text(new Date(self.EndLunch).getHours() + ":" + self.padLeftMinutes(new Date(self.EndLunch).getMinutes())))
			.append(td.clone().text(new Date(self.Exit).getHours() + ":" + self.padLeftMinutes(new Date(self.Exit).getMinutes())));

		return tr;

	};



	return this;
}