import api from '@/axios/config';
import React, { useState } from 'react';


const ExpImp = () => {
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor, selecione um arquivo.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    console.log('Arquivo enviado:', file); 
  
    try {
      const response = await api.post('/Patient/Import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponseMessage('Paciente importados com sucesso!');
    } catch (error) {
      console.error('Erro:', error.response ? error.response.data : error.message); // Log detalhado
      setResponseMessage('Erro ao importar o arquivo.');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Importar Arquivo CSV</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="border border-gray-300 rounded p-2"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Enviar Arquivo
      </button>
      {responseMessage && (
        <p className="mt-4 text-lg font-medium text-center">{responseMessage}</p>
      )}
    </div>
  );
};

export default ExpImp;
