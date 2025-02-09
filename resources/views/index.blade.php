@extends('layouts.app')

@section('content')
<div class="row mb-4">
    <div class="col">
        <h1>Mejores Películas de la Historia</h1>
    </div>
    <div class="col text-end">
        <button class="btn btn-success me-2" id="addDirectorBtn">Añadir Director</button>
        <button class="btn btn-primary" id="addFilmBtn">Añadir Película</button>
    </div>
</div>

<div class="row mb-4">
    <div class="col-md-6">
        <select class="form-select" id="sortSelect">
            <option value="">Ordenar por título...</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
        </select>
    </div>
    <div class="col-md-6">
        <select class="form-select" id="directorSelect">
            <option value="">Filtrar por director...</option>
        </select>
    </div>
</div>

<div class="row" id="filmsList"></div>

<!-- Modal Director -->
<div class="modal fade" id="directorModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Añadir Director</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="directorForm">
                    <div class="mb-3">
                        <label class="form-label">Nombre</label>
                        <input type="text" class="form-control" name="name" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal Film -->
<div class="modal fade" id="filmModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Añadir Película</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="filmForm">
                    <input type="hidden" name="id">
                    <div class="mb-3">
                        <label class="form-label">Título</label>
                        <input type="text" class="form-control" name="title" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Año</label>
                        <input type="number" class="form-control" name="date" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Rating</label>
                        <input type="number" class="form-control" name="rating" min="1" max="10" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Director</label>
                        <select class="form-select" name="director_id" required></select>
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="row" id="filmsList"></div>
<div id="pagination" class="mt-4"></div>
@endsection

@section('scripts')
<script type="module" src="{{ asset('src/js/Films.js') }}"></script>
@endsection