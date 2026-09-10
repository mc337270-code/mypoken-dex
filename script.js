async function buscarPokemon() {

    const entrada = document
        .getElementById("inputPokemon")
        .value
        .trim()
        .toLowerCase();

    const mensagem = document.getElementById("mensagemErro");
    const card = document.getElementById("cardPokemon");

    const imagem = document.getElementById("imagemPokemon");
    const numero = document.getElementById("numeroPokemon");
    const nome = document.getElementById("nomePokemon");
    const tipo = document.getElementById("tipoPokemon");
    const peso = document.getElementById("pesoPokemon");

    // Verifica se o usuário digitou alguma coisa
    if (entrada === "") {

        card.classList.add("oculto");

        mensagem.classList.remove("oculto");

        mensagem.textContent =
            "Digite o nome ou número de um Pokémon.";

        return;
    }

    // Mostra mensagem de carregamento
    mensagem.classList.remove("oculto");

    mensagem.textContent = "Carregando...";

    card.classList.add("oculto");

    try {

        // Consulta a PokéAPI
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${entrada}`
        );

        // Verifica se o Pokémon existe
        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado");
        }

        const pokemon = await resposta.json();

        // Coloca a imagem oficial do Pokémon
        const imagemOficial =
            pokemon.sprites.other?.["official-artwork"]?.front_default;

        // Caso a imagem oficial não esteja disponível,
        // usa a imagem normal
        imagem.src =
            imagemOficial || pokemon.sprites.front_default;

        // Número
        numero.textContent =
            "#" + String(pokemon.id).padStart(3, "0");

        // Nome
        nome.textContent = pokemon.name;

        // Tipo
        tipo.textContent =
            pokemon.types
                .map(item => item.type.name)
                .join(" / ");

        // Peso
        peso.textContent =
            (pokemon.weight / 10).toFixed(1);

        // Esconde mensagem
        mensagem.classList.add("oculto");

        // Mostra cartão
        card.classList.remove("oculto");

    } catch (erro) {

        card.classList.add("oculto");

        mensagem.classList.remove("oculto");

        mensagem.textContent =
            "Pokémon não encontrado. Tente novamente.";
    }
}


// Permite pesquisar pressionando ENTER
document
    .getElementById("inputPokemon")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            buscarPokemon();
        }

    });
