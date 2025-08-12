import { create } from "zustand";

// Store pour gérer les produits avec gestion d'erreurs robuste
export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  // Setter pour les produits
  setProducts: (products) => set({ products: products || [] }),

  // Setter pour le loading
  setLoading: (loading) => set({ loading }),

  // Setter pour les erreurs
  setError: (error) => set({ error }),

  // Créer un nouveau produit
  createProduct: async (newProduct) => {
    // Validation des champs requis
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return {
        success: false,
        message: "Tous les champs doivent être renseignés",
      };
    }

    try {
      set({ error: null }); // Pas de loading pour la création

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Erreur lors de la création du produit"
        );
      }

      // AJOUT IMMÉDIAT ET AUTOMATIQUE à l'UI
      const currentProducts = get().products || [];
      set({
        products: [...currentProducts, data.data],
      });

      console.log("Nouveau produit ajouté automatiquement à l'UI");

      return {
        success: true,
        message: "Produit créé avec succès",
      };
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      set({ error: error.message });
      return {
        success: false,
        message: error.message || "Erreur lors de la création du produit",
      };
    }
  },

  // Récupérer tous les produits
  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();
      console.log("Réponse API:", data); // Débogage

      // Vérification de la structure des données
      if (data && Array.isArray(data.data)) {
        set({
          products: data.data,
          loading: false,
          error: null,
        });
      } else if (data && Array.isArray(data)) {
        // Au cas où l'API retourne directement un tableau
        set({
          products: data,
          loading: false,
          error: null,
        });
      } else {
        console.warn("Structure de données inattendue:", data);
        set({
          products: [],
          loading: false,
          error: "Format de données invalide",
        });
      }
    } catch (error) {
      console.error("Erreur lors du fetch:", error);
      set({
        products: [],
        loading: false,
        error: error.message || "Erreur lors du chargement des produits",
      });
    }
  },

  // Supprimer un produit
  deleteProduct: async (pid) => {
    try {
      set({ error: null }); // Pas de loading pour les suppressions

      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Erreur lors de la suppression");
      }

      // SUPPRESSION IMMÉDIATE ET AUTOMATIQUE de l'UI
      const currentProducts = get().products || [];
      const filteredProducts = currentProducts.filter((product) => {
        const productId = product._id || product.id;
        return productId !== pid;
      });

      set({ products: filteredProducts });
      console.log("Produit supprimé automatiquement de l'UI");

      return {
        success: true,
        message: data.message || "Produit supprimé avec succès",
      };
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      set({ error: error.message });
      return {
        success: false,
        message: error.message || "Erreur lors de la suppression",
      };
    }
  },

  // Mettre à jour un produit
  updateProduct: async (pid, updateProduct) => {
    try {
      set({ error: null }); // Pas de loading pour les updates

      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProduct),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Erreur lors de la mise à jour");
      }

      // MISE À JOUR IMMÉDIATE ET AUTOMATIQUE
      const currentProducts = get().products || [];
      const updatedProducts = currentProducts.map((product) => {
        const productId = product._id || product.id;
        if (productId === pid) {
          console.log("Produit mis à jour:", data.data);
          // Fusionner les données existantes avec les nouvelles
          return { ...product, ...data.data };
        }
        return product;
      });

      set({ products: updatedProducts });

      return {
        success: true,
        message: data.message || "Produit mis à jour avec succès",
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      set({ error: error.message });
      return {
        success: false,
        message: error.message || "Erreur lors de la mise à jour",
      };
    }
  },

  // Réinitialiser l'erreur
  clearError: () => set({ error: null }),
}));
