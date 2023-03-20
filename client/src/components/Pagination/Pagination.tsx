import { useState, useEffect } from 'react';
import { Flex, Circle, Text } from '@chakra-ui/react';

type IProps = {
  numberOfPages: number;
  curPage: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ numberOfPages, curPage, setCurPage }: IProps) => {
  const [pagesArr, setPagesArr] = useState(getPagesArr());

  useEffect(() => {
    setPagesArr(getPagesArr());
  }, [numberOfPages, curPage]);

  return (
    <Flex justify="flex-end" align="center" fontSize="14px">
      {!!pagesArr.length && <Text marginRight="17px">Page</Text>}
      {pagesArr.map((index) => {
        if (index > 0) {
          return (
            <Circle
              key={index}
              size="26px"
              marginLeft="7px"
              cursor="pointer"
              transition="background-color, color, 0.2s linear"
              _hover={{
                bg: 'hover',
                color: 'text',
              }}
              bg={index == curPage ? 'secondary' : 'text'}
              color={index == curPage ? 'text' : 'default'}
              onClick={() => {
                setCurPage(index);
              }}
            >
              {index}
            </Circle>
          );
        } else {
          return (
            <Flex key={index} align="flex-end" h="20px">
              <Circle bg="secondary" size="3px" marginLeft="7px" />
              <Circle bg="secondary" size="3px" marginLeft="7px" />
              <Circle bg="secondary" size="3px" marginLeft="7px" />
            </Flex>
          );
        }
      })}
    </Flex>
  );

  function getPagesArr() {
    let tempPagesArr = [];

    if (numberOfPages <= 3) {
      for (let i = 1; i <= numberOfPages; i++) {
        tempPagesArr.push(i);
      }
    } else if (curPage - 2 <= 0) {
      tempPagesArr = [1, 2, 3, -1, numberOfPages];
    } else if (curPage + 2 > numberOfPages) {
      tempPagesArr = [1, -1, numberOfPages - 2, numberOfPages - 1, numberOfPages];
    } else {
      tempPagesArr = [1, -1, curPage - 1, curPage, curPage + 1, -2, numberOfPages];
    }

    return tempPagesArr;
  }
};

export default Pagination;
