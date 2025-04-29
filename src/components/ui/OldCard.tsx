// import React from 'react'

// export default function OldCard() {
//   return (
//     <Card
//       key={product.id}
//       className="overflow-hidden mb-6 border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
//     >
//       <CardContent className="p-0">
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-blue-100 flex items-center justify-between">
//           <div className="flex items-center">
//             <h3 className="font-semibold text-lg text-gray-800">
//               {product.name}
//             </h3>
//             {priceDifference > 0 && (
//               <Badge className="ml-3 bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
//                 Save ₹{priceDifference.toFixed(2)} by comparing
//               </Badge>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => toggleFavorite(product.id)}
//               className="text-gray-400 hover:text-red-500 transition-colors duration-300"
//             >
//               <Heart
//                 className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
//               />
//             </button>
//             <button
//               onClick={() => toggleExpand(product.id)}
//               className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
//             >
//               {isExpanded ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="text-blue-500"
//                 >
//                   <path d="M18 15l-6-6-6 6" />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M6 9l6 6 6-6" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-blue-100">
//           {product.variants.map((variant) => {
//             const isBestDeal =
//               bestDeal.id === variant.id && product.variants.length > 1;

//             return (
//               <div
//                 key={variant.id}
//                 className={`p-4 relative ${
//                   isBestDeal
//                     ? "bg-gradient-to-br from-blue-50 to-green-50"
//                     : "bg-white"
//                 }`}
//               >
//                 {isBestDeal && (
//                   <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg flex items-center">
//                     <ThumbsUp className="h-3 w-3 mr-1" />
//                     Best Deal
//                   </div>
//                 )}

//                 <div className="flex items-center mb-3">
//                   <div
//                     className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 overflow-hidden
//                             ${
//                               variant.platform === "1mg"
//                                 ? "bg-blue-100 border border-blue-200"
//                                 : "bg-purple-100 border border-purple-200"
//                             }`}
//                   >
//                     {variant.platform === "1mg" ? (
//                       <div className="text-blue-600 font-bold text-xs">1mg</div>
//                     ) : (
//                       <div className="text-purple-600 font-bold text-xs">
//                         PE
//                       </div>
//                     )}
//                   </div>
//                   <h4
//                     className={`font-medium ${variant.platform === "1mg" ? "text-blue-600" : "text-purple-600"}`}
//                   >
//                     {variant.platform}
//                   </h4>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="relative h-20 w-20 mr-4 bg-gray-100 rounded-md overflow-hidden">
//                     <Image
//                       src={variant.image || "/placeholder.svg"}
//                       alt={product.name}
//                       fill
//                       className="object-contain p-2"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">
//                       {variant.manufacturer}
//                     </p>

//                     <div className="flex items-center mt-1">
//                       <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded text-xs text-yellow-700 border border-yellow-200">
//                         <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-0.5" />
//                         <span>{variant.rating}</span>
//                       </div>
//                       <span className="text-xs text-gray-500 ml-1">
//                         ({variant.reviews})
//                       </span>
//                     </div>

//                     <div className="mt-3">
//                       <div className="flex items-baseline">
//                         <span className="text-lg font-semibold text-gray-800">
//                           ₹{variant.price.toFixed(2)}
//                         </span>
//                         <span className="text-sm text-gray-500 line-through ml-2">
//                           ₹{variant.mrp.toFixed(2)}
//                         </span>
//                         <Badge
//                           variant="outline"
//                           className={`ml-2
//                                   ${
//                                     variant.platform === "1mg"
//                                       ? "text-blue-600 border-blue-200 bg-blue-50"
//                                       : "text-purple-600 border-purple-200 bg-purple-50"
//                                   }`}
//                         >
//                           {variant.discount}
//                         </Badge>
//                       </div>

//                       <div className="flex items-center mt-2 text-sm">
//                         {variant.inStock ? (
//                           <>
//                             <Truck className="h-4 w-4 text-gray-400 mr-1" />
//                             <span className="text-gray-600">
//                               {variant.delivery}
//                             </span>
//                           </>
//                         ) : (
//                           <>
//                             <Clock className="h-4 w-4 text-red-500 mr-1" />
//                             <span className="text-red-500">
//                               {variant.delivery}
//                             </span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <Button
//                     className={`w-full ${
//                       variant.platform === "1mg"
//                         ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
//                         : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
//                     }`}
//                     disabled={!variant.inStock}
//                   >
//                     <ShoppingCart className="h-4 w-4 mr-2" />
//                     Buy on {variant.platform}
//                   </Button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Card Footer */}
//         {product.variants.length > 1 && (
//           <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-blue-100">
//             <div className="flex items-center">
//               <Shield className="h-5 w-5 text-green-600 mr-2" />
//               <div>
//                 <p className="font-medium text-gray-800">
//                   Best price on {bestDeal.platform}: ₹
//                   {bestDeal.price.toFixed(2)} ({bestDeal.discount})
//                 </p>
//                 {product.variants[0].inStock && product.variants[1].inStock && (
//                   <p className="text-sm text-gray-600">
//                     Save ₹{priceDifference.toFixed(2)} compared to{" "}
//                     {bestDeal.platform === "1mg" ? "PharmEasy" : "1mg"}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
