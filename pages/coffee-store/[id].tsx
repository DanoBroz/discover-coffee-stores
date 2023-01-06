import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { CoffeeStore } from "..";
import coffeeStoresData from "../../data/coffee-stores.json";

interface CoffeeStoreProps {
    coffeeStore: CoffeeStore;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: {
            coffeeStore: coffeeStoresData.find(
                (coffeeStore) => coffeeStore.id === Number(params?.id)
            ),
        },
    };
};

export const getStaticPaths = async () => {
    const paths = coffeeStoresData.map((coffeeStore) => ({
        params: { id: coffeeStore.id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
};

export default function CoffeeStore({ coffeeStore }: CoffeeStoreProps) {
    const { isFallback } = useRouter();
    const { address, name, neighbourhood } = coffeeStore;

    if (isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <Head>
                    <title>{name}</title>
                </Head>
                <Link href="/" legacyBehavior>
                    <a>Back to home</a>
                </Link>
                <p>{address}</p>
                <p>{name}</p>
                <p>{neighbourhood}</p>
            </div>
        </>
    );
}
