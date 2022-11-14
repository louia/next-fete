import Script from 'next/script';
import styles from '../styles/Waves.module.css';

export default function Waves() {
    return (
        <>
            <div className={styles['background--custom']}>
                <canvas id='canvas' className={styles.canvas} />
            </div>
            <Script
              strategy='afterInteractive'
              src="https://cdn.jsdelivr.net/gh/greentfrapp/pocoloco@minigl/minigl.js"
              id='gradient'
              onLoad={() => {
                // var gradient = new Gradient();
                // gradient.initGradient("#canvas");
              }}
            />
        </>
    );
}