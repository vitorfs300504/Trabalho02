import React, { useState } from 'react';
import type { IItem, IItemForm } from '../types/IItem'; 
import { createItem, updateItem } from '../services/api'; 

interface FormProps {
  onFormSubmit: () => void;
  itemToEdit?: IItem | null;
}

const Form: React.FC<FormProps> = ({ onFormSubmit, itemToEdit }) => {
  const isEditing = !!itemToEdit;
  const initialFormState: IItemForm = {
    title: '',
    type: 'Movie',
    year: new Date().getFullYear(),
    rating: 5,
    coverUrl: '',
  };

  const [formData, setFormData] = useState<IItemForm>(
    itemToEdit ? {
      title: itemToEdit.title,
      type: itemToEdit.type,
      year: itemToEdit.year,
      rating: itemToEdit.rating,
      coverUrl: itemToEdit.coverUrl || '', 
    } : initialFormState
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (type === 'number' || type === 'range') ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const updatedItem: IItem = { ...itemToEdit!, ...formData };
        await updateItem(updatedItem);
        alert(`"${formData.title}" atualizado com sucesso!`);
      } else {
        await createItem(formData);
        alert(`"${formData.title}" cadastrado com sucesso!`);
        setFormData(initialFormState); 
      }

      onFormSubmit(); 

    } catch (error) {
      console.error('Erro ao salvar item:', error);
      alert('Falha ao salvar o item. Verifique o console para detalhes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg p-4" style={{ borderRadius: '1.5rem' }}>
            <h2 className="card-title text-center mb-4" style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              <i className={`bi ${isEditing ? 'bi-pencil-square' : 'bi-plus-square'} me-2`}></i>
              {isEditing ? `Editar: ${itemToEdit?.title}` : 'Novo Item no Catálogo'}
            </h2>

            <form onSubmit={handleSubmit}>
              { }
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  <i className="bi bi-text-left me-2"></i>
                  Título
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: O Senhor dos Anéis"
                  required
                />
              </div>

              { }
              <div className="mb-3">
                <label htmlFor="coverUrl" className="form-label">
                  <i className="bi bi-image me-2"></i>
                  URL da Capa (opcional)
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="coverUrl"
                  name="coverUrl"
                  value={formData.coverUrl}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                <small className="text-muted">
                  Dica: Use imagens do TMDB, IMDB ou outros sites de filmes
                </small>
                
                { }
                {formData.coverUrl && (
                  <div className="mt-3">
                    <p className="mb-2 fw-semibold">Preview:</p>
                    <img 
                      src={formData.coverUrl} 
                      alt="Preview" 
                      className="img-thumbnail"
                      style={{ maxWidth: '200px', maxHeight: '300px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const errorMsg = e.currentTarget.nextElementSibling as HTMLElement;
                        if (errorMsg) errorMsg.style.display = 'block';
                      }}
                    />
                    <div style={{ display: 'none' }} className="text-danger mt-2">
                      ⚠️ Não foi possível carregar a imagem desta URL
                    </div>
                  </div>
                )}
              </div>

              <div className="row">
                { }
                <div className="col-md-6 mb-3">
                  <label htmlFor="type" className="form-label">
                    <i className="bi bi-collection me-2"></i>
                    Tipo
                  </label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="Movie">🎬 Filme</option>
                    <option value="Series">📺 Série</option>
                  </select>
                </div>

                { }
                <div className="col-md-6 mb-3">
                  <label htmlFor="year" className="form-label">
                    <i className="bi bi-calendar-event me-2"></i>
                    Ano de Lançamento
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    min="1888"
                    max={new Date().getFullYear() + 1}
                  />
                </div>
              </div>

              { }
              <div className="mb-4">
                <label htmlFor="rating" className="form-label">
                  <i className="bi bi-star-fill text-warning me-2"></i>
                  Avaliação (1 a 10)
                </label>
                <input
                  type="range"
                  className="form-range"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  min="1"
                  max="10"
                />
                <div className="text-center">
                  <span className="badge bg-primary fs-5">
                    {formData.rating} / 10
                    {' '}
                    {'⭐'.repeat(Math.floor(formData.rating / 2))}
                  </span>
                </div>
              </div>

              { }
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-success btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <i className={`bi ${isEditing ? 'bi-check-circle' : 'bi-plus-circle'} me-2`}></i>
                      {isEditing ? 'Atualizar Item' : 'Cadastrar Item'}
                    </>
                  )}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onFormSubmit}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancelar Edição
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;