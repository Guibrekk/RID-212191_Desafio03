const nomeTarefaInput = document.querySelector(".input-tarefa");
const etiquetaInput = document.querySelector(".select-etiqueta");
const dataInput = document.querySelector(".input-data");
const buttonAdicionar = document.querySelector(".botao-adicionar");
const atualizarTarefas = document.querySelector(".numero-tarefa")
const deletarTudoBotao = document.querySelector(".botao-deletar-todas")

const listaCompleta = document.querySelector(".lista-tarefas");

let minhaLista = [];

deletarTudoBotao.addEventListener('click', deletarTudo)
buttonAdicionar.addEventListener("click", adicionarNovaTarefa);

function adicionarNovaTarefa() {
    minhaLista.push({
    tarefa: nomeTarefaInput.value,
    vencimento: dataInput.value,
    etiqueta: etiquetaInput.value,
    concluida: false,
});

nomeTarefaInput.value = '';
dataInput.value = '';
etiquetaInput.value = '';

mostrarTarefas();
console.log(minhaLista)
}

function mostrarTarefas() {

let novaLista = ''

    minhaLista.forEach((item, posicao) => {
    novaLista = novaLista +
                `   
                <li class="tarefa ${item.concluida && "done"}"> 
                    <div class="content">
                        <p>${item.tarefa}</p>
                        <div>
                            <span class="etiqueta">${item.etiqueta}</span>
                            <span class="data">Vencimento em: ${item.vencimento}</span>
                        </div>
                    </div>
                    <div class="button-container">
                        <button onclick="concluirTarefa(${posicao})">Concluir</button>
                        <button onclick="deletarTarefa(${posicao})" id="deletar">Deletar</button>
                        <img class="verificado-img" onclick="voltarItem(${posicao})" src="./img/checked.svg" alt="">
                    </div>
                </li>
        
        `;
});

    listaCompleta.innerHTML = novaLista;

    localStorage.setItem('lista', JSON.stringify(minhaLista))

    atualizarNumeroTarefasConcluidas();
}


function concluirTarefa(posicao) {
    minhaLista[posicao].concluida = !minhaLista[posicao].concluida


    mostrarTarefas()
}

function deletarTarefa(posicao) {
    minhaLista.splice(posicao, 1)

    mostrarTarefas()
}

function voltarItem(posicao) {
    minhaLista[posicao].concluida = !minhaLista[posicao].concluida

    mostrarTarefas()
}

function deletarTudo() {
    minhaLista = minhaLista.filter(item => !item.concluida); 
    mostrarTarefas();
}


function recarregarTela(){
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    minhaLista = tarefasDoLocalStorage ? JSON.parse(tarefasDoLocalStorage) : []
    mostrarTarefas()
}

function atualizarNumeroTarefasConcluidas() {
    const totalConcluidas = minhaLista.filter(item => item.concluida).length;
    atualizarTarefas.innerText = `${totalConcluidas} tarefa${totalConcluidas !== 1 ? 's' : ''} concluída${totalConcluidas !== 1 ? 's' : ''}`;

}

recarregarTela()