import React, { memo } from "react";

import {
  Box,
  Divider,
  HStack,
  Skeleton,
  VStack,
  useColorModeValue,
} from "native-base";

type SkeletonGroupListProps = {
  rows: number;
};

const SkeletonGroupList = memo(({ rows }: SkeletonGroupListProps) => {
  const borderColor = useColorModeValue("muted.200", "muted.700");

  return (
    <VStack w="80%">
      {[...Array(rows)].map((_, index) => (
        <VStack key={index} alignItems="center">
          <HStack h="24" alignItems="center">
            <Box w="25%">
              <Skeleton size="12" rounded="full" />
            </Box>
            <VStack w="75%" justifyContent="space-between">
              <Skeleton.Text lines={2} />
            </VStack>
          </HStack>
          <Divider w="100%" bg={borderColor} />
        </VStack>
      ))}
    </VStack>
  );
});

export default SkeletonGroupList;
