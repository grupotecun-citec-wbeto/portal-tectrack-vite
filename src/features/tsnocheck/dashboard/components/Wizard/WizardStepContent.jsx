// @ts-nocheck
import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Stack,
  Text,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';

const WizardStepContent = ({ 
  title, 
  description, 
  icon, 
  children,
  headerColor = 'blue.500' 
}) => {
  const textColor = useColorModeValue('gray.700', 'white');
  const descColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box w="100%" maxW="100%">
      {/* Step Header */}
      {(title || icon) && (
        <Stack 
          spacing={3} 
          mb={{ base: 4, md: 6 }} 
          align={{ base: "center", md: "flex-start" }}
          direction={{ base: "column", sm: "row" }}
          textAlign={{ base: "center", sm: "left" }}
        >
          {icon && (
            <Icon 
              as={icon} 
              w={{ base: 5, md: 6 }} 
              h={{ base: 5, md: 6 }} 
              color={headerColor}
              flexShrink={0}
            />
          )}
          <VStack align={{ base: "center", sm: "start" }} spacing={1} flex="1">
            {title && (
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                fontWeight="bold" 
                color={textColor}
                textAlign={{ base: "center", sm: "left" }}
              >
                {title}
              </Text>
            )}
            {description && (
              <Text 
                fontSize={{ base: "sm", md: "md" }} 
                color={descColor}
                textAlign={{ base: "center", sm: "left" }}
                maxW="100%"
              >
                {description}
              </Text>
            )}
          </VStack>
        </Stack>
      )}

      {/* Step Content */}
      <Box overflow="hidden">
        {children}
      </Box>
    </Box>
  );
};

export default WizardStepContent;
