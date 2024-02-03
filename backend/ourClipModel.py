from PIL import Image
import requests
import numpy as np
import ast

from transformers import CLIPProcessor, CLIPModel

#model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
#processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")


#url = "http://images.cocodataset.org/val2017/000000039769.jpg"
#image = Image.open(requests.get(url, stream=True).raw)
#image1 = Image.open("airplane.jpg")
#image = np.asarray(image1)
#print(image)

#inputs = processor(text=["cat", "dog", "airplane"], images=image, return_tensors="pt", padding=True)


#outputs = model(**inputs)
#logits_per_image = outputs.logits_per_image  # this is the image-text similarity score
#probs = logits_per_image.softmax(dim=1)
#print(probs)


def classifyAnImage(image):
    image = np.asarray(ast.literal_eval(image))

    model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

    inputs = processor(text=["cat", "dog", "frog", "human"], images=image, return_tensors="pt", padding=True)

    outputs = model(**inputs)
    logits_per_image = outputs.logits_per_image  # this is the image-text similarity score
    probs = logits_per_image.softmax(dim=1)
    print(probs)