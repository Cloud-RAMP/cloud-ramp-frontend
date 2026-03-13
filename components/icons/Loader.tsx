import styles from "./Loader.module.css"

type LoaderProps = {
    type?: "circle" | "dots",
}

export default function Loader({ type = "circle" }: LoaderProps) {
    if (type == "dots") {
        return (
            <div className="w-full grid place-items-center">
                <div className={styles["dot-loader"]} />
            </div>
        );
    }

    return (
        <div className="w-full grid place-items-center">
            <div className={styles["circle-loader"]}></div>
        </div>
    );
}