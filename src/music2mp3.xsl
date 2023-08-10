<?xml version='1.0'  encoding="iso-8859-1"?>
<xsl:stylesheet
	xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
	xmlns:x="http://www.ibm.com/xmlns/prod/2009/jsonx"
	version='1.0'
	>

<xsl:output method="text" />


<xsl:template match="/">

<xsl:text>#!/bin/bash
mkdir -p MP3
set -x
MINWAIT=10
MAXWAIT=30

</xsl:text>


<xsl:for-each select="x:array/x:object[x:string[@name='youtube']]">
<xsl:sort select="number(substring(generate-id(),4)) mod 31"/>
<xsl:apply-templates select="."/>
</xsl:for-each>
</xsl:template>

<xsl:template match="x:object[x:string[@name='type']='song']">

<xsl:variable name="filename">
<xsl:text>MP3/</xsl:text>
<xsl:choose>
	<xsl:when test="x:string[@name='author']">
		<xsl:apply-templates select="x:string[@name='author']"/>
	</xsl:when>
	<xsl:otherwise>
		<xsl:apply-templates select="x:array[@name='author']"/>
	</xsl:otherwise>
</xsl:choose>
<xsl:text>_</xsl:text>
<xsl:apply-templates select="x:string[@name='title']"/>
<xsl:text>.mp3</xsl:text>
</xsl:variable>
<xsl:text>
if test ! -f '</xsl:text>
<xsl:value-of select="$filename"/>
<xsl:text>' ; then
</xsl:text>

<xsl:text>	youtube</xsl:text>
<xsl:text>-</xsl:text>
<xsl:text>dl</xsl:text>
<xsl:text> --extract-audio --audio-format mp3 -o '</xsl:text>
<xsl:value-of select="$filename"/>
<xsl:text>' "</xsl:text>
<xsl:value-of select="normalize-space(x:string[@name='youtube']/text())"/>
<xsl:text>" &amp;&amp; echo -n "count:" && find MP3 -type f -name "*.mp3" | wc -l &amp;&amp; sleep $((MINWAIT+RANDOM % (MAXWAIT-MINWAIT)))
fi
</xsl:text>
</xsl:template>



<xsl:template match="x:string">
<xsl:variable name="allowedSymbols" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'"/>
<xsl:value-of select="translate(normalize-space(.),translate(normalize-space(.),$allowedSymbols,''),'')"/>
</xsl:template>

<xsl:template match="x:array[@name='author']">
<xsl:apply-templates select="x:string[1]"/>
</xsl:template>

</xsl:stylesheet>
