import clip
import os
import skimage
import IPython.display
import matplotlib.pyplot as plt
import numpy as np
from torch.utils.data import DataLoader
from collections import OrderedDict
import torch
import torchvision as tv
from torchvision.datasets import CIFAR10

# RN50 will be fastest, while ViT-L will be the most performant.
clip.available_models()

model, preprocess = clip.load("RN50")   # this is the original preprocess
model.cuda().eval()
input_resolution = model.visual.input_resolution
context_length = model.context_length
vocab_size = model.vocab_size

print("Model parameters:", f"{np.sum([int(np.prod(p.shape)) for p in model.parameters()]):,}")
print("Input resolution:", input_resolution)
print("Context length:", context_length)
print("Vocab size:", vocab_size)


# generate 500 random CIFAR10 validation images with DataLoader
#dataloader = DataLoader(dataset=cifar10_test, batch_size=500, shuffle=True)
#images, labels = next(iter(dataloader))


classes = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
label_strings = {0:'airplane', 1: 'automobile', 2:'bird', 3:'cat', 4:'deer',
                 5:'dog', 6:'frog', 7:'horse', 8:'ship', 9:'truck'}

# Setup text features
text_descriptions = [f"This is a photo of a {label}" for label in classes]
text_tokens = clip.tokenize(text_descriptions).cuda()

# setup image featrues
image_input = torch.tensor(np.stack(images)).cuda()
with torch.no_grad():
    image_features = model.encode_image(image_input).float()
    text_features = model.encode_text(text_tokens).float()

# generate probabilities for labels on every image
text_probs = (100.0 * image_features @ text_features.T).softmax(dim=-1)
top_probs, top_labels = text_probs.cpu().topk(5, dim=-1)

# count number of correct labels
top_labels = np.array(top_labels)
num_correct = 0
for i in range(len(images)):
  correct_label = labels[i].item()
  clip_predic_label = top_labels[i][0]
  if correct_label == clip_predic_label:
    num_correct += 1

# print out results
percent_correct = num_correct/len(images) * 100
print("Total number of images: " + str(len(images)))
print("Number of correctly classified images: " + str(num_correct))
print("Accuracy: " + str(percent_correct) + "%")