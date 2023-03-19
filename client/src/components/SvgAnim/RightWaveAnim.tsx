import anime from 'animejs/lib/anime.es.js';
import { SVGProps, useEffect, useRef } from 'react';

const svgPaths = {
  firstWave: {
    start:
      'M0 270C-18.9 247.9 -37.7 225.7 -58.2 217.3C-78.7 208.9 -100.8 214.3 -122.5 212.2C-144.2 210 -165.4 200.4 -187.4 187.4C-209.4 174.4 -232.2 158.1 -233.8 135C-235.4 111.9 -215.8 82.1 -218.3 58.5C-220.8 34.9 -245.4 17.4 -270 0L0 0Z',
    end: 'M 0 351 C -40 352.3 -80 353.5 -108.5 333.8 C -123.65 323.328 -135.55 306.922 -147.265 289.974 C -157.588 275.04 -167.768 259.685 -179.9 247.6 C -205.7 221.7 -240.3 210.8 -257.3 186.9 C -274.2 163.1 -273.6 126.3 -286.3 93 C -299 59.7 -325 29.9 -351 0 L 0 0 L 0 351 Z',
  },
  secondWave: {
    start:
      'M0 216C-15.1 198.3 -30.2 180.6 -46.6 173.9C-63 167.2 -80.7 171.5 -98 169.7C-115.3 168 -132.3 160.3 -149.9 149.9C-167.5 139.5 -185.8 126.5 -187.1 108C-188.3 89.5 -172.6 65.7 -174.6 46.8C-176.6 27.9 -196.3 13.9 -216 0L0 0Z',
    end: 'M 0 280.8 C -32 281.8 -64 282.8 -86.8 267.1 C -98.92 258.701 -108.441 245.554 -117.81 231.971 C -126.066 220.003 -134.204 207.696 -143.9 198 C -164.6 177.4 -192.2 168.6 -205.8 149.5 C -219.4 130.5 -218.9 101.1 -229 74.4 C -239.2 47.8 -260 23.9 -280.8 0 L 0 0 L 0 280.8 Z',
  },
  thirdWave: {
    start:
      'M0 162C-11.3 148.7 -22.6 135.4 -34.9 130.4C-47.2 125.4 -60.5 128.6 -73.5 127.3C-86.5 126 -99.2 120.2 -112.4 112.4C-125.6 104.6 -139.3 94.8 -140.3 81C-141.3 67.2 -129.5 49.3 -131 35.1C-132.5 20.9 -147.2 10.5 -162 0L0 0Z',
    end: 'M 0 210.6 C -24 211.4 -48 212.1 -65.1 200.3 C -74.19 194.027 -81.33 184.166 -88.354 173.975 C -94.542 164.996 -100.64 155.76 -107.9 148.5 C -123.4 133 -144.2 126.5 -154.4 112.1 C -164.5 97.8 -164.2 75.8 -171.8 55.8 C -179.4 35.8 -195 17.9 -210.6 0 L 0 0 L 0 210.6 Z',
  },
  fourthWave: {
    start:
      'M0 108C-7.5 99.1 -15.1 90.3 -23.3 86.9C-31.5 83.6 -40.3 85.7 -49 84.9C-57.7 84 -66.1 80.1 -75 75C-83.8 69.8 -92.9 63.2 -93.5 54C-94.2 44.8 -86.3 32.8 -87.3 23.4C-88.3 13.9 -98.2 7 -108 0L0 0Z',
    end: 'M 0 140.4 C -16 140.9 -32 141.4 -43.4 133.5 C -49.202 129.479 -53.813 123.308 -58.3 116.845 C -62.629 110.611 -66.843 104.107 -71.9 99 C -82.3 88.7 -96.1 84.3 -102.9 74.8 C -109.7 65.2 -109.4 50.5 -114.5 37.2 C -119.6 23.9 -130 11.9 -140.4 0 L 0 0 L 0 140.4 Z',
  },
  fifthWave: {
    start:
      'M0 54C-3.8 49.6 -7.5 45.1 -11.6 43.5C-15.7 41.8 -20.2 42.9 -24.5 42.4C-28.8 42 -33.1 40.1 -37.5 37.5C-41.9 34.9 -46.4 31.6 -46.8 27C-47.1 22.4 -43.2 16.4 -43.7 11.7C-44.2 7 -49.1 3.5 -54 0L0 0Z',
    end: 'M 0 70.2 C -8 70.5 -16 70.7 -21.7 66.8 C -24.601 64.764 -26.906 61.667 -29.156 58.43 C -31.327 55.307 -33.446 52.054 -36 49.5 C -41.1 44.3 -48.1 42.2 -51.5 37.4 C -54.8 32.6 -54.7 25.3 -57.3 18.6 C -59.8 11.9 -65 6 -70.2 0 L 0 0 L 0 70.2 Z',
  },
};

