import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.tsx'; 
import List from './pages/List.tsx'; 
import Form from './pages/Form.tsx'; 
import type { IItem } from './types/IItem'; 


const Home: React.FC = () => (
  <div className="container my-5 p-5 bg-light rounded-3 shadow">
    <div className="text-center">
      <h1 className="display-4 text-primary">
        <i className="bi bi-rocket-takeoff me-3"></i>Bem-vindo ao Catálogo!
      </h1>
      <hr className="my-4" />
      <p>
        Use a navegação acima para **Ver o Catálogo** ou para **Adicionar um Novo Registro**.
      </p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'list' | 'form'>('home');
  const [itemToEdit, setItemToEdit] = useState<IItem | null>(null);
  const handleNavigate = (page: 'home' | 'list' | 'form') => {
    setCurrentPage(page);
    setItemToEdit(null);
  };

  
  const handleEdit = (item: IItem) => {
    setItemToEdit(item);
    setCurrentPage('form');
  };


  const renderPage = () => {
    if (currentPage === 'list') {
      return <List onEdit={handleEdit} onNavigate={handleNavigate} />;
    }
    if (currentPage === 'form') {
      
      return <Form onFormSubmit={() => handleNavigate('list')} itemToEdit={itemToEdit} />;
    }
    return <Home />;
  };

  return (
    <>
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow-1">{renderPage()}</main>
      {}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default App;