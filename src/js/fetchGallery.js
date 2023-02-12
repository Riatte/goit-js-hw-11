import axios from "axios";

const url = 'https://pixabay.com/api/';
const api_key = '33589472-7e528a5ba368de1ef1987cb1f'

export async function fetchGallery(name, page = 1, per_page = 40) {
  const response = axios.get(`${url}?key=${api_key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`);
  return await response;
}