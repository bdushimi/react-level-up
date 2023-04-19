import Head from "next/head";

import Layout from "@components/Layout";
import Header from "@components/Header";
import Container from "@components/Container";
import Button from "@components/Button";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import styles from "@styles/Product.module.scss";

export default function Product({ product }) {
  return (
    <Layout>
      <Head>
        <title>{product.name}</title>
        <meta
          name="description"
          content={`Find ${product.name} at Space Jelly Gear`}
        />
      </Head>

      <Container>
        <div className={styles.productWrapper}>
          <div className={styles.productImage}>
            <img
              width={product.image.width}
              height={product.image.height}
              src={product.image.url}
              alt=""
            />
          </div>
          <div className={styles.productContent}>
            <h1>{product.name}</h1>
            <div className={styles.productDescription}>
              <p>{product.description?.text}</p>
            </div>
            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productBuy}>
              <Button
                className="snipcart-add-item"
                data-item-id={product.id}
                data-item-price={product.price}
                data-item-description={product.description?.text}
                data-item-image={product.image.url}
                data-item-name={product.name}
                data-item-url={`/products/${product.slug}`}
              >
                Add to Cart
              </Button>
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clfr5ad9o0s9901uob5ytbrp4/master",
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
      query PageProduct($slug: String = "") {
        product(where: { slug: $slug }) {
          id
          name
          price
          description {
            text
          }
          image {
            url
            height
            width
          }
          slug
        }
      }
    `,
    variables: {
      slug: params.productSlug,
    },
  });

  const product = data.data.product;

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clfr5ad9o0s9901uob5ytbrp4/master",
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
      query PageProducts {
        products {
          name
          price
          slug
          image {
            height
            width
            url
          }
        }
      }
    `,
  });

  const paths = data.data.products.map((product) => {
    return {
      params: {
        productSlug: product.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
