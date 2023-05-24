import { makeObservable, observable, computed, action } from "mobx";

export interface RawData {
  ConsumedQuantity: string;
  Cost: string;
  Date: string;
  InstanceId: string;
  MeterCategory: string;
  ResourceGroup: string;
  ResourceLocation: string;
  Tags: {
    [key: string]: string;
  };
  UnitOfMeasure: string;
  Location: string;
  ServiceName: string;
  [key: string]: string | { [key: string]: string };
}
export type FilterInputType = {
  cost: {
    min: number;
    max: number;
  } | null;
  quantity: {
    min: number;
    max: number;
  } | null;
  date: string;
} | null

export type AppStoreType = {
  applications: string[];
  resources: string[];
  raw: RawData[];
  filteredData: RawData[];
  filterText: string;
  sortKey: string;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  filter: FilterInputType
  setFilter: (filter: FilterInputType) => void;
  setRaw: (data: RawData[]) => void;
  setFilterText(text: string): void;
  setSortKey(key: string): void;
  setCurrentPage(page: number): void;
};



export class AppStore implements AppStoreType {
  applications: string[] = [];
  resources: string[] = [];
  raw: RawData[] = [];

  filterText = "";
  filter: FilterInputType | null = null;
  sortKey = "";
  currentPage = 1;
  itemsPerPage = 5;

  constructor() {
    makeObservable(this, {
      applications: observable,
      resources: observable,
      raw: observable,
      filterText: observable,
      sortKey: observable,
      currentPage: observable,
      itemsPerPage: observable,
      filteredData: computed,
      totalPages: computed,
      filter: observable,
      setFilter: action,
      setRaw: action,
      setFilterText: action,
      setSortKey: action,
      setCurrentPage: action,
    });
  }

  setFilter(filter: FilterInputType) {
    this.filter = filter
  }

  setRaw(data: RawData[]): void {
    this.raw = data;
  }

  setFilterText(text: string): void {
    this.filterText = text;
    this.currentPage = 1;
  }

  setSortKey(key: string): void {
    this.sortKey = key;
    this.currentPage = 1;
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
  }

  get filteredData(): RawData[] {
    const { filterText, sortKey, currentPage, itemsPerPage, raw, filter } = this;


    let filteredData = raw.slice();

    // apply filter filter
    filteredData = applyFilters(filteredData, filter)

    // Filter data based on filterText
    if (filterText) {
      const filterTextLower = filterText.toLowerCase();
      filteredData = filteredData.filter((item) => {
        for (const key in item) {
          // Check if the field's value contains the search term
          const fieldValue = item[key];
          if (typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(filterTextLower)) {
            return true; // Found a match, include the object in the results
          }
        }
        return false; // No match found for the object
      }
      );
    }

    // Sort data based on sortKey
    if (sortKey) {
      filteredData.sort((a, b) =>
        JSON.stringify(a[sortKey]).toLowerCase().localeCompare(JSON.stringify(b[sortKey]).toLowerCase())
      )
    }

    // Paginate data based on currentPage and itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    filteredData = filteredData.slice(startIndex, endIndex);

    return filteredData;
  }

  get totalPages(): number {
    return Math.ceil(this.raw.length / this.itemsPerPage);
  }
}

const appStore = new AppStore();

export default appStore;


function applyFilters(dataArray: RawData[], filters: FilterInputType): RawData[] {
  return dataArray.filter((data) => {
    if (!filters) {
      return true; // Include all data if no filters provided
    }

    const { cost, quantity, date } = filters;

    if (cost && (parseFloat(data.Cost) < cost.min || parseFloat(data.Cost) > cost.max)) {
      return false;
    }

    if (
      quantity &&
      (parseFloat(data.ConsumedQuantity) < quantity.min || parseFloat(data.ConsumedQuantity) > quantity.max)
    ) {
      return false;
    }

    if (date && data.Date !== date) {
      return false;
    }

    return true; // Include the data item if it passes all filters
  });
}