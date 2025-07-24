CREDENCIAIS PROJETO ASSINATURA TKS - SUPABASE



API NAME: Supabase
Authentication: None or self-handled

Shared headers for all calls 
Key: apikey
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZXZ3eWlrcXR5eGlibHlna3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTMyMzgsImV4cCI6MjA2MjM4OTIzOH0.GraYbusHKumfHf_IJ0O4go4ymwrqpDgnJyCUBf8eZoQ  
Key: Authorization
Value: 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZXZ3eWlrcXR5eGlibHlna3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTMyMzgsImV4cCI6MjA2MjM4OTIzOH0.GraYbusHKumfHf_IJ0O4go4ymwrqpDgnJyCUBf8eZoQ


CHAMADAS API DO SUPABASE  1. Buscar CPF  Use as: Action
Data type: JSON

GET  URL: https://ekevwyikqtyxiblygkxb.supabase.co/rest/v1/usuarios?cpf=eq.[cpf]

(use [] for params)
URL parameters

Key: cpf 
Value: (Número do cpf com pontos, exemplo: 047.090.051-25)


Response :

{
  "body": [
    {
      "id": "0c35ff1a-c839-4519-af6e-4c8319a8a096",
      "nome_completo": "IGOR SOARES",
      "cpf": "047.090.051-25",
      "email": "igor@tksvantagens.com.br",
      "telefone_ddd": "61",
      "telefone_numero": "996187769",
      "data_de_nascimento": "1993-12-13",
      "genero": null,
      "endereco_id": "5d334506-7e4e-4b8e-81d5-1edf537d5c2a",
      "categoria_origem_id": null,
      "origem_cadastro_id": null,
      "cadastro_ativo": true,
      "data_criacao": "2025-06-09T19:44:54.565833+00:00",
      "status_do_usuario": "PENDENTE",
      "senha_temporario": "Alterar123!",
      "token_cartao": "228e5442-19de-406b-b5e5-70557642505a",
      "agente_pode_liberar_onboarding": null,
      "dados_de_pagamento_id": null
    }
  ],
  "error": {
    "status_code": 200,
    "status_message": "OK",
    "body": "\"[{\\\"id\\\":\\\"0c35ff1a-c839-4519-af6e-4c8319a8a096\\\",\\\"nome_completo\\\":\\\"IGOR SOARES\\\",\\\"cpf\\\":\\\"047.090.051-25\\\",\\\"email\\\":\\\"igor@tksvantagens.com.br\\\",\\\"telefone_ddd\\\":\\\"61\\\",\\\"telefone_numero\\\":\\\"996187769\\\",\\\"data_de_nascimento\\\":\\\"1993-12-13\\\",\\\"genero\\\":null,\\\"endereco_id\\\":\\\"5d334506-7e4e-4b8e-81d5-1edf537d5c2a\\\",\\\"categoria_origem_id\\\":null,\\\"origem_cadastro_id\\\":null,\\\"cadastro_ativo\\\":true,\\\"data_criacao\\\":\\\"2025-06-09T19:44:54.565833+00:00\\\",\\\"status_do_usuario\\\":\\\"PENDENTE\\\",\\\"senha_temporario\\\":\\\"Alterar123!\\\",\\\"token_cartao\\\":\\\"228e5442-19de-406b-b5e5-70557642505a\\\",\\\"agente_pode_liberar_onboarding\\\":null,\\\"dados_de_pagamento_id\\\":null}]\""
  },
  "returned_an_error": false,
  "headers": {
    "date": "Wed, 18 Jun 2025 13:46:17 GMT",
    "content-type": "application/json; charset=utf-8",
    "transfer-encoding": "chunked",
    "connection": "keep-alive",
    "content-range": "0-0/*",
    "cf-ray": "951b3b600daa5ecc-PDX",
    "cf-cache-status": "DYNAMIC",
    "content-encoding": "gzip",
    "content-location": "/usuarios?cpf=eq.047.090.051-25",
    "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
    "vary": "Accept-Encoding",
    "content-profile": "public",
    "sb-gateway-version": "1",
    "sb-project-ref": "ekevwyikqtyxiblygkxb",
    "x-content-type-options": "nosniff",
    "x-envoy-attempt-count": "1",
    "x-envoy-upstream-service-time": "15",
    "set-cookie": [
      "__cf_bm=sZ81hGABYN0lE1ljq7AqimRhcy1Io4_RQCDlCaTGZLs-1750254377-1.0.1.1-HaIB8NkVvWWuDQwnV.f95KZ4T70rTGTyk4w_UVwLeU6rpFR3dlh2x7tl2JC4JVngf53dmC09OPKoL6n4UexjEluW5SI3EFoFShQMImf8FBU; path=/; expires=Wed, 18-Jun-25 14:16:17 GMT; domain=.supabase.co; HttpOnly; Secure; SameSite=None"
    ],
    "server": "cloudflare",
    "alt-svc": "h3=\":443\"; ma=86400"
  }
}

 2. Criar Novo Usuário  Use as: Action
