const API = {
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
    },
    async getFilms(page = 1, sortBy = '', directorId = '') {
        const params = new URLSearchParams({
            page,
            ...(sortBy && { sort: sortBy }),
            ...(directorId && { director_id: directorId })
        });
        
        const response = await fetch(`api/films?${params}`);
        return await response.json();
    },
    async getDirectors() {
        const response = await fetch('api/directors');
        return await response.json();
    },
    async createFilm(formData) {
        const response = await fetch('api/films', {
            method: 'POST',
            headers: this.headers,
            body: formData
        });
        return await response.json();
    },
    async deleteFilm(id) {
        const response = await fetch(`api/films/${id}`, {
            method: 'DELETE',
            headers: this.headers
        });
        return await response.json();
    },
    async updateFilm(id, formData) {
        formData.append('_method', 'PUT');
        const response = await fetch(`api/films/${id}`, {
            method: 'POST',
            headers: this.headers,
            body: formData
        });
        return await response.json();
    },
    async createDirector(name) {
        const response = await fetch('api/directors', {
            method: 'POST',
            headers: {
                ...this.headers,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        return await response.json();
    }
};

export default API;