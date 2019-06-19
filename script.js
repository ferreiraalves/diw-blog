var posts = {
  "posts": [
    {
      "id": 1,
      "titulo": "Presidentes dos 3 poderes vão firmar pacto por reformas em 10 de junho",
      "imagem": "imgs/lixo.jpg",
      "texto": `
      Em encontro nesta terça-feira (28) no Palácio da Alvorada, os presidentes dos três poderes resolveram assinar um pacto a favor das reformas em 10 de junho. O texto foi apresentado durante encontro entre o presidente Jair Bolsonaro e os presidentes da Câmara, Rodrigo Maia, do Senado, Davi Alcolumbre, e do STF, Dias Toffoli. <br><br>
      Durante a reunião, Bolsonaro destacou a importância de trabalhar junto com Legislativo e Judiciário, defendeu as instituições e condenou os ataques sofridos pelo Congresso e pelo Supremo nas manifestações do domingo passado, promovidas pelos seus apoiadores.
      `,
      "data_publicacao": '20-5-2019 21:00',
      "likes": 2,


    },
    {
      "id": 2,
      "titulo": "Justiça em SP bloqueia R$ 128 milhões de Aécio Neves",
      "imagem": "imgs/lixo2.jpg",
      "texto": `
      O juiz João Batista Gonçalves, da 6ª Vara Federal Criminal de São Paulo, determinou o bloqueio imediato de R$ 128 milhões do deputado federal Aécio Neves (PSDB-MG). Defesa entrou com recurso.<br><br>
      A decisão atende pedido do Ministério Público Federal e foi tomada no âmbito do inquérito policial que apura pagamento de vantagens indevidas a Aécio Neves pelo empresário Joesley Batista e pelo Grupo J&F em um futuro governo presidencial, além de influência no governo de Minas Gerais para a restituição de créditos de ICMS em favor do Grupo J&F. A medida ainda atinge outras 13 pessoas e empresas.
      `,
      "data_publicacao": '25-5-2019 21:00',
      "likes": 1,


    },
    {
      "id": 3,
      "titulo": "Doria anuncia monotrilho para ligar CPTM ao Aeroporto de Guarulhos",
      "imagem": "imgs/ag05.jpg",
      "texto": `
      O juiz João Batista Gonçalves, da 6ª Vara Federal Criminal de São Paulo, determinou o bloqueio imediato de R$ 128 milhões do deputado federal Aécio Neves (PSDB-MG). Defesa entrou com recurso.<br><br>
      A decisão atende pedido do Ministério Público Federal e foi tomada no âmbito do inquérito policial que apura pagamento de vantagens indevidas a Aécio Neves pelo empresário Joesley Batista e pelo Grupo J&F em um futuro governo presidencial, além de influência no governo de Minas Gerais para a restituição de créditos de ICMS em favor do Grupo J&F. A medida ainda atinge outras 13 pessoas e empresas.
      `,
      "data_publicacao": '30-5-2019 21:00',
      "likes": 2,


    },
  ]
}


// Caso exista no Local Storage, recupera os dados salvos
function get_db(){
  var current_db = JSON.parse(localStorage.getItem('dbLucasFerreira'));
  if (!current_db) {
    current_db = posts;
  };
  return current_db;
}


function build_news_page(){
  urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get('id');
  current_db = get_db();
  noticia = current_db.news[id-1];
  $("#single-news-main-block").html("");
  $("#single-news-main-block").append(`
    <h1 class="single-news-title">${noticia.titulo}</h1>
    <img class="media-object main-picture" src="${noticia.image_url}" alt="...">
    <p class="media-description main-text">
    ${noticia.full_text}
    </p>
    `);

  }


  function listarPosts() {
    // Remove todas as linhas do corpo da tabela
    current_db = get_db();
    console.log(current_db);
    $("#posts-main-block").html("");
    // Popula a tabela com os registros do banco de dados
    var i;
    for (i = current_db.posts.length-1; i >= 0; i--) {
      post = current_db.posts[i];
      //parsiona instrumentos
      $("#posts-main-block").append(`
        <div class="media">
        <div class="media-left">
        <a href="news.html?id=${post.id}">
        <img class="media-object fixed-size-image" src="${post.imagem}" alt="...">
        </a>
        </div>
        <div class="media-body">
        <a href="news.html?id=${post.id}" style="text-decoration: none;">
        <h2 class="media-heading">${post.titulo}</h2>
        </a>
        <p class="media-description">${post.texto}</p>
        <p class="media-description">Publicado em: ${post.data_publicacao}</p>
        <button class='like_button' onclick='like_this(${post.id})'> ${post.likes} <span class="glyphicon glyphicon-thumbs-up"></span></button>
        </div>
        </div>
        `);
        if (i> 0) {
          $("#posts-main-block").append(`<hr>`)
        }
      }
    }

    function parseDate(){
      var now = new Date();
      d = now.getDate();
      m = now.getMonth();
      y = now.getFullYear();
      hr = now.getDate();
      min = now.getDate();
      return `${d}-${m}-${y} ${hr}:${min}`

    }

    function like_this(id){
      current_db = get_db();
      //console.log(id);
      current_db.posts[id-1].likes++;
      localStorage.setItem('dbLucasFerreira', JSON.stringify(current_db));
      location.href = 'index.html';

    }


    function insertPost(post) {
        // Calcula novo Id a partir do último código existente no array
        current_db = get_db();
        var novoId = current_db.posts[current_db.posts.length - 1].id + 1;
        var now = parseDate();

        var novoPost = {
          "id": novoId,
          "titulo": post.titulo,
          "texto": post.texto,
          "imagem": post.imagem,
          "data_publicacao": now,
          "likes": 0

        };

        // Insere o novo objeto no array
        current_db.posts.push(novoPost);

        // Atualiza os dados no Local Storage
        localStorage.setItem('dbLucasFerreira', JSON.stringify(current_db));
    }
