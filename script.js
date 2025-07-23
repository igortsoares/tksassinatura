// JavaScript do formulário TKS V2 (atualizado para remover botão 'Fechar ✓')

/********* VALIDAÇÃO CPF **************/
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0, resto;

  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) return false;

  return true;
}

/********* MÁSCARA CPF **********************************************/
const cpf = document.getElementById('cpf');
cpf.addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2')
       .replace(/(\d{3})(\d)/, '$1.$2')
       .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  e.target.value = v;
});

/********* MENSAGEM CPF INVÁLIDO **********************************************/
cpf.addEventListener('blur', () => {
  const isValid = validarCPF(cpf.value);
  const errorMessage = document.getElementById('cpf-error');

  if (!isValid && cpf.value.replace(/\D/g, '').length === 11) {
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';
  }
});

/********* PREENCHER SELECTs (picker mobile) ***********************/
document.addEventListener('DOMContentLoaded', () => {
  // --- Item 4: Limitar data no seletor desktop ---
  const nascDesktop = document.getElementById('nasc');
  if (nascDesktop) {
    const hoje = new Date();
    // Define o atributo 'max' para o dia de hoje, 14 anos atrás (nascidos em 2011 ou antes)
    const maxDate = new Date(hoje.getFullYear() - 14, hoje.getMonth(), hoje.getDate());
    // Formata para AAAA-MM-DD
    nascDesktop.max = maxDate.toISOString().split('T')[0];
  }

  // --- Item 3: Preencher seletores mobile com meses por extenso ---
  const daySel = document.getElementById('birth-day');
  for (let d = 1; d <= 31; d++)
    daySel?.insertAdjacentHTML('beforeend', `<option value="${d}">${String(d).padStart(2, '0')}</option>`);

  const monthSel = document.getElementById('birth-month');
  if (monthSel) {
    const meses = [
      { val: 1, nome: 'Janeiro' }, { val: 2, nome: 'Fevereiro' }, { val: 3, nome: 'Março' },
      { val: 4, nome: 'Abril' }, { val: 5, nome: 'Maio' }, { val: 6, nome: 'Junho' },
      { val: 7, nome: 'Julho' }, { val: 8, nome: 'Agosto' }, { val: 9, nome: 'Setembro' },
      { val: 10, nome: 'Outubro' }, { val: 11, nome: 'Novembro' }, { val: 12, nome: 'Dezembro' }
    ];
    meses.forEach(mes => {
      // O 'value' continua sendo o número (ex: 7), mas o texto é o nome (ex: Julho)
      monthSel.insertAdjacentHTML('beforeend', `<option value="${mes.val}">${mes.nome}</option>`);
    });
  }

  const yearSel = document.getElementById('birth-year');
  // O ano limite é 14 anos antes do ano atual
  const anoLimite = new Date().getFullYear() - 14;
  for (let y = anoLimite; y >= 1940; y--)
    yearSel?.insertAdjacentHTML('beforeend', `<option value="${y}">${y}</option>`);
});

