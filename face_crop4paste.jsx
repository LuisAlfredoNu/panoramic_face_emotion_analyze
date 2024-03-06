// This program will run on Photoshop CC 2015.5 and later
// Program to swap faces from two files given the coordinates of the faces
// The source and target should be opened in Photoshop
// The coordinates are given in the form of a JSON file
// The JSON file should be in the following format:

// {
//     "Panorama_auto_111_prim_1": [
//         {
//             "source": {
//                 "photo": "Panorama_auto_111_prim_1",
//                 "facial_area": {
//                     "x": 5511,
//                     "y": 881,
//                     "w": 134,
//                     "h": 172
//                 }
//             },
//             "destiny": {
//                 "photo": "Panorama_auto_111_prim_7",
//                 "facial_area": {
//                     "x": 600,
//                     "y": 280,
//                     "w": 136,
//                     "h": 164
//                 }
//             }
//         }
//     ],
//     "Panorama_auto_111_prim_3": [
//         {
//             "source": {
//                 "photo": "Panorama_auto_111_prim_3",
//                 "facial_area": {
//                     "x": 1740,
//                     "y": 653,
//                     "w": 148,
//                     "h": 197
//                 }
//             },
//             "destiny": {
//                 "photo": "Panorama_auto_111_prim_7",
//                 "facial_area": {
//                     "x": 3327,
//                     "y": 902,
//                     "w": 148,
//                     "h": 196
//                 }
//             }
//         },
//         {
//             "source": {
//                 "photo": "Panorama_auto_111_prim_3",
//                 "facial_area": {
//                     "x": 1740,
//                     "y": 653,
//                     "w": 148,
//                     "h": 197
//                 }
//             },
//             "destiny": {
//                 "photo": "Panorama_auto_111_prim_7",
//                 "facial_area": {
//                     "x": 3235,
//                     "y": 150,
//                     "w": 139,
//                     "h": 174
//                 }
//             }
//         }
//     ]
// }

#target photoshop;

// Include the json parser for Photoshop 
#include "PhotoshopJsonParser.js";

// Set the ruler units to pixels
app.preferences.rulerUnits = Units.PIXELS;  

// Set the layer name from where the face will be copied
var layer2Copy = "Pano";

// Function to read the JSON file
function readJSONFile(file) {
    var jsonFile = new File(file);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

// Function to copy the face from the source area
function copyFace(actDoc, sourceArea) {
    
    // Select the layer Pano
    var layerName = layer2Copy;
    actDoc.activeLayer = app.activeDocument.layers.getByName(layerName);

    // Select the area of the face
    var sourceBounds = sourceArea;
    var sourceX = sourceBounds.x;
    var sourceY = sourceBounds.y;
    var sourceW = sourceBounds.w;
    var sourceH = sourceBounds.h;
    var sourceBounds = [ [sourceX, sourceY], 
                        [sourceX, sourceY + sourceH],
                        [sourceX + sourceW, sourceY + sourceH], 
                        [sourceX + sourceW, sourceY]    
                        ];
    actDoc.selection.select(sourceBounds);
    actDoc.selection.copy();
    return actDoc;
}
// Function to paste the face in the destiny area
function pasteFace(actDoc, destinyArea) {

    // Create a new layer on top
    var layer = actDoc.artLayers.add();
    layer.name = "Face";
    // Select the new layer
    actDoc.activeLayer = layer;

    // Paste the face
    actDoc.paste(); 

    // Translate the face to the destiny area
    var layer = actDoc.activeLayer;
    var boundX = layer.bounds[0] * -1;
    var boundY = layer.bounds[1] * -1;
    // alert('boundX: ' + boundX + ', boundY: ' + boundY);
    var destinyBounds = destinyArea;
    var destinyX = destinyBounds.x;
    var destinyY = destinyBounds.y;
    layer.translate(boundX + destinyX, boundY + destinyY);

    return actDoc;
}

// Function to select the open document by name
function selectOpenDocument(name) {
    for (var i = 0; i < app.documents.length; i++) {
        if (app.documents[i].name == name) {
            app.activeDocument = app.documents[i];
            return app.activeDocument;
        }
    }
    alert("The document " + name + " is not open.");
    // Exit the program
    exit();
    return null;
}

// Main function
function main() {
    var jsonFile = File.openDialog("Please select the JSON file.", "*.json", false);
    // alert('jsonFile: ' + jsonFile);
    var json = readJSONFile(jsonFile);

    actDoc = app.activeDocument;

    for (var key in json) {
        // alert('key: ' + key);
        var faces = json[key];
        for (var i = 0; i < faces.length; i++) {
            var face = faces[i];
            // alert('face.source.photo: ' + face.source.photo);
            var actDoc = selectOpenDocument(face.source.photo + ".psd");
            copyFace(actDoc, face.source.facial_area);
            // alert('face.destiny.photo: ' + face.destiny.photo);
            var actDoc = selectOpenDocument(face.destiny.photo + ".psd");
            pasteFace(actDoc, face.destiny.facial_area);
        }
    }

    // Create a group of the layers in the active document
    var group = actDoc.layerSets.add();
    group.name = "Faces";

    var face_count = 0;
    var exist_Face_layer = true;
    while (exist_Face_layer) {
        try {
            var layer = actDoc.layers.getByName("Face");
            if (layer) {
                face_count++;
                layer.name = "Face_" + face_count;
                layer.move(group, ElementPlacement.INSIDE);
            }
        } catch (e) {
            exist_Face_layer = false;
        }
    }
}

main();
