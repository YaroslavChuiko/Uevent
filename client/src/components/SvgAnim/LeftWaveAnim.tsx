import anime from 'animejs/lib/anime.es.js';
import { SVGProps, useEffect, useRef } from 'react';

const svgPaths = {
  firstWave: {
    start:
      'M0 -270C19.2 -248.5 38.4 -227.1 58 -216.4C77.5 -205.7 97.4 -205.8 115 -199.2C132.6 -192.6 147.8 -179.3 169 -169C190.2 -158.7 217.5 -151.3 233.8 -135C250.2 -118.7 255.6 -93.6 259.8 -69.6C264 -45.6 267 -22.8 270 0L0 0Z',
    end: 'M 0 -351 C 36.9 -346.3 73.7 -341.6 107.2 -330 C 122.71 -324.629 137.514 -317.801 152.165 -310.021 C 169.158 -300.997 185.947 -290.694 203.4 -279.9 C 235.8 -259.8 270.6 -238.2 284 -206.3 C 297.3 -174.5 289.1 -132.5 296.7 -96.4 C 304.3 -60.3 327.7 -30.2 351 0 L 0 0 L 0 -351 Z',
  },
  secondWave: {
    start:
      'M0 -216C15.4 -198.8 30.7 -181.6 46.4 -173.1C62 -164.5 78 -164.6 92 -159.3C106 -154.1 118.2 -143.5 135.2 -135.2C152.2 -126.9 174 -121 187.1 -108C200.1 -95 204.5 -74.9 207.9 -55.7C211.2 -36.5 213.6 -18.3 216 0L0 0Z',
    end: 'M 0 -280.8 C 29.5 -277 59 -273.3 85.8 -264 C 98.425 -259.666 110.452 -254.089 122.36 -247.719 C 135.729 -240.567 148.949 -232.415 162.7 -223.9 C 188.7 -207.9 216.5 -190.5 227.2 -165.1 C 237.8 -139.6 231.3 -106 237.4 -77.1 C 243.5 -48.3 262.1 -24.1 280.8 0 L 0 0 L 0 -280.8 Z',
  },
  thirdWave: {
    start:
      'M0 -162C11.5 -149.1 23.1 -136.2 34.8 -129.8C46.5 -123.4 58.5 -123.5 69 -119.5C79.5 -115.6 88.7 -107.6 101.4 -101.4C114.1 -95.2 130.5 -90.8 140.3 -81C150.1 -71.2 153.4 -56.2 155.9 -41.8C158.4 -27.4 160.2 -13.7 162 0L0 0Z',
    end: 'M 0 -210.6 C 22.1 -207.8 44.2 -205 64.3 -198 C 73.447 -194.86 82.18 -190.85 90.819 -186.281 C 101.164 -180.811 111.374 -174.539 122 -168 C 141.5 -155.9 162.4 -142.9 170.4 -123.8 C 178.4 -104.7 173.5 -79.5 178 -57.8 C 182.6 -36.2 196.6 -18.1 210.6 0 L 0 0 L 0 -210.6 Z',
  },
  fourthWave: {
    start:
      'M0 -108C7.7 -99.4 15.4 -90.8 23.2 -86.5C31 -82.3 39 -82.3 46 -79.7C53 -77 59.1 -71.7 67.6 -67.6C76.1 -63.5 87 -60.5 93.5 -54C100.1 -47.5 102.2 -37.4 103.9 -27.8C105.6 -18.3 106.8 -9.1 108 0L0 0Z',
    end: 'M 0 -140.4 C 14.7 -138.5 29.5 -136.6 42.9 -132 C 49.095 -129.874 55.011 -127.149 60.858 -124.043 C 67.658 -120.43 74.363 -116.302 81.3 -112 C 94.3 -103.9 108.3 -95.3 113.6 -82.5 C 118.9 -69.8 115.7 -53 118.7 -38.6 C 121.7 -24.1 131.1 -12.1 140.4 0 L 0 0 L 0 -140.4 Z',
  },
  fifthWave: {
    start:
      'M0 -54C3.8 -49.7 7.7 -45.4 11.6 -43.3C15.5 -41.1 19.5 -41.2 23 -39.8C26.5 -38.5 29.6 -35.9 33.8 -33.8C38 -31.7 43.5 -30.3 46.8 -27C50 -23.7 51.1 -18.7 52 -13.9C52.8 -9.1 53.4 -4.6 54 0L0 0Z',
    end: 'M 0 -70.2 C 7.4 -69.3 14.7 -68.3 21.4 -66 C 24.608 -64.899 27.678 -63.477 30.72 -61.855 C 34.032 -60.089 37.312 -58.085 40.7 -56 C 47.2 -52 54.1 -47.6 56.8 -41.3 C 59.5 -34.9 57.8 -26.5 59.3 -19.3 C 60.9 -12.1 65.5 -6 70.2 0 L 0 0 L 0 -70.2 Z',
  },
};

type Props = {
  duration?: number;
} & SVGProps<SVGSVGElement>;

const LeftWaveAnim = ({ duration = 20000, ...svgProps }: Props) => {
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
      <g transform="translate(0, 540)">
        <path d={svgPaths.firstWave.start} fill="#e9eef9" ref={firstWave}></path>
        <path d={svgPaths.secondWave.start} fill="#bdceed" ref={secondWave}></path>
        <path d={svgPaths.thirdWave.start} fill="#8eafe1" ref={thirdWave}></path>
        <path d={svgPaths.fourthWave.start} fill="#5891d4" ref={fourthWave}></path>
        <path d={svgPaths.fifthWave.start} fill="#3182ce" ref={fifthWave}></path>
      </g>
    </svg>
  );
};

export default LeftWaveAnim;
