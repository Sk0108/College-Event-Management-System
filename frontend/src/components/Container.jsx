import { useEffect, useRef } from "react";

export default function CardContainer({ children }) {
    const container = useRef(null);
    const styles = {
        marginTop: '30px',
        marginBottom: '30px',
        display: "flex",
        height: "30vh",
        width: "90vw",
        justifyContent: "space-between",
        alignItems: "center",
    };

    const allChildren = Array.isArray(children) ? children : [children];
    const clonedChildren = [...allChildren, ...allChildren];

    const handleNextClick = () => {
        if (container.current) {
            container.current.scrollBy({
                left: container.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };
    const handlePrevClick = () => {
        if (container.current) {
            container.current.scrollBy({
                left: -container.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const scrollContainer = container.current;
        if (!scrollContainer) return;
        const scrollStep = 2;

        const intervalId = setInterval(() => {
            // If we've scrolled past the first set, reset instantly to the start
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                scrollContainer.scrollLeft = 0; // INSTANT jump, not smooth
            } else {
                scrollContainer.scrollBy({
                    left: scrollStep,
                    behavior: 'auto'
                });
            }
        }, 20);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={styles}>
            <button onClick={handlePrevClick} style={{ fontSize: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>&#8592;</button>
            <div
                id="container"
                style={{
                    position: "relative",
                    overflowX: "scroll",
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    scrollbarWidth: "none", 
                    msOverflowStyle: "none" 
                }}
                ref={container}
            >
                {clonedChildren}
            </div>
            <button onClick={handleNextClick} style={{ fontSize: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>&#8594;</button>
            <style>
                {`
                #container::-webkit-scrollbar {
                    display: none;
                }
                `}
            </style>
        </div>
    );
}