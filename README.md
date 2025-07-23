# tksassinatura
Módulo de assinatura da TKS Vantagens: integração com IUGU, Supabase e fluxo completo de checkout

Detalhamento de Projeto  O o projeto é o fluxo de assinatura multi-etapas da TKS Vantagens. O sistema foi desenvolvido para gerenciar o processo de cadastro e assinatura de novos usuários, bem como a reativação de assinaturas existentes, através de um fluxo intuitivo e validado em diversas etapas. O projeto visa otimizar a experiência do usuário na plataforma, garantindo a coleta de dados essenciais e a integração com serviços de pagamento e gerenciamento de usuários.

O fluxo é composto por cinco seções principais, cada uma com validações específicas e interações com APIs externas para garantir a integridade e a consistência dos dados. A arquitetura do sistema é baseada em tecnologias web padrão, como HTML, CSS e JavaScript, com uma pendência de criação de proxy PHP para comunicação segura com serviços de backend, como Supabase para gerenciamento de usuários e Iugu para processamento de pagamentos e listagem de planos.

Ao longo do desenvolvimento, foram enfrentados desafios relacionados à integração de APIs, validação de formulários em tempo real, e a correta exibição de elementos visuais, como o ícone de carregamento. 

Estou com o último código estável que estava funcionando porém ainda não tinha sido implementado a parte PHP, contendo somente a parte do HTML, CSS e JS ainda.

O objetivo principal deste projeto é criar um fluxo de assinatura digital eficiente e amigável para a TKS Vantagens, permitindo que os usuários se cadastrem, escolham planos de assinatura e realizem pagamentos de forma segura e intuitiva. Além disso, o sistema deve ser capaz de:

1. Verificar a existência de CPFs no banco de dados do Supabase para direcionar o usuário para o fluxo de cadastro de novo usuário ou reativação de conta.
2. Coletar dados essenciais do usuário de forma validada e segura.
3. Exibir e gerenciar planos de assinatura dinamicamente, buscando informações da API da Iugu.
4. Processar informações de pagamento (cartão de crédito, boleto, Pix) de forma integrada com a Iugu.
5. Permitir a seleção de categorias de interesse para personalização futura da experiência do usuário.
6. Fornecer feedback claro ao usuário sobre o status de sua assinatura.
7. Garantir a responsividade da interface para diferentes dispositivos (desktop e mobile).
8. Minimizar erros e fornecer mensagens de validação claras para uma melhor experiência do usuário.

O projeto de fluxo de assinatura multi-etapas da TKS Vantagens é construído sobre uma pilha de tecnologias web padrão, garantindo compatibilidade e facilidade de manutenção. As principais tecnologias empregadas são:

HTML5: Utilizado para estruturar o conteúdo da página, definindo as cinco seções do fluxo de assinatura, formulários, botões e elementos de exibição de informações. A semântica do HTML5 é aplicada para garantir acessibilidade e boa prática de desenvolvimento web.

CSS3: Responsável pela estilização e apresentação visual da interface. Isso inclui o design moderno com efeito 'glassmorphism', responsividade para diferentes tamanhos de tela (desktop e mobile), animações de transição entre as etapas, e a estilização de elementos de formulário e botões. O arquivo style.css contém todas as regras de estilo que definem a aparência da aplicação.

JavaScript (ES6+): A linguagem principal para a lógica de front-end e interatividade. O arquivo script.js gerencia o fluxo de navegação entre as etapas, validações de formulário em tempo real (CPF, e-mail, senha, dados de cartão), integração com APIs externas (Supabase e Iugu) através de requisições assíncronas (fetch), manipulação do DOM para exibir dados dinamicamente (como os planos da Iugu), e controle de elementos visuais como o loader.  Precisamos pensar em como ter os seguintes itens: Segurança: Proteger chaves de API e credenciais sensíveis, evitando que sejam expostas diretamente no código JavaScript do lado do cliente. CORS (Cross-Origin Resource Sharing): Contornar restrições de CORS que poderiam impedir requisições diretas do navegador para APIs em domínios diferentes.

