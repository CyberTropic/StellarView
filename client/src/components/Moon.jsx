import React, { Component } from "react";
import styled from "styled-components";
import MoonDisplay from "./MoonDisplay";

//moon images, in proper order
import newMoon from "./style/Media/Moon/moon-phase-new.svg";
import waxingCrescent from "./style/Media/Moon/moon-phase-waxingcrescent.svg";
import firstQuarter from "./style/Media/Moon/moon-phase-firstquarter.svg";
import waxingGibbous from "./style/Media/Moon/moon-phase-waxinggibbous.svg";
import fullMoon from "./style/Media/Moon/moon-phase-full.svg";
import waningGibbous from "./style/Media/Moon/moon-phase-waninggibbous.svg";
import lastQuarter from "./style/Media/Moon/moon-phase-lastquarter.svg";
import waningCrescent from "./style/Media/Moon/moon-phase-waningcrescent.svg";
import testMoon from "./style/Media/Moon/untitled.svg";
class Moon extends Component {
	state = {};

	renderMoonData() {
		function inRange(x, min, max) {
			return (x - min) * (x - max) <= 0;
		}

		let phase = this.props.moon * 100;

		var phaseScale = 1,
			phaseTrans = 100,
			phaseRight = 0,
			phaseFlip = 1;

		if (phase > 50) {
			phase = 100 - phase;
			phaseFlip = -1;
		}

		if (phase <= 25) {
			phaseRight = 1 - phase / 25;
		}

		if (phase >= 25 && phase <= 50) {
			phaseScale = 1 - (phase - 25) / 25;
			phaseTrans = 100 * phaseScale;
		}

		return (
			<MoonSVGStyle
				phaseScale={phaseScale}
				phaseTrans={phaseTrans}
				phaseRight={phaseRight}
				phaseFlip={phaseFlip}
			>
				<div class="moon">
					<svg
						class="moon-left"
						viewBox="0 0 100 200"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="100"
							cy="100"
							r="99"
							stroke="whitesmoke"
							fill="whitesmoke"
							class="bg"
						/>
						<circle
							cx="100"
							cy="100"
							r="99"
							stroke="whitesmoke"
							fill="#121414"
							class="fg"
						/>
					</svg>
					<svg
						class="moon-right"
						viewBox="0 0 100 200"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="0"
							cy="100"
							r="99"
							stroke="whitesmoke"
							fill="whitesmoke"
							class="bg"
						/>
						<circle
							cx="0"
							cy="100"
							r="99"
							stroke="whitesmoke"
							fill="#121414"
							class="fg"
						/>
					</svg>
				</div>
			</MoonSVGStyle>
		);

		// if (this.props.parkList.length > 0) {
		// 	var moonDataString = "";
		// 	var moonIllum = this.props.moon;
		// 	moonIllum = Math.round(moonIllum * 100) / 100;
		// 	var moonType = this.props.moonType;
		// 	var moonSVG;
		// 	console.log("MOON AVG NUMBER IS: "+moonIllum)
		// 	// moonDataString = `The moon is ${moonType}, meaning it is ${moonIllum}% illuminated.`;
		// 	// console.log("IN MOON.JSX:" ,moonDataString)
		// 	//8 phases, 0/1 is peak new moon and 0.5 is full moon, so:
		// 	//Length of phase => 1/8= 0.125
		// 	//New moon start => 0-(0.125/2)=-0.0625 >> 0.9375
		// 	//New moon end => 0+0.0625 >> 0.0625
		// 	//etc...
		// 	if (
		// 		inRange(moonIllum, 0.9375, 1) ||
		// 		inRange(moonIllum, 0, 0.0625)
		// 	) {
		// 		moonSVG = newMoon;
		// 	} else if (inRange(moonIllum, 0.0625, 0.1875)) {
		// 		moonSVG = waxingCrescent;
		// 	} else if (inRange(moonIllum, 0.1875, 0.3125)) {
		// 		moonSVG = firstQuarter;
		// 	} else if (inRange(moonIllum, 0.3125, 0.4375)) {
		// 		moonSVG = waxingGibbous;
		// 	} else if (inRange(moonIllum, 0.4375, 0.5625)) {
		// 		moonSVG = fullMoon;
		// 	} else if (inRange(moonIllum, 0.5625, 0.6875)) {
		// 		moonSVG = waningGibbous;
		// 	} else if (inRange(moonIllum, 0.6875, 0.8125)) {
		// 		moonSVG = lastQuarter;
		// 	} else if (inRange(moonIllum, 0.8125, 0.9375)) {
		// 		moonSVG = waningCrescent;
		// 	} else {
		// 		console.console.warn("Moon value error");
		// 		moonSVG = newMoon;
		// 	}

		// 	return <MoonStyle src={moonSVG} alt="Moon phase" />;
		// }
	}

	render() {
		return (
			<MoonStyle>
				<div className="moonDisplay">
					<span>{this.props.moonType.split(" ")[0]}</span>
					<span>
						<MoonDisplay phase={this.props.moon} />
					</span>
					<span>{this.props.moonType.split(" ")[1]}</span>
				</div>
			</MoonStyle>
		);
	}
}

export default Moon;
///////////////////////////////////////////////////////////////
const MoonStyle = styled.div`
	color: whitesmoke;
	font-family: Barlow;
	font-weight: 300;
	font-style: normal;
	font-size: 30px;
	text-align: center;
	text-transform: uppercase;

	.moonDisplay {
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		align-content: space-between;
	}
`;

const MoonSVGStyle = styled.div`
	.moon {
		width: 90px;
		/* margin: 2rem auto; */
		transform: scaleX(${props => props.phaseFlip});
	}
	.moon-left,
	.moon-right {
		display: inline-block;
		width: 50%;
		position: relative;
		margin: 0;
	}
	.moon-left .bg,
	.moon-right .bg {
		stroke-width: 2px;
	}
	.moon-right .fg {
		stroke-width: 2px;
		transform: scaleX(${props => props.phaseRight});
	}
	.moon-left .bg {
		fill: #121414;
	}
	.moon-left .fg {
		fill: whitesmoke;
		transform-origin: 0% 0%;
		transform: translate(${props => props.phaseTrans}px, 0)
			scaleX(${props => 1 - props.phaseScale});
	}
`;
