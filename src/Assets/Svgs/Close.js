import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={13.913}
            height={13.912}
            viewBox="0 0 13.913 13.912"
            {...props}
        >
            <Path
                data-name="close (1)"
                d="M8.231 7.092l5.417-5.417A.9.9 0 0012.374.4L6.956 5.818 1.539.4A.9.9 0 00.264 1.675l5.418 5.417L.264 12.51a.9.9 0 101.275 1.275l5.417-5.418 5.417 5.417a.9.9 0 101.275-1.275zm0 0"
                transform="translate(0 -.136)"
                fill="#d7dbe6"
            />
        </Svg>
    )
}

export default SvgComponent
