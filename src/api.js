
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
	getNode() {
		if(this.node==null) {
			this.node = document.createElement("div");
			this.node.appendChild(document.createTextNode(this.getTitle()));
			var src =  this.getSmallImgFromYoutube();
			if(src!=null) {
				var img = document.createElement("img");
				img.setAttribute("src", src);
				img.setAttribute("alt", src);
				img.setAttribute("width", "120");
				img.setAttribute("height", "90");
				this.node.appendChild(img);
				}
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
