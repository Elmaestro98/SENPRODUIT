import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  useColorModeValue,
  VStack,
  Heading,
  Button,
  Container,
  Input,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Erreur de creation de produit",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "produit crée avec succéss",
        description: success,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", image: "" });
    }
    console.log("Sucsess:", success);
    console.log("Message:", message);
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Créer un nouveau Produit
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              type="text"
              placeholder="nom du produit"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="prix"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button color="blue" onClick={handleAddProduct} w="full">
              Ajouter un produit
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
