// src/app/api/scrape-search/route.ts
import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const response = await axios.get(
      `https://pharmeasy.in/search/all?name=${query}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        },
      }
    );

    const $ = cheerio.load(response.data);

    const products: {
      name: string;
      manufacturer: string;
      quantity: string;
      price: string;
      mrp: string;
      discount: string;
      imageUrl: string | undefined;
    }[] = [];

    $('div[class*="ProductCard"]').each((index, element) => {
      const name = $(element).find('h1[class*="medicineName"]').text().trim();
      if (!name) return;

      const manufacturer = $(element)
        .find('div[class*="brandName"]')
        .text()
        .replace("By", "")
        .trim();
      const quantity = $(element)
        .find('div[class*="measurementUnit"]')
        .text()
        .trim();

      const price = $(element)
        .find('span[class*="unitPriceDecimal"]')
        .text()
        .replace("₹", "")
        .trim();
      const mrp = $(element)
        .find('span[class*="striked"]')
        .text()
        .replace("₹", "")
        .trim();
      const discount = $(element)
        .find('span[class*="DiscountPercent"]')
        .text()
        .trim();

      const imageUrl = $(element).find("img").attr("src");

      if (name) {
        products.push({
          name,
          manufacturer,
          quantity,
          price,
          mrp,
          discount,
          imageUrl,
        });
      }
    });

    const filteredProducts = products.filter(
      (p) => p.name && p.price && p.imageUrl
    );

    return NextResponse.json({ products: filteredProducts }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch the data" },
      { status: 500 }
    );
  }
}
