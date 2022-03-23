export default function DetailBubbles({ detailObj }) {
  return (
    <div className="detail-bubbles">
      <div className="wrapper">
        {Object.entries(detailObj).map((detail) => {
          if (!detail[1]) return;
          return (
            <div className="detail-bubble" key={detail}>
              {detail[0]}: {detail[1]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
