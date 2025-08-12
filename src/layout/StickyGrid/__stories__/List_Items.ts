import { IThumbnail } from "../interfaces";

const urlImage = "./images/square_128/test_image1.jpeg";
const urlImage2 = "./images/square_128/test_image2.jpeg";
const urlImage3 = "./images/square_128/test_image3.jpeg";
const urlImage4 = "./images/square_128/test_image4.jpeg";
const urlVideo = "./video/width_128/test_video.mp4";

const thumbs1: IThumbnail[] = [
  {
    id: "1",
    previewSrcUrl: urlImage,
    previewMimeType: "image/jpeg",
    placeholderLabel: "image",
    placeholderIcon: "image",
  },
  {
    id: "video",
    previewSrcUrl: urlVideo,
    previewMimeType: "video/mp4",
    placeholderLabel: "movie",
    placeholderIcon: "movie",
  },
  {
    id: "12",
    previewSrcUrl: urlImage2,
    previewMimeType: "image/jpeg",
  },
  {
    id: "13",
    previewSrcUrl: urlImage3,
    previewMimeType: "image/jpeg",
  },
  {
    id: "14",
    previewSrcUrl: urlImage4,
    previewMimeType: "image/jpeg",
  },
];
const thumbs2: IThumbnail[] = [
  {
    id: "21",
    previewSrcUrl: urlImage,
    previewMimeType: "image/jpeg",
    placeholderLabel: "MEDIA",
  },
  {
    id: "22",
    previewSrcUrl: urlImage2,
    previewMimeType: "image/jpeg",
    placeholderLabel: "MEDIA",
  },
];

const items = [
  {
    id: "3",
    idUser: "userId1",
    idCustom: true,
    idString: "1Lorem",
    idSimpleDate: 1504691932985,
    idBool: true,
    idMultipleString: ["A", "B", "C", "D"],
    idMultipleThumbnail: thumbs1,
    idIcon: "settings",
    idAvatar: [
      {
        id: "0",
        label: "Mario Cat",
        url: urlImage,
      },
      {
        id: "1",
        label: "Luigi Cat",
        url: urlImage,
      },
      {
        id: "2",
        label: "Peach Cat",
        url: urlImage2,
      },
      {
        id: "3",
        label: "Bowser Cat",
        url: urlImage3,
      },
      {
        id: "4",
        label: "Pipino Cat",
        url: urlImage4,
      },
    ],
    idDictionary: [{ value: "dic1" }, { value: "dic2" }, { value: "dic3" }],
    idCategory: [
      {
        tooltip: "Women/Beauty/Shoes/Hight/Heel20",
        id: "Heel20",
        label: "Heel20",
      },
      {
        tooltip: "Men",
        id: "Men",
        label: "MenEn",
      },
    ],
    idPercentage: 45,
  },
  {
    id: "4",
    idUser: "userId_Unknow",
    idCustom: true,
    idString: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    idSimpleDate: "2020-01-30",
    idBool: false,
    idMultipleString: ["views"],
    idIcon: "home",
    idMultipleThumbnail: thumbs2,
    idAvatar: [
      {
        id: "x",
        label: "cat cat cat",
        url: urlImage,
      },
    ],
    idDictionary: undefined,
    idCategory: [
      {
        id: "0",
        label: "0",
      },
      {
        id: "1",
        label: "1",
      },
      {
        id: "2",
        label: "2",
      },
      {
        id: "3",
        label: "3",
      },
      {
        id: "4",
        label: "4",
      },
      {
        id: "5",
        label: "5",
      },
      {
        id: "6",
        label: "6",
      },
      {
        id: "7",
        label: "7",
      },
    ],
    idPercentage: 92,
  },
];

export default items;