Lógica de Negócio: Implementar lógica de negócio específica do servidor, como a construção de payloads para as APIs e o tratamento inicial de respostas.

Supabase: Um backend de código aberto que oferece funcionalidades de banco de dados (PostgreSQL), autenticação, APIs instantâneas e armazenamento de arquivos. No contexto deste projeto, o Supabase é utilizado para:

Gerenciamento de Usuários: Armazenar e consultar informações de CPF e status de assinatura dos usuários.

Verificação de CPF: Determinar se um CPF já existe na base de dados e qual o status do usuário (ativo, inativo, pendente), direcionando o fluxo de assinatura de acordo.

Iugu: Uma plataforma de pagamentos completa que permite a gestão de assinaturas, emissão de boletos, processamento de pagamentos via cartão de crédito e Pix. No projeto, a Iugu é integrada para:

Listagem de Planos: Obter dinamicamente os planos de assinatura disponíveis, incluindo seus nomes, identificadores e preços.

Processamento de Pagamentos: Gerenciar as transações financeiras relacionadas às assinaturas.

LottieFiles: Utilizado para exibir animações leves e vetoriais, como o ícone de carregamento. A biblioteca dotlottie-wc é empregada para renderizar essas animações de forma eficiente, proporcionando uma experiência visual mais agradável durante os processos assíncronos.

Essa combinação de tecnologias permite um desenvolvimento ágil, uma interface de usuário rica e uma integração robusta com serviços de backend essenciais para o fluxo de assinatura.

O site está hospedado na Hostinger

4. Funcionalidades Existentes

O fluxo de assinatura multi-etapas da TKS Vantagens incorpora diversas funcionalidades essenciais para um processo de cadastro e pagamento eficiente e amigável. Cada funcionalidade foi desenvolvida para guiar o usuário de forma intuitiva e segura através das diferentes etapas da assinatura.

4.1. Validação de CPF e Direcionamento de Fluxo

Na primeira etapa do processo, o sistema solicita o CPF do usuário. Esta funcionalidade é crucial para determinar o caminho que o usuário seguirá no fluxo de assinatura:

Validação de Formato: O CPF inserido é validado em tempo real para garantir que esteja em um formato válido (ex: 000.000.000-00). Máscaras de entrada são aplicadas automaticamente para facilitar a digitação e evitar erros de formatação.

Consulta ao Supabase: Após a validação do formato, o CPF é enviado para o Supabase para consulta o banco de dados do Supabase. Esta consulta verifica se o CPF já está cadastrado e qual o status_do_usuario associado a ele.

Direcionamento Condicional: Com base na resposta do Supabase, o sistema direciona o usuário para a próxima etapa apropriada:

CPF Não Cadastrado: Se o CPF não for encontrado no Supabase, o sistema assume que é um novo usuário e o direciona para a etapa de preenchimento de dados básicos (Seção 2), com o modoFormulario definido como CRIAR.

CPF Cadastrado - Status 'INATIVO': Se o CPF for encontrado e o status for 'INATIVO', o usuário é direcionado para a etapa de preenchimento de dados básicos (Seção 2), com o modoFormulario definido como ATUALIZAR. Um pop-up de boas-vindas é exibido, convidando o usuário a reativar sua assinatura.

CPF Cadastrado - Status 'PENDENTE': Se o CPF for encontrado e o status for 'PENDENTE', o usuário é direcionado para a etapa de preenchimento de dados básicos (Seção 2), com o modoFormulario definido como ATUALIZAR. Isso permite que o usuário complete um cadastro que estava incompleto.

CPF Cadastrado - Status 'ATIVO': Se o CPF for encontrado e o status for 'ATIVO', um pop-up informa que o CPF já é assinante e o usuário é instruído a fazer login na área do cliente, impedindo um novo cadastro desnecessário.

Status Desconhecido/Erro: Em caso de status não reconhecido ou erro na consulta, um pop-up de erro é exibido, solicitando que o usuário entre em contato com o suporte.

