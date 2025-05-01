"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MedicineComparisonGrid from "@/components/ui/medicineCompareGrid";
import { medicineData } from "@/data/medicine-data";

type ComparisonResultsProps = {
  userQuery: string;
};

export function ComparisonResults({ userQuery }: ComparisonResultsProps) {
  // Helper function to find the best deal source (used if needed for business logic)
  const findBestDeal = (product: { mg1Price: number; pharmaPrice: number }) => {
    return {
      price: Math.min(product.mg1Price, product.pharmaPrice),
      source: product.mg1Price < product.pharmaPrice ? "mg1" : "pharma",
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          {userQuery ? `Results for ${userQuery}` : ""}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 animate-fade-in">
        {Array.isArray(medicineData) &&
          medicineData.map((product) => (
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
              cheapestMedicineId={product.id} // You can update this logic to use findBestDeal if needed
            />
          ))}
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
