import { ReactNode } from 'react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import EventCard from '~/components/EventCard/EventCard';
import EventCardSkeleton from '~/components/EventCard/EventCardSkeleton';
import { Event } from '~/types/event';

type Props = {
  isFetching: boolean;
  events: Event[] | null;
};

const Carousel = ({ isFetching, events }: Props) => {
  let content: ReactNode;
  if (isFetching) {
    content = (
      <>
        <SwiperSlide>
          <EventCardSkeleton />
        </SwiperSlide>
        <SwiperSlide>
          <EventCardSkeleton />
        </SwiperSlide>
        <SwiperSlide>
          <EventCardSkeleton />
        </SwiperSlide>
      </>
    );
  } else if (events) {
    content = events.map((e) => (
      <SwiperSlide key={e.id}>
        <EventCard event={e} />
      </SwiperSlide>
    ));
  }

  return (
    <Swiper
      // navigation={true}
      modules={[Navigation, Pagination]}
      cssMode={true}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        300: {
          spaceBetween: 30,
          slidesPerView: 1,
        },
        680: {
          spaceBetween: 30,
          slidesPerView: 2,
        },
        1280: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
      }}
    >
      {content}
    </Swiper>
  );
};

export default Carousel;
