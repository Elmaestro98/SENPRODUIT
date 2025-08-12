import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Box,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

import { useProductStore } from "../store/product";

const HomePage = () => {
  const { fetchProducts, products, loading, error, clearError } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Débogage
  console.log("products:", products);
  console.log("loading:", loading);
  console.log("error:", error);

  // Affichage de l'erreur
  if (error) {
    return (
      <Container maxW="xl">
        <VStack spacing={4} py={8}>
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>Erreur de chargement!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Box>
          </Alert>
          <Text
            color="blue.500"
            cursor="pointer"
            onClick={() => {
              clearError();
              fetchProducts();
            }}
            _hover={{ textDecoration: "underline" }}
          >
            Réessayer
          </Text>
        </VStack>
      </Container>
    );
  }

  // Affichage du loading
  if (loading) {
    return (
      <Container maxW="xl">
        <VStack spacing={4} py={8}>
          <Spinner size="xl" color="blue.500" />
          <Text>Chargement des produits...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="xl">
      <VStack spacing={4}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Les produits Courants 🎉
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {/* Utilisation de la vérification de sécurité */}
          {(products || []).map((product, index) => {
            // Vérification supplémentaire pour chaque produit
            if (!product || (!product.id && !product._id)) {
              console.warn("Produit invalide détecté:", product);
              return null;
            }

            return (
              <ProductCard
                key={`product-${product.id || product._id}-${index}`}
                product={product}
              />
            );
          })}
        </SimpleGrid>

        {/* Message quand aucun produit */}
        {(!products || products.length === 0) && !loading && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            Pas de produit trouvé 🙃{" "}
            <Link to="/create">
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Créer un produit
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