Data type: JSON

POST  URL: https://ekevwyikqtyxiblygkxb.supabase.co/rest/v1/usuarios

Headers:

Key: Content-Type 
Value: application/json

Private: Sim

Key: Prefer 
Value: return=representation

Private: Sim   Body type: JSON

Body (JSON object, use <> for dynamic values)

{
  "cpf": "<cpf>",
  "nome_completo": "<nome_completo>",
  "email": "<email>",
  "data_de_nascimento": "<data_nascimento>",
  "senha_temporario": "<senha_temporario>",    
  "cadastro_ativo": true,
  "status_do_usuario": "PENDENTE",
  "data_criacao": "now()"
}

Response :  {
  "body": [
    {
      "id": "611f0777-8929-4012-b742-893310fe96bc",
      "nome_completo": "Usuario Teste Igor",
      "cpf": "216.262.140-18",
      "email": "teste@teste.com.br",
      "telefone_ddd": null,
      "telefone_numero": null,
      "data_de_nascimento": "1993-12-13",
      "genero": null,
      "endereco_id": null,
      "categoria_origem_id": null,
      "origem_cadastro_id": null,
      "cadastro_ativo": true,
      "data_criacao": "2025-05-28T02:35:22.475426+00:00",
      "status_do_usuario": "PENDENTE",
      "senha_temporario": "Alterar123!"
    }
  ],
  "error": {
    "status_code": 201,
    "status_message": "Created",
    "body": "\"[{\\\"id\\\":\\\"611f0777-8929-4012-b742-893310fe96bc\\\",\\\"nome_completo\\\":\\\"Usuario Teste Igor\\\",\\\"cpf\\\":\\\"216.262.140-18\\\",\\\"email\\\":\\\"teste@teste.com.br\\\",\\\"telefone_ddd\\\":null,\\\"telefone_numero\\\":null,\\\"data_de_nascimento\\\":\\\"1993-12-13\\\",\\\"genero\\\":null,\\\"endereco_id\\\":null,\\\"categoria_origem_id\\\":null,\\\"origem_cadastro_id\\\":null,\\\"cadastro_ativo\\\":true,\\\"data_criacao\\\":\\\"2025-05-28T02:35:22.475426+00:00\\\",\\\"status_do_usuario\\\":\\\"PENDENTE\\\",\\\"senha_temporario\\\":\\\"Alterar123!\\\"}]\""
  },
  "returned_an_error": false,
  "headers": {
    "date": "Wed, 28 May 2025 02:35:22 GMT",
    "content-type": "application/json; charset=utf-8",
    "transfer-encoding": "chunked",
    "connection": "keep-alive",
    "content-range": "*/*",
    "cf-ray": "946a5bb70f1befac-PDX",
    "cf-cache-status": "DYNAMIC",
    "content-encoding": "gzip",
    "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
    "vary": "Accept-Encoding",
    "content-profile": "public",
    "preference-applied": "return=representation",
    "sb-gateway-version": "1",
    "sb-project-ref": "ekevwyikqtyxiblygkxb",
    "x-content-type-options": "nosniff",
    "x-envoy-attempt-count": "1",
    "x-envoy-upstream-service-time": "77",
    "set-cookie": [
      "__cf_bm=ylopp.ZTKrVVdKflhfTO4MBrzldmOwEgZOXwHF7pasw-1748399722-1.0.1.1-KwmICOwFNLkIED.4xiZquXb_6TBoBuZZR.2CH3YqGg4W5AAJcw.wVXpITR_6pbSPjBFrBSPMd8BaReKtwJJea5501OfA5OoIdL4CdgISIiI; path=/; expires=Wed, 28-May-25 03:05:22 GMT; domain=.supabase.co; HttpOnly; Secure; SameSite=None"
    ],
    "server": "cloudflare",
    "alt-svc": "h3=\":443\"; ma=86400"
  }
}


