import { Box, Flex, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex align="center" justify="center">
        <Heading as="h1" size="lg">Note Taking App</Heading>
      </Flex>
    </Box>
  );
};

export default Navbar;