function showCategories() {
  $("#categoriesDataShown").html("");
  $("#categoriesSidebar").html(
    '<div class="mb-2 cardSide" onClick="showData()">All <span class="float-end">></span></div>'
  );
  let categories = JSON.parse(localStorage.getItem("ExpensesCategory"));
  if (categories !== null) {
    categories.sort();
    categories.map((e, index) => {
      const totalAmount = overallBudget();
      const bnud = overallBudget(e);
      let per = (bnud / totalAmount) * 100;
      $("#categoriesSidebar").append(
        `<div class="mb-2 cardSide" onClick="showData('${e}')">${e} <span class="float-end">></span></div>`
      );
      $("#categoriesDataShown")
        .append(`<div class="card container mb-3 cardhover">
  <div class="card-body row">
    <div class="d-flex align-items-center col-5">
      <div class="">
        <p class="me-2 fs-4 mb-0">${e}</p>
      </div>
    </div>
    <div class="col-6 d-flex align-items-center">
      <p class="text-muted mb-0">Total Amount: </p>
      <p class="mb-0">&nbsp;&nbsp;&#8377;${overallBudget(e)}.00</p>
    </div>
    <div class="col-1 d-flex align-items-center justify-content-center">
      <button
        onClick="deleteCategory('${e}', ${index})"
        type="button"
        class="btn btnhover"
        data-bs-placement="top"
        title="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-trash bihover"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="card-body"><div class="progress">
  <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${per}%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div></div>
</div>`);
    });
  }
}

showCategories();

function monthChange(event) {
  const month = +event.target.value.split("-")[1];
  let totalMonthlyAmount = JSON.parse(localStorage.getItem("TotalSalary"));
  if (totalMonthlyAmount !== null) {
    $("#amountMonthly").val(totalMonthlyAmount[month - 1]);
  } else {
    $("#amountMonthly").val(0);
  }
}

function monthSalaryAdd() {
  let totalMonthlyAmount = JSON.parse(localStorage.getItem("TotalSalary"));
  if (totalMonthlyAmount == null) {
    totalMonthlyAmountArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    totalMonthlyAmountArray[$("#month")[0].value.split("-")[1] - 1] =
      +$("#amountMonthly")[0].value;
    localStorage.setItem(
      "TotalSalary",
      JSON.stringify(totalMonthlyAmountArray)
    );
  } else {
    totalMonthlyAmount[$("#month")[0].value.split("-")[1] - 1] =
      +$("#amountMonthly")[0].value;
    localStorage.setItem("TotalSalary", JSON.stringify(totalMonthlyAmount));
  }
}

function selectedDate(event, value) {
  let date = event.target.value;
  showData(undefined, date, value);
}

function myFunction() {
  var x = document.getElementById("myTab");
  var y = document.getElementById("navbarlog");
  var z = document.getElementById("columnDirection");
  if (x.className.search("d-none") !== -1) {
    x.classList.remove("d-none");
    y.classList.remove("d-none");
    x.className += " navbar-block";
    y.className += " navbar-block";
  } else {
    x.className += " d-none";
    y.className += " d-none";
  }
}

function leftClickEvent(event) {
  if (event !== "event") {
    event.stopPropagation();
  }
  var x = document.getElementById("categoriesContainer");
  if (x.className.search("d-none") === -1 && event === "event") {
    x.classList.remove("sidebar-absolute");
    x.classList.remove("slide-in");
    x.className += " slide-out";
    setTimeout(function () {
      x.className += " d-none";
    }, 1000);
  }
  if (x.className.search("d-none") !== -1 && event !== "event") {
    x.classList.remove("d-none");
    x.classList.remove("slide-out");
    x.className += " sidebar-absolute slide-in";
  }
}

function rightClickEvent(event) {
  if (event !== "event") {
    event.stopPropagation();
  }
  var x = document.getElementById("dataprogress");
  if (x.className.search("d-none") === -1 && event === "event") {
    x.classList.remove("sidebar-absolute-right");
    x.classList.remove("slide-in-right");
    x.className += " d-none";
  }
  if (x.className.search("d-none") !== -1 && event !== "event") {
    x.classList.remove("d-none");
    x.className += " sidebar-absolute-right slide-in-right";
  }
}

function clickEvent() {
  leftClickEvent("event");
  rightClickEvent("event");
}
