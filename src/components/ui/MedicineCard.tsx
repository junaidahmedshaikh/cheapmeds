import { Check, Clock, Star } from "lucide-react";
import Image from "next/image";
import type { Medicine } from "@/types/medicine";
import { Badge } from "@/components/ui/badge";

// type MedicineCardProps = {
//   medicine: Medicine;
//   company: "mg1" | "pharma";
//   isCheapest: boolean;
//   isCompanyBetter: boolean;
// };

export type MedicineCardProps = {
  medicine: Medicine;
  company: "mg1" | "pharma";
  isCheapest: boolean;
  isCompanyBetter: boolean;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  rating: number;
  delivery: string;
};

export default function MedicineCard({
  medicine,
  company,
  isCheapest,
  isCompanyBetter,
}: MedicineCardProps) {
  // Get company-specific data
  const price =
    company === "mg1"
      ? (medicine?.mg1Price ?? 0)
      : (medicine?.pharmaPrice ?? 0);

  const quality =
    company === "mg1" ? medicine.mg1Quality : medicine.pharmaQuality;
  const availability =
    company === "mg1" ? medicine.mg1Availability : medicine.pharmaAvailability;
  const formulation =
    company === "mg1" ? medicine.mg1Formulation : medicine.pharmaFormulation;

  // Calculate price difference percentage
  const otherPrice =
    company === "mg1" ? medicine.pharmaPrice : medicine.mg1Price;
  const priceDifference = otherPrice - price;
  const priceDiffPercentage = Math.round((priceDifference / otherPrice) * 100);

  // Determine if this company has the better price for this medicine
  const hasBetterPrice =
    (company === "mg1" && medicine.mg1Price < medicine.pharmaPrice) ||
    (company === "pharma" && medicine.pharmaPrice < medicine.mg1Price);

  // Determine if this company has the better quality for this medicine
  const hasBetterQuality =
    (company === "mg1" && medicine.mg1Quality > medicine.pharmaQuality) ||
    (company === "pharma" && medicine.pharmaQuality > medicine.mg1Quality);

  // Determine if this company has better availability for this medicine
  const hasBetterAvailability =
    (company === "mg1" &&
      medicine.mg1Availability > medicine.pharmaAvailability) ||
    (company === "pharma" &&
      medicine.pharmaAvailability > medicine.mg1Availability);

  const rating =
    company === "mg1" ? medicine.mg1Quality : medicine.pharmaQuality;
  // console.log("price: ", medicine.rating);

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm border transition-all duration-300 
      ${isCheapest ? "border-teal-500 ring-2 ring-teal-500" : "border-gray-100"} 
      ${isCompanyBetter ? "bg-teal-50" : ""}`}
    >
      <div className="relative">
        {isCompanyBetter && !isCheapest && (
          <div className="absolute top-0 left-0 right-0 bg-teal-400 text-white text-center py-1 font-medium">
            Better Price for {medicine.name}
          </div>
        )}
        <div className="p-4 flex items-center">
          <div className="flex-shrink-0 mr-4">
            <Image
              src={medicine.imageLink}
              alt={medicine.name}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          <div>
            <h3 className="font-semibold text-black text-lg">
              {medicine.name}
            </h3>
            <p className="text-sm text-gray-500">{medicine.description}</p>
            <div className="mt-1">
              <Badge variant="outline" className="bg-buttonbg">
                {medicine.category
                  ? medicine.category.replace("-", " ")
                  : "Uncategorized"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-gray-100 p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Price:</span>
          <div className="flex items-center">
            <span className="font-bold text-lg text-textcolor">
              ₹{isNaN(price) ? "0.00" : price.toFixed(2)}
            </span>
            {hasBetterPrice && priceDiffPercentage > 0 && (
              <span className="ml-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {priceDiffPercentage}% cheaper
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Quality:</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 fill-gray-300"
                }`}
              />
            ))}
            {hasBetterQuality && (
              <span className="ml-2 text-xs font-medium text-teal-600">
                <Check className="h-3 w-3 inline" /> Better
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            Availability:
          </span>
          <div className="flex items-center">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  availability > 7
                    ? "bg-green-500"
                    : availability > 4
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${availability * 10}%` }}
              ></div>
            </div>
            <span className="ml-2 text-xs">{availability}/10</span>
            {hasBetterAvailability && (
              <span className="ml-2 text-xs font-medium text-teal-600">
                <Check className="h-3 w-3 inline" /> Better
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            Formulation:
          </span>
          <span className="text-sm">{formulation}</span>
        </div>

        <div className="pt-2 border-t border-gray-100 mt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              Delivery Time:
            </span>
            <div className="flex items-center">
              <Clock className="h-3 w-3 text-gray-400 mr-1" />
              <span className="text-sm">
                {company === "mg1"
                  ? medicine.mg1Delivery
                  : medicine.pharmaDelivery}
              </span>
            </div>
          </div>
        </div>
        {isCheapest && (
          <span className="absolute inline-block bottom-0 left-0 right-0  bg-teal-500 text-white text-center  font-medium">
            Cheapest Option Overall
          </span>
        )}
      </div>
    </div>
  );
}
