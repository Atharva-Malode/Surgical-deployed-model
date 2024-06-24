from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import tempfile
import subprocess
import base64
import os
import shutil

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this if you have specific allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize YOLO model
spitting = YOLO("./model/spitting.pt", task="detect")

def get_single_image_name(directory_path):
    image_names = [file for file in os.listdir(directory_path) if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
    return image_names[0] if image_names else None

@app.post('/predict')
async def spit_detection(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
        raise HTTPException(status_code=400, detail="Invalid file format")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        temp_file.write(await file.read())
        temp_file_path = temp_file.name

    results = spitting.predict(source=temp_file_path, conf=0.4, save=True)
    os.remove(temp_file_path)

    image_path = get_single_image_name('./runs/detect/predict/')
    if not image_path:
        raise HTTPException(status_code=500, detail="Prediction failed, no image generated")

    with open(f'./runs/detect/predict/{image_path}', "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

    shutil.rmtree('./runs')

    return JSONResponse(content={'status': 'success', 'result': 'Prediction Done', 'generatedImage': encoded_image})

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True)
