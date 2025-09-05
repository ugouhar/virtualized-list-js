import { NUMBER_OF_CARDS } from "./constants.js";

export const generateDataList = () => {
  const data = Array(NUMBER_OF_CARDS)
    .fill(0)
    .map((_, index) => ({ value: index + 1 }));
  return data;
};

export const createItem = (data) => {
  const item = document.createElement("div");
  item.classList.add("card");
  item.style.top = `${data.top}px`;

  ["Top", "Middle", "Bottom"].forEach((element) => {
    const el = document.createElement("div");
    el.textContent = `${element} ${data.value}`;
    item.appendChild(el);
  });
  return item;
};
