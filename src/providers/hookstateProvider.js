import { createState, useState } from "@hookstate/core";
const SteinStore = require("stein-js-client");
const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

const initialState = createState({
  priceList: [],
  areaOptions: [],
  sizeOptions: [],
  provinces: [],
});

export const useGlobalState = () => {
  const state = useState(initialState);

  return {
    fetchPriceList: () => {
      store.read("list").then(data => {
        state.priceList.set(data);
      });
    },
    priceList: () => state.priceList.value,
    fetchAreaOptions: () => {
      store.read("option_area").then(data => {
        state.areaOptions.set(data);

        // setProvinces
        let areaTemp = Object.assign([], state.areaOptions.value)
        const filteredProvinces = [...new Map(areaTemp.map((data) => [data.province, data])).values()];
        state.provinces.set(filteredProvinces);
      });
    },
    areaOptions: () => state.areaOptions.value,
    provinces: () => state.provinces.value,
    fetchSizeOptions: () => {
      store.read("option_size").then(data => {
        state.sizeOptions.set(data);
      });
    },
    sizeOptions: () => state.sizeOptions.value,
    updateItemList: (uuid, selectedItem) => {
      store.edit("list", {
        search: { uuid: uuid },
        set: selectedItem
      })
      .then((res) => {
        store.read("list").then(data => {
          state.priceList.set(data);
        });
      })
      .catch((error) => {
        console.error(error);
      })
    },
  }
}