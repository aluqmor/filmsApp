import API from './api.js';
import { updateDirectorsSelect, renderFilms } from './UI.js';
import { setupEventListeners } from './EventHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    const state = {
        films: [],
        directors: [],
        currentPage: 1,
        currentSort: '',
        currentDirectorFilter: ''
    };

    async function loadInitialData() {
        try {
            const filmsResponse = await API.getFilms();
            state.films = filmsResponse.data;  
            state.directors = await API.getDirectors();
            updateDirectorsSelect(state.directors);
            renderFilms(filmsResponse);  
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    }

    setupEventListeners(state);
    loadInitialData();
});