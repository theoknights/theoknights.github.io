---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
description: I am a PhD student in the Department of Near Eastern Languages and Civilizations (NELC) at UChicago where I study early modern Ottoman history.
---
<head>
<link rel="canonical" href="https://theoknights.com" />
</head>

  <div id="container"> 
	I am a PhD student in the Department of Near Eastern Languages and Civilizations at the University of Chicago where I study early modern history.
  <br><br>
	
  </div>

<script language="javascript">

        var images = ["{{ site.url }}/images/theoheadshot.jpg"]

var imgState = 0;

var imgTag = document.getElementById("imgClickAndChange");

imgTag.addEventListener("click", function (event) {
  imgState = (++imgState % 1);
	event.target.src = images[imgState];
});
</script>