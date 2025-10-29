

/* ********** GENERAL SCRIPTING **********************

		This templates shows what you can do in this is module script
		All the code outside functions will be executed each time this script is loaded, meaning at file load, when hitting the "reload" button or when saving this file
*/


// You can add custom parameters to use in your script here, they will be replaced each time this script is saved
var myKitParam = script.addIntParameter("Kit Param","Kit Number",0,0,127); 		//This will add a float number parameter (slider), default value of 0.1, with a range between 0 and 1

//Here are all the type of parameters you can create
/*
var myTrigger = script.addTrigger("My Trigger", "Trigger description"); 									//This will add a trigger (button)
var myBoolParam = script.addBoolParameter("My Bool Param","Description of my bool param",false); 			//This will add a boolean parameter (toggle), defaut unchecked
var myFloatParam = script.addFloatParameter("My Float Param","Description of my float param",.1,0,1); 		//This will add a float number parameter (slider), default value of 0.1, with a range between 0 and 1
var myIntParam = script.addIntParameter("My Int Param","Description of my int param",2,0,10); 				//This will add an integer number parameter (stepper), default value of 2, with a range between 0 and 10
var myStringParam = script.addStringParameter("My String Param","Description of my string param", "cool");	//This will add a string parameter (text field), default value is "cool"
var myColorParam = script.addColorParameter("My Color Param","Description of my color param",0xff0000ff); 	//This will add a color parameter (color picker), default value of opaque blue (ARGB)
var myP2DParam = script.addPoint2DParameter("My P2D Param","Description of my p2d param"); 					//This will add a point 2d parameter
var myP3DParam = script.addPoint3DParameter("My P3D Param","Description of my p3d param"); 					//This will add a point 3d parameter
var myTargetParam = script.addTargetParameter("My Target Param","Description of my target param"); 			//This will add a target parameter (to reference another parameter)
var myEnumParam = script.addEnumParameter("My Enum Param","Description of my enum param",					//This will add a enum parameter (dropdown with options)
											"Option 1", 1,													//Each pair of values after the first 2 arguments define an option and its linked data
											"Option 2", 5,												    //First argument of an option is the label (string)
											"Option 3", "banana"											//Second argument is the value, it can be whatever you want
											); 	

var myFileParam = script.addFileParameter("My File Param", "Description of my file param");					//Adds a file parameter to browse for a file. Can have a third argument "directoryMode" 										
*/


//you can also declare custom internal variable
//var myValue = 5;

/*
 The init() function will allow you to init everything you want after the script has been checked and loaded
 WARNING it also means that if you change values of your parameters by hand and set their values inside the init() function, they will be reset to this value each time the script is reloaded !
*/
function init()
{
	myKitParam.set(0);
	//myFloatParam.set(5); //The .set() function set the parameter to this value.
	//myColorParam.set([1,.5,1,1]);	//for a color parameter, you need to pass an array with 3 (RGB) or 4 (RGBA) values.
	//myP2DParam.set([1.5,-5]); // for a Point2D parameter, you need to pass 2 values (XY)
	//myP3DParam.set([1.5,2,-3]); // for a Point3D parameter, you need to pass 3 values (XYZ)
}

/*
 This function will be called each time a parameter of your script has changed
*/
function scriptParameterChanged(param)
{
	//You can use the script.log() function to show an information inside the logger panel. To be able to actuallt see it in the logger panel, you will have to turn on "Log" on this script.
	script.log("Parameter changed : "+param.name); //All parameters have "name" property
	if(param.is(myTrigger)) 
	{
		script.log("Trigger !"); //You can check if two variables are the reference to the same parameter or object with the method .is()
		//Here we can for example show a "Ok cancel" box. The result will be called in the messageBoxCallback function below
		//util.showOkCancelBox("myBoxId", "Super warning!", "This is a warning for you", "warning", "Got it","Naaah");
	}
	else if(param.is(myEnumParam))
	{
		script.log("Key = "+param.getKey()+", data = "+param.get()); //The enum parameter has a special function getKey() to get the key associated to the option. .get() will give you the data associated
	}
	else
	{
		script.log("Value is "+param.get()); //All parameters have a get() method that will return their value
	} 
}

/*
 This function, if you declare it, will launch a timer at 50hz, calling this method on each tick
*/
/*
function update(deltaTime)
{
	script.log("Update : "+util.getTime()+", delta = "+deltaTime); //deltaTime is the time between now and last update() call, util.getTime() will give you a timestamp relative to either the launch time of the software, or the start of the computer.
}
*/

