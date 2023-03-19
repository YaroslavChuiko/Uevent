import anime from 'animejs/lib/anime.es.js';
import { SVGProps, useEffect, useRef } from 'react';

const svgPaths = {
  firstWave: {
    start:
      'M0 7L21.5 8.3C43 9.7 86 12.3 128.8 12.5C171.7 12.7 214.3 10.3 257.2 9.7C300 9 343 10 385.8 10.8C428.7 11.7 471.3 12.3 514.2 12.3C557 12.3 600 11.7 642.8 11.8C685.7 12 728.3 13 771.2 12C814 11 857 8 878.5 6.5L900 5L900 31L878.5 31C857 31 814 31 771.2 31C728.3 31 685.7 31 642.8 31C600 31 557 31 514.2 31C471.3 31 428.7 31 385.8 31C343 31 300 31 257.2 31C214.3 31 171.7 31 128.8 31C86 31 43 31 21.5 31L0 31Z',
    end: 'M0 13L21.5 13.7C43 14.3 86 15.7 128.8 15.5C171.7 15.3 214.3 13.7 257.2 13.2C300 12.7 343 13.3 385.8 14.3C428.7 15.3 471.3 16.7 514.2 16.7C557 16.7 600 15.3 642.8 15.2C685.7 15 728.3 16 771.2 15.7C814 15.3 857 13.7 878.5 12.8L900 12L900 31L878.5 31C857 31 814 31 771.2 31C728.3 31 685.7 31 642.8 31C600 31 557 31 514.2 31C471.3 31 428.7 31 385.8 31C343 31 300 31 257.2 31C214.3 31 171.7 31 128.8 31C86 31 43 31 21.5 31L0 31Z',
  },
  secondWave: {
    start:
      'M0 10L21.5 11.3C43 12.7 86 15.3 128.8 16.7C171.7 18 214.3 18 257.2 17.3C300 16.7 343 15.3 385.8 15C428.7 14.7 471.3 15.3 514.2 15.8C557 16.3 600 16.7 642.8 15.8C685.7 15 728.3 13 771.2 13C814 13 857 15 878.5 16L900 17L900 31L878.5 31C857 31 814 31 771.2 31C728.3 31 685.7 31 642.8 31C600 31 557 31 514.2 31C471.3 31 428.7 31 385.8 31C343 31 300 31 257.2 31C214.3 31 171.7 31 128.8 31C86 31 43 31 21.5 31L0 31Z',
    end: 'M0 21L21.5 21C43 21 86 21 128.8 20.5C171.7 20 214.3 19 257.2 18.8C300 18.7 343 19.3 385.8 19.8C428.7 20.3 471.3 20.7 514.2 20.2C557 19.7 600 18.3 642.8 18.2C685.7 18 728.3 19 771.2 18.8C814 18.7 857 17.3 878.5 16.7L900 16L900 31L878.5 31C857 31 814 31 771.2 31C728.3 31 685.7 31 642.8 31C600 31 557 31 514.2 31C471.3 31 428.7 31 385.8 31C343 31 300 31 257.2 31C214.3 31 171.7 31 128.8 31C86 31 43 31 21.5 31L0 31Z',
  },
  thirdWave: {
    start:
      'M0 15L21.5 15.7C43 16.3 86 17.7 128.8 18.3C171.7 19 214.3 19 257.2 19.2C300 19.3 343 19.7 385.8 19.5C428.7 19.3 471.3 18.7 514.2 18.5C557 18.3 600 18.7 642.8 19C685.7 19.3 728.3 19.7 771.2 19.2C814 18.7 857 17.3 878.5 16.7L900 16L900 31L878.5 31C857 31 814 31 771.2 31C728.3 31 685.7 31 642.8 31C600 31 557 31 514.2 31C471.3 31 428.7 31 385.8 31C343 31 300 31 257.2 31C214.3 31 171.7 31 128.8 31C86 31 43 31 21.5 31L0 31Z',
    end: 'M0 21L21.5 20.8C43 20.7 86 20.3 128.8 20.3C171.7 20.3 214.3 20.7 257.2 20.7C300 20.7 343 20.3 385.8 20.8C428.7 21.3 471.3 22.7 514.2 23.2C557 23.7 600 23.3 642.8 23.2C685.7 23 728.3 23 771.2 22.8C814 22.7 857 22.3 878.5 22.2L900 22L900 31L878.5 31C857 31 814 31 771.2 31C728.3 31 685.7 31 642.8 31C600 31 557 31 514.2 31C471.3 31 428.7 31 385.8 31C343 31 300 31 257.2 31C214.3 31 171.7 31 128.8 31C86 31 43 31 21.5 31L0 31Z',
  },
  fourthWave: {
    start:
      'M0 20L21.5 20.5C43 21 86 22 128.8 22.5C171.7 23 214.3 23 257.2 23C300 23 343 23 385.8 23.5C428.7 24 471.3 25 514.2 24.7C557 24.3 600 22.7 642.8 22.7C685.7 22.7 728.3 24.3 771.2 25C814 25.7 857 25.3 878.5 25.2L900 25L900 31L878.5 31C857 31 814 31 771.2 31C728.3 31 685.7 31 642.8 31C600 31 557 31 514.2 31C471.3 31 428.7 31 385.8 31C343 31 300 31 257.2 31C214.3 31 171.7 31 128.8 31C86 31 43 31 21.5 31L0 31Z',
    end: 'M0 25L21.5 24.7C43 24.3 86 23.7 128.8 23.5C171.7 23.3 214.3 23.7 257.2 24.2C300 24.7 343 25.3 385.8 25.3C428.7 25.3 471.3 24.7 514.2 24.7C557 24.7 600 25.3 642.8 25.7C685.7 26 728.3 26 771.2 25.8C814 25.7 857 25.3 878.5 25.2L900 25L900 31L878.5 31C857 31 814 31 771.2 31C728.3 31 685.7 31 642.8 31C600 31 557 31 514.2 31C471.3 31 428.7 31 385.8 31C343 31 300 31 257.2 31C214.3 31 171.7 31 128.8 31C86 31 43 31 21.5 31L0 31Z',
  },
};

type Props = {
  duration?: number;
} & SVGProps<SVGSVGElement>;

const HorizontalWavesAnim = ({ duration = 6000, ...svgProps }: Props) => {
  const firstWave = useRef(null);
  const secondWave = useRef(null);
  const thirdWave = useRef(null);
  const fourthWave = useRef(null);

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
      );
  }, []);

  return (
    <svg
      id="visual"
      viewBox="0 0 900 30"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      {...svgProps}
    >
      <g>
        <path d={svgPaths.firstWave.start} ref={firstWave} fill="#2c5282"></path>
        <path d={svgPaths.secondWave.start} ref={secondWave} fill="#30619a"></path>
        <path d={svgPaths.thirdWave.start} ref={thirdWave} fill="#3271b4"></path>
        <path d={svgPaths.fourthWave.start} ref={fourthWave} fill="#3182ce"></path>
      </g>
    </svg>
  );
};

export default HorizontalWavesAnim;
