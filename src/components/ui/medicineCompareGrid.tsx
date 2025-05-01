"use client";
import MedicineCard from "./MedicineCard";
import { Medicine } from "@/types/medicine"; // Assuming you have the correct types for Medicine

function findBestDeal(medicine: Medicine) {
  // Compare prices between mg1 and pharma and determine the best deal
  const mg1Price = medicine.mg1Price;
  const pharmaPrice = medicine.pharmaPrice;

  const bestDeal = {
    platform: mg1Price < pharmaPrice ? "1mg" : "pharma",
    price: mg1Price < pharmaPrice ? mg1Price : pharmaPrice,
    id: medicine.id,
  };

  return bestDeal;
}

type MedicineComparisonGridProps = {
  medicines: Medicine[];
  sortBy: "price" | "quality" | "availability";
  cheapestMedicineId: number;
};

export default function MedicineComparisonGrid({
  medicines,
  sortBy,
  cheapestMedicineId,
}: MedicineComparisonGridProps) {
  // Sort medicines based on the selected sort option
  const sortedMedicines = [...medicines].sort((a, b) => {
    if (sortBy === "price") {
      const aMinPrice = Math.min(a.mg1Price, a.pharmaPrice);
      const bMinPrice = Math.min(b.mg1Price, b.pharmaPrice);
      return aMinPrice - bMinPrice;
    } else if (sortBy === "quality") {
      const aMaxQuality = Math.max(a.mg1Quality, a.pharmaQuality);
      const bMaxQuality = Math.max(b.mg1Quality, b.pharmaQuality);
      return bMaxQuality - aMaxQuality;
    } else {
      // Availability - sort by average availability score
      const aAvgAvail = (a.mg1Availability + a.pharmaAvailability) / 2;
      const bAvgAvail = (b.mg1Availability + b.pharmaAvailability) / 2;
      return bAvgAvail - aAvgAvail;
    }
  });
  //   console.log("medicines compare: ", medicines);
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center p-4  bg-teal-50 rounded-lg">
          <h2 className="text-xl font-bold text-teal-700">1MG</h2>
        </div>
        <div className="text-center p-4 bg-teal-50  rounded-lg">
          <h2 className="text-xl font-bold text-teal-700">Pharma Company</h2>
        </div>
      </div>

      {sortedMedicines.map((medicine) => {
        const bestDeal = findBestDeal(medicine); // Assuming you have a function that identifies the best deal
        const priceDifference = Math.abs(
          medicine.mg1Price - medicine.pharmaPrice
        );

        // Calculate discountedPrice and discountPercentage
        const discountedPrice =
          bestDeal.platform === "1mg"
            ? medicine.mg1Price * (1 - priceDifference / medicine.mg1Price)
            : medicine.pharmaPrice *
              (1 - priceDifference / medicine.pharmaPrice);

        const discountPercentage =
          (priceDifference /
            Math.max(medicine.mg1Price, medicine.pharmaPrice)) *
          100;

        // console.log("medcine comparison card: ", medicine);
        return (
          <div
            key={medicine.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* MG1 Medicine Card */}
            <MedicineCard
              medicine={medicine}
              company="mg1"
              isCheapest={
                medicine.id === cheapestMedicineId &&
                medicine.mg1Price <= medicine.pharmaPrice
              }
              isCompanyBetter={medicine.mg1Price < medicine.pharmaPrice}
              originalPrice={medicine.mg1Price}
              discountedPrice={discountedPrice}
              discountPercentage={discountPercentage}
              rating={medicine.mg1Quality} // Assuming mg1Quality is the rating
              delivery={medicine.mg1Delivery}
            />

            {/* Pharma Medicine Card */}
            <MedicineCard
              medicine={medicine}
              company="pharma"
              isCheapest={
                medicine.id === cheapestMedicineId &&
                medicine.pharmaPrice <= medicine.mg1Price
              }
              isCompanyBetter={medicine.pharmaPrice < medicine.mg1Price}
              originalPrice={medicine.pharmaPrice}
              discountedPrice={discountedPrice}
              discountPercentage={discountPercentage}
              rating={medicine.pharmaQuality} // Assuming pharmaQuality is the rating
              delivery={medicine.pharmaDelivery}
            />
          </div>
        );
      })}
    </div>
  );
}
