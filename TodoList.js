let lista = JSON.parse(localStorage.getItem("minhaLista")) || [];
let listaConcluida = JSON.parse(localStorage.getItem("listaConcluida")) || [];
let listaPendente = JSON.parse(localStorage.getItem("listaPendente")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const inputTask = document.getElementById("addTask");
  const buttonAdd = document.getElementById("buttonAdd");
  const taskList = document.getElementById("taskList");

  function salvarListas() {
    localStorage.setItem("minhaLista", JSON.stringify(lista));
    localStorage.setItem("listaConcluida", JSON.stringify(listaConcluida));
    localStorage.setItem("listaPendente", JSON.stringify(listaPendente));
  }

  function atualizarListas() {
    taskList.innerHTML = "";

    lista.forEach((tarefa) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.textContent = tarefa;

      const btnRemove = document.createElement("button");
      btnRemove.className = "btn btn-danger btn-sm me-2 botaoRemover botaoRemover:hover";
      btnRemove.textContent = "Remover";
      btnRemove.addEventListener("click", () => {
        lista = lista.filter((t) => t !== tarefa);
        listaConcluida = listaConcluida.filter((t) => t !== tarefa);
        listaPendente = listaPendente.filter((t) => t !== tarefa);
        salvarListas();
        atualizarListas();
      });

      const btnConcluida = document.createElement("button");
      btnConcluida.className = "btn btn-success btn-sm";
      btnConcluida.textContent = listaConcluida.includes(tarefa) ? "Desfazer" : "Concluir";
      btnConcluida.addEventListener("click", () => {
        if (listaConcluida.includes(tarefa)) {
          listaConcluida = listaConcluida.filter((t) => t !== tarefa);
          if (!listaPendente.includes(tarefa)) listaPendente.push(tarefa);
        } else {
          listaConcluida.push(tarefa);
          listaPendente = listaPendente.filter((t) => t !== tarefa);
        }
        salvarListas();
        atualizarListas();
      });

      const botoes = document.createElement("div");
      botoes.appendChild(btnConcluida);
      botoes.appendChild(btnRemove);

      li.appendChild(botoes);
      taskList.appendChild(li);
    });
  }

  function adicionarTarefa() {
    const novaTarefa = inputTask.value.trim();
    if (novaTarefa !== "" && !lista.includes(novaTarefa)) {
      lista.push(novaTarefa);
      listaPendente.push(novaTarefa);
      inputTask.value = "";
      salvarListas();
      atualizarListas();
    }
  }

  buttonAdd.addEventListener("click", adicionarTarefa);

  inputTask.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      adicionarTarefa();
    }
  });

  atualizarListas();
});