4.2. Coleta e Validação de Dados Básicos do Usuário

Na Seção 2, o sistema coleta informações pessoais essenciais do usuário. Esta etapa inclui validações robustas para garantir a qualidade dos dados:

Nome Completo: Campo de texto simples com validação de preenchimento obrigatório.

E-mail: Campo de e-mail com validação de formato e preenchimento obrigatório. Garante que o e-mail seja válido antes de prosseguir.

Data de Nascimento: Campo de data que permite a seleção via calendário (desktop) ou seletores de dia, mês e ano (mobile). Possui validação para garantir que o usuário tenha no mínimo 14 anos, impedindo cadastros de menores de idade.

Senha e Confirmação de Senha: Campos de senha com validação de complexidade (mínimo de 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial) e confirmação de que as senhas digitadas coincidem. Isso garante a segurança da conta do usuário.

Persistência de Dados: Após a validação bem-sucedida, os dados são enviados ao Supabase para criação ou atualização do registro do usuário, dependendo do modoFormulario (CRIAR ou ATUALIZAR).

4.3. Carregamento Dinâmico e Seleção de Planos Iugu

A Seção 3 é dedicada à escolha do plano de assinatura e à inserção dos dados de pagamento. Uma funcionalidade chave aqui é o carregamento dinâmico dos planos da Iugu:

Requisição à Iugu via Proxy não foi implementada ainda. Porém ao carregar a Seção 3, o script.js deveria fazer uma requisição a API da Iugu para obter a lista de planos de assinatura disponíveis.

Exibição Categorizada: Os planos recebidos da Iugu são processados e exibidos em duas categorias distintas:

Planos Individuais: Exibidos sob o título "Individual", contendo planos como "Plano Individual - Semestral" e "Plano Individual - Mensal".

Planos Familiares: Exibidos sob o título "Familiar", contendo planos como "Plano Família - Semestral" e "Plano Família - Mensal".

Cada plano é apresentado com seu nome e preço formatado em moeda brasileira (R$ XX,XX/mês).

Seleção de Plano: Os planos são apresentados como botões de rádio estilizados, permitindo que o usuário selecione apenas um plano por vez. O primeiro plano da lista é automaticamente pré-selecionado para conveniência do usuário.

4.4. Métodos de Pagamento e Validação de Cartão de Crédito

Ainda na Seção 3, o usuário pode escolher a forma de pagamento e inserir os dados necessários:

Opções de Pagamento: O sistema oferece três opções de pagamento: Cartão de Crédito, Boleto e Pix. A seleção é feita através de botões de rádio.

Campos de Cartão de Crédito: Quando a opção "Cartão de Crédito" é selecionada, campos específicos para número do cartão, CVV, validade (MM/AA) e titular do cartão são exibidos. Estes campos possuem:

Máscaras de Entrada: Para facilitar a digitação e garantir o formato correto (ex: 0000 0000 0000 0000 para o número do cartão, MM/AA para a validade).

Validações em Tempo Real: Cada campo é validado para garantir que as informações sejam válidas (ex: número do cartão com 16 dígitos, CVV com 3 ou 4 dígitos, validade no formato correto e não expirada). Mensagens de erro claras são exibidas caso as validações falhem.

Integração com Iugu: As informações de pagamento são coletadas para serem enviadas à Iugu para processamento da transação de assinatura.

4.5. Seleção de Categorias de Interesse

A Seção 4 permite que o usuário personalize sua experiência selecionando categorias de interesse:

Tags Interativas: Uma lista de categorias (ex: Farmácia, Eletrodoméstico, Automotivo, Beleza e Bem-Estar, etc.) é apresentada como tags clicáveis. O usuário pode selecionar múltiplas categorias de seu interesse.

Personalização: As categorias selecionadas podem ser utilizadas futuramente pela plataforma para oferecer ofertas e conteúdos personalizados ao usuário, melhorando a relevância da experiência.

