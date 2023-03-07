const getlist =
  JSON.parse(localStorage.getItem("todos")) == null
    ? []
    : JSON.parse(localStorage.getItem("todos"));
const getLeftItem = getlist.filter((data) => data.status != true).length;
const todoApp = () => ({
  message: "",
  datas: getlist,
  leftItem: getLeftItem,
  addTodo() {
    this.datas =
      JSON.parse(localStorage.getItem("todos")) == null
        ? []
        : JSON.parse(localStorage.getItem("todos"));
    this.datas.push({
      id: this.datas.length + 1,
      text: this.message,
      status: false,
    });
    this.updateLocalStorage();
    this.message = "";
    this.leftItem = this.datas.filter((data) => data.status != true).length;
  },
  updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.datas));
  },
  showAll() {
    this.datas =
      JSON.parse(localStorage.getItem("todos")) == null
        ? []
        : JSON.parse(localStorage.getItem("todos"));
  },
  showActive() {
    const all =
      JSON.parse(localStorage.getItem("todos")) == null
        ? []
        : JSON.parse(localStorage.getItem("todos"));
    this.datas = all.filter((data) => data.status != true);
  },
  showCompleted() {
    const all =
      JSON.parse(localStorage.getItem("todos")) == null
        ? []
        : JSON.parse(localStorage.getItem("todos"));
    this.datas = all.filter((data) => data.status != false);
  },
  clearCompleted() {
    this.datas = this.datas.filter((data) => data.status != true);
    this.updateLocalStorage();
  },
  checkAll(el) {
    this.datas =
      JSON.parse(localStorage.getItem("todos")) == null
        ? []
        : JSON.parse(localStorage.getItem("todos"));
    if (el.classList.contains("done")) {
      this.datas.map((data) => (data.status = true));
      el.classList.remove("done");
      el.innerText = "Uncheck All";
    } else {
      this.datas.map((data) => (data.status = false));
      el.classList.add("done");
      el.innerText = "Check All";
    }
    this.updateLocalStorage();
    this.leftItem = this.datas.filter((data) => data.status != true).length;
  },
  del(idx) {
    this.datas = this.datas.filter((data) => data.id != idx);
    this.leftItem = this.datas.filter((data) => data.status != true).length;
    this.updateLocalStorage();
  },
  check(el, idx) {
    if (el.checked) {
      this.datas[idx - 1].status = true;
    } else {
      this.datas[idx - 1].status = false;
    }
    this.leftItem = this.datas.filter((data) => data.status != true).length;
    this.updateLocalStorage();
  },
  editfun(idx) {
    const getinputs = document.querySelectorAll(".getallinputs");
    const gettexts = document.querySelectorAll(".text");
    gettexts[idx - 1].classList.add("editinputs");
    getinputs[idx - 1].classList.remove("editinputs");
    this.$root.querySelector("#task_edit-" + idx.toString()).focus();
  },
  updatefun(idx) {
    const getinputs = document.querySelectorAll(".getallinputs");
    const gettexts = document.querySelectorAll(".text");
    gettexts[idx - 1].classList.remove("editinputs");
    getinputs[idx - 1].classList.add("editinputs");
    this.updateLocalStorage();
  },
});
