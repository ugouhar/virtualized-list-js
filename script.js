import { ITEM_HEIGHT, NUMBER_OF_CARDS } from "./constants.js";

const container = document.getElementById("container");
let previousScrollTop = 0;
let currentScrollTop = 0;
const dataList = generateDataList();

function generateDataList() {
  const data = Array(NUMBER_OF_CARDS)
    .fill(0)
    .map((_, index) => ({ value: `Card ${index + 1}`, top: 0 }));
  return data;
}

const addSpacerElement = () => {
  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  spacer.style.height = `${NUMBER_OF_CARDS * ITEM_HEIGHT}px`;
  container.appendChild(spacer);
};

const addItem = (data) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = data.value;
  card.style.top = `${data.top}px`;
  return card;
};

const addItemsList = (itemList = []) => {
  itemList.forEach((item) => {
    container.appendChild(addItem(item));
  });
};

const addInitialItems = () => {
  const itemHeight = getItemHeight();
  const slicedItem = dataList.slice(0, 10).map((item, index) => ({
    ...item,
    top: currentScrollTop + index * itemHeight,
  }));
  addSpacerElement();
  addItemsList(slicedItem);
};

const getItemHeight = () => {
  return ITEM_HEIGHT;
};

const getContainerHeight = () => {
  return document.getElementById("container").clientHeight;
};

const getNumberOfItemsWithinViewport = () => {
  return getContainerHeight() / getItemHeight();
};

const handleContainerScroll = (e) => {
  currentScrollTop = e.target.scrollTop;
  const itemHeight = getItemHeight();
  const itemsAboveViewport = Math.floor(currentScrollTop / itemHeight);
  const itemsWithinViewport = getNumberOfItemsWithinViewport();

  if (Math.abs(currentScrollTop - previousScrollTop) >= itemHeight) {
    const slicedItem = dataList
      .slice(
        Math.max(0, itemsAboveViewport),
        itemsAboveViewport + itemsWithinViewport + 5
      )
      .map((item, index) => ({
        ...item,
        top:
          Math.floor(currentScrollTop / ITEM_HEIGHT) * ITEM_HEIGHT +
          index * itemHeight,
      }));
    previousScrollTop = currentScrollTop;
    container.innerHTML = "";
    addSpacerElement();
    addItemsList(slicedItem);
  }
};

container.addEventListener("scroll", handleContainerScroll);
addInitialItems();
