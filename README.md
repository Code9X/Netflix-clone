Here I have added a GitHub Action to build a new Docker Image and that will be available in GitHub Container Registry (GHCR)
These images will be seen as packeges in the Account Level (it is set to Public to pull directily for any one but this is not safe)
To Pull the images:
docker pull ghcr.io/code9x/netflix-backend:latest
docker pull ghcr.io/code9x/netflix-frontend:latest

Then we can build the containers:
docker run -d -p 5173:5173 --name netflix-frontend ghcr.io/code9x/netflix-frontend:latest
docker run -d -p 5173:5173 --name netflixfrontend-container netflixfrontend:v1
