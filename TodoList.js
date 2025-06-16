let lista = JSON.parse(localStorage.getItem("minhaLista")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const inputTask = document.getElementById("addTask");
  const buttonAdd = document.getElementById("buttonAdd");
  const ulTaskList = document.getElementById("taskList");

  function salvarLista() {
    localStorage.setItem("minhaLista", JSON.stringify(lista));
  }

  function atualizarLista() {
    ulTaskList.innerHTML = "";

    lista.forEach((tarefa, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.textContent = tarefa;

      const btnRemove = document.createElement("button");
      btnRemove.className = "btn btn-danger btn-sm";
      btnRemove.textContent = "Remover";

      btnRemove.addEventListener("click", () => {
        lista.splice(index, 1);
        salvarLista();
        atualizarLista();
      });

      li.appendChild(btnRemove);
      ulTaskList.appendChild(li);
    });
  }

  function adicionarTarefa() {
    const novaTarefa = inputTask.value.trim();
    if (novaTarefa !== "") {
      lista.push(novaTarefa);
      inputTask.value = "";
      salvarLista();
      atualizarLista();
    }
  }

  buttonAdd.addEventListener("click", adicionarTarefa);

  inputTask.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      adicionarTarefa();
    }
  });

  atualizarLista();
});
