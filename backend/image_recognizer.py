import cv2
import numpy as np

def detect_faces_in_image(image_path):
    # Load the image
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Image not found or cannot be read.")

    # Model
    model = cv2.CascadeClassifier("haarcascade_frontalface_alt.xml")

    # Convert the image to grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = model.detectMultiScale(gray_img, scaleFactor=1.3, minNeighbors=5)

    # Draw rectangles around the detected faces
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)

    # Display the image with rectangles around faces
    image = cv2.imshow("Detected Faces", img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return image
    