/*
 This function, if you declare it, will be called when after a user has made a choice from a okCancel box or YesNoCancel box that you launched from this script 
*/
/*
function messageBoxCallback(id, result)
{
	script.log("Message box callback : "+id+" > "+result); //deltaTime is the time between now and last update() call, util.getTime() will give you a timestamp relative to either the launch time of the software, or the start of the computer.
}
*/

/* ********** MODULE SPECIFIC SCRIPTING **********************

	The "local" variable refers to the object containing the scripts. In this case, the local variable refers to the module.
	It means that you can access any control inside  this module by accessing it through its address.
	For instance, if the module has a float value named "Density", you can access it via local.values.density
	Then you can retrieve its value using local.values.density.get() and change its value using local.values.density.set()
*/

/*
 This function will be called each time a parameter of this module has changed, meaning a parameter or trigger inside the "Parameters" panel of this module
 This function only exists because the script is in a module
*/
function moduleParameterChanged(param)
{
	if(param.isParameter())
	{
		script.log("Module parameter changed : "+param.name+" > "+param.get());
	}else 
	{
		script.log("Module parameter triggered : "+param.name);	
	}
}

/*
 This function will be called each time a value of this module has changed, meaning a parameter or trigger inside the "Values" panel of this module
 This function only exists because the script is in a module
*/
function moduleValueChanged(value)
{
	if (value.name !== "bpm") {
		if(value.isParameter())
		{
			script.log("Module value changed : "+value.name+" > "+value.get());	
			if ((value.name === '_10_ProgramChange')) {
				script.log("is program change");
				myKitParam.set(value.get());

			}
		}else 
		{
			script.log("Module value triggered : "+value.name);	
		}

		}
	
}

/* ********** MIDI MODULE SPECIFIC SCRIPTING ********************* */
/*

MIDI Modules have specific methods that can be used to send MIDI events such as noteOn, noteOff, controlChange and sysEx messages from Script.
If you want to send a MIDI event from this script, you can do the following :

local.sendNoteOn(1, 12, 127); //This will send a NoteOn Event on channel 1, pitch 12, velocity 127
local.sendNoteOff(1, 12); //This will send a NoteOff Event on chanenl 1, pitch 12
local.sendCC(3, 20, 65); //This will send a ControlChange on channel 3, number 20, value 65
local.sendSysex(15,20,115,10); //This will send 4 bytes as a SysEx message
local.sendPitchWheel (3, 2000);
local.sendChannelPressure (1, 67);
local.sendAfterTouch (3, 20, 65);
*/

/*
You can intercept MIDI Events with the functions below
*/

function noteOnEvent(channel, pitch, velocity)
{
	script.log("Note on received "+channel+", "+pitch+", "+velocity);
}


function noteOffEvent(channel, pitch, velocity)
{
	script.log("Note off received "+channel+", "+pitch+", "+velocity);
}