/********* WIZARD NAV (CORRIGIDO) **********************************/
const steps = [...document.querySelectorAll('.step')];
let cur = 0;
let cpfTemporario = ''; // Variável para guardar o CPF entre as seções
let modoFormulario = 'CRIAR'; // Pode ser 'CRIAR' ou 'ATUALIZAR'
const show = i => {
  steps.forEach((s, idx) => s.classList.toggle('active', idx === i));
  const activeStep = document.querySelector('.step.active');
  if (activeStep) {
    activeStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  cur = i;
};

// --- Botões de NAVEGAÇÃO GERAL (Voltar e Continuar das seções 2 em diante) ---

// Botão VOLTAR
document.querySelectorAll('.prev').forEach(btn => {
  btn.addEventListener('click', () => {
    cur = cur ? cur - 1 : 0;
    show(cur);
  });
});

// Botão CONTINUAR (com validação e chamada de API para CRIAR ou ATUALIZAR)
document.querySelectorAll('.next').forEach(btn => {
  btn.addEventListener('click', async () => { // Função async
    // Validação e Ação na Seção 2
    if (cur === 1) {
      if (!validarSecao2()) {
        return; // Para se a validação local falhar
      }

      let sucesso;
      // Decide qual função chamar com base no modo
      if (modoFormulario === 'CRIAR') {
        sucesso = await criarUsuarioSupabase();
      } else { // modoFormulario === 'ATUALIZAR'
        sucesso = await atualizarUsuarioSupabase();
      }

      if (!sucesso) {
        return; // Para se a chamada à API falhar
      }
    }

    // Validação da Seção 3 (Pagamento)
    if (cur === 2 && !validarSecao3()) {
      return; // Para a execução se a validação da Seção 3 falhar
    }
    
    // Se tudo passar, avança
    cur++;
    show(cur);
  });
});

/********* BOTÃO AVANÇAR – SEÇÃO 1 (CPF) COM LÓGICA DE STATUS (CORRIGIDO) **********/
const btnAvancar = document.getElementById('btn-avancar');
btnAvancar?.addEventListener('click', () => {
  const cpfInput = document.getElementById('cpf');
  const errorMessage = document.getElementById('cpf-error');
  const cpfFormatado = cpfInput.value.trim();
  const cpfNumerico = cpfFormatado.replace(/\D/g, '');
  const isValid = validarCPF(cpfNumerico);

  // 1. Validação primeiro: Se o CPF for inválido, mostra o erro e PARA.
  if (!cpfNumerico || cpfNumerico.length < 11 || !isValid) {
    errorMessage.textContent = 'CPF inválido. Digite um CPF válido.';
    errorMessage.style.display = 'block';
    cpfInput.classList.add('shake');
    setTimeout(() => cpfInput.classList.remove('shake'), 500);
    return; // Interrompe a execução aqui. O loader não é mostrado.
  }

  // Se a validação passou, esconde a mensagem de erro.
  errorMessage.style.display = 'none';
  
  // 2. Agora sim, mostra o loader, pois vamos fazer a consulta.
  const loader = document.getElementById('loader-overlay');
  loader.classList.remove('hidden');

  // 3. Consulta no Supabase
  fetch(`https://ekevwyikqtyxiblygkxb.supabase.co/rest/v1/usuarios?cpf=eq.${cpfFormatado}`, {
    method: 'GET',
    headers: {
      apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZXZ3eWlrcXR5eGlibHlna3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTMyMzgsImV4cCI6MjA2MjM4OTIzOH0.GraYbusHKumfHf_IJ0O4go4ymwrqpDgnJyCUBf8eZoQ',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZXZ3eWlrcXR5eGlibHlna3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTMyMzgsImV4cCI6MjA2MjM4OTIzOH0.GraYbusHKumfHf_IJ0O4go4ymwrqpDgnJyCUBf8eZoQ'
    }
  } )
  .then(resp => resp.json())
  .then(data => {
    if (data.length === 0) {
      // CPF não existe, segue para seção 2 em modo de CRIAÇÃO
      cpfTemporario = cpfFormatado;
      modoFormulario = 'CRIAR'; // Define o modo
      cur = 1;
      show(cur);
    } else {
      const usuario = data[0];
      const status = usuario.status_do_usuario?.toUpperCase();
      const nome = usuario.nome_completo?.split(' ')[0] || 'usuário';
      
      if (status === 'INATIVO') {
        cur = 2;
        show(cur);
        const welcomeTitle = `Bem-vindo de volta, ${nome}!`;
        const welcomeText = 'Reative sua assinatura para continuar com seus benefícios.';
        setTimeout(() => { openModal(welcomeTitle, welcomeText); }, 500);
      } else if (status === 'PENDENTE') {
        // CPF existe e está PENDENTE, segue para seção 2 em modo de ATUALIZAÇÃO
        cpfTemporario = cpfFormatado;
        modoFormulario = 'ATUALIZAR'; // Define o modo
        cur = 1;
        show(cur);
      } else if (status === 'ATIVO') {
        // Usa o modal padrão para exibir a mensagem
        openModal('CPF já assinante', 'Para acessar seus benefícios, por favor, faça o login na área do cliente.');
      } else {
        // Usa o modal padrão para status desconhecido
        openModal('Status desconhecido', 'Não foi possível identificar o status para este CPF. Por favor, entre em contato com o suporte.');
      }
    }
  })
  .catch(error => {
    console.error('Erro na API:', error);
    // Usa o modal padrão para exibir o erro
    openModal('Erro na Consulta', 'Não foi possível consultar o CPF neste momento. Por favor, tente novamente mais tarde.');
  })
  .finally(() => {
    // 4. Garante que o loader SEMPRE será escondido, não importa o resultado.
    loader.classList.add('hidden');
  });
});

/********* TOGGLE CAMPOS CARTÃO *************************************/
const cardFields = document.getElementById('card-fields');
document.querySelectorAll('input[name=pay]').forEach(radio => {
  radio.onchange = () => cardFields.style.display = document.getElementById('cc')?.checked ? 'block' : 'none';
});
cardFields.style.display = 'block';

/********* RESULTADO (Etapa 5) **************************************/
const resultBox = document.getElementById('result');
document.querySelector('.step[data-step="4"] .next')?.addEventListener('click', () => {
  setTimeout(() => {
    resultBox.innerHTML =
      '<span style="color:#6fffa7;font-weight:600">✅ Assinatura criada com sucesso!</span><br>Você receberá um e-mail em instantes.';
  }, 1200);
});

/********* POP-UP DE INFORMAÇÃO *************************************/
const infoCopy = {
  individual: {
    title: 'Planos Individuais',
    text:  'Planos para um único titular.'
  },
  familiar: {
    title: 'Planos Familiares',
    text:  'Titular + até 3 dependentes na mesma assinatura.'
  }
};
const modal     = document.getElementById('infoModal');
const modalBox  = document.getElementById('modalBox');
const mTitle    = document.getElementById('modalTitle');
const mText     = document.getElementById('modalText');
const chkTerms  = document.getElementById('ok');
const openModal = (t, txt) => {
  mTitle.textContent = t;
  mText.innerHTML    = txt.replace(/\n/g, '<br>');
  modal.style.display = 'grid';
  setTimeout(() => modalBox.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
};
const closeModal = () => {
  modal.style.display = 'none';
  if (chkTerms) chkTerms.checked = true;
};
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', closeModal);
});
document.querySelectorAll('.info-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const type = icon.dataset.type;
    openModal(infoCopy[type].title, infoCopy[type].text);
  });
});

