import styles from '../styles/Waves.module.css';

export default function Waves() {
    return (
        <>
            <div className={styles['background--custom']}>
                <canvas id='canvas' className={styles.canvas} />
            </div>
        </>
    );
}