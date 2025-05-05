// src/services/empresaService.js

const CHAVE = "empresas_vitrinify";

export const getEmpresas = () => {
  const data = localStorage.getItem(CHAVE);
  return data ? JSON.parse(data) : [];
};

export const salvarEmpresa = (empresa) => {
  const empresas = getEmpresas();
  empresa.id = Date.now();
  empresa.avaliacao = 0; // ⭐ Adiciona campo de avaliação padrão
  empresas.push(empresa);
  localStorage.setItem(CHAVE, JSON.stringify(empresas));
};

export const getEmpresaById = (id) => {
  const empresas = getEmpresas();
  return empresas.find((e) => e.id === parseInt(id));
};

export const editarEmpresa = (id, dadosAtualizados) => {
  let empresas = getEmpresas();
  empresas = empresas.map(e => e.id === id ? { ...e, ...dadosAtualizados } : e);
  localStorage.setItem(CHAVE, JSON.stringify(empresas));
};

export const deletarEmpresa = (id) => {
  const empresas = getEmpresas().filter(e => e.id !== id);
  localStorage.setItem(CHAVE, JSON.stringify(empresas));
};

// ⭐ Novo: Atualiza avaliação da empresa
export const avaliarEmpresa = (id, nota) => {
  const empresas = getEmpresas();
  const atualizadas = empresas.map(e =>
    e.id === id ? { ...e, avaliacao: nota } : e
  );
  localStorage.setItem(CHAVE, JSON.stringify(atualizadas));
};
