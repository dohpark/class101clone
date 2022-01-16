import styled from "styled-components";
import palette from "../../../styles/palette";

const pageNumberToString = (pageNumber: number) => {
  if (pageNumber.toString().length === 1) return `0${pageNumber}`;
  else return `${pageNumber}`;
};

const PaginationContainer = styled.div``;

const PaginationNumber = styled.div`
  font-size: 14px;
  color: ${palette.white};
  .currentPage {
    font-weight: 800;
  }

  .bar {
    margin-left: 0px;
    margin-right: 0px;
    font-weight: 300;
    padding: 0;
  }

  .lastPage {
    padding: 0;
    margin-left: 0px;
    margin-right: 0px;
  }
`;

const PaginationCircle = styled.div`
  display: flex;
  .circle {
    margin: 0px 4px;
    width: 6px;
    height: 6px;
    background-color: ${palette.white};
    opacity: 1;
    border-radius: 50%;
    cursor: pointer;
  }

  .longCircle {
    margin: 0px 4px;
    width: 20px;
    height: 6px;
    background-color: ${palette.white};
    border-radius: 3px;
    cursor: pointer;
  }
`;

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  paginationType?: "number" | "circle";
  active: number;
  slidesPerView: number;
  childrenCount: number;
  onClickPaginationHandler?: (index: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  paginationType,
  active,
  slidesPerView,
  childrenCount,
  onClickPaginationHandler = () => {},
  className,
}) => {
  const pages = childrenCount - slidesPerView + 1;
  const currentPage = active + 1;
  const currentPageString = pageNumberToString(currentPage);
  const lastPageString = pageNumberToString(pages);

  const array = Array.from(Array(pages).keys());
  const circleOrNot = (index: number) => {
    if (active === index) return "longCircle";
    else return "";
  };

  if (pages > 1)
    return (
      <PaginationContainer className={className}>
        {paginationType === "number" && (
          <PaginationNumber>
            <span className="currentPage">{currentPageString}</span>
            <span className="bar"> | </span>
            <span className="lastPage">{lastPageString}</span>
          </PaginationNumber>
        )}
        {paginationType === "circle" && (
          <PaginationCircle>
            {array.map((val, index) => {
              return (
                <div
                  key={val}
                  className={`${circleOrNot(index)} circle`}
                  onClick={() => onClickPaginationHandler(index)}
                ></div>
              );
            })}
          </PaginationCircle>
        )}
      </PaginationContainer>
    );
  else return <div></div>;
};

export default Pagination;