/********* TERMOS DE USO *********************************************/
const termsText = `O uso da ficha de cadastro do aplicativo TKS Vantagens ("Aplicativo") implica a aceitação integral deste Termo de Uso ("Termo"). Ao preencher a ficha de cadastro e utilizar o Aplicativo, o usuário declara ter lido, compreendido e concordado com todas as condições abaixo.

1.⁠ ⁠Coleta e Tratamento de Dados

1.1. O usuário reconhece que, ao preencher a ficha de cadastro, fornecerá dados pessoais — nome, endereço, e‑mail, telefone, CPF, entre outros — que serão tratados pela TKS Vantagens em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei n.º 13.709/2018 – LGPD).

1.2. A TKS Vantagens compromete‑se a tratar esses dados com segurança e confidencialidade, adotando medidas técnicas e administrativas aptas a protegê‑los contra acessos não autorizados, perda ou tratamento indevido.

1.3. Os dados poderão ser utilizados para:

•⁠  ⁠Análise estatística;

•⁠  ⁠Melhoria do Aplicativo;

•⁠  ⁠Promoções e campanhas de marketing de produtos próprios, do grupo e/ou de parceiros;

•⁠  ⁠Comunicação via e‑mail, SMS, WhatsApp e/ou ligação telefônica;

•⁠  ⁠Monitoramento de atividades de consumo e utilzação dentro do aplicativo.

2.⁠ ⁠Consentimento e Direitos do Titular

2.1. Ao se cadastrar, o usuário consente expressamente com a coleta e tratamento de seus dados conforme este Termo.

2.2. O usuário pode solicitar — a qualquer momento — acesso, retificação, anonimização, portabilidade, eliminação ou bloqueio dos dados, bem como revogar o consentimento, enviando e‑mail para contato@tksvantagens.com.br.

2.3. A revogação de consentimento poderá inviabilizar o uso do Aplicativo.

3.⁠ ⁠Planos, Pagamentos e Penalidades

3.1. Modalidades de Assinatura

A TKS Vantagens oferece planos mensais e semestrais (fidelidade mínima de seis meses). O usuário seleciona a modalidade desejada no momento da contratação.

3.2. Cobrança nos Planos Semestrais

3.2.1. Nas adesões aos planos semestrais, não ocorre bloqueio do limite do cartão de crédito no valor total das seis mensalidades.3.2.2. É cobrado apenas o valor da mensalidade corrente a cada ciclo mensal.

3.3. Inadimplência

3.3.1. O usuário declara estar ciente de que, em caso de descumprimento de pagamento em planos semestrais, poderá:

•⁠  ⁠ser cobrado judicialmente;

•⁠  ⁠ter seu nome negativado nos órgãos de proteção ao crédito;

•⁠  ⁠ter o débito protestado em cartório.

3.3.2. Sobre a mensalidade em atraso incidirão juros e multa previstos em lei e/ou na fatura enviada.

3.4. Cancelamento Antecipado (Planos Semestrais)

3.4.1. A rescisão antes do término do período de fidelidade implica pagamento de multa de 50 % sobre o valor das faturas restantes.

3.4.2. O usuário autoriza a TKS Vantagens a debitar tal multa no cartão de crédito cadastrado.3.4.3. Caso o limite do cartão seja insuficiente, a multa poderá ser cobrada judicialmente, bem como resultar em negativação e protesto, conforme item 3.3.

4.⁠ ⁠Disposições Finais

4.1. Este Termo constitui o acordo integral entre as partes, prevalecendo sobre quaisquer entendimentos anteriores.

4.2. A TKS Vantagens pode alterar este Termo a qualquer momento, publicando nova versão no Aplicativo. O uso contínuo após a publicação implica aceitação das modificações.

4.3. Este Termo é regido pelas leis brasileiras. Fica eleito o foro da Comarca de São Paulo/SP para dirimir eventuais controvérsias.

Ao prosseguir com a contratação, o usuário declara ter lido, compreendido e concordado com todos os termos acima.`;

