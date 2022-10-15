import { css } from "@emotion/react"
import Link from "next/link"


function About() {
    return (
        <>
            <h2>/about</h2>
            <div>
                <p>core packages</p>
                <div>...</div>
                <ul css={css`margin: 0;`}>
                    <li><Link href="https://nextjs.org">nextjs</Link></li>
                    <li><Link href="https://mikro-orm.io">mikro-orm</Link></li>
                </ul>
            </div>
        </>
    )
}

export default About
