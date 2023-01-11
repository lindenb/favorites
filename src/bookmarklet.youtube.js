function grab(){
	var t= document.title.replace(" - YouTube","").trim();
	var par = t.indexOf("(");
	if(par>=0) t=t.substring(0,par).trim();
	var dash = t.indexOf("-");
	var s="\t{\n\t\"type\":\"song\",\n\t\"author\":\"" +
		(dash<0?t:t.substring(0,dash).trim()) +
		"\",\n\t\"title\":\"" +
		(dash<0?t:t.substring(dash+1).trim())+
		"\",\n\t\"year\":null,\n\t\"lang\":\"en\",\n\t\"youtube\":\"" +
		document.location.href.replace(/&.*/,"") +
		"\",\n\t\"playlist\":[\"\"]\n\t},\n";
	alert(s);
	}
grab();
