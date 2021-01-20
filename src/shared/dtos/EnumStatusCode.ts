/**
 * Os códigos de status das respostas HTTP indicam se uma requisição HTTP foi
 * corretamente concluída. As respostas são agrupadas em cinco classes:
 *
 * Respostas de informação (`100-199`)
 *
 * Respostas de sucesso (`200-299`)
 *
 * Redirecionamentos (`300-399`)
 *
 * Erros do cliente (`400-499`)
 *
 * Erros do servidor (`500-599`)
 */
enum EnumStatusCode {
  /**
   * --------------------------------------------
   * ---------- Respostas informativas ----------
   * --------------------------------------------
   */

  /**
   * Essa resposta provisória indica que tudo ocorreu bem até agora e que o
   * cliente deve continuar com a requisição ou ignorar se já concluiu o que
   * gostaria.
   */
  Continue = 100,
  /**
   * Esse código é enviado em resposta a um cabeçalho de solicitação *Upgrade*
   * pelo cliente, e indica o protocolo a que o servidor está alternando.
   */
  SwitchingProtocols = 101,
  /**
   * Este código indica que o servidor recebeu e está processando a requisição,
   * mas nenhuma resposta está disponível ainda.
   */
  Processing = 102,
  /**
   * Este código tem principalmente o objetivo de ser utilizado com o cabeçalho
   * *Link*, indicando que o agente deve iniciar a pré-carregar recursos enquanto
   * o servidor prepara uma resposta.
   */
  EarlyHints = 103,

  /**
   * ------------------------------------------
   * ---------- Respostas de sucesso ----------
   * ------------------------------------------
   */

  /**
   * Estas requisição foi bem sucedida. O significado do sucesso varia de acordo
   * com o método HTTP.
   */
  OK = 200,
  /**
   * A requisição foi bem sucedida e um novo recurso foi criado como resultado.
   * Esta é uma tipica resposta enviada após uma requisição **POST**.
   */
  Created = 201,
  /**
   * A requisição foi recebida mas nenhuma ação foi tomada sobre ela.
   * Isto é uma requisição não-comprometedora, o que significa que não há
   * nenhuma maneira no HTTP para enviar uma resposta assíncrona indicando o
   * resultado do processamento da solicitação. Isto é indicado para casos onde
   * outro processo ou servidor lida com a requisição, ou para processamento em lote.
   */
  Accepted = 202,
  /**
   * Esse código de resposta significa que o conjunto de meta-informações
   * retornadas não é o conjunto exato disponível no servidor de origem, mas
   * coletado de uma cópia local ou de terceiros. Exceto essa condição, a resposta
   * de **200 OK** deve ser preferida em vez dessa resposta.
   */
  NonAuthoritativeInformation = 203,
  /**
   * Não há conteúdo para enviar para esta solicitação, mas os cabeçalhos podem
   * ser úteis. O `user-agent` pode atualizar seus cabeçalhos em cache para este
   * recurso com os novos.
   */
  NoContent = 204,
  /**
   * Esta requisição é enviada após realizanda a solicitação para informar ao
   * *user agent* redefinir a visualização do documento que enviou essa solicitação.
   */
  ResetContent = 205,
  /**
   * Esta resposta é usada por causa do cabeçalho de intervalo enviado pelo
   * cliente para separar o download em vários fluxos.
   */
  PartialContent = 206,

  /**
   * ---------------------------------------------------
   * ---------- Respostas de redirecionamento ----------
   * ---------------------------------------------------
   */

  /**
   * A requisição tem mais de uma resposta possível. User-agent ou o user deve
   * escolher uma delas. Não há maneira padrão para escolher uma das respostas.
   */
  MultipleChoices = 300,
  /**
   * Esse código de resposta significa que a URI do recurso requerido mudou.
   * Provavelmente, a nova URI será especificada na resposta.
   */
  MovedPermanently = 301,
  /**
   * Esse código de resposta significa que a URI do recurso requerido foi mudada
   * temporariamente. Novas mudanças na URI poderão ser feitas no futuro.
   * Portanto, a mesma URI deve ser usada pelo cliente em requisições futuras.
   */
  Found = 302,
  /**
   * O servidor manda essa resposta para instruir ao cliente buscar o recurso
   * requisitado em outra URI com uma requisição GET.
   */
  SeeOther = 303,
  /**
   * Essa resposta é usada para questões de cache. Diz ao cliente que a resposta
   * não foi modificada. Portanto, o cliente pode usar a mesma versão em cache
   * da resposta.
   */
  NotModified = 304,
  /**
   * Foi definida em uma versão anterior da especificação HTTP para indicar que
   * uma resposta deve ser acessada por um proxy. Foi depreciada por questões de
   * segurança em respeito a configuração em banda de um proxy.
   */
  UseProxy = 305,
  /**
   * O servidor mandou essa resposta direcionando o cliente a buscar o recurso
   * requisitado em outra URI com o mesmo método que foi utilizado na requisição
   * original. Tem a mesma semântica do código **302 Found**, com a exceção de
   * que o user-agent não deve mudar o método HTTP utilizado: se um **POST** foi
   * utilizado na primeira requisição, um **POST** deve ser utilizado na segunda.
   */
  TemporaryRedirect = 307,
  /**
   * Esse código significa que o recurso agora está permanentemente localizado
   * em outra URI, especificada pelo cabeçalho de resposta `Location`. Tem a mesma
   * semântica do código de resposta HTTP `301 Moved Permanently`  com a exceção de
   * que o user-agent não deve mudar o método HTTP utilizado: se um POST foi
   * utilizado na primeira requisição, um POST deve ser utilizado na segunda.
   */
  PermanentRedirect = 308,

