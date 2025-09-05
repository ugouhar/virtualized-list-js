import {
  INITIAL_ITEMS_COUNT,
  ITEM_HEIGHT,
  NUMBER_OF_CARDS,
} from "./constants.js";

const container = document.getElementById("container");
const spacer = document.getElementById("spacer");
const dataList = generateDataList();
const bufferItemsCount = 5;
let currentScrollTop = 0;

function generateDataList() {
  const data = Array(NUMBER_OF_CARDS)
    .fill(0)
    .map((_, index) => ({ value: index + 1 }));
  return data;
}

const updaterSpacerHeight = () => {
  spacer.style.height = `${NUMBER_OF_CARDS * ITEM_HEIGHT}px`;
};

const createItem = (data) => {
  const item = document.createElement("div");
  const topElement = document.createElement("div");
  topElement.textContent = "Top " + data.value;
  const middleElement = document.createElement("div");
  middleElement.textContent = "Middle " + data.value;
  const bottomElement = document.createElement("div");
  bottomElement.textContent = "Bottom " + data.value;

  item.classList.add("card");
  item.appendChild(topElement);
  item.appendChild(middleElement);
  item.appendChild(bottomElement);
  item.style.top = `${data.top}px`;
  return item;
};

const renderItems = (slicedDataList = []) => {
  slicedDataList.forEach((data) => {
    spacer.appendChild(createItem(data));
  });
};

const renderInitialItems = () => {
  const slicedDataList = dataList
    .slice(0, INITIAL_ITEMS_COUNT)
    .map((item, index) => ({
      ...item,
      top: currentScrollTop + index * ITEM_HEIGHT,
    }));

  renderItems(slicedDataList);
};

const getContainerHeight = () => {
  return container.clientHeight;
};

const getVisibleItemsCount = () => {
  return Math.floor(getContainerHeight() / ITEM_HEIGHT);
};

const getDataListToRender = () => {
  const aboveViewportItemsCount = Math.floor(currentScrollTop / ITEM_HEIGHT);
  const withinViewportItemsCount = getVisibleItemsCount();

  return dataList
    .slice(
      aboveViewportItemsCount,
      aboveViewportItemsCount + withinViewportItemsCount + bufferItemsCount
    )
    .map((item, index) => ({
      ...item,
      top:
        Math.floor(currentScrollTop / ITEM_HEIGHT) * ITEM_HEIGHT +
        index * ITEM_HEIGHT,
    }));
};

const handleVirtualizedScroll = (e) => {
  currentScrollTop = e.target.scrollTop;
  const slicedDataList = getDataListToRender();

  spacer.innerHTML = "";
  renderItems(slicedDataList);
};

container.addEventListener("scroll", handleVirtualizedScroll);

const initialize = () => {
  updaterSpacerHeight();
  renderInitialItems();
};

initialize();
