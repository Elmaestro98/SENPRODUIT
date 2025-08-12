import {
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  Image,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useState } from "react";

function ProductCard({ product }) {
  // ✅ CORRECTION : Initialisation sécurisée avec des valeurs par défaut
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product?.name || "",
    price: product?.price || "",
    image: product?.image || "",
  });

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toast({
        title: "Erreur",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, newData) => {
    const result = await updateProduct(pid, newData);
    if (result?.success) {
      toast({
        title: "Success",
        description: "Produit mis à jour avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {product.price} FCFA
        </Text>
        <HStack spacing={2}>
          <IconButton onClick={onOpen} icon={<EditIcon />} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier le produit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Nom produit"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  // ✅ CORRECTION : updatedProduct au lieu d'updateProduct
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Prix produit"
                name="Prix"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  // ✅ CORRECTION : updatedProduct au lieu d'updateProduct
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image produit"
                name="Image"
                value={updatedProduct.image}
                onChange={(e) =>
                  // ✅ CORRECTION : updatedProduct au lieu d'updateProduct
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              colorScheme="blue"
              mr={3}
            >
              Modifier
            </Button>
            <Button onClick={onClose}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProductCard;
