export function updateDirectorsSelect(directors) {
    const directorSelects = document.querySelectorAll('select[name="director_id"]');
    const options = directors.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    
    directorSelects.forEach(select => {
        select.innerHTML = `<option value="">Seleccione un director...</option>${options}`;
    });

    document.getElementById('directorSelect').innerHTML = 
        `<option value="">Todos los directores</option>${options}`;
}

export function renderFilms(data, currentFilters = {}) {
    const container = document.getElementById('filmsList');
    container.innerHTML = '';
    
    if (!data.data?.length) {
        container.innerHTML = '<div class="col-12 text-center"><h3>No se encontraron películas</h3></div>';
        return;
    }
    
    data.data.forEach(film => {
        const filmElement = document.createElement('div');
        filmElement.classList.add('col-md-4', 'mb-4');
        
        filmElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${film.title}</h5>
                    <p class="card-text">
                        Director: ${film.director.name}<br>
                        Año: ${film.date}<br>
                        Rating: ${film.rating}/10
                    </p>
                    <button class="btn btn-warning btn-sm edit-film" data-id="${film.id}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-film" data-id="${film.id}">Eliminar</button>
                </div>
            </div>
        `;
        
        container.appendChild(filmElement);
    });

    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = `
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                ${data.prev_page_url ? 
                    `<li class="page-item">
                        <a class="page-link" href="#" data-page="${data.current_page - 1}">Anterior</a>
                    </li>` : ''
                }
                
                ${Array.from({length: data.last_page}, (_, i) => i + 1).map(page => `
                    <li class="page-item ${page === data.current_page ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${page}">${page}</a>
                    </li>
                `).join('')}
                
                ${data.next_page_url ? 
                    `<li class="page-item">
                        <a class="page-link" href="#" data-page="${data.current_page + 1}">Siguiente</a>
                    </li>` : ''
                }
            </ul>
        </nav>
    `;
}