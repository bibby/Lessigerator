/*
A Lessig Method presentation "slideware" object
@author bibby <bibby@surfmerchants.com>
*/

var Lessig={
	slides:[],
	sli:0,
	blankSlide:null,
	screen:null,
	
	// long story. short version-> http://stackoverflow.com/questions/1053329/css-text-align-bug
	fontOffset:0.76,
	defaults:{
		backgroundColor:"white",
		color:"black",
		maxSize:200
	},
	
	// escape key does what?  start | end
	esc:"start",
	
	next:function()
	{
		this.sli++;
		this.drawSlide();
	},
	prev:function()
	{
		this.sli--;
		this.drawSlide();
	},
	start:function()
	{
		this.sli=0;
		this.drawSlide();
	},
	
	end:function()
	{
		this.sli = this.slides.length-1;
		this.drawSlide();
	},
	
	clear:function()
	{
		this.screen.innerHTML="";
	},
	
	/*for when viewport intentionally changes*/
	fix:function()
	{
		this.getViewport();
		this.drawSlide();
	},
	
	drawSlide:function()
	{
		this.clear();
		if(this.slides[ this.sli ])
			this.slides[ this.sli ].draw();
		else
			this.blankSlide.draw();
		
	},
	
	vp:{},
	
	init:function()
	{
		this.screen = document.body;
		this.getViewport();
		this.blankSlide = new Slide();
		
		extend( this.screen.style , {
			textAlign:"center",
			overflow:"hidden",
			backgroundColor:Lessig.defaults.backgroundColor
		});
		
		window.onkeypress = function(e)
		{
			if(!e) e = event;
			var key=(e.keyCode)?e.keyCode:0;
			switch(key)
			{
				case 37:
					Lessig.prev();
				break;
				case 39:
					Lessig.next();
				break;
				case 27:
					Lessig[ Lessig.esc ]();
				break;
			}
		}
		
		this.start();
	},
	// a found function
	getViewport:function()
	{
		var viewportwidth;
		var viewportheight;
		 
		 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
		 if (typeof window.innerWidth != 'undefined')
		 {
			  viewportwidth = window.innerWidth,
			  viewportheight = window.innerHeight
		 }
		 
		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
		 else if (typeof document.documentElement != 'undefined'
			 && typeof document.documentElement.clientWidth !=
			 'undefined' && document.documentElement.clientWidth != 0)
		 {
			viewportwidth = document.documentElement.clientWidth,
			viewportheight = document.documentElement.clientHeight
		 }
		 
		 // older versions of IE
		else
		{
			viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
			viewportheight = document.getElementsByTagName('body')[0].clientHeight
		}
		
		this.vp.w = viewportwidth;
		this.vp.h = viewportheight;
	}
};

window.onload = function()
{
	Lessig.init();
};