type Props = {
  duration?: number;
} & SVGProps<SVGSVGElement>;

const RightWaveAnim = ({ duration = 20000, ...svgProps }: Props) => {
  const firstWave = useRef(null);
  const secondWave = useRef(null);
  const thirdWave = useRef(null);
  const fourthWave = useRef(null);
  const fifthWave = useRef(null);

  useEffect(() => {
    const timelineOffset = 0;
    const timeline = anime.timeline({
      easing: 'easeInOutQuad',
      duration: duration,
      loop: true,
    });

    timeline
      .add({
        targets: firstWave.current,
        d: [{ value: svgPaths.firstWave.end }, { value: svgPaths.firstWave.start }],
      })
      .add(
        {
          targets: secondWave.current,
          d: [{ value: svgPaths.secondWave.end }, { value: svgPaths.secondWave.start }],
        },
        timelineOffset,
      )
      .add(
        {
          targets: thirdWave.current,
          d: [{ value: svgPaths.thirdWave.end }, { value: svgPaths.thirdWave.start }],
        },
        timelineOffset,
      )
      .add(
        {
          targets: fourthWave.current,
          d: [{ value: svgPaths.fourthWave.end }, { value: svgPaths.fourthWave.start }],
        },
        timelineOffset,
      )
      .add(
        {
          targets: fifthWave.current,
          d: [{ value: svgPaths.fifthWave.end }, { value: svgPaths.fifthWave.start }],
        },
        timelineOffset,
      );
  }, []);

  return (
    <svg
      id="visual"
      viewBox="0 0 960 540"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      {...svgProps}
    >
      <defs>
        <linearGradient id="grad1_0" x1="43.8%" y1="0%" x2="100%" y2="100%">
          <stop offset="14.444444444444446%" stopColor="#3182ce" stopOpacity="1"></stop>
          <stop offset="85.55555555555554%" stopColor="#3182ce" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad1_1" x1="43.8%" y1="0%" x2="100%" y2="100%">
          <stop offset="14.444444444444446%" stopColor="#3182ce" stopOpacity="1"></stop>
          <stop offset="85.55555555555554%" stopColor="#749fdb" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad1_2" x1="43.8%" y1="0%" x2="100%" y2="100%">
          <stop offset="14.444444444444446%" stopColor="#a6bee7" stopOpacity="1"></stop>
          <stop offset="85.55555555555554%" stopColor="#749fdb" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad1_3" x1="43.8%" y1="0%" x2="100%" y2="100%">
          <stop offset="14.444444444444446%" stopColor="#a6bee7" stopOpacity="1"></stop>
          <stop offset="85.55555555555554%" stopColor="#d3def3" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad1_4" x1="43.8%" y1="0%" x2="100%" y2="100%">
          <stop offset="14.444444444444446%" stopColor="#ffffff" stopOpacity="1"></stop>
          <stop offset="85.55555555555554%" stopColor="#d3def3" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad2_0" x1="0%" y1="0%" x2="56.3%" y2="100%">
          <stop offset="14.444444444444446%" stopColor="#3182ce" stopOpacity="1"></stop>
          <stop offset="85.55555555555554%" stopColor="#3182ce" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad2_1" x1="0%" y1="0%" x2="56.3%" y2="100%">
          <stop offset="14.444444444444446%" stopColor="#749fdb" stopOpacity="1"></stop>
          <stop offset="85.55555555555554%" stopColor="#3182ce" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad2_2" x1="0%" y1="0%" x2="56.3%" y2="100%">
          <stop offset="14.444444444444446%" stopColor="#749fdb" stopOpacity="1"></stop>
          <stop offset="85.55555555555554%" stopColor="#a6bee7" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad2_3" x1="0%" y1="0%" x2="56.3%" y2="100%">
          <stop offset="14.444444444444446%" stopColor="#d3def3" stopOpacity="1"></stop>
          <stop offset="85.55555555555554%" stopColor="#a6bee7" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad2_4" x1="0%" y1="0%" x2="56.3%" y2="100%">
          <stop offset="14.444444444444446%" stopColor="#d3def3" stopOpacity="1"></stop>
          <stop offset="85.55555555555554%" stopColor="#ffffff" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <g transform="translate(960, 0)">
        <path d={svgPaths.firstWave.start} fill="#e9eef9" ref={firstWave}></path>
        <path d={svgPaths.secondWave.start} fill="#bdceed" ref={secondWave}></path>
        <path d={svgPaths.thirdWave.start} fill="#8eafe1" ref={thirdWave}></path>
        <path d={svgPaths.fourthWave.start} fill="#5891d4" ref={fourthWave}></path>
        <path d={svgPaths.fifthWave.start} fill="#3182ce" ref={fifthWave}></path>
      </g>
    </svg>
  );
};

export default RightWaveAnim;