function lookup(channel, number) {
	var numTable = {
		"11": {
			"1": { category: 16, lower: 1, upper: 0, single: true }, // Reverb Type
			"3": { category: 16, lower: 1, upper: 1, type:'double' }, // Reverb Time
			"4": { category: 16, lower: 1, upper: 5, single: true }, // Reverb Pre Delay
			"5": { category: 16, lower: 1, upper: 6, single: true }, // Reverb Lo Cut
			"6": { category: 16, lower: 1, upper: 7, single: true }, // Reverb Hi Cut
			"7": { category: 16, lower: 2, upper: 0x1C, type:'double' }, // Delay Reverb Send
			"8": { category: 16, lower: 2, upper: 0, single: true }, // Delay Type
			"9?": { category: 16, lower: 2, upper: 1, single: true }, // Delay Sync

			"22": { category: 16, lower: 3, upper: 0x29, type:'double' }, // MFX Phaser Rate
			"23": { category: 16, lower: 3, upper: 0x31, extraZero: true }, // MFX Phaser Type / Flanger LoCut F0 41 10 00 00 00 6D 12 10 ga 03 31 00 pp xx F7 check this one
			"24": { category: 16, lower: 3, upper: 0x2D, type:'double' }, // MFX Phaser Resonance
			"25": { category: 16, lower: 3, upper: 0x2F, type:'double' }, // MFX Phaser Manual
			"26": { category: 16, lower: 3, upper: 0x27, type:'double' }, // MFX Phaser Balance
			"27": { category: 16, lower: 3, upper: 0x2B, type:'double' }, // MFX Phaser Depth
			"29?": { category: 16, lower: 5, upper: 0, single: true }, // Kit LFO Waveform
			"30": { category: 16, lower: 5, upper: 1, type:'double' }, // Kit LFO Rate
			"31?": { category: 16, lower: 5, upper: 3, single: true }, // Kit LFO Sync

			"126": { category: 16, lower: 3, upper: 0x33, extraZero: true }, // MFX Flanger Mode F0 41 10 00 00 00 6D 12 10 ga 03 33 00 pp xx F7 check this one
			"127": { category: 16, lower: 3, upper: 0x2D, extraZero: true }, // MFX SBF Type F0 41 10 00 00 00 6D 12 10 ga 03 2D 00 pp xx F7 check this one
			"110": { category: 0x45, lower: 5, upper: 1, type:'sample' }, // Sample Start

		},
		"12": {
			"3": { category: 16, lower: 0x12, upper: 0x35, type:'double' }, // LT FM Depth
			"5": { category: 16, lower: 0x12, upper: 0x39, type:'double' }, // LT FM Decay
			"12": { category: 16, lower: 0x12, upper: 0x47, type:'double' }, // LT FM Note
			"9": { category: 16, lower: 0x12, upper: 0x49, type:'double' }, // LT Pitch Env
			"10": { category: 16, lower: 0x12, upper: 0x4B, type:'double' }, // LT Pitch Attack
			"11": { category: 16, lower: 0x12, upper: 0x4D, type:'double' }, // LT Pitch Decay
			"7": { category: 16, lower: 0x12, upper: 0x3B, type:'double' }, // LT Feedback
			"13": { category: 16, lower: 0x12, upper: 0x3F, type:'double' }, // LT Color
			
			"??": { category: 16, lower: 0x12, upper: 0x0C, type:'double' }, // LT Pan
			"??": { category: 16, lower: 0x12, upper: 0x13, single: true }, // LT LFO Dest
			"??": { category: 16, lower: 0x12, upper: 0x14, type:'double' }, // LT LFO Depth
			"??": { category: 16, lower: 0x12, upper: 0x0E, type:'double' }, // LT Reverb Send
			"??": { category: 16, lower: 0x12, upper: 0x10, type:'double' }, // LT Delay
			"??": { category: 16, lower: 0x12, upper: 0x00, type:'quadruple' }, // LT Instrument
			
			"??": { category: 16, lower: 0x22, upper: 0x00, single: true }, // LT Inst Fx (always sends full report)
			"??": { category: 16, lower: 0x22, upper: 0x09, type:'double' }, // LT Inst Fx Parameter 1

		}
		// patern scatter type 2x xx 00 5C 1byte
		// pattern scatter depth 2x xx 00 5D 1byte
	};
	
	return numTable[""+channel][""+number];
}

