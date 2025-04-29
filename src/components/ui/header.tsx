"use client";

import { Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full">
      <div className="flex justify-between items-center">
        <div className="animate-fade-in-left">
          <h1
            className={`text-2xl font-oswald font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-400 font-oswald`}
          >
            CheapMeds
          </h1>
        </div>

        <div className="flex items-center gap-4 animate-fade-in-right">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Heart className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 text-center animate-fade-in-up delay-200">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-textcolor">
          Find Your Medication
        </h2>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
          Search our extensive database for medications, compare prices, and
          find the best deals
        </p>
      </div>
    </header>
  );
}
