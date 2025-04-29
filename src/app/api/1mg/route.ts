import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  try {
    const response = await axios.get(
      `https://www.1mg.com/search/all?name=${query}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          Referer: "https://www.1mg.com/",
        },
      }
    );

    const $ = cheerio.load(response.data);
    const productsSet = new Set<string>();
    const products: {
      name: string;
      price?: string;
      mrp?: string;
      discount?: string;
      imageUrl?: string;
    }[] = [];

    $('div[class*="style__product-card"]').each((index, element) => {
      const name = $(element)
        .find('div[class*="style__pro-title"]')
        .text()
        .trim();

      const rawPrice = $(element)
        .find('div[class*="style__price-tag"]')
        .text()
        .trim();

      // Extract first ₹-based price
      const matchedPrice = rawPrice.match(/₹\s*\d+(\.\d+)?/);
      const price = matchedPrice ? matchedPrice[0] : undefined;

      const mrp = $(element)
        .find('div[class*="style__discount-price"]')
        .text()
        .trim();

      const discount = $(element)
        .find('div[class*="style__off-badge"]')
        .text()
        .trim();

      const imageUrl = $(element).find("img").attr("src");

      const uniqueKey = `${name}-${price}-${mrp}`;
      if (name && !productsSet.has(uniqueKey)) {
        productsSet.add(uniqueKey);
        products.push({
          name,
          price,
          mrp,
          discount,
          imageUrl,
        });
      }
    });

    // Optional fallback section for other selectors
    $('div[class*="card"], div[class*="product"]').each((index, element) => {
      const name = $(element)
        .find("h2, div[class*='title'], span[class*='name']")
        .first()
        .text()
        .trim();

      if (!name) return;

      const rawPrice = $(element)
        .find('div[class*="style__price-tag"]')
        .text()
        .trim();

      const matchedPrice = rawPrice.match(/₹\s*\d+(\.\d+)?/);
      const price = matchedPrice ? matchedPrice[0] : undefined;

      const discountElement = $(element)
        .find("span:contains('%'), div:contains('% OFF')")
        .first();

      const discount =
        discountElement.length > 0 ? discountElement.text().trim() : "";

      const imageUrl = $(element).find("img").attr("src");

      const uniqueKey = `${name}-${price}`;
      if (!productsSet.has(uniqueKey)) {
        productsSet.add(uniqueKey);
        products.push({
          name,
          price,
          discount,
          imageUrl,
        });
      }
    });

    // Filter out products without name, price, or image
    const filteredProducts = products.filter(
      (p) => p.name && p.price && p.imageUrl
    );

    return NextResponse.json({ products: filteredProducts });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}
