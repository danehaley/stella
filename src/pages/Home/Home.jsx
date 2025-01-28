import "./Home.scss";
import logger from 'heroku-logger'

function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!isMobile) {
        logger.info("cm");
      }
    };

    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      if (mobile) {
        logger.info("pl");
      }
    };

    checkMobile();
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <>
      <div className="content-container">
        <div className="home-wrapper">
          <img
            className="home-img"
            src="/gif/djJesusNestlesHisLilLamb.gif"
          ></img>
          <div className="home-jesus">
            <h4 className="home-jesus-heading underline">PS2 JESUS SAYS</h4>
            <p className="home-jesus-quote">
              i don't know what youre going thru, but im sorry if i made it
              worse. im going to go offline again for both of us. stay safe,
              keep going, chunks off a glacier.. 
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
