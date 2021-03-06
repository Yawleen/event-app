import style from "../../styles/Events/Event.module.css";
import Image from "next/image"

export default function Event({ event }) {
  const date = new Date(
    Date.UTC(
      ...event.date
        .replace(/-/g, ",")
        .split(",")
        .map((item) => Number(item))
    )
  );
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className={`${style.event} container`}>
      <div>
        <h1>{event.title}</h1>
      </div>
      <div>
        <div className={`${style.card} flex-row`}>
          <div>
            <div className={style.circleImg}><Image src={event.image} alt={event.title} layout="fill" objectFit="cover" /></div>
          </div>
          <div>
            <div>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calendar"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
              </span>
              <p>
                {date.toLocaleString("en-EN", options)[0].toUpperCase() +
                  date.toLocaleString("en-EN", options).slice(1)}
              </p>
            </div>
            <div>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </span>
              <p>
                {event.location.split(",")[0]}
                <br /> {event.location.split(",")[1]}
              </p>
            </div>
          </div>
        </div>
        <p>{event.description}</p>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const data = await import("/data/dummydata.json");
  const eventsList = data.events;
  const paths = eventsList.map((event) => ({ params: { event: event.id } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const idEvent = params.event;
  const data = await import("/data/dummydata.json");
  const event = data.events.find((event) => event.id === idEvent);

  return {
    props: {
      event,
    },
  };
}
