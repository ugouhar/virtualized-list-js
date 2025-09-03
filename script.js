const container = document.getElementById("container");
const numberOfCards = 10;
const numberOfBufferedItems = 5;
const ITEM_HEIGHT = 40;
const items = Array(numberOfCards)
  .fill(0)
  .map((item, index) => ({ value: `Card ${index + 1}`, top: 0 }));

let scrollTop = 0;
const createNewCard = (item) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = item.value;
  card.style.top = `${item.top}px`;
  return card;
};

const addSpacerElement = () => {
  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  spacer.style.height = `${numberOfCards * ITEM_HEIGHT}px`;
  container.appendChild(spacer);
};

const addCards = (cardList = []) => {
  cardList.forEach((item) => {
    container.appendChild(createNewCard(item));
  });
};

const getItemHeight = () => {
  const borderWidth = 1;
  const itemHeight =
    document.querySelector(".card")?.clientHeight ||
    ITEM_HEIGHT + 2 * borderWidth;
  return itemHeight;
};

const getContainerHeight = () => {
  const containerHeight = document.querySelector("#container").clientHeight;

  return containerHeight;
};
const getNumberOfItemsInViewPort = () => {
  const numberOfItemsInViewPort = getContainerHeight() / getItemHeight();
  return numberOfItemsInViewPort;
};

container.addEventListener("scroll", (e) => {
  scrollTop = e.target.scrollTop;
  const itemHeight = getItemHeight();
  let itemsAboveViewport = Math.floor(scrollTop / itemHeight);

  const numberOfItemsInViewPort = getNumberOfItemsInViewPort();

  const slicedItem = items
    .slice(
      Math.max(0, itemsAboveViewport - numberOfBufferedItems),
      itemsAboveViewport + numberOfItemsInViewPort + 1 + numberOfBufferedItems
    )
    .map((item, index) => ({
      ...item,
      top: scrollTop + index * itemHeight,
    }));
  container.innerHTML = "";
  addSpacerElement();
  addCards(slicedItem);
});

const addInitialItems = () => {
  const itemHeight = 40;
  const slicedItem = items.slice(0, 20).map((item, index) => ({
    ...item,
    top: scrollTop + index * itemHeight,
  }));
  addSpacerElement();
  addCards(slicedItem);
};
addInitialItems();
