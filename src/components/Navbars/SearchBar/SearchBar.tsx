import {
  Input,
} from "@chakra-ui/react";

import { InputGroup } from "@/components/ui/input-group"

import { useColorModeValue } from "@/components/ui/color-mode";
import { SearchIcon } from "@chakra-ui/icons";
export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, children, ...rest } = props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "navy.800");
  return (
    <InputGroup borderRadius='8px' w='200px' startElement={<SearchIcon color={searchIconColor} w='15px' h='15px' />} {...rest}>
      <Input
        variant='outline'
        fontSize='xs'
        bg={inputBg}
        placeholder='Type here...'
      />
    </InputGroup>
  );
}
