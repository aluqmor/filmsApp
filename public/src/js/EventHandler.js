import API from './api.js';
import { updateDirectorsSelect, renderFilms } from './UI.js';

export function setupEventListeners(state) {
    // Botones para abrir modales
    document.getElementById('addDirectorBtn').addEventListener('click', () => {
        const directorModal = new bootstrap.Modal(document.getElementById('directorModal'));
        document.getElementById('directorForm').reset();
        directorModal.show();
    });

    document.getElementById('addFilmBtn').addEventListener('click', () => {
        const filmModal = new bootstrap.Modal(document.getElementById('filmModal'));
        document.getElementById('filmForm').reset();
        document.querySelector('#filmModal .modal-title').textContent = 'Añadir Película';
        filmModal.show();
    });

    // Formulario de director
    document.getElementById('directorForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const newDirector = await API.createDirector(formData.get('name'));
            
            if (newDirector.id) {
                state.directors.push(newDirector);
                updateDirectorsSelect(state.directors);
                bootstrap.Modal.getInstance(document.getElementById('directorModal')).hide();
                e.target.reset();
                alert('Director añadido correctamente');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al añadir el director: ' + error.message);
        }
    });

    // Formulario de película
    document.getElementById('filmForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const filmId = formData.get('id');

        try {
            if (filmId) {
                const updatedFilm = await API.updateFilm(filmId, formData);
                const index = state.films.findIndex(f => f.id === parseInt(filmId));
                state.films[index] = updatedFilm;
            } else {
                const newFilm = await API.createFilm(formData);
                state.films.push(newFilm);
            }
            const response = await API.getFilms(
                state.currentPage,
                state.currentSort,
                state.currentDirectorFilter
            );
            renderFilms(response);
            bootstrap.Modal.getInstance(document.getElementById('filmModal')).hide();
            e.target.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al procesar la película');
        }
    });

    // Eventos para editar y eliminar películas
    document.getElementById('filmsList').addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit-film')) {
            const filmId = e.target.dataset.id;
            const film = state.films.find(f => f.id === parseInt(filmId));
            if (film) {
                const form = document.getElementById('filmForm');
                form.elements.id.value = film.id;
                form.elements.title.value = film.title;
                form.elements.date.value = film.date;
                form.elements.rating.value = film.rating;
                form.elements.director_id.value = film.director_id;
                
                document.querySelector('#filmModal .modal-title').textContent = 'Editar Película';
                const modal = new bootstrap.Modal(document.getElementById('filmModal'));
                modal.show();
            }
        }

        if (e.target.classList.contains('delete-film')) {
            const filmId = e.target.dataset.id;
            if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
                try {
                    await API.deleteFilm(filmId);
                    const response = await API.getFilms(
                        state.currentPage,
                        state.currentSort,
                        state.currentDirectorFilter
                    );
                    renderFilms(response);
                } catch (error) {
                    console.error('Error eliminando película:', error);
                    alert('Error al eliminar la película');
                }
            }
        }
    });

    // Filtros
    document.getElementById('sortSelect').addEventListener('change', async (e) => {
        state.currentSort = e.target.value;
        const response = await API.getFilms(state.currentPage, state.currentSort, state.currentDirectorFilter);
        renderFilms(response);
    });

    document.getElementById('directorSelect').addEventListener('change', async (e) => {
        state.currentDirectorFilter = e.target.value;
        const response = await API.getFilms(state.currentPage, state.currentSort, state.currentDirectorFilter);
        renderFilms(response);
    });

    // Paginación
    document.getElementById('pagination').addEventListener('click', async (e) => {
        e.preventDefault();
        if (e.target.classList.contains('page-link')) {
            state.currentPage = parseInt(e.target.dataset.page);
            const response = await API.getFilms(
                state.currentPage,
                state.currentSort,
                state.currentDirectorFilter
            );
            renderFilms(response);
        }
    });
}