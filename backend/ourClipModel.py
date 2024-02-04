from PIL import Image
import requests
import numpy as np
import ast

from transformers import CLIPProcessor, CLIPModel

# model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
# processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")


# url = "http://images.cocodataset.org/val2017/000000039769.jpg"
# image = Image.open(requests.get(url, stream=True).raw)
# image1 = Image.open("airplane.jpg")
# image = np.asarray(image1)
# print(image)

# inputs = processor(text=["cat", "dog", "airplane"], images=image, return_tensors="pt", padding=True)


# outputs = model(**inputs)
# logits_per_image = outputs.logits_per_image  # this is the image-text similarity score
# probs = logits_per_image.softmax(dim=1)
# print(probs)

def read_list_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            boolean_list = [bool(int(line.strip())) for line in file.readlines()]
        return boolean_list
    except FileNotFoundError:
        return []

def update_list(boolean_list, index_to_update):
    if 0 <= index_to_update < len(boolean_list):
        boolean_list[index_to_update] = not boolean_list[index_to_update]

def write_list_to_file(boolean_list, file_path):
    with open(file_path, 'w') as file:
        file.write('\n'.join(map(str, map(int, boolean_list))))

def classifyAnImage(image):
    bool_list = read_list_from_file('bool.txt')

    image = np.asarray(ast.literal_eval(image))

    model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

    animal_list = [
        "antelope",
        "badger",
        "dolphin",
        "dragonfly",
        "duck",
        "goldfish",
        "goat",
        "hamster",
        "hyena",
        "jellyfish",
        "hummingbird",
        "leopard",
        "lion",
        "moth",
        "panda",
        "possum",
        "raccoon",
        "rat",
        "seal",
        "shark",
        "lizard",
        "kangaroo",
        "mouse",
        "octopus",
        "orangutan",
        "owl",
        "ox",
        "pigeon",
        "penguin",
        "pig",
        "fox",
        "dog",
        "caterpillar",
        "bat",
        "crab",
        "crow",
        "donkey",
        "hippopotamus",
        "mosquito",
        "otter",
        "okapi",
        "parrot",
        "sandpiper",
        "seahorse",
        "swan",
        "tiger",
        "reindeer",
        "squirrel",
        "turkey", 
        "human"
        ]

    inputs = processor(text=animal_list, images=image,
                       return_tensors="pt", padding=True)

    outputs = model(**inputs)
    # this is the image-text similarity score
    logits_per_image = outputs.logits_per_image
    tensor_object = logits_per_image.softmax(dim=1)
    probabilities = tensor_object[0].tolist()
    arg_max = max(enumerate(probabilities), key=lambda x: x[1])[0]
    update_list(bool_list, arg_max)
    write_list_to_file(bool_list, 'bool.txt')
    #return animal_list[arg_max]
    return arg_max