document.querySelector('.terms-link')?.addEventListener('click', e => {
  e.preventDefault();
  openModal('Termos de Uso TKS Vantagens', termsText);
});

// Remover botão "Fechar ✓"
const footerBtn = document.querySelector('.footer-close');
if (footerBtn) footerBtn.remove();

/********* MÁSCARAS DOS DADOS DE PAGAMENTO **************/

// --- Máscara para o Número do Cartão de Crédito ---
const cartaoInput = document.getElementById('cc-num');

cartaoInput.addEventListener('input', (e) => {
  // 1. Remove tudo que não for dígito e limita a 16 caracteres.
  let valor = e.target.value.replace(/\D/g, '').substring(0, 16);

  // 2. Adiciona um espaço a cada 4 dígitos.
  // Usa uma expressão regular para encontrar grupos de 4 dígitos e adiciona um espaço depois,
  // mas não adiciona espaço no final.
  valor = valor.replace(/(\d{4})(?=\d)/g, '$1 ');

  // 3. Atualiza o valor no campo.
  e.target.value = valor;
});


// --- Máscara para a Data de Validade (MM/AA) ---
const validadeInput = document.getElementById('expiry');

validadeInput.addEventListener('input', (e) => {
  // 1. Remove tudo que não for dígito e limita a 4 caracteres (MM + AA).
  let valor = e.target.value.replace(/\D/g, '').substring(0, 4);

  // 2. Adiciona a barra "/" após os dois primeiros dígitos (o mês).
  if (valor.length > 2) {
    valor = valor.replace(/^(\d{2})/, '$1/');
  }

  // 3. Atualiza o valor no campo.
  e.target.value = valor;
});

