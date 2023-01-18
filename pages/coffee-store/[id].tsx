import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import type { CoffeeStore } from "..";

import styles from "../../styles/coffee-store.module.css";
import classnames from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import coffeeStoresDummy from "../../data/coffee-stores.json";
import { useContext, useEffect, useState } from "react";
import { isEmpty } from "../../utils";
import { StoreContext } from "../../store/store-context";

interface CoffeeStoreProps {
    coffeeStore: CoffeeStore;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const coffeeStores = await fetchCoffeeStores();

    const findCoffeeStoreById = coffeeStores.find(
        (coffeStore) => coffeStore.id === params?.id
    );

    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
        },
    };
};

export const getStaticPaths = async () => {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore) => ({
        params: { id: coffeeStore.id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
};

export default function CoffeeStore(initialProps: CoffeeStoreProps) {
    const { isFallback, query } = useRouter();
    const {
        state: { coffeeStores },
    } = useContext(StoreContext);

    const [coffeeStore, setCoffeeStore] = useState<CoffeeStore | undefined>(
        initialProps.coffeeStore
    );

    const handleUpvoteButton = () => {};

    if (isFallback) {
        return <div>Loading...</div>;
    }

    const id = query.id;

    const handleCreateCoffeeStore = async (coffeeStore: CoffeeStore) => {
        try {
            const {
                id,
                name,
                imgUrl,
                location: { address, neighborhood },
            } = coffeeStore;
            const response = await fetch("/api/createCoffeeStore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    name,
                    imgUrl,
                    voting: 0,
                    neighborhood: neighborhood || "",
                    address: address || "",
                }),
            });

            const dbCoffeeStore = response.json();
            console.log({ dbCoffeeStore });
        } catch (error) {
            console.error("Error creating coffee store", error);
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (isEmpty(initialProps.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const coffeeStoreFromContext = coffeeStores.find(
                    (coffeeStore) => coffeeStore.id === id
                );
                if (coffeeStoreFromContext) {
                    setCoffeeStore(coffeeStoreFromContext);
                    handleCreateCoffeeStore(coffeeStoreFromContext);
                }
            }
        } else {
            handleCreateCoffeeStore(initialProps.coffeeStore);
        }
    }, [coffeeStores, id, initialProps.coffeeStore]);

    return (
        <>
            <div className={styles.layout}>
                <Head>
                    <title>{coffeeStore?.name}</title>
                </Head>
                <div className={styles.container}>
                    <div className={styles.col1}>
                        <div className={styles.backToHomeLink}>
                            <Link href="/" legacyBehavior>
                                <a>← Back to home</a>
                            </Link>
                        </div>
                        <div className={styles.nameWrapper}>
                            <p className={styles.name}>{coffeeStore?.name}</p>
                        </div>
                        <Image
                            src={
                                coffeeStore?.imgUrl ||
                                coffeeStoresDummy[0].imgUrl
                            }
                            width={600}
                            height={300}
                            alt={coffeeStore?.name || "coffee store"}
                            style={{ objectFit: "cover" }}
                            className={styles.storeImg}
                        />
                    </div>
                    <div className={classnames("glass", styles.col2)}>
                        {coffeeStore?.location?.address && (
                            <div className={styles.iconWrapper}>
                                <Image
                                    src="/static/icons/places.svg"
                                    width="24"
                                    height="24"
                                    alt=""
                                />
                                <p className={styles.text}>
                                    {coffeeStore?.location?.address}
                                </p>
                            </div>
                        )}
                        {coffeeStore?.location?.neighborhood && (
                            <div className={styles.iconWrapper}>
                                <Image
                                    src="/static/icons/nearMe.svg"
                                    width="24"
                                    height="24"
                                    alt=""
                                />
                                <p className={styles.text}>
                                    {coffeeStore?.location?.neighborhood?.[0]}
                                </p>
                            </div>
                        )}
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/icons/star.svg"
                                width="24"
                                height="24"
                                alt=""
                            />
                            <p className={styles.text}>1</p>
                        </div>

                        <button
                            className={styles.upvoteButton}
                            onClick={handleUpvoteButton}
                        >
                            Up vote!
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
