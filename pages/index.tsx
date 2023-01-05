import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner";
import type { MouseEvent } from "react";
import Image from "next/image";
import Card from "../components/Card";
import coffeeStores from "../data/coffee-stores.json";
import { GetStaticProps } from "next";

interface CoffeeStore {
    id: number;
    name: string;
    imgUrl: string;
    websiteUrl: string;
    address: string;
    neighbourhood: string;
}

interface HomeProps {
    coffeeStores: CoffeeStore[];
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            coffeeStores,
        },
    };
};

export default function Home(props: HomeProps) {
    const { coffeeStores } = props;
    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        console.log("You clicked the button!");
    };

    console.log(props);

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
                <div className={styles.cardLayout}>
                    {coffeeStores.map((store) => (
                        <Card
                            key={String(store.id)}
                            name={store.name}
                            imageUrl={store.imgUrl}
                            href={`/coffee-store/${store.id}`}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}
