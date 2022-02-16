import { NextSeo } from "next-seo";

import { ProductDetailsFragment } from "@/saleor/api";

interface ProductPageSeoProps {
  product: ProductDetailsFragment;
}

export const ProductPageSeo = ({ product }: ProductPageSeoProps) => {
  const title = `${product?.seoTitle} - Newmarket at Freedom Harvest`;
  const description =
    product?.seoDescription || "Welcome to Newmarket at Freedom Harvest storefront.";
  const thumbnailUrl = product.thumbnail?.url || "";
  const thumbnailAlt = product.thumbnail?.alt || title;

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images: [
          {
            url: thumbnailUrl,
            alt: thumbnailAlt,
          },
        ],
        site_name: "Newmarket at Freedom Harvest",
      }}
    />
  );
};

export default ProductPageSeo;
