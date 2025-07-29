const Spinner = () => {
  return (
    <div
      style={{
        display: "inline-block",
        width: 40,
        height: 40,
        position: "relative",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          display: "block",
          position: "absolute",
          width: 32,
          height: 32,
          margin: 4,
          border: "4px solid #333",
          borderRadius: "50%",
          borderTopColor: "transparent",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
};

export default Spinner;
