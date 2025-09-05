import {
  INITIAL_ITEMS_COUNT,
  ITEM_HEIGHT,
  NUMBER_OF_CARDS,
} from "./constants.js";
import { createItem, generateDataList } from "./utils.js";

const container = document.getElementById("container");
const spacer = document.getElementById("spacer");
const dataList = generateDataList();
const bufferItemsCount = 5;
let currentScrollTop = 0;

const updateSpacerHeight = () => {
  spacer.style.height = `${NUMBER_OF_CARDS * ITEM_HEIGHT}px`;
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

const handleVirtualizedScroll = () => {
  let ticking = false;
  return function (e) {
    if (!ticking) {
      requestAnimationFrame(() => {
        currentScrollTop = e.target.scrollTop;
        const slicedDataList = getDataListToRender();
        spacer.innerHTML = "";
        renderItems(slicedDataList);
        ticking = false;
      });
      ticking = true;
    }
  };
};

container.addEventListener("scroll", handleVirtualizedScroll());

const init = () => {
  updateSpacerHeight();
  renderInitialItems();
};

init();
