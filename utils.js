import { TOTAL_NUMBER_OF_ITEMS } from "./constants.js";

export const generateDataList = () => {
  const data = Array(TOTAL_NUMBER_OF_ITEMS)
    .fill(0)
    .map((_, index) => ({ value: index + 1 }));
  return data;
};

export const createItem = (data) => {
  const item = document.createElement("div");
  item.classList.add("card");
  item.style.top = `${data.top}px`;

  ["Top", "Middle", "Bottom"].forEach((val) => {
    const element = document.createElement("div");
    element.textContent = `${val} ${data.value}`;
    item.appendChild(element);
  });
  return item;
};
