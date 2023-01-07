
var songs = [];
var artists = {}
var playlists ={}

function getYoutubeID(url) {
	if(url==null) return null;
	var  results = url.match('[\\?&]v=([^&#]*)');
        return  results === null ? null : results[1];
	}

function imgFromYoutube(url,size) {
	var id = getYoutubeID(url);
	if(url==null) return null;
	return 'http://img.youtube.com/vi/' + id + '/' + size + '.jpg';
	}

function getSmallImgFromYoutube(url) {
	return imgFromYoutube(url,2);
	}

function getLargeImgFromYoutube(url) {
	return imgFromYoutube(url,0);
	}


function toArray(a) {
	if(a==null) return [];
	if(Array.isArray(a)) return a;
	return [a];
	}


function reloadData() {
	song=[];
	for(var i=0;i < data.length; i++) {
		var nn = data[i];
		if(nn.type!="song") continue;
		toArray(nn.artist).forEach(E=>artists[E]=1)
		toArray(nn.playlist).forEach(E=>playlists[E]=1)
		}
	var N1 = document.getElementById("main");
	N1.setAttribute("class","wrapper");
	for(var i=0;i< data.length; i++) {
		var nn = data[i];
		var d = document.createElement("div");
		N1.appendChild(d);
		d.appendChild(document.createTextNode(nn.title));
		var img = document.createElement("img");
		img.setAttribute("src",getSmallImgFromYoutube(nn.youtube));
		d.appendChild(img);
		}
	}

window.addEventListener('load',function() {
	reloadData();
	});
