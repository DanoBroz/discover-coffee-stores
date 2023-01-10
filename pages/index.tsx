import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner";
import type { MouseEvent } from "react";
import Image from "next/image";
import Card from "../components/Card";
import coffeeStoresDummy from "../data/coffee-stores.json";
import { GetStaticProps } from "next";
import { fetchCoffeeStores } from "../lib/coffee-stores";

export interface CoffeeStore {
    id: string;
    name: string;
    imgUrl: string;
    websiteUrl: string;
    location: {
        address: string;
        neighborhood: string[];
    };
}

interface HomeProps {
    coffeeStores: CoffeeStore[];
}

export const getStaticProps: GetStaticProps = async (context) => {
    const coffeeStoresData = await fetchCoffeeStores();

    return {
        props: {
            coffeeStores: coffeeStoresData,
        },
    };
};

export default function Home(props: HomeProps) {
    const { coffeeStores } = props;
    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        console.log("You clicked the button!");
    };

    return (
        <>
            <Head>
                <title>Coffee Connoisseur</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Banner
                    buttonText="View stores nearby"
                    buttonFunction={handleClick}
                />
                <Image
                    src="/static/hero-image.png"
                    width={700}
                    height={400}
                    alt="hero - girl with coffee sitting on clouds"
                    className={styles.heroImage}
                />
                {coffeeStores.length && (
                    <>
                        <h2 className={styles.heading2}>
                            Ostrava-poruba stores
                        </h2>
                        <div className={styles.cardLayout}>
                            {coffeeStores.map((store) => (
                                <Card
                                    key={store.id}
                                    name={store.name}
                                    imageUrl={
                                        store.imgUrl ||
                                        coffeeStoresDummy[0].imgUrl
                                    }
                                    href={`/coffee-store/${store.id}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </>
    );
}
