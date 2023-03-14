// without mouse events
const column = document.querySelectorAll(".draggable-true .column");

document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

column.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    const dragging = document.querySelector(".draggable-true .dragging");
    const applyAfter = getNewPosition(item, e.clientY);

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      item.prepend(dragging);
    }
  });
});

function getNewPosition(column, posY) {
  const cards = column.querySelectorAll("div:not(.dragging)");
  let result;

  for (let refer_card of cards) {
    const box = refer_card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if (posY >= boxCenterY) result = refer_card;
  }

  return result;
}

// with mouse events
const column2 = document.querySelector(".draggable-false .column");

document.addEventListener("mousedown", (e) => {
  if (e.target.classList.value === "item") {
    let draggingElement = e.target;

    e.target.classList.add("dragging-item");

    document.addEventListener("mousemove", (e) => {
      draggingElement.style.left = e.pageX + "px";
      draggingElement.style.top = e.pageY + "px";
    });

    document.addEventListener("mouseup", (e) => {
      const applyAfter = getNewPosition(column2, e.pageY);
      if (applyAfter) {
        applyAfter.insertAdjacentElement("afterend", draggingElement);
        console.log(applyAfter)
      }
      draggingElement.classList.remove("dragging-item");
    });
  }
});
