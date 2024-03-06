<p align="center"><img src="./img/FOCUSS FINAL.jpg" alt="Group photo selector and best face detector" title="Focuss Fotógrafos" height="240"></p>

# Group photo selector and best face detector

This program select the best photo in a set of similar group photos on base with emotions analysis. Using the open source library [DeepFace](https://github.com/serengil/deepface) to detect the emotions of the people and select the photo with the most positive emotions. Also, search for the best face in all photos and provide a JSON file with the coordinates of the face and name files to merge in post-processing with Photoshop.

## Features
- Select the best photo in a set of similar group photos on base with emotions analysis.
- Search for the best face in all photos and provide a JSON file with the coordinates of the face and name files to crop from the source and paste in the best photo using Photoshop script.

## Example

| Photo 1 | Photo 2 | Photo 3 | Photo 4 | Photo 5 | Best photo |
|---------|---------|---------|---------|---------|------------|
| ![Photo 1](Example/img_001.png) | ![Photo 2](Example/img_002.png) | ![Photo 3](Example/img_003.png) | ![Photo 4](Example/img_004.png) | ![Photo 5](Example/img_005.png) | ![Best photo](Example/img_011.png) |

This program is oriented for scholar group photos but I am not authorized to share the photos. The photos in the example comes from [YouTube](https://www.youtube.com/watch?v=DDek2fMgBMU).

### Target photo

![Target photo](img/Pano_example_faces.png)

## Requirements
- Python 3.7 or later
- OpenCV
- DeepFace
- Numpy
- Pandas
- Matplotlib

## Usage
### Best photo selector
* Jupyter notebook: [panoramic_face_analyze](panoramic_face_analyze.ipynb)
### Photoshop script
1. Edit the file [panoramic_face_analyze](panoramic_face_analyze.ipynb) and change the variable `layer2Copy` with the name of the layer to copy the faces.
2. Open all the photos in Photoshop.
3. Go to `File > Scripts > Browse...`
4. Select the file `face_crop4paste.jsx` and click `Open`
5. Select the JSON file with the coordinates.