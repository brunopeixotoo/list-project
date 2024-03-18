
//querySelector --> Significa que vai fazer relação com algum item.
let listElement = document.querySelector("#app ul");
let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#app button");

//criando uma array, onde será armazenada nossas listas de tarefas.
let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];

//FUNCTION DE ADICIONAR TAREFAS NO INDEX
function renderTarefas() {
    //limpando elemendo <ul>
    listElement.innerHTML = '';

    //Uso no método MAP --> Vai percorrer a array (Mais ágil) --> variavel.map()
    //Criando function arrow dentro do método
    //Essa function array vai precisar receber um parâmetro(tarefa) --> vai receber a tarefa adicionada
    tarefas.map((tarefa) => {
        //criando elemento html --> <li> tarefa </li>
        let liElement = document.createElement("li");
        let tarefaText = document.createTextNode(tarefa);

        //Criando botão para excluir e atribuindo elementos para ele --> <a href="a">
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");


        //Criando text do button e adicionando na tag <a>
        let textButton = document.createTextNode("Excluir");
        linkElement.appendChild(textButton);

        //posição de cada elemento criado
        let posicao = tarefas.indexOf(tarefa);

        //Ao adiconar o botão Excluir, é necessário colocar o atributo para caso ele aperte
        //Para isso, é preciso chamar a function se ele apertar o button, portanto:
        linkElement.setAttribute("onclick", `excluir(${posicao})`);

        //Adionando esses elementos criados dentro das tags determinadas --> <li> e <ul>
        liElement.appendChild(tarefaText);
        liElement.appendChild(linkElement);
        listElement.appendChild(liElement);
    });
}

renderTarefas();

//FUNCTION DE ADICIONAR AS TAREFAS
function adicionarTarefas() {
    if (inputElement.value === '') {
        alert("Digite alguma tarefa");
        return false;
    }else{
        //pegando o valor digitado no input
        let novaTarefa = inputElement.value;

        //adionando valor na array
        tarefas.push(novaTarefa);

        //limpando campo após adicionar tarefa
        inputElement.value = '';   
        
        //Após adicionar a nova tarefa, será necessário acionar a function que irá adiconar no index
        renderTarefas();
        salvarDados();
    }
}

//Quando o usuário clicar no botão, será ativada a função adicionarElementos.
buttonElement.onclick = adicionarTarefas;

function excluir(posicao) {
    tarefas.splice(posicao, 1);
    renderTarefas();
    salvarDados();
}

//Salvadno dados no localStorege
function salvarDados() {
    localStorage.setItem("@listaTarefas", JSON.stringify(tarefas));

}