import moment from 'moment';
import numeral from 'numeral';

export const convertToCurrency = (number: number): string => {
  const formattedCurrency = Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    notation: 'compact',
  }).format(number);

  return formattedCurrency; //.replace('AOA', 'Kwanza');
};

export const calcularIdade = (dataNascimento: Date): number => {
  const hoje = new Date();
  const anoNascimento = dataNascimento.getFullYear();
  const anoAtual = hoje.getFullYear();

  let idade = anoAtual - anoNascimento;

  // Verificar se já fez aniversário este ano
  const mesNascimento = dataNascimento.getMonth();
  const diaNascimento = dataNascimento.getDate();

  if (
    mesNascimento > hoje.getMonth() ||
    (mesNascimento === hoje.getMonth() && diaNascimento > hoje.getDate())
  ) {
    idade--;
  }

  return idade;
};

export const removerObjetoPorId = (
  id: number,
  array: any[],
  keyName: string,
): any[] => {
  // Encontrar o índice do objeto com base no ID
  const index = array.findIndex(state => state[keyName] === id);

  // Verificar se o objeto com o ID fornecido foi encontrado
  if (index !== -1) {
    // Remover o objeto do array
    array.splice(index, 1);
    console.log('Objeto removido com sucesso!');
  } else {
    console.log('Objeto com o ID fornecido não encontrado.');
  }

  return array;
};

type DateToStringConverter = (date: Date | undefined) => string;

// Implementação da função
export const convertDateToString: DateToStringConverter = date => {
  // Utilizando o Moment.js para formatar a data como string
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * Converte um número para uma string formatada em litros.
 * @param num - O número a ser convertido.
 * @returns A string formatada em litros.
 */
export const convertToLitro = (num: number): string => {
  // Configura o formato para litros (ex: "1,000 L")
  const format = '0,0 L';

  // Usa a biblioteca numeral para formatar o número
  return numeral(num).format(format);
};


// fetchLocationData.js

/**
 * Função para buscar dados de localização usando a API Nominatim
 * @param {number} latitude - Latitude para a busca
 * @param {number} longitude - Longitude para a busca
 * @returns {Promise<object>} - Dados da localização
 */
export const fetchLocationData = async (latitude: number, longitude: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Dados da localização:', data);
    
    return data; // Retorna os dados para uso posterior
  } catch (error) {
    console.error('Erro ao buscar dados da localização:', error);
    throw error; // Propaga o erro para que possa ser tratado onde a função é chamada
  }
};
