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
  const item = document.createElement("div");
  item.classList.add("card");
  item.textContent = data.value;
  item.style.top = `${data.top}px`;
  return item;
};

const addItemsList = (argDataList = []) => {
  argDataList.forEach((data) => {
    container.appendChild(addItem(data));
  });
};

const addInitialItems = () => {
  const itemHeight = getItemHeight();
  const slicedData = dataList.slice(0, 10).map((item, index) => ({
    ...item,
    top: currentScrollTop + index * itemHeight,
  }));
  addSpacerElement();
  addItemsList(slicedData);
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

const getDataListToRender = () => {
  const itemHeight = getItemHeight();
  const itemsAboveViewport = Math.floor(currentScrollTop / itemHeight);
  const itemsWithinViewport = getNumberOfItemsWithinViewport();

  return dataList
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
};

const handleContainerScroll = (e) => {
  currentScrollTop = e.target.scrollTop;
  const itemHeight = getItemHeight();

  if (Math.abs(currentScrollTop - previousScrollTop) >= itemHeight) {
    const slicedData = getDataListToRender();
    previousScrollTop = currentScrollTop;
    container.innerHTML = "";
    addSpacerElement();
    addItemsList(slicedData);
  }
};

container.addEventListener("scroll", handleContainerScroll);
addInitialItems();
