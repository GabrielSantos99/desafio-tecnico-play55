## 1. Design do Fluxo de Checkout:
Ao receber o input de "Confirmar Compra", abriria uma modal/popup. Nela teríamos uma label que anunciaria o processo que está sendo executado e, abaixo, alguma animação (ex: spinner ou até mesmo um carrinho entrando de um lado e saindo pelo outro) para fornecer um feedback claro ao usuário de que o processo está em andamento.
À medida que as etapas vão sendo concluídas, a label muda de "Verificando estoque..." para "Aplicando cupom...". Caso ocorra algum erro em uma dessas validações, mudaríamos a animação para alguma imagem (ex: um triângulo vermelho com uma exclamação no meio), deixando claro que houve uma falha.
Após alguns segundos, a modal/popup se fecha e retorna para a tela do carrinho, com todas as informações anteriores preservadas. Um texto em vermelho informa o que impediu a finalização da compra. O botão "Confirmar Compra" fica desabilitado, dando a oportunidade de o usuário retificar a compra. Após o ajuste do problema, o botão é reabilitado.

## 2. Gerenciamento de Estado para um Processo Complexo:
Partindo do princípio de que desenvolvemos o projeto de forma modularizada, eu prefiro criar um novo store. Com essa prática, mantemos o código com responsabilidade única (single responsibility), facilitando futuras manutenções e a criação de testes para garantir que funcionalidades já implementadas não quebrem com novas evoluções.
Poderia ser criado um checkoutStore, responsável por gerenciar o estado da validação (estoque e cupom), carregamento e até mesmo da confirmação da compra, reunindo todas as informações necessárias para fornecer feedback ao usuário.

## 3. Estratégia de API e Tratamento de Falhas:
Eu optaria por fazer uma única chamada à API, enviando todos os IDs dos produtos. Temos a vantagem de não sobrecarregar o servidor com múltiplas requisições e de simplificar a lógica do lado do cliente, pois não seria necessário gerenciar várias respostas em paralelo.
Como desvantagem, dependendo do tamanho do carrinho, o corpo da requisição pode se tornar grande, e processar todos os itens de uma vez pode aumentar a carga do servidor.
Na experiência do usuário, podemos retornar à página do carrinho com o botão "Confirmar Compra" desabilitado, destacando os itens sem estoque com uma coloração diferente.
Podemos, por exemplo, deixar esses componentes com maior transparência ou trabalhar com uma paleta de cores da identidade visual do site que represente negatividade.
Após a correção dos itens, o botão é reabilitado e o processo pode ser reiniciado.

## 4. Abstração e Reutilização de Lógica:
Na autenticação, essa reutilização já foi considerada com a criação do composable useRecaptcha. Para formulários ou outras funcionalidades, seria necessária uma pequena refatoração para tornar a lógica mais abstrata, permitindo o envio de parâmetros ou ajustes conforme necessidade da equipe.
Dessa forma, o projeto se torna cada vez mais reutilizável, facilitando o reaproveitamento de componentes existentes e economizando tempo no desenvolvimento de novas features.
Por exemplo, poderiam ser criados componentes como <FormError> ou similares para exibir mensagens de erro sem a necessidade de replicar lógica.
Também seria possível criar um composable que recebe como parâmetro as informações de validação e retorna os estados prontos para uso. Com isso, conseguimos criar novos formulários de maneira muito mais rápida e padronizada.
