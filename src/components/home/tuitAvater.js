
const url = "https://firebasestorage.googleapis.com/v0/b/image-d9eae.appspot.com/o/images%2Fpussy.jpeg?alt=media&token=575a12ad-0f1a-4389-98cb-7e5f92b3db99";

const Avatar = (profile) => {
  return (
    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
        <div className="d-flex">
          <div className="p-2">
            <div
                    data-testid="avater"
                    alt="Tuit Image"
                    className="m-1 img-thumbnail create-tuit-image"
                    style={{
                      display: "inline-block",
                      width: "150px",
                      height: "150px",
                      backgroundImage: `url(${url})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover"
                    }}
                  />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Avatar;