// --- Filtro "Apenas Números" para o CVV ---
const cvvInput = document.getElementById('cvv');

cvvInput.addEventListener('input', (e) => {
  // Remove tudo que não for dígito
  e.target.value = e.target.value.replace(/\D/g, '');
});

/********* VALIDAÇÕES DA SEÇÃO 2 (DADOS DO USUÁRIO) - VERSÃO MELHORADA **************/

// --- 1. Seleção de todos os elementos ---
const nomeInput = document.getElementById('nome');
const nomeError = document.getElementById('nome-error');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const nascInput = document.getElementById('nasc');
const nascError = document.getElementById('nasc-error');
const senhaInput = document.getElementById('senha');
const senhaError = document.getElementById('senha-error');
const pass2Input = document.getElementById('pass2');
const pass2Error = document.getElementById('pass2-error');

// --- 2. Funções de validação individuais ---
function validarEmail(email) {
  if (!email) return false; // Campo não pode ser vazio
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validarSenha(senha) {
  if (!senha) return false; // Campo não pode ser vazio
  const temMaiuscula = /[A-Z]/.test(senha);
  const temMinuscula = /[a-z]/.test(senha);
  const temNumero = /[0-9]/.test(senha);
  const temEspecial = /[#%^@!\]]/.test(senha);
  const temTamanho = senha.length >= 8;
  return temMaiuscula && temMinuscula && temNumero && temEspecial && temTamanho;
}

// --- 3. Função principal que valida a Seção 2 (chamada pelo WIZARD NAV) ---
function validarSecao2() {
  let primeiroErro = null; // Variável para guardar o primeiro campo com erro

  // Esconde todos os erros antes de revalidar
  [nomeError, emailError, nascError, senhaError, pass2Error].forEach(err => err.style.display = 'none');

  // Validação do Nome
  if (!nomeInput.value) {
    nomeError.textContent = 'Campo obrigatório.';
    nomeError.style.display = 'block';
    if (!primeiroErro) primeiroErro = nomeInput;
  }

  // Validação do E-mail
  if (!emailInput.value) {
    emailError.textContent = 'Campo obrigatório.';
    emailError.style.display = 'block';
    if (!primeiroErro) primeiroErro = emailInput;
  } else if (!validarEmail(emailInput.value)) {
    emailError.textContent = 'E-mail inválido.';
    emailError.style.display = 'block';
    if (!primeiroErro) primeiroErro = emailInput;
  }

   // --- Validação da Data de Nascimento (Desktop e Mobile) ---
  const birthPickerMobile = document.querySelector('.birth-picker-mobile');
  const diaSelecionado = document.getElementById('birth-day').value;
  const mesSelecionado = document.getElementById('birth-month').value;
  const anoSelecionado = document.getElementById('birth-year').value;

  // Verifica se a visualização é mobile (se os seletores estão visíveis)
  if (window.getComputedStyle(birthPickerMobile).display !== 'none') {
    // Lógica para MOBILE: verifica se todos os 3 seletores foram preenchidos
    if (!diaSelecionado || diaSelecionado === "Dia" || !mesSelecionado || mesSelecionado === "Mês" || !anoSelecionado || anoSelecionado === "Ano") {
      nascError.textContent = 'Campo obrigatório.';
      nascError.style.display = 'block';
      // Foca no primeiro seletor não preenchido para guiar o usuário
      if (!primeiroErro) primeiroErro = document.getElementById('birth-day');
    }
  } else {
    // Lógica para DESKTOP: verifica o input de data único
    if (!nascInput.value) {
      nascError.textContent = 'Campo obrigatório.';
      nascError.style.display = 'block';
      if (!primeiroErro) primeiroErro = nascInput;
    }
  }

  // Validação da Senha
  if (!senhaInput.value) {
    senhaError.textContent = 'Campo obrigatório.';
    senhaError.style.display = 'block';
    if (!primeiroErro) primeiroErro = senhaInput;
  } else if (!validarSenha(senhaInput.value)) {
    senhaError.textContent = 'A senha não atende aos critérios.';
    senhaError.style.display = 'block';
    if (!primeiroErro) primeiroErro = senhaInput;
  }

  // Validação da Confirmação de Senha
  if (!pass2Input.value) {
    pass2Error.textContent = 'Campo obrigatório.';
    pass2Error.style.display = 'block';
    if (!primeiroErro) primeiroErro = pass2Input;
  } else if (senhaInput.value && pass2Input.value !== senhaInput.value) {
    pass2Error.textContent = 'As senhas não coincidem.';
    pass2Error.style.display = 'block';
    if (!primeiroErro) primeiroErro = pass2Input;
  }

  // Se houver um erro, foca no primeiro campo errado
  if (primeiroErro) {
    primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
    primeiroErro.classList.add('shake');
    setTimeout(() => primeiroErro.classList.remove('shake'), 500);
    return false; // Validação falhou
  }

  return true; // Validação passou
}


// --- 4. "Ouvintes" para feedback em tempo real (quando o usuário sai do campo) ---

// Valida E-mail
emailInput.addEventListener('blur', () => {
  if (emailInput.value && !validarEmail(emailInput.value)) {
    emailError.textContent = 'E-mail inválido.';
    emailError.style.display = 'block';
  } else {
    emailError.style.display = 'none';
  }
});

// Valida Senha
senhaInput.addEventListener('blur', () => {
  if (senhaInput.value && !validarSenha(senhaInput.value)) {
    senhaError.textContent = 'A senha não atende aos critérios.';
    senhaError.style.display = 'block';
  } else {
    senhaError.style.display = 'none';
  }
});

// Valida Confirmação de Senha
pass2Input.addEventListener('blur', () => {
  if (pass2Input.value && senhaInput.value && pass2Input.value !== senhaInput.value) {
    pass2Error.textContent = 'As senhas não coincidem.';
    pass2Error.style.display = 'block';
  } else {
    pass2Error.style.display = 'none';
  }
});

/********* VALIDAÇÕES DA SEÇÃO 3 (PLANO E PAGAMENTO) - VERSÃO COMPLETA **************/

// --- 1. Seleção de todos os elementos da Seção 3 ---
const ccNumInput = document.getElementById('cc-num');
const ccNumError = document.getElementById('cc-num-error');
// A variável cvvInput já foi declarada no bloco de MÁSCARAS, podemos usá-la.
const cvvError = document.getElementById('cvv-error');
const expiryInput = document.getElementById('expiry');
const expiryError = document.getElementById('expiry-error');
const holderInput = document.getElementById('holder');
const holderError = document.getElementById('holder-error');
const radioCartao = document.getElementById('cc');

// --- 2. Validação em tempo real (BLUR) para feedback imediato ---

// Valida Nº do Cartão ao sair do campo
ccNumInput.addEventListener('blur', () => {
  const numCartaoSemEspacos = ccNumInput.value.replace(/\s/g, '');
  if (numCartaoSemEspacos.length > 0 && numCartaoSemEspacos.length < 12) {
    ccNumError.textContent = 'Número de cartão inválido.';
    ccNumError.style.display = 'block';
  } else {
    ccNumError.style.display = 'none';
  }
});

// Valida CVV ao sair do campo
cvvInput.addEventListener('blur', () => {
  if (cvvInput.value.length > 0 && cvvInput.value.length < 3) {
    cvvError.textContent = 'CVV Inválido.';
    cvvError.style.display = 'block';
  } else {
    cvvError.style.display = 'none';
  }
});

// Valida Data de Validade ao sair do campo
expiryInput.addEventListener('blur', () => {
  if (expiryInput.value.length > 0 && expiryInput.value.length < 5) {
    expiryError.textContent = 'Validade incorreta.';
    expiryError.style.display = 'block';
  } else {
    expiryError.style.display = 'none';
  }
});


// --- 3. Função principal que faz a validação FINAL ao clicar em "Assinar" ---
function validarSecao3() {
  if (!radioCartao.checked) {
    return true;
  }

  let primeiroErro = null;

  // Esconde todos os erros antes de revalidar
  [ccNumError, cvvError, expiryError, holderError].forEach(err => err.style.display = 'none');

  // Validação do Número do Cartão
  const numCartaoSemEspacos = ccNumInput.value.replace(/\s/g, '');
  if (!numCartaoSemEspacos) {
    ccNumError.textContent = 'Campo obrigatório.';
    ccNumError.style.display = 'block';
    if (!primeiroErro) primeiroErro = ccNumInput;
  } else if (numCartaoSemEspacos.length < 12) {
    ccNumError.textContent = 'Número de cartão inválido.';
    ccNumError.style.display = 'block';
    if (!primeiroErro) primeiroErro = ccNumInput;
  }

  // Validação do CVV
  if (!cvvInput.value) {
    cvvError.textContent = 'Campo obrigatório.';
    cvvError.style.display = 'block';
    if (!primeiroErro) primeiroErro = cvvInput;
  } else if (cvvInput.value.length < 3) {
    cvvError.textContent = 'CVV Inválido.';
    cvvError.style.display = 'block';
    if (!primeiroErro) primeiroErro = cvvInput;
  }

  // Validação da Data de Validade
  if (!expiryInput.value) {
    expiryError.textContent = 'Campo obrigatório.';
    expiryError.style.display = 'block';
    if (!primeiroErro) primeiroErro = expiryInput;
  } else if (expiryInput.value.length < 5) {
    expiryError.textContent = 'Validade incorreta.';
    expiryError.style.display = 'block';
    if (!primeiroErro) primeiroErro = expiryInput;
  }

  // Validação do Titular do Cartão
  if (!holderInput.value) {
    holderError.textContent = 'Campo obrigatório.';
    holderError.style.display = 'block';
    if (!primeiroErro) primeiroErro = holderInput;
  }

  // Se houver um erro, foca no primeiro campo errado
  if (primeiroErro) {
    primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
    primeiroErro.classList.add('shake');
    setTimeout(() => primeiroErro.classList.remove('shake'), 500);
    return false; // Validação falhou
  }

  return true; // Validação passou
}

/********* FUNÇÃO PARA CRIAR USUÁRIO NO SUPABASE **************/

async function criarUsuarioSupabase() {
  // 1. Mostrar o loader para feedback visual
  const loader = document.getElementById('loader-overlay');
  loader.classList.remove('hidden');

  // 2. Coletar os dados dos inputs
  const nome = nomeInput.value;
  const email = emailInput.value;
  const senha = senhaInput.value;
  
  // Formatar a data de nascimento para o padrão do Supabase (AAAA-MM-DD)
  let dataNascimento;
  const birthPickerMobile = document.querySelector('.birth-picker-mobile');
  if (window.getComputedStyle(birthPickerMobile).display !== 'none') {
    // Lógica para Mobile
    const dia = String(document.getElementById('birth-day').value).padStart(2, '0');
    const mes = String(document.getElementById('birth-month').value).padStart(2, '0');
    const ano = document.getElementById('birth-year').value;
    dataNascimento = `${ano}-${mes}-${dia}`;
  } else {
    // Lógica para Desktop
    dataNascimento = nascInput.value;
  }

  // 3. Montar o corpo (body) da requisição
  const dadosUsuario = {
    cpf: cpfTemporario,
    nome_completo: nome,
    email: email,
    data_de_nascimento: dataNascimento,
    senha_temporario: senha,
    cadastro_ativo: true,
    status_do_usuario: "PENDENTE",
    data_criacao: new Date().toISOString()
  };

  try {
    // 4. Fazer a chamada POST para a API
    const response = await fetch('https://ekevwyikqtyxiblygkxb.supabase.co/rest/v1/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZXZ3eWlrcXR5eGlibHlna3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTMyMzgsImV4cCI6MjA2MjM4OTIzOH0.GraYbusHKumfHf_IJ0O4go4ymwrqpDgnJyCUBf8eZoQ',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZXZ3eWlrcXR5eGlibHlna3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTMyMzgsImV4cCI6MjA2MjM4OTIzOH0.GraYbusHKumfHf_IJ0O4go4ymwrqpDgnJyCUBf8eZoQ',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(dadosUsuario )
    });

    if (!response.ok) {
      // Se a resposta não for OK (ex: erro 400, 500), lança um erro
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao criar usuário.');
    }

    // Se a resposta for OK, retorna true (sucesso)
    return true;

  } catch (error) {
    console.error('Erro na API ao criar usuário:', error);
    alert(`Ocorreu um erro: ${error.message}`);
    return false; // Retorna false (falha)
  } finally {
    // 5. Esconder o loader, não importa o resultado
    loader.classList.add('hidden');
  }
}

/********* FUNÇÃO PARA ATUALIZAR USUÁRIO NO SUPABASE **************/

async function atualizarUsuarioSupabase() {
  // 1. Mostrar o loader
  const loader = document.getElementById('loader-overlay');
  loader.classList.remove('hidden');

  // 2. Coletar os dados dos inputs
  const nome = nomeInput.value;
  const email = emailInput.value;
  const senha = senhaInput.value;
  
  // Formatar a data de nascimento
  let dataNascimento;
  const birthPickerMobile = document.querySelector('.birth-picker-mobile');
  if (window.getComputedStyle(birthPickerMobile).display !== 'none') {
    const dia = String(document.getElementById('birth-day').value).padStart(2, '0');
    const mes = String(document.getElementById('birth-month').value).padStart(2, '0');
    const ano = document.getElementById('birth-year').value;
    dataNascimento = `${ano}-${mes}-${dia}`;
  } else {
    dataNascimento = nascInput.value;
  }

  // 3. Montar o corpo (body) da requisição PATCH
  const dadosAtualizacao = {
    nome_completo: nome,
    email: email,
    data_de_nascimento: dataNascimento,
    senha_temporario: senha,
    status_do_usuario: "PENDENTE" // Mantém como pendente ou atualiza se necessário
  };

  try {
    // 4. Fazer a chamada PATCH para a API, usando o CPF na URL
    const response = await fetch(`https://ekevwyikqtyxiblygkxb.supabase.co/rest/v1/usuarios?cpf=eq.${cpfTemporario}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZXZ3eWlrcXR5eGlibHlna3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTMyMzgsImV4cCI6MjA2MjM4OTIzOH0.GraYbusHKumfHf_IJ0O4go4ymwrqpDgnJyCUBf8eZoQ',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZXZ3eWlrcXR5eGlibHlna3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTMyMzgsImV4cCI6MjA2MjM4OTIzOH0.GraYbusHKumfHf_IJ0O4go4ymwrqpDgnJyCUBf8eZoQ',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(dadosAtualizacao )
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao atualizar usuário.');
    }
    
    return true; // Sucesso

  } catch (error) {
    console.error('Erro na API ao atualizar usuário:', error);
    alert(`Ocorreu um erro: ${error.message}`);
    return false; // Falha
  } finally {
    // 5. Esconder o loader
    loader.classList.add('hidden');
  }
}