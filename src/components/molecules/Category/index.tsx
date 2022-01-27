import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { category } from "../../../data/data";
import palette from "../../../styles/palette";

// type
interface CategoryProps extends React.HTMLAttributes<HTMLDivElement> {}

type categoryData = {
  [index: string]: {
    [index: string]: string[];
  };
};

// styled-components
const CategoryContainer = styled.div`
  position: absolute;
  background-color: white;
  padding: 0 15px 20px 15px;
  border: 0.5px solid ${palette.gray200};
  width: 180px;
  height: 740px;
  visibility: hidden;

  li:hover .subCategory {
    display: block;
  }
`;

const CategoryUL = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const CategoryLI = styled.li`
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  padding: 4px 15px;
  margin: 0;
  &:hover {
    background-color: ${palette.gray100};
  }
`;

const CategoryTitle = styled.li`
  padding: 15px 15px 0 15px;
  text-align: left;
  font-weight: 400;
  font-size: 11px;
  color: ${palette.gray600};
  padding-bottom: 0px;
  cursor: auto;
  &:hover {
    background-color: transparent;
  }
`;

const SubCategoryUL = styled.ul`
  position: absolute;
  background-color: white;
  padding: 0 15px 20px 15px;
  list-style-type: none;
  border: 0.5px solid ${palette.gray200};
  width: 180px;
  height: 740px;
  display: none;
  left: 210px;
  top: -17px;
`;

const Category: React.FC<CategoryProps> = ({ className }) => {
  // mouse event
  const subCategoryRef = useRef<HTMLUListElement>(null);
  const subCategory = subCategoryRef.current;
  const [smallCategory, setSmallCategory] = useState<string[]>([]);
  const [mediumCategory, setMediumCategory] = useState("");

  const onMouseEnter = (large: string, medium: string) => {
    setSmallCategory((category as categoryData)[large][medium]);
    setMediumCategory(medium);
  };
  const onMouseLeave = () => {
    if (subCategory) {
      setSmallCategory([]);
    }
  };

  useEffect(() => {
    if (subCategory) {
      subCategory.style.display = "block";
      if (!smallCategory[0]) {
        subCategory.style.display = "none";
      }
    }
  }, [subCategory, smallCategory]);

  // category
  const large = Object.keys(category);
  const getMedium = (large: keyof typeof category) => {
    return Object.keys(category[large]);
  };

  return (
    <CategoryContainer
      className={className}
      onMouseLeave={() => onMouseLeave()}
    >
      {large.map((large) => (
        <CategoryUL key={large}>
          <CategoryTitle>{large}</CategoryTitle>
          {getMedium(large as keyof typeof category).map((medium) => (
            <CategoryLI
              onMouseEnter={() => onMouseEnter(large, medium)}
              key={medium}
            >
              {medium}
            </CategoryLI>
          ))}
        </CategoryUL>
      ))}
      <SubCategoryUL className="subCategory" ref={subCategoryRef}>
        <CategoryTitle>{mediumCategory}</CategoryTitle>
        {smallCategory.map((small: string) => (
          <CategoryLI key={small}>{small}</CategoryLI>
        ))}
      </SubCategoryUL>
    </CategoryContainer>
  );
};

export default Category;
