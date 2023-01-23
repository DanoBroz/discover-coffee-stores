export const isEmpty = (obj: Object) => {
    return Object.keys(obj).length === 0;
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
