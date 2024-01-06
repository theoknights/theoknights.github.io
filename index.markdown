---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
description: I am a PhD student in the Department of Near Eastern Languages and Civilizations (NELC) at UChicago where I study early modern Ottoman history.
---
<head>
<link rel="canonical" href="https://theoknights.com" />
</head>
<div class="parent-selector">  
  <div style="float: right" class="desktoponly" id="container">
    <img alt="image of Theo Knights" src="{{ site.url }}/images/theoheadshot.jpg" 
            width="250" id="imgClickAndChange"   />
  </div>
  <div style="text-align: center" class="mobileonly" id="container">
    <img src="{{ site.url }}/images/theoheadshot.jpg"  style="max-width:100%;height:auto" />
  </div>

  <div id="container"> 
  </div>
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