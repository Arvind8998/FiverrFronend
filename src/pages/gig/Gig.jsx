import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/Reviews/Reviews";

function Gig(item) {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: `gig${item._id}`,
    queryFn: async () => {
      const res = await newRequest.get(`gigs/single/${id}`);
      return res.data;
    },
  });

  const userId = data?.userId;
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: `User${userId}`,
    queryFn: async () => {
      const res = await newRequest.get(`/users/${userId}`);
      return res.data;
    },
    enabled: !!userId,
  });

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">Liverr > Graphics & Design ></span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" aly="" loading="lazy" />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img src={img} alt="" key={img} loading="lazy" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>

            {isLoadingUser ? (
              "loading"
            ) : error ? (
              "user"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || `/img/noavatar.jpg`} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" aly="" loading="lazy" />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}

                    <button>Contact Me</button>
                  </div>
                </div>
              </div>
            )}

            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>data.{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>2 {data.deliveryDate}</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>3 {data.revisionNumber}</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" loading="lazy" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
