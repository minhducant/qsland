import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,
} from "rn-placeholder";
import React from 'react'
export const ListLoading = ({ show }: any) => {
    if (!show) return null;
    return (
        <>
            {[...new Array(10).keys()].map((i, j) =>
                <Placeholder
                    key={j}
                    Animation={Fade}
                    Left={PlaceholderMedia}
                    style={{ padding: 10 }}
                >
                    <PlaceholderLine width={30} />
                    <PlaceholderLine width={80} />
                    <PlaceholderLine />
                </Placeholder>
            )}
        </>
    );
};