  /**
   * --------------------------------------------------
   * ---------- Respostas de erro do Cliente ----------
   * --------------------------------------------------
   */

  /**
   * Essa resposta significa que o servidor não entendeu a requisição pois está
   * com uma sintaxe inválida.
   */
  BadRequest = 400,
  /**
   * Embora o padrão HTTP especifique "unauthorized", semanticamente, essa
   * resposta significa "unauthenticated". Ou seja, o cliente deve se autenticar
   * para obter a resposta solicitada.
   */
  Unauthorized = 401,
  /**
   * Este código de resposta está reservado para uso futuro. O objetivo inicial
   * da criação deste código era usá-lo para sistemas digitais de pagamento porém
   * ele não está sendo usado atualmente.
   */
  PaymentRequired = 402,
  /**
   * O cliente não tem direitos de acesso ao conteúdo portanto o servidor está
   * rejeitando dar a resposta. Diferente do código `401`, aqui a identidade do
   * cliente é conhecida.
   */
  Forbidden = 403,
  /**
   * O servidor não pode encontrar o recurso solicitado.
   */
  NotFound = 404,
  /**
   * O método de solicitação é conhecido pelo servidor, mas foi desativado e não
   * pode ser usado. Os dois métodos obrigatórios, **GET** e **HEAD**, nunca
   * devem ser desabilitados e não devem retornar este código de erro.
   */
  MethodNotAllowed = 405,
  /**
   * Essa resposta é enviada quando o servidor da Web após realizar a negociação
   * de conteúdo orientada pelo servidor, não encontra nenhum conteúdo seguindo
   * os critérios fornecidos pelo agente do usuário.
   */
  NotAcceptable = 406,
  /**
   * Semelhante ao `401` porem é necessário que a autenticação seja feita por um
   * proxy.
   */
  ProxyAuthenticationRequired = 407,
  /**
   * Esta resposta é enviada por alguns servidores em uma conexão ociosa, mesmo
   * sem qualquer requisição prévia pelo cliente. Ela significa que o servidor
   * gostaria de derrubar esta conexão em desuso. Esta resposta é muito usada já
   * que alguns navegadores, como Chrome, Firefox 27+, ou IE9, usam mecanismos
   * HTTP de pré-conexão para acelerar a navegação. Note também que alguns servidores
   * meramente derrubam a conexão sem enviar esta mensagem.
   */
  RequestTimeout = 408,
  /**
   * Esta resposta será enviada quando uma requisição conflitar com o estado
   * atual do servidor.
   */
  Conflict = 409,
  /**
   * Esta resposta será enviada quando o conteúdo requisitado foi permanentemente
   * deletado do servidor, sem nenhum endereço de redirecionamento. É experado que
   * clientes removam seus caches e links para o recurso. A especificação HTTP
   * espera que este código de status seja usado para "serviços promocionais de
   * tempo limitado". APIs não devem se sentir obrigadas a indicar que recursos
   * foram removidos com este código de status.
   */
  Gone = 410,
  /**
   * O servidor rejeitou a requisição porque o campo `Content-Length` do cabeçalho
   * não está definido e o servidor o requer.
   */
  LengthRequired = 411,
  /**
   * O cliente indicou nos seus cabeçalhos pré-condições que o servidor não atende.
   */
  PreconditionFailed = 412,
  /**
   * A entidade requisição é maior do que os limites definidos pelo servidor; o
   * servidor pode fechar a conexão ou retornar um campo de cabeçalho `Retry-After`.
   */
  PayloadTooLarge = 413,
  /**
   * A URI requisitada pelo cliente é maior do que o servidor aceita para
   * interpretar.
   */
  URITooLong = 414,
  /**
   * O formato de mídia dos dados requisitados não é suportado pelo servidor,
   * então o servidor rejeita a requisição.
   */
  UnsupportedMediaType = 415,
  /**
   * O trecho especificado pelo campo Range do cabeçalho na requisição não pode
   * ser preenchido; é possível que o trecho esteja fora do tamanho dos dados da
   * URI alvo.
   */
  RequestedRangeNotSatisfiable = 416,
  /**
   * Este código de resposta significa que a expectativa indicada pelo campo `Expect`
   * do cabeçalho da requisição não pode ser satisfeita pelo servidor.
   */
  ExpectationFailed = 417,
  /**
   * O servidor recusa a tentativa de coar café num bule de chá.
   */
  ImaTeapot = 418,
  /**
   * A requisição foi direcionada a um servidor inapto a produzir a resposta.
   * Pode ser enviado por um servidor que não está configurado para produzir
   * respostas para a combinação de esquema ("scheme") e autoridade inclusas na
   * URI da requisição.
   */
  MisdirectedRequest = 421,
  /**
   * A requisição está bem formada mas inabilitada para ser seguida devido a
   * erros semânticos.
   */
  UnprocessableEntity = 422,
  /**
   * O recurso sendo acessado está travado.
   */
  Locked = 423,
  /**
   * A requisição falhou devido a falha em requisição prévia.
   */
  FailedDependency = 424,
  /**
   * Indica que o servidor não está disposto a arriscar processar uma requisição
   * que pode ser refeita.
   */
  TooEarly = 425,
  /**
   * O servidor se recusa a executar a requisição usando o protocolo corrente mas
   * estará pronto a fazê-lo após o cliente atualizar para um protocolo diferente.
   * O servidor envia um cabeçalho `Upgrade` numa resposta `426` para indicar o(s)
   * protocolo(s) requeridos.
   */
  UpgradeRequired = 426,
  /**
   * O servidor de origem requer que a resposta seja condicional. Feito para
   * prevenir o problema da 'atualização perdida', onde um cliente pega o estado
   * de um recurso (GET), modifica-o, e o põe de volta no servidor (PUT), enquanto
   * um terceiro modificou o estado no servidor, levando a um conflito.
   */
  PreconditionRequired = 428,
  /**
   * O usuário enviou muitas requisições num dado tempo (rate limit).
   */
  TooManyRequests = 429,
  /**
   * O servidor não quer processar a requisição porque os campos de cabeçalho
   * são muito grandes. A requisição PODE ser submetida novemente depois de reduzir
   * o tamanho dos campos de cabeçalho.
   */
  RequestHeaderFieldsTooLarge = 431,
  /**
   * O usuário requisitou um recurso ilegal, tal como uma página censurada por
   * um governo.
   */
  UnavailableForLegalReasons = 451,

