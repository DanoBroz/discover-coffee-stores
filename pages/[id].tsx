import Head from "next/head";
import { useRouter } from "next/router";

export default function Dynamic() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{router.query.id}</title>
            </Head>
            <div>
                <h1>Dynamic page: {router.query.id}</h1>
            </div>
        </>
    );
}
