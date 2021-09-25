const Connections = () => {
  return (
    <>
      <div className="panels__header">Monitoring persons of interest</div>
      <div className="box">
        <div className="box-label">53.2102097,5.7949513,17</div>
        <img
          className="cam"
          src="http://62.195.11.149:90/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER"
          alt="3"
        />
      </div>
      <div className="box">
        <div className="box-label">52.9836327,6.4789098</div>
        <img
          className="cam"
          src="http://163.158.76.26/mjpg/video.mjpg"
          alt="2"
        />
      </div>
      <div className="box">
        <div className="box-label">52.8872546,6.1161903</div>
        <img
          className="cam"
          src="http://213.184.127.123:82/mjpg/video.mjpg"
          alt="1"
        />
      </div>
      <div className="box">
        <div className="box-label">52.7158545,6.8324473</div>

        <img
          className="cam"
          src="http://213.124.36.2/mjpg/video.mjpg"
          alt="4"
        />
      </div>
    </>
  );
};

export default Connections;
