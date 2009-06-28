/*
	Global settings file for your presentation.
*/


/*	while creating your presentation, you may want to see how many slides
	there are, and which you're on. This setting enables a progress indicator:
	" Slide x of y " in the top left corner.
	During your actual presentation, you may want this set to false.
*/
Lessig.show_progress = false;

/*
	Default screen colors.
	SlideEffect.invert will reverse these.
*/
Lessig.defaults={
	backgroundColor:"white", // screen
	color:"black",  // text
	fontFamily:"Georgia",
	fontSize:"11em",
	letterSpacing:"-0.07em"
};


/*	what function does the escape key call?  start or end?
	While creating for presentation, it's often handy to be able to jump
	directly to the end, but the default setting is to restart.
*/
Lessig.esc = "start";


/*	If you want to use the experimental Flickr image fetch, 
	provide you API key here.
	
	Afterwards, to can call
		Lessig.flickr(" search terms ")
	in your slides to get an image from the web.
	( safe search, creative commons )
*/

ImgSearch.data.api_key = null;
