export interface ISelectionInputItem {
  value: string;
  name: string;
}

export interface ISearchBoxProps {
  onSearchBoxExecute: any;
  selectionValues?: ISelectionInputItem[];
}