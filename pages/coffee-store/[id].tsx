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

export default function CoffeeStore({ coffeeStore }: CoffeeStoreProps) {
    const { isFallback } = useRouter();

    const handleUpvoteButton = () => {};

    if (isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.layout}>
                <Head>
                    <title>{coffeeStore.name}</title>
                </Head>
                <div className={styles.container}>
                    <div className={styles.col1}>
                        <div className={styles.backToHomeLink}>
                            <Link href="/" legacyBehavior>
                                <a>← Back to home</a>
                            </Link>
                        </div>
                        <div className={styles.nameWrapper}>
                            <p className={styles.name}>{coffeeStore.name}</p>
                        </div>
                        <Image
                            src={
                                coffeeStore.imgUrl ||
                                coffeeStoresDummy[0].imgUrl
                            }
                            width={600}
                            height={300}
                            alt={coffeeStore.name}
                            style={{ objectFit: "cover" }}
                            className={styles.storeImg}
                        />
                    </div>
                    <div className={classnames("glass", styles.col2)}>
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/icons/places.svg"
                                width="24"
                                height="24"
                                alt=""
                            />
                            <p className={styles.text}>
                                {coffeeStore.location.address}
                            </p>
                        </div>
                        {coffeeStore.location.neighborhood && (
                            <div className={styles.iconWrapper}>
                                <Image
                                    src="/static/icons/nearMe.svg"
                                    width="24"
                                    height="24"
                                    alt=""
                                />
                                <p className={styles.text}>
                                    {coffeeStore.location?.neighborhood?.[0]}
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
