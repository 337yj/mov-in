import React, { useState } from "react";

const MoreButton = ({ content, maxLength }) => {
  const [showAll, setShowAll] = useState(false);

  const shouldShowButton = content.length > maxLength;

  const truncatedContent = content.slice(0, maxLength);

  return (
    <>
      <div>
        {/* {showAll ? content : truncatedContent} */}
        {shouldShowButton && (
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? "접기" : "더보기"}
          </button>
        )}
      </div>
    </>
  );
};

export default MoreButton;
