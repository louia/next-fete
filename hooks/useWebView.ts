import { useEffect, useState } from "react";

export default function useWebView() {
    const [isWebView, setWebView] = useState<boolean>(false);
    function isInWebView() {
        var userAgent = window.navigator.userAgent.toLowerCase(),
            safari = /safari/.test(userAgent),
            ios = /iphone|ipod|ipad/.test(userAgent);

        if (ios) {
            return !safari;
        }

        return userAgent.includes('wv');
    }

    useEffect(() => {
        if (isInWebView()) {
            setWebView(true);
        }
    }, []);

    return isWebView;
}