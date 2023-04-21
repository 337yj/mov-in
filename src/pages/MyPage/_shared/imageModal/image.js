import {
  ImageProfile1,
  ImageProfile2,
  ImageProfile3,
  ImageProfile4,
  ImageProfile5,
  ImageProfile6,
  ImageProfile7,
  ImageProfile8,
  ImageProfile9,
  ImageProfile10,
  ImageProfile11,
  ImageProfile12,
} from "../../../../assets/images/profileImages/import.js";

//NOTE: path를 추가 => 사용하는 곳에서 "../../../"
export const imgList = [
  {
    imgId: 1,
    id: "ImageProfile1",

    name: ImageProfile1,
    img: () => <ImageProfile1 />,
  },
  {
    imgId: 2,
    id: "ImageProfile2",
    name: ImageProfile2,
    img: () => <ImageProfile2 />,
  },
  {
    imgId: 3,
    id: "ImageProfile3",
    name: ImageProfile3,
    img: () => <ImageProfile3 />,
  },
  {
    imgId: 4,
    id: "ImageProfile4",
    name: ImageProfile4,
    img: () => <ImageProfile4 />,
  },
  {
    imgId: 5,
    id: "ImageProfile5",
    name: ImageProfile5,
    img: () => <ImageProfile5 />,
  },
  {
    imgId: 6,
    id: "ImageProfile6",
    name: ImageProfile6,
    img: () => <ImageProfile6 />,
  },
  {
    imgId: 7,
    id: "ImageProfile7",
    name: ImageProfile7,
    img: () => <ImageProfile7 />,
  },
  {
    imgId: 8,
    id: "ImageProfile8",
    name: ImageProfile8,
    img: () => <ImageProfile8 />,
  },
  {
    imgId: 9,
    id: "ImageProfile9",
    name: ImageProfile9,
    img: () => <ImageProfile9 />,
  },
  {
    imgId: 10,
    id: "ImageProfile10",
    name: ImageProfile10,
    img: () => <ImageProfile10 />,
  },
  {
    imgId: 11,
    id: "ImageProfile11",
    name: ImageProfile11,
    img: () => <ImageProfile11 />,
  },
  {
    imgId: 12,
    id: "ImageProfile12",
    name: ImageProfile12,
    img: () => <ImageProfile12 />,
  },
];

export const image = (item) => {
  if (item === ImageProfile1) return <ImageProfile1 />;
  else if (item === ImageProfile2) return <ImageProfile2 />;
  else if (item === ImageProfile3) return <ImageProfile3 />;
  else if (item === ImageProfile4) return <ImageProfile4 />;
  else if (item === ImageProfile5) return <ImageProfile5 />;
  else if (item === ImageProfile6) return <ImageProfile6 />;
  else if (item === ImageProfile7) return <ImageProfile7 />;
  else if (item === ImageProfile8) return <ImageProfile8 />;
  else if (item === ImageProfile9) return <ImageProfile9 />;
  else if (item === ImageProfile10) return <ImageProfile10 />;
  else if (item === ImageProfile11) return <ImageProfile11 />;
  else return <ImageProfile12 />;
};