  /**
   * ---------------------------------------------------
   * ---------- Respostas de erro do Servidor ----------
   * ---------------------------------------------------
   */

  /**
   * O servidor encontrou uma situação com a qual não sabe lidar.
   */
  InternalServerError = 500,
  /**
   * O método da requisição não é suportado pelo servidor e não pode ser manipulado.
   */
  NotImplemented = 501,
  /**
   * Esta resposta de erro significa que o servidor, ao trabalhar como um gateway
   * a fim de obter uma resposta necessária para manipular a requisição, obteve
   * uma resposta inválida.
   */
  BadGateway = 502,
  /**
   * O servidor não está pronto para manipular a requisição. Causas comuns são
   * um servidor em manutenção ou sobrecarregado. Note que junto a esta resposta,
   * uma página amigável explicando o problema deveria ser enviada. Estas respostas
   * devem ser usadas para condições temporárias e o cabeçalho HTTP `Retry-After`:
   * deverá, se posível, conter o tempo estimado para recuperação do serviço.
   * O webmaster deve também tomar cuidado com os cabaçalhos relacionados com o
   * cache que são enviados com esta resposta, já que estas respostas de condições
   * temporárias normalmente não deveriam ser postas em cache.
   */
  ServiceUnavailable = 503,
  /**
   * Esta resposta de erro é dada quando o servidor está atuando como um gateway
   * e não obtém uma resposta a tempo.
   */
  GatewayTimeout = 504,
  /**
   * A versão HTTP usada na requisição não é suportada pelo servidor.
   */
  HTTPVersionNotSupported = 505,
  /**
   * O servidor tem um erro de configuração interno: a negociação transparente
   * de conteúdo para a requisição resulta em uma referência circular.
   */
  VariantAlsoNegotiates = 506,
  /**
   * O servidor tem um erro interno de configuração: o recurso variante escolhido
   * está configurado para entrar em negociação transparente de conteúdo com ele
   * mesmo, e portanto não é uma ponta válida no processo de negociação.
   */
  InsufficientStorage = 507,
  /**
   * O servidor detectou um looping infinito ao processar a requisição.
   */
  LoopDetected = 508,
  /**
   * Exigem-se extenções posteriores à requisição para o servidor atendê-la.
   */
  NotExtended = 510,
  /**
   * O código de status 511 indica que o cliente precisa se autenticar para ganhar
   * acesso à rede.
   */
  NetworkAuthenticationRequired = 511,
}

export default EnumStatusCode;
