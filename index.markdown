---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
description: I am a PhD student in the Department of Near Eastern Languages and Civilizations (NELC) at UChicago where I study early modern Ottoman history.
---

<div style="float: right" class="desktoponly" id="container">
	<!--<img src={{ site.url }}/images/theoheadshot.jpg width="250" />-->
<img alt="an image of Theo" src="{{ site.url }}/images/theoheadshot.jpg" 
        width="250" id="imgClickAndChange"   />
</div>
<div style="text-align: center" class="mobileonly" id="container">
	<img src="{{ site.url }}/images/theoheadshot.jpg"  style="max-width:100%;height:auto" />

</div>

<div class="parent-selector" style="padding-top: 20px">  
  <div id="container"> 
	I am a PhD student in the Department of Near Eastern Languages and Civilizations at the University of Chicago where I study early modern Ottoman history. My research interests include examining Ottoman reading practices through multi-text miscellanies (<i>mecmûa</i>) and employing microhistorical approaches to explore Ottoman involvement in the global trade and scholarly networks of early modernity. Prior to joining NELC, I was a Nizami Ganjavi Centre Scholar at the University of Oxford where I received an MSt in Oriental Studies. I also hold an MA from the University of Chicago’s Center for Middle Eastern Studies. 
  <br><br>
	My graduate thesis at Oxford titled “The Origins of an Ottoman Bourgeois Social Reformer: Recontextualizing Mustafa Suphi’s Early Thought” advances a new understanding of the early writings of the late Ottoman intellectual Mustafa Suphi based on a careful re-reading of his pamphlet <i>Vazîfe-i Temdîn</i> (<i>The Civilizing Mission</i>) and previously unstudied documents from Suphi’s time as a student in Paris. 
  <br><br>
	
	I am also the student coordinator for the University of Chicago's Middle East History and Theory Workshop and graduate student conference. Interested presenters and participants can find out more on the <a href="{{ site.url }}/blog/">MEHAT tab</a>.

  <br><br>
	
	<a href="https://twitter.com/TheoKnights?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @TheoKnights</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
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