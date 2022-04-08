export interface DropdownProps {
  dropdownLabel: string;
  dropdownPlaceholder: string;
  dropdownOptions: Array<Object>;
  setSelectedObject: any;
}

export interface AutocompleteProps {
  dropdownLabel: string;
  dropdownPlaceholder: string;
  dropdownOptions: Array<Object>;
  selectedObject: Object;
  setSelectedObject: any;
}

export interface WaterSystem {
  id: number | null;
  name: string;
}
