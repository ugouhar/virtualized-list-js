import {
  INITIAL_NUMBER_OF_ITEMS,
  ITEM_HEIGHT,
  TOTAL_NUMBER_OF_ITEMS,
} from "./constants.js";
import { createItem, generateDataList } from "./utils.js";

const container = document.getElementById("container");
const spacer = document.getElementById("spacer");
const dataList = generateDataList();
const bufferItemsCount = 5;
let currentScrollTop = 0;

const updateSpacerHeight = () => {
  spacer.style.height = `${TOTAL_NUMBER_OF_ITEMS * ITEM_HEIGHT}px`;
};

const sliceListAndAddTopPosition = (startIdx, endIdx) => {
  const offset = Math.floor(currentScrollTop / ITEM_HEIGHT) * ITEM_HEIGHT;
  const slicedDataList = dataList
    .slice(startIdx, endIdx)
    .map((item, index) => ({
      ...item,
      top: offset + index * ITEM_HEIGHT,
    }));
  return slicedDataList;
};

const renderItems = (slicedDataList = []) => {
  slicedDataList.forEach((data) => spacer.appendChild(createItem(data)));
};

const renderInitialItems = () => {
  const slicedDataList = sliceListAndAddTopPosition(0, INITIAL_NUMBER_OF_ITEMS);
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

  const startIdx = aboveViewportItemsCount;
  const endIdx =
    aboveViewportItemsCount + withinViewportItemsCount + bufferItemsCount;

  return sliceListAndAddTopPosition(startIdx, endIdx);
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
