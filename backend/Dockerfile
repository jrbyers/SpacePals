# syntax=docker/dockerfile:1


FROM python:3.9-slim-buster
WORKDIR /python-docker
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip install torch torchvision
COPY . .
EXPOSE 80

CMD ["python", "main.py"]