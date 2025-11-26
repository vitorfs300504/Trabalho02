import React, { useState, useEffect, useCallback } from 'react';
import type { IItem } from '../types/IItem'; 
import { getAllItems } from '../services/api'; 
import ListItem from '../components/ListItem'; 

interface ListProps {
  onEdit: (item: IItem) => void;
  onNavigate: (page: 'home' | 'list' | 'form') => void;
}

const List: React.FC<ListProps> = ({ onEdit, onNavigate }) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError('Não foi possível conectar ao JSON Server. Verifique se a API está rodando.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleItemDelete = (deletedId: number | string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== deletedId));
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">A carregar...</span>
        </div>
        <p className="mt-2">A carregar catálogo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mx-3" role="alert">
        <h4 className="alert-heading">Erro de Conexão!</h4>
        <p>{error}</p>
        <hr />
        <p className="mb-0">Tente rodar o JSON Server novamente (ex: `json-server --watch db.json --port 3000`).</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center p-5">
        <h3 className="text-secondary">Catálogo Vazio</h3>
        <p>Parece que você ainda não adicionou nenhum item.</p>
        <button className="btn btn-primary mt-3" onClick={() => onNavigate('form')}>
          <i className="bi bi-plus-lg me-1"></i>Adicionar Primeiro Item
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 display-6 text-primary border-bottom pb-2">Minha Coleção</h2>
      <div className="row">
        {items.map(item => (
          <ListItem
            key={item.id}
            item={item}
            onEdit={onEdit}
            onSuccessDelete={handleItemDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default List;