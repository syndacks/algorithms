var dbjson = require("./fake_db.json");
var _ = require("lodash");
var fs = require("fs");
var data = dbjson.content;

// add a new "discoveryFeed" object to each article
function addDiscoveryFeedObject(object){
  for(var i = 0; i < object.length; i++) {
    object[i].discoveryFeed = {};
  }
  return object;
}

// helper function to move elements from one array to another
function _moveElements(source, target) {
  for (var i = 0; i < source.length; i++) {
      var element = source[i];
      source.splice(i, 1);
      target.push(element);
      i--;
  }
}

// move the original hook(s) to discoveryFeed.hook
function moveHookToDiscoveryFeed(object){
  for(var i = 0; i < object.length; i++) {
    if (object[i].hook !== undefined && typeof object[i].hook === "string"){
      object[i].discoveryFeed.hook = object[i].hook;
    } else if (object[i].hook !== undefined && typeof object[i].hook === "object") {
      var oldHook = object[i].hook;
      var newHooks = object[i].discoveryFeed.hook = [];
      _moveElements(oldHook, newHooks);
    } else {
      continue;
    }
  }
  return object;
}

// move the featuredImage to discoceryFeed.featuredImage
function moveFeaturedImageToDisoveryFeed(object){
  for(var i = 0; i < object.length; i++) {
    if (object[i].featuredImage !== undefined){
      object[i].discoveryFeed.featuredImage = object[i].featuredImage;
    } else {
      continue;
    }
  }
  return object;
}

// get rid of the original hook(s)
function deleteHooks(object){
  for(var i = 0; i < object.length; i++) {
    delete object[i].hook;
  }
  return object;
}

// get rid of the original hook(s)
function deleteFeaturedImage(object){
  for(var i = 0; i < object.length; i++) {
    delete object[i].featuredImage;
  }
  return object;
}

// update the original db.json file with the new discoveryFeed content
function addNewContentToDbJson(newContent){
  var originalDbJson = dbjson;
  originalDbJson.content = newContent;
  writeToJson(originalDbJson);
  // _stringifyData(originalDbJson);
}

// stringify the object literal data, but it's weird...
function _stringifyData(object){
  var newData = JSON.stringify(object, null, 2);
}

function writeToJson(dayObj){
  fs.appendFile('output.json', JSON.stringify(dayObj, null, 4), function(err){
    console.log('File successfully written! - Check your project directory for the output.json file');
  });
}

function main (data){
  addDiscoveryFeedObject(data);
  moveHookToDiscoveryFeed(data);
  moveFeaturedImageToDisoveryFeed(data);
  deleteHooks(data);
  deleteFeaturedImage(data);
  addNewContentToDbJson(data);
}

main(data);
