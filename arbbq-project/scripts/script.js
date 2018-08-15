//
// Available modules include (this is not a complete list):
var Scene = require('Scene');
// var Textures = require('Textures');
var Materials = require('Materials');
var FaceTracking = require('FaceTracking');
var FaceGestures = require('FaceGestures');
var Animation = require('Animation');
var Diagnostics = require('Diagnostics');

// var Reactive = require('Reactive');

//FACETRACKER stuff
var face = FaceTracking.face(0);

FaceGestures.hasMouthOpen(face).monitor().subscribe(function(changedValue) {
	if (changedValue.newValue) {
		Diagnostics.log('Mouth open!');
		hotdogDriver.reset();
		hotdogDriver.start();
		hotdog.hidden = false;

    //burger
    burgerDriver.reset();
    burgerDriver.start();
    burger.hidden = false;

	//	leftLaser.hidden = false;
	//	rightLaser.hidden = false;
		//laserDriver.reset();
		//laserDriver.start();
	} else {
		Diagnostics.log('Mouth closed!');
		hotdogDriver.stop();
		hotdog.hidden = true;

    //burger
    burgerDriver.stop();
    burger.hidden = true;

		//laserDriver.start();
		leftLaser.hidden = true;
		rightLaser.hidden = true;
	}
});

var len = 1200;

//HOTDOG!
var hotdog = Scene.root.find('fbxHotdog');
var hotdogDriver = Animation.timeDriver({durationMilliseconds: len, loopCount:Infinity});
var hotdogSampler = Animation.samplers.easeInSine(55,-10);
var hotdogAnim = Animation.animate(hotdogDriver, hotdogSampler);
hotdog.transform.z = hotdogAnim;

//BURGER!
var burger = Scene.root.find('burger');
var burgerDriver = Animation.timeDriver({durationMilliseconds: len, loopCount:Infinity});
var burgerSampler = Animation.samplers.easeInSine(55,-10);
var burgerAnim = Animation.animate(burgerDriver, burgerSampler);
burger.transform.z = burgerAnim.delayBy({milliseconds: len/2});

//LASERS!
var leftLaser = Scene.root.find('beam-left');
var rightLaser = Scene.root.find('beam-right');
var laserDriver = Animation.timeDriver({durationMilliseconds: len, loopCount:Infinity});
var laserSamplers = Animation.samplers.easeInSine([1,degToRad(90),degToRad(2), .028],[0,degToRad(130),degToRad(15), .001]); //opacity, xrot, yrot
var laserAnim = Animation.animate(laserDriver, laserSamplers);
Materials.get('laser-mtl').opacity = laserAnim.get(0);
leftLaser.transform.rotationX = laserAnim.get(1);
rightLaser.transform.rotationX = laserAnim.get(1);
leftLaser.transform.rotationY = laserAnim.get(2);
rightLaser.transform.rotationY = laserAnim.get(2).neg();
leftLaser.transform.scaleY = rightLaser.transform.scaleY = laserAnim.get(3);


//HELPERS
function degToRad(d){return d*0.0174533;}