4.6. Status do Pagamento e Resultado da Assinatura

A Seção 5 é a etapa final do fluxo, onde o usuário recebe o feedback sobre o status de sua assinatura:

Feedback Visual: Após a conclusão das etapas anteriores, esta seção exibe uma mensagem indicando o sucesso da assinatura (ex: "✅ Assinatura criada com sucesso! Você receberá um e-mail em instantes.").

Acesso aos Benefícios: Um botão "Acessar Benefícios" é fornecido, direcionando o usuário para a área de login da plataforma, onde ele poderá começar a usufruir dos serviços.

4.7. Pop-ups e Modais Informativos

O sistema utiliza modais (pop-ups) para fornecer informações adicionais ou mensagens de erro ao usuário:

Pop-up de Boas-Vindas: Exibido para usuários com CPF cadastrado e status "INATIVO", convidando-os a reativar a assinatura.

Pop-up de CPF Já Assinante: Informa ao usuário que o CPF já possui uma assinatura ativa e o direciona para a área de login.

Pop-up de Erro/Status Desconhecido: Utilizado para informar sobre erros na API ou status de CPF não reconhecidos.

Termos de Uso: Um modal exibe os termos de uso e política de privacidade da TKS Vantagens, garantindo que o usuário esteja ciente e concorde com as condições antes de finalizar a assinatura.

Essas funcionalidades, combinadas com as validações em tempo real e a navegação intuitiva, visam proporcionar uma experiência de usuário fluida e eficiente durante todo o processo de assinatura.

5. Fluxo Multi-Etapas Detalhado

O processo de assinatura é dividido em cinco seções sequenciais, garantindo que o usuário forneça as informações necessárias de forma organizada e validada. A transição entre as etapas é controlada por botões de navegação ("Avançar" e "Voltar") e validações específicas de cada seção.

5.1. Seção 1: Verificação de CPF

Propósito: Identificar o usuário e direcioná-lo para o fluxo de cadastro ou reativação.

Interação: O usuário insere seu CPF. O sistema valida o formato e consulta o Supabase

Transição: Com base na resposta do Supabase, o usuário avança para a Seção 2 (para novos cadastros ou reativações) ou recebe um pop-up informativo (para CPFs já ativos ou erros).

5.2. Seção 2: Dados Básicos do Usuário

Propósito: Coletar informações pessoais essenciais do usuário.

Interação: O usuário preenche campos como Nome Completo, E-mail, Data de Nascimento e define uma Senha. Todos os campos possuem validações em tempo real.

Transição: Após o preenchimento correto e a validação dos dados, e a criação/atualização do usuário no Supabase, o usuário avança para a Seção 3.

5.3. Seção 3: Seleção de Plano e Dados de Pagamento

Propósito: Permitir que o usuário escolha um plano de assinatura e forneça os detalhes de pagamento.

Interação: Os planos da Iugu são carregados dinamicamente e exibidos em categorias (Individual e Familiar). O usuário seleciona um plano e, se optar por Cartão de Crédito, preenche os dados do cartão com máscaras e validações. Opções de Boleto e Pix também estão disponíveis.

Transição: Após a seleção do plano e o preenchimento válido dos dados de pagamento, o usuário avança para a Seção 4.

5.4. Seção 4: Escolha das Categorias de Interesse

Propósito: Personalizar a experiência do usuário através da seleção de preferências.

Interação: O usuário seleciona uma ou mais categorias de interesse em uma lista de tags interativas.

Transição: Ao continuar, o sistema processa as preferências e avança para a Seção 5.

5.5. Seção 5: Resultado da Assinatura

Propósito: Informar o usuário sobre o status final de sua assinatura e fornecer acesso à plataforma.

Interação: Exibe uma mensagem de sucesso da assinatura e um botão para acessar os benefícios da plataforma.

Transição: Esta é a etapa final do fluxo de assinatura.

Este fluxo sequencial garante uma experiência guiada e eficiente para o usuário, coletando todas as informações necessárias de forma estruturada.


