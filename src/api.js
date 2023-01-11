
var songs = [];
var artists = {}
var playlists ={}

function toArray(a) {
	if(a==null) return [];
	if(Array.isArray(a)) return a;
	return [a];
	}


class Track {
	object
	node = null
	constructor(o) {
    		this.object =o;
  		}
	 getYoutubeID() {
		var url = this.getYoutubeURL();
		if(url==null) return null;
		var  results = url.match('[\\?&]v=([^&#]*)');
		return  results === null ? null : results[1];
		}
	
	imgFromYoutube(size) {
		var id = this.getYoutubeID();
		if(id==null) return null;
		return 'http://img.youtube.com/vi/' + id + '/' + size + '.jpg';
		}

	getSmallImgFromYoutube() {
		return this.imgFromYoutube(2);
		}

	getLargeImgFromYoutube() {
		return this.imgFromYoutube(0);
		}

	getYoutubeURL() {
		return this.object.youtube;
		}

	getArtists() {
		return toArray(this.object.artist)
		}
	getPlaylists() {
		return toArray(this.object.playlist)
		}
	getTitle() {
		return this.object.title;
		}
	createAuthorAnchor(s) {
		var a = document.createElement("a");
		a.setAttribute("class","author");
		a.setAttribute("title",s);
		a.setAttribute("href","#");
		a.appendChild(document.createTextNode(s));
		return a;
		}
	createPlaylistAnchor(s) {
		var a = document.createElement("a");
		a.setAttribute("class","playlist");
		a.setAttribute("title",s);
		a.setAttribute("href","#");
		a.appendChild(document.createTextNode("["+s+"]"));
		return a;
		}
	createLangAnchor(s) {
		var a = document.createElement("a");
		a.setAttribute("class","lang");
		a.setAttribute("title",s);
		a.setAttribute("href","#");
		a.appendChild(document.createTextNode(s));
		return a;
		}
	getNode() {
		if(this.node==null) {
			this.node = document.createElement("div");
			this.node.setAttribute("class","post-container");


			var h3 = document.createElement("div");
			h3.setAttribute("class","post-title");
			this.node.appendChild(h3);

			var  authors = toArray(this.object.author);
			for(var i=0;i< authors.length;i++) {
				h3.appendChild(this.createAuthorAnchor(authors[i]));
				h3.appendChild(document.createTextNode(i+1==authors.length?" : ":" & "));
				}

			/** IMAGE, LINK TO YOUTUBE */
			var div = document.createElement("div");
                        div.setAttribute("class","post-thumb");
			this.node.appendChild(div);

			var src =  this.getSmallImgFromYoutube();
			if(src!=null) {
				var img = document.createElement("img");
				img.setAttribute("src", src);
				img.setAttribute("alt", src);
				img.setAttribute("width", "120");
				img.setAttribute("height", "90");
				div.appendChild(img);
				}
			var div = document.createElement("div");
                        div.setAttribute("class","post-content");
			this.node.appendChild(div);

			var span = document.createElement("span");
			span.appendChild(document.createTextNode(this.getTitle()));
			div.appendChild(span);

			// play list
			span = document.createElement("span");
			var  playlists = toArray(this.object.playlist);
			for(var i=0;i< playlists.length;i++) {
				span.appendChild(this.createPlaylistAnchor(playlists[i]));
				if(i+1 <  playlists.length) span.appendChild(document.createTextNode(" "));
				}
			div.appendChild(span);

			// lang
			var  langs = toArray(this.object.lang);
			span = document.createElement("span");
			for(var i=0;i< langs.length;i++) {
				span.appendChild(this.createLangAnchor(langs[i]));
				if(i+1 <  playlists.length) span.appendChild(document.createTextNode(" "));
				}
			div.appendChild(span);
			}
		return this.node;
		}
	unlink() {
		if(this.node==null) return;
		if(this.node.parentNode==null) return;
		this.node.parentNode.removeChild(this.node);
		}
	}





function reloadData() {
	var N1 = document.getElementById("main");
	N1.setAttribute("class","wrapper");
	for(var i=0;i< data.length; i++) {
		N1.appendChild(data[i].getNode());
		}
	}

window.addEventListener('load',function() {
	for(var i=0;i < data.length; i++) {
		var nn = data[i];
		if(nn.type!="song") continue;
		var t = new Track(data[i]);
		data[i] = t;
		t.getArtists().forEach(E=>artists[E]=1)
		t.getPlaylists().forEach(E=>playlists[E]=1)
		}
	reloadData();
	});
