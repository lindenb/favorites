<?xml version='1.0' ?>
<xsl:stylesheet
	xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
	xmlns:x="http://www.ibm.com/xmlns/prod/2009/jsonx"
	version='1.0'
	>

<xsl:output method="html" />


<xsl:template match="/">
<html>
<head>
<title><xsl:value-of select="count(x:array/x:object)"/> Song(s)</title>
<script src="https://www.youtube.com/iframe_api"></script>
<script>

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
return array;
}


var G = {
'videos': shuffleArray([
<xsl:for-each select="x:array/x:object[not(x:string[@name='copyrighted'])]">
<xsl:choose>
 <xsl:when test="position()=1">
 </xsl:when>
 <xsl:otherwise>
    <xsl:text>, </xsl:text>
 </xsl:otherwise>
</xsl:choose>
<xsl:text>{"youtube":"</xsl:text>
<xsl:value-of select="x:string[@name='youtube']/text()"/>","title":"<xsl:value-of select="x:string[@name='title']/text()"/>","copyrighted":false}
</xsl:for-each>
]),
'video_idx': -1,
'player': null
};




    function onYouTubeIframeAPIReady() {
        nextPlayer();
    }

    function extract_video_id(url) {
		var x = url.indexOf("v=");
		url = url.substring(x+2);
		x= url.indexOf("&amp;");
		if(x!=-1) url=url.substring(0,x);
		return url;
		}

    function  nextPlayer() {
	G.video_idx++;
	if(G.video_idx &gt;= G.videos.length) G.video_idx = 0;
     console.log("play video "+G.video_idx);
	var div = document.getElementById('player1');
	var parent  = div.parentNode;
    parent.removeChild(div);
    div = document.createElement("div");
    div.setAttribute("id","player1");
    parent.appendChild(div);
    

    document.getElementById('t1').textContent=G.videos[G.video_idx].title;

        G.player = new YT.Player('player1', {
            height: '350',
            width: '425',
            videoId: extract_video_id(G.videos[G.video_idx].youtube),
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
                }
            });
	
	}


    function onPlayerReady(event) {
       if(event.target.getPlayerState() &lt; 0 ) {
            var video = G.videos[G.video_idx];
            if(video.copyrighted!=true) {
                var pre= document.getElementById("pre1");
                video.copyrighted = true;
                pre.appendChild(document.createTextNode(video.youtube+"\n"));
                }
            nextPlayer();
            }
        else
           {
           event.target.playVideo();
           }
    }

    function onPlayerStateChange(event) {
        console.log("EVENT="+event);
        if (event.data == YT.PlayerState.ENDED) {
             nextPlayer();
        }
    }

</script>
</head>
<div>
<h1 id="t1"></h1>
<div id="player1"/>
</div>
<button onclick="nextPlayer();">Next</button>
<hr/>
<pre id="pre1"></pre>
</html>
</xsl:template>


</xsl:stylesheet>
