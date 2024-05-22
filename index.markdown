---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
description: I am a PhD student in the Department of Near Eastern Languages and Civilizations (NELC) at UChicago where I study early modern Ottoman history.
---
<head>
<link rel="canonical" href="https://theoknights.com" />
</head>
<article>
      <div class="desktoponly" style="float: right;" id="container">
        <img alt="archival image of customs tax" src="{{ site.url }}/images/D_01341_0001_00_023 copy.jpg" 
            style="width: 250px;" />
      </div>
      <div class="mobileonly" style="max-width: 400px; margin: 0 auto;" id="container">
        <img alt="archival image of customs tax" src="{{ site.url }}/images/D_01341_0001_00_023 copy.jpg"
            style="width: 100%;" />
      </div>
      <div id="container" style="padding-top: 20px"> 
      I am a PhD student in NELC at the University of Chicago where I study early modern Ottoman history, with a particular interest in the Empire's changing economic structure during the 17th century.
      <br><br>
    </div>
</article>
<script language="javascript">

        var images = ["{{ site.url }}/images/theoheadshot.jpg"]

var imgState = 0;

var imgTag = document.getElementById("imgClickAndChange");

imgTag.addEventListener("click", function (event) {
  imgState = (++imgState % 1);
	event.target.src = images[imgState];
});
</script>