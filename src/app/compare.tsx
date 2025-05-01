"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MedicineComparisonGrid from "@/components/ui/medicineCompareGrid";
import { medicineData } from "@/data/medicine-data";

export function ComparisonResults() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  // Helper function to find the best deal for each product
  const findBestDeal = (product: { mg1Price: number; pharmaPrice: number }) => {
    const bestDeal = {
      price: Math.min(product.mg1Price, product.pharmaPrice),
      source: product.mg1Price < product.pharmaPrice ? "mg1" : "pharma",
    };
    return bestDeal;
  };

  // Handle toggling favorites
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle toggling expanded view for product details
  const toggleExpand = (productId: string) => {
    setExpandedProduct((prev) => (prev === productId ? null : productId));
  };
  // console.log("medicineData: ", medicineData);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          {medicineData.query === undefined
            ? ""
            : `Results for ${medicineData.query} `}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 animate-fade-in">
        {Array.isArray(medicineData) &&
          medicineData.map((product) => {
            const bestDeal = findBestDeal(product); // Assuming this function identifies the best deal
            const priceDifference = Math.abs(
              product.mg1Price - product.pharmaPrice
            );

            // Determine if this product is a favorite or expanded
            const isFavorite = favorites.includes(product.id);
            const isExpanded = expandedProduct === product.id;

            // Logging for debugging
            console.log("product: ", product);

            // Calculate discounted price and discount percentage based on the best deal platform
            const discountedPrice =
              bestDeal.platform === "1mg"
                ? product.mg1Price * (1 - priceDifference / product.mg1Price)
                : product.pharmaPrice *
                  (1 - priceDifference / product.pharmaPrice);

            const discountPercentage =
              (priceDifference /
                Math.max(product.mg1Price, product.pharmaPrice)) *
              100;

            return (
              <MedicineComparisonGrid
                key={product.id}
                medicines={[
                  {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    imageLink:
                      product.imageLink ||
                      "/placeholder.svg?height=100&width=100", // fallback if no image

                    // MG1 data
                    mg1Price: product.mg1Price,
                    mg1Quality: product.mg1Quality,
                    mg1Availability: product.mg1Availability,
                    mg1Formulation: product.mg1Formulation,
                    mg1Delivery: product.mg1Delivery,

                    // Pharma data
                    pharmaPrice: product.pharmaPrice,
                    pharmaQuality: product.pharmaQuality,
                    pharmaAvailability: product.pharmaAvailability,
                    pharmaFormulation: product.pharmaFormulation,
                    pharmaDelivery: product.pharmaDelivery,
                  },
                ]}
                sortBy="price"
                cheapestMedicineId={bestDeal.id} // Assuming bestDeal.id represents the best deal product's ID
              />
            );
          })}
      </div>

      <div className="mt-8 text-center">
        <Button className="inline-flex items-center justify-center rounded-full border border-teal-700 bg-transparent px-6 py-2 text-sm font-medium text-teal-700 transition-all duration-200 hover:bg-teal-500 hover:text-white hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:text-base transition-all duration-200 ease-in-out">
          Load More
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
