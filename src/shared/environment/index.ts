


export const Enviroment = {
    /**
     * Define a quantidade de linhas a ser carregada por padrão nas listagens
     */
   LIMITE_DE_LINHAS: 5,

   /**
    *  PlaceHolder exipidos nas inputs de pesquisa de listagem
    */
   INPUT_DE_BUSCA: 'Pesquisar...',

   /**
    * Texto exibido quando nenhum registro é encontrado na listagem
    */
   LISTAGEM_VAZIA: 'Nenhum registro encontrado...',

   /**
    *  URL Base de consultas as APIs dessa aplicação
    * 
    * A ideia aqui é o cadastramento de fanclubes, onde cadastro pessoas notáveis e seus
    * respectivos admiradores, para isso eu usei uma arqquitetura de microservicos onde eu tenho
    * um  componente principal desenvolvido em REACT e duas APIS que eu desenvolvi em Phyton, fazendo
    * uso do FASTAPI e banco de dados SQLLYTE,  cada componente tem seu proprio banco de dados isolado
    * como manda o  figurino. Faço uso também de  duas APIS externas, uma do WIKIPEDIA que uso para 
    * buscar dados de alguém ou alguma coisa no WIKIPEDIA para cadastrar meus NOTAVEIS além da VIACEP
    * que busca dados do endereçamento baseado no CEP, que uso no meu componente ADMIRADOR.
    */

   // APIS EXTERNAS
   URL_WIKPEDIA: "https://pt.wikipedia.org/api/rest_v1/page/summary",
   URL_CEP: 'https://viacep.com.br/ws',

   // COMPONENTES DESENVOLVIDOS EM PHYTON
   URL_NOTAVEL: 'http://localhost:8181',
   URL_ADMIRADOR: 'http://localhost:8383'
  
};