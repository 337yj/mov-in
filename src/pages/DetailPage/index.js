import React from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { title } = useParams();
  return (
    <main>
      <section>임시로 연결해둠</section>
    </main>
  );
};

export default Detail;
