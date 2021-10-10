import * as React from "react"
import Svg, { Defs, G, Ellipse } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={130}
            height={129}
            viewBox="0 0 130 129"
            {...props}
        >
            <Defs></Defs>
            <G
                transform="translate(-1092.5 -167.5) translate(1092.5 167.5)"
                filter="url(#a)"
            >
                <Ellipse
                    data-name={5}
                    cx={27.5}
                    cy={27}
                    rx={27.5}
                    ry={27}
                    transform="translate(37.5 25.5)"
                    fill="#58d4f1"
                />
            </G>
        </Svg>
    )
}

export default SvgComponent