function ccEvent(channel, number, value)
{
	script.log("ControlChange received "+channel+", "+number+", "+value);

	var lookupData = lookup(channel, number);

	if (lookupData) {
		var ga = myKitParam.get();

		var scaledValue = value * 255 / 127;

		var upperNibble = Math.floor(scaledValue / 16);
		var lowerNibble = Math.floor(scaledValue) % 16;

		if (lookupData.single || lookupData.extraZero) {
			script.log("its single");
			upperNibble = value;
			lowerNibble = 0;
		}

		// Roland checksum calculation
		var initialChecksum = ((lookupData.category + ga + lookupData.lower + lookupData.upper + upperNibble) + lowerNibble) % 128;
		var checksum = (128 - initialChecksum) % 128;

		if (lookupData.type == 'double') {
			script.log("DOUBLE sysex");
			local.sendSysex(
				0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x6D, 0x12,
				lookupData.category, ga, lookupData.lower, lookupData.upper, upperNibble, lowerNibble, checksum, 0xF7
			);
		} else if (lookupData.extraZero) {
			script.log("EXTRA ZERO sysex");
			local.sendSysex(
				0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x6D, 0x12,
				lookupData.category, ga, lookupData.lower, lookupData.upper, 0x00, upperNibble, checksum, 0xF7
			);
		} else if (lookupData.single) {
			script.log("SINGLE sysex");
			local.sendSysex(
				0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x6D, 0x12,
				lookupData.category, ga, lookupData.lower, lookupData.upper, upperNibble, checksum, 0xF7
			);
		} else if (lookupData.type == 'sample') {
			script.log("SAMPLE sysex");
			// "110": { category: 0x45, lower: 5, upper: 1, type:'sample' }, // Sample Start
			// F0 41 10 00 00 00 6D 12 45 27 00 18 00 00 00 00 00 00 00 0A 72 F7
			/*
			kit 01 instrument OH 44 is sample number? 70 and 18 is start time
			F0 41 10 00 00 00 6D 12 44 70 00 18 00 00 00 00 00 00 00 00 34 F7

			for sample end: 44 is sample number, 75 and 20
			highest end:
			F0 41 10 00 00 00 6D 12 44 75 00 20 00 00 00 04 00 09 06 05 0F F7
			lowest end (10)
			F0 41 10 00 00 00 6D 12 44 75 00 20 00 00 00 00 00 00 00 0A 1D F7
			*/
			var sampleNumber = 0x44;
			var firstSampleIdentifier = 0x70;
			var secondSampleIdentifier = 0x18;
			var initialSampleStartChecksum = ((sampleNumber + firstSampleIdentifier + secondSampleIdentifier + lookupData.upper + upperNibble) + lowerNibble) % 128;
			var sampleStartChecksum = (128 - initialSampleStartChecksum) % 128;
			local.sendSysex(
				0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x6D, 0x12,
				sampleNumber, firstSampleIdentifier, 0, secondSampleIdentifier, 0,0,0,0,0,0, upperNibble, lowerNibble, sampleStartChecksum, 0xF7
			);
		}
	} else {
		var ga = myKitParam.get();
		if (channel == 11 && number == 125 && value == 0) {
			var phaserChecksum = (128 - ((ga + 132) % 128)) % 128;
			script.log("SWITCH to phaser");
			local.sendSysex(0xF0,0x41,0x10,0x00,0x00,0x00,0x6D,0x12,0x10,ga,0x03,0x00,0x06,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x0A,0x0A,0x08,0x00,0x08,0x00,0x0E,0x06,0x08,0x00,0x00,0x02,0x00,0x01,0x00,0x01,0x0D,0x06,0x0D,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,phaserChecksum,0xF7);
		}
		else if (channel == 11 && number == 125 && value == 1) {
			var flangerChecksum = (128 - ((ga + 165) % 128)) % 128;
			script.log("SWITCH to flanger");
			local.sendSysex(0xF0,0x41,0x10,0x00,0x00,0x00,0x6D,0x12,0x10,ga,0x03,0x00,0x07,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x0A,0x00,0x0B,0x08,0x08,0x0E,0x0E,0x08,0x03,0x0C,0x00,0x0A,0x00,0x01,0x00,0x01,0x0D,0x06,0x0D,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,flangerChecksum,0xF7);
		}
		else if (channel == 11 && number == 125 && value == 2) {
			var sbfChecksum = (128 - ((ga + 142) % 128)) % 128;
			script.log("SWITCH to SBF");
			local.sendSysex(0xF0,0x41,0x10,0x00,0x00,0x00,0x6D,0x12,0x10,ga,0x03,0x00,0x11,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x08,0x00,0x08,0x00,0x04,0x0E,0x00,0x01,0x0F,0x0F,0x00,0x00,0x00,0x00,0x00,0x01,0x0D,0x06,0x0D,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,sbfChecksum,0xF7);
		}
	}
}

function sysExEvent(data)
{
	script.log("Sysex Message received, "+data.length+" bytes :");
	script.log("notequal", data.length != 16);
	script.log("equal", data.length == 16);
	script.log("notequal2", data.length !== 16);
	script.log("equal2", data.length === 16);

	if(data.length != 16) {
		script.log('logging', data.length);
		for(var i=0; i < data.length; i++)
		{
			script.log(" > "+data[i]);
		}
	}
}

function pitchWheelEvent(channel, value) 
{
	script.log("PitchWheel received "+channel+", "+value);
}

function channelPressureEvent(channel, value) 
{
	script.log("Channel Pressure received "+channel+", "+value);
}

function afterTouchEvent(channel, note, value) 
{
	script.log("After Touch received "+channel+", "+note+", "+value);
}
