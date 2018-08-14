//
// Available modules include (this is not a complete list):
var Scene = require('Scene');
// var Textures = require('Textures');
// var Materials = require('Materials');
var FaceTracking = require('FaceTracking');
var FaceGestures = require('FaceGestures');
var Animation = require('Animation');
var Diagnostics = require('Diagnostics');

// var Reactive = require('Reactive');

var hotdog = Scene.root.find('fbxHotdog');

var hotdogDriver = Animation.timeDriver({durationMilliseconds: 500, loopCount:Infinity});
var hotdogSampler = Animation.samplers.easeInSine(55,-10);
var hotdogAnim = Animation.animate(hotdogDriver, hotdogSampler);
hotdog.transform.z = hotdogAnim;


var face = FaceTracking.face(0);

FaceGestures.hasMouthOpen(face).monitor().subscribe(function(changedValue) {
	if (changedValue.newValue) {
		Diagnostics.log('Mouth open!');
		hotdogDriver.reset();
		hotdogDriver.start();
		hotdog.hidden = false;
	} else {
		Diagnostics.log('Mouth closed!');
		hotdogDriver.stop();
		hotdog.hidden = true;
	}
});