import { Box, Container, Flex, Heading, Input, SimpleGrid, Text, VStack, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error("Error fetching city data:", error));
  }, []);

  const filteredCities = searchTerm
    ? cities.filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : cities;

  return (
    <Container maxW="container.xl" p={0}>
      <Box as="header" bg="blue.500" color="white" py={4}>
        <Container maxW="container.xl">
          <Heading as="h1" size="lg">NomadRank</Heading>
        </Container>
      </Box>
      <Image src="/images/hero-beach.jpg" alt="Tropical Beach" objectFit="cover" width="100%" height="50vh" />
      <VStack spacing={4} p={4}>
        <Heading as="h2" size="xl">Find the Best Cities for Digital Nomads</Heading>
        <Text fontSize="lg">Explore top-rated locations based on connectivity, cost of living, and more!</Text>
        <Input placeholder="Search cities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </VStack>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} p={4}>
        {filteredCities.map(city => (
          <Box key={city.id} p={4} boxShadow="md" borderRadius="lg">
            <Heading as="h3" size="md">{city.name}</Heading>
            <Text>{city.country}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;