3. Atualizar Usuário  Use as: Action
Data type: JSON

PATCH  URL: https://ekevwyikqtyxiblygkxb.supabase.co/rest/v1/usuarios?cpf=eq.[cpf]

URL parameters: 

Key: cpf 
Value: (Número do cpf com pontos, exemplo: 047.090.051-25)


Headers:

Key: Content-Type 
Value: application/json

Private: Sim

Key: Prefer 
Value: return=representation

Private: Sim   Body type: JSON

Body (JSON object, use <> for dynamic values)

{
  "nome_completo": "<nome_completo>",
  "email": "<email>",
  "data_de_nascimento": "<data_nascimento>",
  "senha_temporario": "<senha_temporario>",
  "status_do_usuario": "PENDENTE"
}

Response :  {
  "body": [
    {
      "id": "61f21daa-4265-4a59-b02d-83aa19da3e48",
      "nome_completo": "Igor Teste Soares",
      "cpf": "216.262.140-18",
      "email": "alteraremail@teste.com.br",
      "telefone_ddd": null,
      "telefone_numero": null,
      "data_de_nascimento": "1993-12-10",
      "genero": null,
      "endereco_id": null,
      "categoria_origem_id": null,
      "origem_cadastro_id": null,
      "cadastro_ativo": true,
      "data_criacao": "2025-05-28T02:18:28.704115+00:00",
      "status_do_usuario": "PENDENTE",
      "senha_temporario": "Alterar1993!"
    }
  ],
  "error": {
    "status_code": 200,
    "status_message": "OK",
    "body": "\"[{\\\"id\\\":\\\"61f21daa-4265-4a59-b02d-83aa19da3e48\\\",\\\"nome_completo\\\":\\\"Igor Teste Soares\\\",\\\"cpf\\\":\\\"216.262.140-18\\\",\\\"email\\\":\\\"alteraremail@teste.com.br\\\",\\\"telefone_ddd\\\":null,\\\"telefone_numero\\\":null,\\\"data_de_nascimento\\\":\\\"1993-12-10\\\",\\\"genero\\\":null,\\\"endereco_id\\\":null,\\\"categoria_origem_id\\\":null,\\\"origem_cadastro_id\\\":null,\\\"cadastro_ativo\\\":true,\\\"data_criacao\\\":\\\"2025-05-28T02:18:28.704115+00:00\\\",\\\"status_do_usuario\\\":\\\"PENDENTE\\\",\\\"senha_temporario\\\":\\\"Alterar1993!\\\"}, \\n {\\\"id\\\":\\\"349b35ed-b41e-4ece-8820-c06e3a5c8e39\\\",\\\"nome_completo\\\":\\\"Igor Teste Soares\\\",\\\"cpf\\\":\\\"216.262.140-18\\\",\\\"email\\\":\\\"alteraremail@teste.com.br\\\",\\\"telefone_ddd\\\":null,\\\"telefone_numero\\\":null,\\\"data_de_nascimento\\\":\\\"1993-12-10\\\",\\\"genero\\\":null,\\\"endereco_id\\\":null,\\\"categoria_origem_id\\\":null,\\\"origem_cadastro_id\\\":null,\\\"cadastro_ativo\\\":true,\\\"data_criacao\\\":\\\"2025-05-28T02:21:32.864696+00:00\\\",\\\"status_do_usuario\\\":\\\"PENDENTE\\\",\\\"senha_temporario\\\":\\\"Alterar1993!\\\"}, \\n {\\\"id\\\":\\\"6a80490c-5885-40c8-87ed-d52cc1ab235c\\\",\\\"nome_completo\\\":\\\"Igor Teste Soares\\\",\\\"cpf\\\":\\\"216.262.140-18\\\",\\\"email\\\":\\\"alteraremail@teste.com.br\\\",\\\"telefone_ddd\\\":null,\\\"telefone_numero\\\":null,\\\"data_de_nascimento\\\":\\\"1993-12-10\\\",\\\"genero\\\":null,\\\"endereco_id\\\":null,\\\"categoria_origem_id\\\":null,\\\"origem_cadastro_id\\\":null,\\\"cadastro_ativo\\\":true,\\\"data_criacao\\\":\\\"2025-05-28T02:22:22.718581+00:00\\\",\\\"status_do_usuario\\\":\\\"PENDENTE\\\",\\\"senha_temporario\\\":\\\"Alterar1993!\\\"}, \\n {\\\"id\\\":\\\"72f261d7-dc27-4eed-b31b-feb4c00babe9\\\",\\\"nome_completo\\\":\\\"Igor Teste Soares\\\",\\\"cpf\\\":\\\"216.262.140-18\\\",\\\"email\\\":\\\"alteraremail@teste.com.br\\\",\\\"telefone_ddd\\\":null,\\\"telefone_numero\\\":null,\\\"data_de_nascimento\\\":\\\"1993-12-10\\\",\\\"genero\\\":null,\\\"endereco_id\\\":null,\\\"categoria_origem_id\\\":null,\\\"origem_cadastro_id\\\":null,\\\"cadastro_ativo\\\":true,\\\"data_criacao\\\":\\\"2025-05-28T02:22:32.94435+00:00\\\",\\\"status_do_usuario\\\":\\\"PENDENTE\\\",\\\"senha_temporario\\\":\\\"Alterar1993!\\\"}, \\n {\\\"id\\\":\\\"80d1d374-265f-49f3-9afc-54a20e6d8f23\\\",\\\"nome_completo\\\":\\\"Igor Teste Soares\\\",\\\"cpf\\\":\\\"216.262.140-18\\\",\\\"email\\\":\\\"alteraremail@teste.com.br\\\",\\\"telefone_ddd\\\":null,\\\"telefone_numero\\\":null,\\\"data_de_nascimento\\\":\\\"1993-12-10\\\",\\\"genero\\\":null,\\\"endereco_id\\\":null,\\\"categoria_origem_id\\\":null,\\\"origem_cadastro_id\\\":null,\\\"cadastro_ativo\\\":true,\\\"data_criacao\\\":\\\"2025-05-28T02:22:55.982515+00:00\\\",\\\"status_do_usuario\\\":\\\"PENDENTE\\\",\\\"senha_temporario\\\":\\\"Alterar1993!\\\"}, \\n {\\\"id\\\":\\\"4a1f4be8-8e51-4e6e-bc51-97084bc23d6f\\\",\\\"nome_completo\\\":\\\"Igor Teste Soares\\\",\\\"cpf\\\":\\\"216.262.140-18\\\",\\\"email\\\":\\\"alteraremail@teste.com.br\\\",\\\"telefone_ddd\\\":null,\\\"telefone_numero\\\":null,\\\"data_de_nascimento\\\":\\\"1993-12-10\\\",\\\"genero\\\":null,\\\"endereco_id\\\":null,\\\"categoria_origem_id\\\":null,\\\"origem_cadastro_id\\\":null,\\\"cadastro_ativo\\\":true,\\\"data_criacao\\\":\\\"2025-05-28T02:23:20.202863+00:00\\\",\\\"status_do_usuario\\\":\\\"PENDENTE\\\",\\\"senha_temporario\\\":\\\"Alterar1993!\\\"}, \\n {\\\"id\\\":\\\"c8edc6e0-5b9e-43e3-be38-fc079aaf2d41\\\",\\\"nome_completo\\\":\\\"Igor Teste Soares\\\",\\\"cpf\\\":\\\"216.262.140-18\\\",\\\"email\\\":\\\"alteraremail@teste.com.br\\\",\\\"telefone_ddd\\\":null,\\\"telefone_numero\\\":null,\\\"data_de_nascimento\\\":\\\"1993-12-10\\\",\\\"genero\\\":null,\\\"endereco_id\\\":null,\\\"categoria_origem_id\\\":null,\\\"origem_cadastro_id\\\":null,\\\"cadastro_ativo\\\":true,\\\"data_criacao\\\":\\\"2025-05-28T02:23:24.669711+00:00\\\",\\\"status_do_usuario\\\":\\\"PENDENTE\\\",\\\"senha_temporario\\\":\\\"Alterar1993!\\\"}, \\n {\\\"id\\\":\\\"b0fa5958-a3e6-4329-98b6-d447b3c70f34\\\",\\\"nome_completo\\\":\\\"Igor Teste Soares\\\",\\\"cpf\\\":\\\"216.262.140-18\\\",\\\"email\\\":\\\"alteraremail@teste.com.br\\\",\\\"telefone_ddd\\\":null,\\\"telefone_numero\\\":null,\\\"data_de_nascimento\\\":\\\"1993-12-10\\\",\\\"genero\\\":null,\\\"endereco_id\\\":null,\\\"categoria_origem_id\\\":null,\\\"origem_cadastro_id\\\":null,\\\"cadastro_ativo\\\":true,\\\"data_criacao\\\":\\\"2025-05-28T02:23:41.905522+00:00\\\",\\\"status_do_usuario\\\":\\\"PENDENTE\\\",\\\"senha_temporario\\\":\\\"Alterar1993!\\\"}, \\n {\\\"id\\\":\\\"611f0777-8929-4012-b742-893310fe96bc\\\",\\\"nome_completo\\\":\\\"Igor Teste Soares\\\",\\\"cpf\\\":\\\"216.262.140-18\\\",\\\"email\\\":\\\"alteraremail@teste.com.br\\\",\\\"telefone_ddd\\\":null,\\\"telefone_numero\\\":null,\\\"data_de_nascimento\\\":\\\"1993-12-10\\\",\\\"genero\\\":null,\\\"endereco_id\\\":null,\\\"categoria_origem_id\\\":null,\\\"origem_cadastro_id\\\":null,\\\"cadastro_ativo\\\":true,\\\"data_criacao\\\":\\\"2025-05-28T02:35:22.475426+00:00\\\",\\\"status_do_usuario\\\":\\\"PENDENTE\\\",\\\"senha_temporario\\\":\\\"Alterar1993!\\\"}]\""
  },
  "returned_an_error": false,
  "headers": {
    "date": "Wed, 28 May 2025 03:14:06 GMT",
    "content-type": "application/json; charset=utf-8",
    "transfer-encoding": "chunked",
    "connection": "keep-alive",
    "content-range": "0-8/*",
    "cf-ray": "946a94759bdaa509-PDX",
    "cf-cache-status": "DYNAMIC",
    "content-encoding": "gzip",
    "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
    "vary": "Accept-Encoding",
    "content-profile": "public",
    "preference-applied": "return=representation",
    "sb-gateway-version": "1",
    "sb-project-ref": "ekevwyikqtyxiblygkxb",
    "x-content-type-options": "nosniff",
    "x-envoy-attempt-count": "1",
    "x-envoy-upstream-service-time": "23",
    "set-cookie": [
      "__cf_bm=fc.xOzL1FZTTFniaXyTCbCikO3ewzN.Z5_lay65wFXg-1748402046-1.0.1.1-birxPA5d1fwN87FS4baNTQvpwBjjJAHN104eonRweRMnr2570QETpjGENV1Mx_eIZsGNTphBDM.FWwKVsZ_KpNba1O2RsDopefKZ7CyePc8; path=/; expires=Wed, 28-May-25 03:44:06 GMT; domain=.supabase.co; HttpOnly; Secure; SameSite=None"
    ],
    "server": "cloudflare",
    "alt-svc": "h3=\":443\"; ma=86400"
  }
}
