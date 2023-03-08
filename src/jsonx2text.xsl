<?xml version='1.0' ?>
<xsl:stylesheet
	xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
	xmlns:x="http://www.ibm.com/xmlns/prod/2009/jsonx"
	version='1.0'
	>

<xsl:output method="text" />


<xsl:template match="/">
<xsl:apply-templates/>
</xsl:template>

<xsl:template match="x:object[x:string[@name='type']='song']">
<xsl:apply-templates select="x:string[@name='title']"/>
<xsl:text>	</xsl:text>
<xsl:apply-templates select="*[@name='author']"/>
<xsl:text>	</xsl:text>
<xsl:apply-templates select="*[@name='youtube']"/>
<xsl:text>	</xsl:text>
<xsl:text>
</xsl:text>
</xsl:template>


<xsl:template match="x:string">
<xsl:value-of select="normalize-space(.)"/>
</xsl:template>

<xsl:template match="x:array[@name='author']">
<xsl:for-each select="*">
<xsl:choose>
 <xsl:when test="position()=1">
 </xsl:when>
 <xsl:otherwise>
    <xsl:text>, </xsl:text>
 </xsl:otherwise>
</xsl:choose>
<xsl:apply-templates select="."/>
</xsl:for-each>
</xsl:template>

</xsl:stylesheet>
