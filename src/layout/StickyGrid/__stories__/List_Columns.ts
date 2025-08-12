import { TypeCell, IColumn } from "../../StickyGrid";

const columns: IColumn[] = [
  {
    type: TypeCell.String,
    id: "idString",
    label: "String",
    sortable: true,
    width: 100,
  },
  {
    type: TypeCell.Category,
    id: "idCategory",
    label: "Category",
    width: 100,
  },
  {
    type: TypeCell.DictionaryEntry,
    id: "idDictionary",
    label: "Dictionary",
    width: 100,
  },
  {
    type: TypeCell.MultipleThumbnail,
    id: "idMultipleThumbnail",
    label: "MultipleThumbnail",
    sortable: false,
    width: 300,
  },
  {
    type: TypeCell.MultipleString,
    id: "idMultipleString",
    label: "MultipleString",
    width: 100,
  },
  {
    type: TypeCell.Avatar,
    id: "idAvatar",
    label: "Avatar",
    sortable: false,
    width: 90,
  },
  {
    type: TypeCell.Icon,
    id: "idIcon",
    label: "Icon",
    width: 50,
  },
  {
    type: TypeCell.Bool,
    id: "idBool",
    label: "Bool",
    width: 80,
    sortable: true,
  },
  {
    type: TypeCell.SimpleDate,
    id: "idSimpleDate",
    label: "SimpleDate",
    sortable: true,
    width: 100,
  },
  {
    type: TypeCell.Percentage,
    id: "idPercentage",
    label: "Percentage",
    width: 160,
  },
];

export default columns;
