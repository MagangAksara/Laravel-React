import { useCallback, useEffect, useRef, useState } from "react";

export default function useLoaderCardCars(fetchUrl, delay = 5000) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef(null);
    const observerRef = useRef(null);
    const lastFetchTime = useRef(0);

    const fetchMore = async (page = 1) => {
        const now = Date.now();
        if (now - lastFetchTime.current < delay) return; // throttle
        lastFetchTime.current = now;

        setLoading(true);
        try {
            const res = await fetch(`${fetchUrl}?page=${page}`);
            const json = await res.json();

            setData((prev) => (page === 1 ? json.data : [...prev, ...json.data]));
            setCurrentPage(json.current_page);
            setLastPage(json.last_page);
        } catch (e) {
            console.error("Failed to load cars:", e);
        } finally {
            setTimeout(() => setLoading(false), delay); // slight delay to show loading state
        }
    };

    // pertama kali load
    useEffect(() => {
        fetchMore(1);
    }, []);

    // Intersection Observer
    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting && !loading && currentPage < lastPage) {
                fetchMore(currentPage + 1);
            }
        },
        [loading, currentPage, lastPage]
    );

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 0,
        });

        if (loaderRef.current && currentPage < lastPage) {
            observerRef.current.observe(loaderRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [handleObserver, currentPage, lastPage]);

    return { data, loading, currentPage, lastPage, loaderRef };
}
