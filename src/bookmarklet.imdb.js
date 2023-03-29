function grab(){
	var L2 = document.getElementsByTagName("script");
	for(var i=0;i<L2.length;i++) {
		var n1 = L2[i];
		if(n1.getAttribute("type")!="application/ld+json") continue;
		var j = JSON.parse(n1.textContent);
		
		
		var s="\t{\n\t\"type\":\"movie\",\n\t\"title\":\"" + 
			j.name+"\",\n\t\"image\": \"" + j.image +
			"\",\n\t\"synopsis\":\"" + j.description +
			"\",\n\t\"date\":\"" + j.datePublished + 
			"\",\n\t\"duration\":\"" + j.duration +
			"\",\n\t\"genre\":[";
		if(j.genre) {
			for(var i in j.genre) {
				if(i>0) s+=",";
				s+= "\""+ j.genre[i] + "\"";
				}
			}
		s += "],\n\t\"director\":[";
		if(j.director) {
			for(var i in j.director) {
				if(i>0) s+=",";
				s+= "\""+ j.director[i].name + "\"";
				}
			}
		
		s += "],\n\t\"actors\":[";
		if(j.actor) {
			for(var i in j.actor) {
				if(i>0) s+=",";
				s+= "\""+ j.actor[i].name + "\"";
				}
			}
			
			
		s+="],\n\t\"youtube\":\"\",\n\t\"note\":-1.0\n\t},"
		
		alert(s);
		break;
		}
	
	}
grab();
