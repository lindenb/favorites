/** apptainer build --disable-cache yt-dlp.sif docker://jauderho/yt-dlp */

/*  ~/packages/nextflow run -work-dir /media/partoche/PUBLIC/TMP main.nf --outdir /media/partoche/PUBLIC/Music */

String norm(Object s) {
	if(s==null) s="";
	return java.text.Normalizer.normalize(s.toString(), java.text.Normalizer.Form.NFD);
	}
workflow {
	ch1 = Channel.fromPath("music.json").splitJson().
		filter{it.youtube}.
		map{[it.title,it.author,it.youtube]}

	DOWNLOAD(ch1);
	
	ch2 = ch1.map{[it[2],it[0]+" "+it[1]]}.
		mix(DOWNLOAD.out.url.map{[it,""]}).
		groupTuple().
		filter{it[1].size()==1}
		view().
		map{[it[0],it[1][0]]}
		map{it.join("\t")}.
		collect()
	
	MISSING(ch2)
}

process DOWNLOAD {
tag "${title} ${author} ${url}"
input:
	tuple val(title),val(author),val(url)
output:
	path("*.mp3"),emit:mp3
	val(url),emit:url
script:
	def s = norm(author)+" "+norm(title)
	def prefix= s.trim().replaceAll("[^A-Za-z0-9]+","_")
"""
apptainer run \\
/home/lindenb/TMP/yt-dlp.sif  \\
	--extract-audio \\
	-t mp3  \\
	-o ${prefix} "${url}"
"""
}

process MISSING {
input:
	val(L)
output:
	path("missing.txt")
script:
"""
cat << EOF  | sort > missing.txt
${L.join("\n")}
EOF
"""
}
