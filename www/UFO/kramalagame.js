let Game = {

	init: function() {

		let backcanvas = document.getElementById("bg-canvas");
		let forcanvas = document.getElementById("fg-canvas");

		let canvas = {
			width: backcanvas.width,
			height: backcanvas.height,
			bgCanvas: backcanvas,
			fgCanvas: forcanvas,
			bContext: backcanvas.getContext("2d"),
			fContext: forcanvas.getContext("2d")
		};

		
	}
};