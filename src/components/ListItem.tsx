import React, { useState } from 'react';
import type { IItem } from '../types/IItem';
import { deleteItem } from '../services/api';

interface ListItemProps {
  item: IItem;
  onEdit: (item: IItem) => void;
  onSuccessDelete: (id: number | string) => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, onEdit, onSuccessDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Tem certeza que deseja remover "${item.title}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteItem(item.id);
      onSuccessDelete(item.id);
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao remover item. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(item.rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>);
    }
    
    for (let i = fullStars; i < 10; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
    }
    
    return stars;
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-hover fade-in-up movie-card">
        { }
        {item.coverUrl && !imageError ? (
          <img 
            src={item.coverUrl} 
            className="card-img-top movie-cover"
            alt={item.title}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="card-img-top movie-cover-placeholder">
            <i className={`bi ${item.type === 'Movie' ? 'bi-film' : 'bi-tv'}`}></i>
          </div>
        )}

        <div className="card-body d-flex flex-column">
          { }
          <div className="d-flex justify-content-between align-items-start mb-3">
            <span className={`badge ${item.type === 'Movie' ? 'badge-movie' : 'badge-series'}`}>
              <i className={`bi ${item.type === 'Movie' ? 'bi-camera-reels' : 'bi-tv'} me-1`}></i>
              {item.type === 'Movie' ? 'Filme' : 'Série'}
            </span>
            <span className="badge bg-secondary">{item.year}</span>
          </div>

          { }
          <h5 className="card-title fw-bold mb-3">{item.title}</h5>

          { }
          <div className="mb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="rating-stars">
                {renderStars()}
              </div>
              <span className="fw-bold text-dark">{item.rating}/10</span>
            </div>
          </div>

          { }
          <div className="mt-auto d-flex gap-2">
            <button
              className="btn btn-primary btn-sm flex-fill"
              onClick={() => onEdit(item)}
              disabled={isDeleting}
            >
              <i className="bi bi-pencil me-1"></i>
              Editar
            </button>
            <button
              className="btn btn-danger btn-sm flex-fill"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1"></span>
                  Removendo...
                </>
              ) : (
                <>
                  <i className="bi bi-trash me-1"></i>
                  Remover
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;