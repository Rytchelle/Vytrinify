import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Header from '../components/Header';
import Loader from '../components/Loader';
import PageWrapper from '../components/PageWrapper';
import '../styles/home.css';
import Footer from '../components/Footer';
import StarRating from '../components/StarRating';
import '../styles/StarRating.css';

import {
  getEmpresas,
  salvarEmpresa,
  editarEmpresa,
  deletarEmpresa
} from '../services/empresaService';

function Home() {
  const [empresas, setEmpresas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busca, setBusca] = useState('');
  const [form, setForm] = useState({
    id: null,
    nome: '',
    ramo: '',
    descricao: '',
    imagem: '',
    telefone: '',
    Email: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmpresas(getEmpresas());
  }, []);

  const abrirFormulario = () => {
    setMostrarFormulario(true);
    setForm((prev) => ({
      ...prev,
      telefone: prev.telefone.startsWith('+55 ') ? prev.telefone : '+55 ',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'telefone') {
      const numeros = value.replace(/\D/g, '');
      let novoTelefone = '+55 ';
      novoTelefone += numeros.slice(2, 13);
      setForm({ ...form, telefone: novoTelefone });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nome || !form.ramo || !form.descricao || !form.imagem || !form.telefone || !form.Email) {
      alert('Preencha todos os campos');
      return;
    }

    const telefoneNumeros = form.telefone.replace('+55 ', '');
    if (!/^\d{10,11}$/.test(telefoneNumeros)) {
      alert('Telefone inválido. Insira DDD + número (ex: +55 11999999999).');
      return;
    }

    if (form.id) {
      editarEmpresa(form.id, form);
      alert('Empresa atualizada com sucesso!');
    } else {
      salvarEmpresa(form);
      alert('Empresa cadastrada com sucesso!');
    }

    setEmpresas(getEmpresas());
    setForm({ id: null, nome: '', ramo: '', descricao: '', imagem: '', telefone: '+55 ', Email: '' });
    setMostrarFormulario(false);
  };

  const handleEditar = (empresa) => {
    setForm({
      ...empresa,
      telefone: empresa.telefone && typeof empresa.telefone === 'string'
        ? empresa.telefone
        : '+55 ',
    });
    setMostrarFormulario(true);
  };

  const handleDeletar = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      deletarEmpresa(id);
      setEmpresas(getEmpresas());
    }
  };

  const handleCardClick = (id) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/empresa/${id}`);
    }, 1000);
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <Header busca={busca} setBusca={setBusca} />

      <div className="container">
        <h2>Empresas Cadastradas</h2>

       

        <button className="btn-adicionar" onClick={abrirFormulario}>
          Adicionar Empresa
        </button>

        {mostrarFormulario && (
          <div className="modal-overlay">
            <div className="modal-card">
              <button className="btn-fechar" onClick={() => setMostrarFormulario(false)}>X</button>
              <h2>{form.id ? 'Editar Empresa' : 'Cadastrar Empresa'}</h2>
              <form onSubmit={handleSubmit} className="formulario">
                <input className="inputs" name="nome" placeholder="Nome da Empresa" value={form.nome} onChange={handleChange} />
                <input className="inputs" name="ramo" placeholder="Ramo" value={form.ramo} onChange={handleChange} />
                <textarea className="inputs" name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
                <input className="inputs" name="imagem" placeholder="URL da Imagem" value={form.imagem} onChange={handleChange} />
                <input
                  className="inputs"
                  name="telefone"
                  placeholder="Telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  pattern="\+55\s\d{10,11}"
                  title="Digite o número com DDD: +55 11999999999"
                />
                <input className="inputs" type="email" name="Email" placeholder="Email" value={form.Email} onChange={handleChange} />
                <button type="submit">{form.id ? 'Salvar Alterações' : 'Cadastrar'}</button>
              </form>
            </div>
          </div>
        )}

        <div className="lista-empresas">
          {empresas
            .filter((empresa) =>
              empresa.nome.toLowerCase().includes(busca.toLowerCase())
            )
            .map((empresa) => (
              <div
                key={empresa.id}
                className="card"
                onClick={() => handleCardClick(empresa.id)}
              >
                <h3>{empresa.nome}</h3>
                <img src={empresa.imagem} alt={empresa.nome} />
                <p><strong>Ramo:</strong> {empresa.ramo}</p>
                <StarRating rating={empresa.avaliacao || 0} />
                <div
                  className="acoes-icones"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaEdit
                    className="icone editar"
                    onClick={() => handleEditar(empresa)}
                    title="Editar"
                  />
                  <FaTrashAlt
                    className="icone excluir"
                    onClick={() => handleDeletar(empresa.id)}
                    title="Excluir"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}

export default Home;
