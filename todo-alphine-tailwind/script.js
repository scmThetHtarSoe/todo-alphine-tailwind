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
      id: Date.now(),
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
    if (el.innerText == "Check All") {
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
      var value = this.datas.filter(function (data) {
        return data.id == idx;
      });
      value[0].status = true;
    } else {
      var value = this.datas.filter(function (data) {
        return data.id == idx;
      });
      value[0].status = false;
    }
    if (this.leftItem == "0") {
      document.getElementById("checkAll").innerHTML = "Uncheck All";
    } else {
      document.getElementById("checkAll").innerHTML = "Check All";
    }
    this.updateLocalStorage();
    this.leftItem = this.datas.filter((data) => data.status != true).length;
  },
  editfun(el, idx) {
    el.classList.add("editinputs");
    el.nextElementSibling.classList.remove("editinputs");
    this.$root.querySelector("#task_edit-" + idx.toString()).focus();
  },
  updatefun(el, idx) {
    el.parentNode.previousElementSibling.classList.remove("editinputs");
    el.parentNode.classList.add("editinputs");

    var value = JSON.parse(localStorage.getItem("todos"));
    var oldVal = value.filter(function (data) {
      return data.id == idx;
    });

    var getoldVal = oldVal[0].text;
    el.addEventListener("blur", function (event) {
      if (el.value.trim() === "") {
        console.log(getoldVal);
        console.log(el);
        el.parentNode.previousElementSibling.innerText = getoldVal;
        el.value = getoldVal;
      }
    });
    this.updateLocalStorage();
  },
});
