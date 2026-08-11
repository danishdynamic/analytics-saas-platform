# Use the official lightweight Python image
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /code

# Prevent Python from writing .pyc files and enable unbuffered logging
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy only the dependencies file first to leverage Docker caching
COPY ./requirements.txt /code/requirements.txt

# Install dependencies and clear pip cache to keep the image small
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the rest of your application code into the container
COPY ./app /code/app

# Expose port 80 for the FastAPI application
EXPOSE 80

# Run the FastAPI application using the official production server command
CMD ["fastapi", "run", "app/main.py", "--port", "80"]
