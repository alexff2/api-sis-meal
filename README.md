# Definições do usuário
- Eu como usuário gostaria de poder cadastrar departamentos para vincular funcionários;
- Eu como usuário gostaria de poder cadastrar funcionários para registrar refeições;
- Eu como funcionário gostaria de fazer a leitura do código de barras no meu crachá para contabilizar minhas refeições;
- Eu como usuário gostaria de gerar um relatório diário de funcionários que registaram suas refeições com agrupamento por departamento;
- Eu como usuário gostaria de gerar um relatório com a quantidade total por data de funcionários que registraram suas refeições com agrupamento por departamento.

# Etapas do desenvolvimento - Backend
  ## DOMÍNIO
  **ENTIDADES / CASOS DE USO**
    *User*
      [X] Criação do caso de uso de criação de usuário;
      [X] Criação do caso de uso de que cria usuário adm caso não exista;
      [X] Criação do caso de uso de alteração de nome de usuário;
      [X] Criação do caso de uso de alteração de email de usuário;
      [X] Criação do caso de uso de alteração de senha de usuário;
    *Authenticate*
      [X] Criação do caso de uso de autenticação;
    *Logs*
      [X] Criação do caso de uso de registro de log geral;
    *Department*
      [X] Criação do caso de uso de criação de departamentos;
      [X] Criação do caso de uso de alteração de descrição do departamento;
    *Employee*
      [X] Criação do caso de uso de criação de funcionários;
      [X] Criação do caso de uso de alteração da descrição do funcionário;
      [X] Criação do caso de uso de alteração do departamento;
      [X] Criação do caso de uso inativação de funcionário;
    *Meal log*
      [X] Criação do caso de uso de criação de registro de refeição;
      [ ] Criação do caso de uso de relatório de registros de refeições por data que lista os funcionários;
      [ ] Criação do caso de uso de relatório de registros de refeições por data que soma a quantidade de refeições por departamento;

  ## FRAMEWORKS HTTP AND LIBS
  **ROUTES / CONTROLLERS**
    *User*
      [X] Criação da rota de criação de usuário;
      [X] Criação da rota de que cria usuário adm caso não exista;
      [X] Criação da rota de alteração de nome de usuário;
      [X] Criação da rota de alteração de email de usuário;
      [X] Criação da rota de alteração de senha de usuário;
    *Authenticate*
      [X] Criação da rota de autenticação;
      [X] Criação do middleware que valida token de autenticação;
    *Department*
      [X] Criação da rota de criação de departamentos;
      [X] Criação da rota de alteração de descrição do departamento;
    *Employee*
      [X] Criação da rota de criação de funcionários;
      [X] Criação da rota de alteração da descrição do funcionário;
      [X] Criação da rota de alteração do departamento;
      [X] Criação da rota de inativação de funcionário;
    *Meal log*
      [X] Criação da rota de criação de registro de refeição;
      [ ] Criação da rota de relatório de registros de refeições por data que lista os funcionários;
      [ ] Criação da rota de relatório de registros de refeições por data que soma a quantidade de refeições por departamento;

  ## ADAPTADORES / BIBLIOTECAS
